import prisma from "@pampas-store/db";
import { z } from "zod";
import { settingsManagementProcedure } from "../../../index";

export const channelsRouter = {
	list: settingsManagementProcedure
		.input(
			z
				.object({
					page: z.number().min(1).default(1),
					limit: z.number().min(1).max(100).default(20),
					search: z.string().optional(),
				})
				.optional(),
		)
		.handler(async ({ input }) => {
			const page = input?.page ?? 1;
			const limit = input?.limit ?? 20;
			const skip = (page - 1) * limit;

			const where = input?.search
				? {
						OR: [
							{ code: { contains: input.search } },
							{ name: { contains: input.search } },
							{ hostname: { contains: input.search } },
						],
					}
				: {};

			const [channels, total] = await Promise.all([
				prisma.channel.findMany({
					where,
					skip,
					take: limit,
					orderBy: { name: "asc" },
					include: {
						defaultLocale: true,
						baseCurrency: true,
						_count: {
							select: {
								locales: true,
								currencies: true,
							},
						},
					},
				}),
				prisma.channel.count({ where }),
			]);

			return {
				channels,
				pagination: {
					page,
					limit,
					total,
					totalPages: Math.ceil(total / limit),
				},
			};
		}),

	get: settingsManagementProcedure
		.input(z.object({ id: z.string() }))
		.handler(async ({ input }) => {
			return prisma.channel.findUnique({
				where: { id: input.id },
				include: {
					defaultLocale: true,
					baseCurrency: true,
					locales: {
						include: { locale: true },
					},
					currencies: {
						include: { currency: true },
					},
				},
			});
		}),

	create: settingsManagementProcedure
		.input(
			z.object({
				code: z.string().min(1).max(50),
				name: z.string().min(1).max(255),
				description: z.string().optional(),
				hostname: z.string().optional(),
				theme: z.string().default("default"),
				isMaintenanceOn: z.boolean().default(false),
				allowedIps: z.array(z.string()).optional(),
				rootCategoryId: z.string().optional(),
				defaultLocaleId: z.string().optional(),
				baseCurrencyId: z.string().optional(),
			}),
		)
		.handler(async ({ input }) => {
			const { allowedIps, ...data } = input;
			return prisma.channel.create({
				data: {
					...data,
					allowedIps: allowedIps ? JSON.stringify(allowedIps) : null,
				},
			});
		}),

	update: settingsManagementProcedure
		.input(
			z.object({
				id: z.string(),
				code: z.string().min(1).max(50).optional(),
				name: z.string().min(1).max(255).optional(),
				description: z.string().nullable().optional(),
				hostname: z.string().nullable().optional(),
				theme: z.string().optional(),
				isMaintenanceOn: z.boolean().optional(),
				allowedIps: z.array(z.string()).nullable().optional(),
				rootCategoryId: z.string().nullable().optional(),
				defaultLocaleId: z.string().nullable().optional(),
				baseCurrencyId: z.string().nullable().optional(),
			}),
		)
		.handler(async ({ input }) => {
			const { id, allowedIps, ...data } = input;
			return prisma.channel.update({
				where: { id },
				data: {
					...data,
					...(allowedIps !== undefined
						? { allowedIps: allowedIps ? JSON.stringify(allowedIps) : null }
						: {}),
				},
			});
		}),

	delete: settingsManagementProcedure
		.input(z.object({ id: z.string() }))
		.handler(async ({ input }) => {
			return prisma.channel.delete({
				where: { id: input.id },
			});
		}),

	// Locale assignment
	assignLocale: settingsManagementProcedure
		.input(
			z.object({
				channelId: z.string(),
				localeId: z.string(),
			}),
		)
		.handler(async ({ input }) => {
			return prisma.channelLocale.create({
				data: {
					channelId: input.channelId,
					localeId: input.localeId,
				},
				include: { locale: true },
			});
		}),

	removeLocale: settingsManagementProcedure
		.input(
			z.object({
				channelId: z.string(),
				localeId: z.string(),
			}),
		)
		.handler(async ({ input }) => {
			return prisma.channelLocale.delete({
				where: {
					channelId_localeId: {
						channelId: input.channelId,
						localeId: input.localeId,
					},
				},
			});
		}),

	// Currency assignment
	assignCurrency: settingsManagementProcedure
		.input(
			z.object({
				channelId: z.string(),
				currencyId: z.string(),
			}),
		)
		.handler(async ({ input }) => {
			return prisma.channelCurrency.create({
				data: {
					channelId: input.channelId,
					currencyId: input.currencyId,
				},
				include: { currency: true },
			});
		}),

	removeCurrency: settingsManagementProcedure
		.input(
			z.object({
				channelId: z.string(),
				currencyId: z.string(),
			}),
		)
		.handler(async ({ input }) => {
			return prisma.channelCurrency.delete({
				where: {
					channelId_currencyId: {
						channelId: input.channelId,
						currencyId: input.currencyId,
					},
				},
			});
		}),
};
