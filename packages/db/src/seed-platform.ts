import "dotenv/config";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { hashPassword } from "better-auth/crypto";
import path from "node:path";
import fs from "node:fs";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

// Load environment from server
const dotenv = await import("dotenv");
dotenv.config({ path: "../../apps/server/.env" });

// Import platform Prisma client
import { PrismaClient as PlatformPrismaClient } from "../prisma-platform/generated/client";
// Import store Prisma client
import { PrismaClient as StorePrismaClient } from "../prisma/generated/client";

// ESM equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resolve to project root data directory (packages/db -> project root)
const DATA_DIR = process.env.DATA_DIR || path.resolve(__dirname, "../../../data");
const STORES_DIR = path.join(DATA_DIR, "stores");

// Ensure directories exist
fs.mkdirSync(DATA_DIR, { recursive: true });
fs.mkdirSync(STORES_DIR, { recursive: true });

// Platform database client
const platformDbPath = path.join(DATA_DIR, "platform.db");
const platformAdapter = new PrismaLibSql({ url: `file:${platformDbPath}` });
const platformPrisma = new PlatformPrismaClient({ adapter: platformAdapter });

// Default store configuration
const DEFAULT_STORE = {
	name: "Pampas Store",
	slug: "pampas",
	subdomain: "pampas",
};

// Default admin credentials
const DEFAULT_ADMIN = {
	name: "Nico",
	email: "nico@test.com",
	password: "password158",
};

async function seedPlatform() {
	console.log("🌱 Starting platform seed...\n");

	// 1. Create default store in platform database
	console.log("📦 Creating default store in platform database...");

	let store = await platformPrisma.store.findUnique({
		where: { slug: DEFAULT_STORE.slug },
	});

	if (!store) {
		store = await platformPrisma.store.create({
			data: {
				slug: DEFAULT_STORE.slug,
				name: DEFAULT_STORE.name,
				subdomain: DEFAULT_STORE.subdomain,
				isLocal: true,
				status: "active",
				plan: "starter",
				provisionedAt: new Date(),
			},
		});
		console.log(`   ✅ Created store: ${store.name} (${store.slug})`);
	} else {
		console.log(`   ⏭️  Store already exists: ${store.name}`);
	}

	// 2. Create store database file
	const storeDbPath = path.join(STORES_DIR, `${DEFAULT_STORE.slug}.db`);
	console.log(`\n📁 Provisioning store database at: ${storeDbPath}`);

	if (!fs.existsSync(storeDbPath)) {
		// Apply Prisma schema to new store database
		console.log("   Applying Prisma schema to store database...");
		execSync(`bunx prisma db push --url="file:${storeDbPath}"`, {
			cwd: path.resolve(__dirname, ".."),
			stdio: "inherit",
		});
		console.log("   ✅ Store database created and schema applied");
	} else {
		console.log("   ⏭️  Store database already exists");
	}

	// 3. Connect to store database and seed initial data
	console.log("\n🎨 Seeding store initial data...");

	const storeAdapter = new PrismaLibSql({ url: `file:${storeDbPath}` });
	const storePrisma = new StorePrismaClient({ adapter: storeAdapter });

	// Create Super Admin role
	let role = await storePrisma.adminRole.findUnique({
		where: { name: "Super Admin" },
	});

	if (!role) {
		role = await storePrisma.adminRole.create({
			data: {
				name: "Super Admin",
				description: "Full system access",
				permissionsJson: JSON.stringify(["*"]),
			},
		});
		console.log("   ✅ Created role: Super Admin");
	} else {
		console.log("   ⏭️  Role already exists: Super Admin");
	}

	// Create Admin user
	let admin = await storePrisma.admin.findUnique({
		where: { email: DEFAULT_ADMIN.email },
	});

	if (!admin) {
		const passwordHash = await hashPassword(DEFAULT_ADMIN.password);

		admin = await storePrisma.admin.create({
			data: {
				name: DEFAULT_ADMIN.name,
				email: DEFAULT_ADMIN.email,
				emailVerified: true,
				status: "active",
				roleId: role.id,
			},
		});

		// Create admin account with password
		await storePrisma.adminAccount.create({
			data: {
				accountId: admin.id,
				providerId: "credential",
				adminId: admin.id,
				password: passwordHash,
			},
		});

		console.log(`   ✅ Created admin: ${admin.email}`);
	} else {
		console.log(`   ⏭️  Admin already exists: ${admin.email}`);
	}

	// Create default locales
	const existingLocales = await storePrisma.locale.count();
	let defaultLocale;
	if (existingLocales === 0) {
		const locales = await storePrisma.locale.createManyAndReturn({
			data: [
				{ code: "en", name: "English" },
				{ code: "es", name: "Spanish" },
				{ code: "pt", name: "Portuguese" },
			],
		});
		defaultLocale = locales.find((l) => l.code === "en");
		console.log("   ✅ Created locales: en, es, pt");
	} else {
		defaultLocale = await storePrisma.locale.findUnique({ where: { code: "en" } });
		console.log("   ⏭️  Locales already exist");
	}

	// Create default currencies
	const existingCurrencies = await storePrisma.currency.count();
	let defaultCurrency;
	if (existingCurrencies === 0) {
		const currencies = await storePrisma.currency.createManyAndReturn({
			data: [
				{ code: "USD", name: "US Dollar", symbol: "$" },
				{ code: "EUR", name: "Euro", symbol: "€" },
				{ code: "ARS", name: "Argentine Peso", symbol: "$" },
			],
		});
		defaultCurrency = currencies.find((c) => c.code === "USD");
		console.log("   ✅ Created currencies: USD, EUR, ARS");
	} else {
		defaultCurrency = await storePrisma.currency.findUnique({ where: { code: "USD" } });
		console.log("   ⏭️  Currencies already exist");
	}

	// Create default channel with default locale and currency
	const existingChannel = await storePrisma.channel.findUnique({
		where: { code: "default" },
	});

	if (!existingChannel) {
		await storePrisma.channel.create({
			data: {
				code: "default",
				name: DEFAULT_STORE.name,
				defaultLocaleId: defaultLocale?.id,
				baseCurrencyId: defaultCurrency?.id,
			},
		});
		console.log("   ✅ Created channel: default");
	} else {
		console.log("   ⏭️  Channel already exists: default");
	}

	// Cleanup connections
	await storePrisma.$disconnect();
	await platformPrisma.$disconnect();

	console.log("\n" + "=".repeat(50));
	console.log("🎉 Platform seed completed successfully!\n");
	console.log("Store Details:");
	console.log(`   Name: ${DEFAULT_STORE.name}`);
	console.log(`   Slug: ${DEFAULT_STORE.slug}`);
	console.log(`   Subdomain: ${DEFAULT_STORE.subdomain}`);
	console.log(`   Database: ${storeDbPath}`);
	console.log("\nAdmin Credentials:");
	console.log(`   Email: ${DEFAULT_ADMIN.email}`);
	console.log(`   Password: ${DEFAULT_ADMIN.password}`);
	console.log("\nAccess your store at:");
	console.log(`   http://${DEFAULT_STORE.subdomain}.localhost:3001`);
	console.log("=".repeat(50) + "\n");
}

seedPlatform()
	.catch((error) => {
		console.error("❌ Seed failed:", error);
		process.exit(1);
	})
	.finally(() => process.exit(0));
