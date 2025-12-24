import "dotenv/config";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "../prisma/generated/client";
import { hashPassword } from "better-auth/crypto";

// Load environment from server
const dotenv = await import("dotenv");
dotenv.config({ path: "../../apps/server/.env" });

const adapter = new PrismaLibSql({
	url: process.env.DATABASE_URL || "",
});

const prisma = new PrismaClient({ adapter });

async function seedAdmin() {
	// Create super admin role if it doesn't exist
	const role = await prisma.adminRole.upsert({
		where: { name: "Super Admin" },
		update: {},
		create: {
			name: "Super Admin",
			description: "Full system access",
			permissionsJson: JSON.stringify(["*"]),
		},
	});

	console.log("Created role:", role.name);

	// Hash password using Better-Auth's password hashing (salt:key format)
	const passwordHash = await hashPassword("password158");

	// Create admin user
	const admin = await prisma.admin.upsert({
		where: { email: "nico@test.com" },
		update: {
			roleId: role.id,
		},
		create: {
			name: "Nico",
			email: "nico@test.com",
			emailVerified: true,
			status: "active",
			roleId: role.id,
		},
	});

	console.log("Created admin:", admin.email);

	// Create admin account with password (Better-Auth credential provider)
	const existingAccount = await prisma.adminAccount.findFirst({
		where: {
			adminId: admin.id,
			providerId: "credential",
		},
	});

	if (!existingAccount) {
		await prisma.adminAccount.create({
			data: {
				accountId: admin.id,
				providerId: "credential",
				adminId: admin.id,
				password: passwordHash,
			},
		});
		console.log("Created admin account with password");
	} else {
		await prisma.adminAccount.update({
			where: { id: existingAccount.id },
			data: { password: passwordHash },
		});
		console.log("Updated admin account password");
	}

	console.log("\nAdmin user created successfully!");
	console.log("Email: nico@test.com");
	console.log("Password: password158");
}

seedAdmin()
	.catch(console.error)
	.finally(() => process.exit(0));
