import { z } from "zod";
import { ORPCError } from "@orpc/server";
import { superAdminProcedure, publicProcedure } from "../../index";
import { storeProvisioning } from "../../services/store-provisioning";
import { getStorePrismaClient } from "@pampas-store/db/tenant-client";

// Input schemas
const createStoreSchema = z.object({
	name: z.string().min(1).max(100),
	slug: z
		.string()
		.min(1)
		.max(50)
		.regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
	subdomain: z
		.string()
		.min(1)
		.max(50)
		.regex(/^[a-z0-9-]+$/, "Subdomain must contain only lowercase letters, numbers, and hyphens"),
	customDomain: z.string().optional(),
	plan: z.enum(["starter", "professional", "enterprise"]).default("starter"),
	useCloud: z.boolean().default(false),
});

const updateStoreSchema = z.object({
	id: z.string(),
	name: z.string().min(1).max(100).optional(),
	customDomain: z.string().nullable().optional(),
	plan: z.enum(["starter", "professional", "enterprise"]).optional(),
	status: z.enum(["active", "suspended", "pending"]).optional(),
});

const listStoresSchema = z.object({
	page: z.number().min(1).default(1),
	limit: z.number().min(1).max(100).default(20),
	status: z.enum(["active", "suspended", "pending"]).optional(),
	search: z.string().optional(),
});

// Helper function to seed initial store data
async function seedStoreInitialData(
	prisma: ReturnType<typeof getStorePrismaClient>,
	storeName: string,
) {
	// Create default admin role
	await prisma.adminRole.create({
		data: {
			name: "Store Admin",
			permissionsJson: '["*"]',
		},
	});

	// Create default locales
	const locales = await prisma.locale.createManyAndReturn({
		data: [
			{ code: "en", name: "English" },
			{ code: "es", name: "Spanish" },
			{ code: "pt", name: "Portuguese" },
		],
	});
	const defaultLocale = locales.find((l) => l.code === "en");

	// Create default currencies
	const currencies = await prisma.currency.createManyAndReturn({
		data: [
			{ code: "USD", name: "US Dollar", symbol: "$" },
			{ code: "EUR", name: "Euro", symbol: "€" },
		],
	});
	const defaultCurrency = currencies.find((c) => c.code === "USD");

	// Create default channel with default locale and currency
	await prisma.channel.create({
		data: {
			code: "default",
			name: storeName,
			defaultLocaleId: defaultLocale?.id,
			baseCurrencyId: defaultCurrency?.id,
		},
	});
}

export const storesRouter = {
	// Create a new store
	create: superAdminProcedure
		.input(createStoreSchema)
		.handler(async ({ input, context }) => {
			// Check for existing slug/subdomain
			const existing = await context.platformPrisma.store.findFirst({
				where: {
					OR: [{ slug: input.slug }, { subdomain: input.subdomain }],
				},
			});

			if (existing) {
				throw new ORPCError("BAD_REQUEST", {
					message:
						existing.slug === input.slug
							? context.t("validation:storeSlugExists")
							: context.t("validation:storeSubdomainExists"),
				});
			}

			// Provision database
			const dbInfo = input.useCloud
				? await storeProvisioning.provisionTursoStore(input.slug)
				: await storeProvisioning.provisionLocalStore(input.slug);

			// Create store record in platform database
			const store = await context.platformPrisma.store.create({
				data: {
					slug: input.slug,
					name: input.name,
					subdomain: input.subdomain,
					customDomain: input.customDomain,
					plan: input.plan,
					isLocal: dbInfo.isLocal,
					databaseUrl: dbInfo.databaseUrl,
					databaseToken: dbInfo.databaseToken,
					status: "active",
					provisionedAt: new Date(),
				},
			});

			// Get store Prisma client and seed initial data
			const storePrisma = getStorePrismaClient({
				storeId: store.id,
				slug: input.slug,
				isLocal: dbInfo.isLocal,
				databaseUrl: dbInfo.databaseUrl,
				databaseToken: dbInfo.databaseToken,
			});

			await seedStoreInitialData(storePrisma, input.name);

			return store;
		}),

	// List all stores
	list: superAdminProcedure
		.input(listStoresSchema)
		.handler(async ({ input, context }) => {
			const skip = (input.page - 1) * input.limit;

			const where = {
				...(input.status ? { status: input.status } : {}),
				...(input.search
					? {
							OR: [
								{ name: { contains: input.search } },
								{ slug: { contains: input.search } },
								{ subdomain: { contains: input.search } },
							],
						}
					: {}),
			};

			const [stores, total] = await Promise.all([
				context.platformPrisma.store.findMany({
					where,
					skip,
					take: input.limit,
					orderBy: { createdAt: "desc" },
				}),
				context.platformPrisma.store.count({ where }),
			]);

			return {
				stores,
				pagination: {
					page: input.page,
					limit: input.limit,
					total,
					totalPages: Math.ceil(total / input.limit),
				},
			};
		}),

	// Get a single store
	get: superAdminProcedure
		.input(z.object({ id: z.string() }))
		.handler(async ({ input, context }) => {
			const store = await context.platformPrisma.store.findUnique({
				where: { id: input.id },
				include: {
					platformAdmins: {
						include: {
							platformAdmin: {
								select: { id: true, email: true, name: true },
							},
						},
					},
				},
			});

			if (!store) {
				throw new ORPCError("NOT_FOUND", {
					message: context.t("errors:storeNotFound"),
				});
			}

			return store;
		}),

	// Update a store
	update: superAdminProcedure
		.input(updateStoreSchema)
		.handler(async ({ input, context }) => {
			const { id, ...data } = input;

			const store = await context.platformPrisma.store.findUnique({
				where: { id },
			});

			if (!store) {
				throw new ORPCError("NOT_FOUND", {
					message: context.t("errors:storeNotFound"),
				});
			}

			return context.platformPrisma.store.update({
				where: { id },
				data,
			});
		}),

	// Suspend a store
	suspend: superAdminProcedure
		.input(z.object({ id: z.string() }))
		.handler(async ({ input, context }) => {
			return context.platformPrisma.store.update({
				where: { id: input.id },
				data: { status: "suspended" },
			});
		}),

	// Activate a store
	activate: superAdminProcedure
		.input(z.object({ id: z.string() }))
		.handler(async ({ input, context }) => {
			return context.platformPrisma.store.update({
				where: { id: input.id },
				data: { status: "active" },
			});
		}),

	// Delete a store (dangerous operation)
	delete: superAdminProcedure
		.input(z.object({ id: z.string(), confirmSlug: z.string() }))
		.handler(async ({ input, context }) => {
			const store = await context.platformPrisma.store.findUnique({
				where: { id: input.id },
			});

			if (!store) {
				throw new ORPCError("NOT_FOUND", {
					message: context.t("errors:storeNotFound"),
				});
			}

			// Require confirmation via slug to prevent accidental deletion
			if (input.confirmSlug !== store.slug) {
				throw new ORPCError("BAD_REQUEST", {
					message: context.t("validation:storeDeleteConfirmation"),
				});
			}

			// Delete the database
			if (store.isLocal) {
				await storeProvisioning.deleteLocalStore(store.slug);
			} else {
				await storeProvisioning.deleteTursoStore(store.slug);
			}

			// Delete store record
			await context.platformPrisma.store.delete({
				where: { id: input.id },
			});

			return { success: true };
		}),

	// Public endpoint to check store availability
	checkAvailability: publicProcedure
		.input(
			z.object({
				slug: z.string().optional(),
				subdomain: z.string().optional(),
			}),
		)
		.handler(async ({ input, context }) => {
			if (!input.slug && !input.subdomain) {
				return { available: false };
			}

			const existing = await context.platformPrisma.store.findFirst({
				where: {
					OR: [
						...(input.slug ? [{ slug: input.slug }] : []),
						...(input.subdomain ? [{ subdomain: input.subdomain }] : []),
					],
				},
			});

			return { available: !existing };
		}),
};
