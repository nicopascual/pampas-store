import prisma from "@pampas-store/db";
import { z } from "zod";
import { settingsManagementProcedure } from "../../../index";

export const configRouter = {
	list: settingsManagementProcedure
		.input(
			z
				.object({
					channelId: z.string().optional(),
					localeId: z.string().optional(),
					search: z.string().optional(),
				})
				.optional(),
		)
		.handler(async ({ input }) => {
			const where = {
				...(input?.channelId ? { channelId: input.channelId } : {}),
				...(input?.localeId ? { localeId: input.localeId } : {}),
				...(input?.search ? { code: { contains: input.search } } : {}),
			};

			return prisma.coreConfig.findMany({
				where,
				orderBy: { code: "asc" },
				include: {
					channel: true,
					locale: true,
				},
			});
		}),

	get: settingsManagementProcedure
		.input(
			z.object({
				code: z.string(),
				channelId: z.string().nullable().optional(),
				localeId: z.string().nullable().optional(),
			}),
		)
		.handler(async ({ input }) => {
			// Try to find the most specific config first, then fall back to more general ones
			const configs = await prisma.coreConfig.findMany({
				where: { code: input.code },
				include: {
					channel: true,
					locale: true,
				},
			});

			// Priority order:
			// 1. Channel + Locale specific
			// 2. Channel specific (no locale)
			// 3. Locale specific (no channel)
			// 4. Global (no channel, no locale)

			const channelId = input.channelId ?? null;
			const localeId = input.localeId ?? null;

			// Find exact match first
			const exactMatch = configs.find(
				(c) => c.channelId === channelId && c.localeId === localeId,
			);
			if (exactMatch) return exactMatch;

			// Channel specific
			if (channelId) {
				const channelMatch = configs.find(
					(c) => c.channelId === channelId && c.localeId === null,
				);
				if (channelMatch) return channelMatch;
			}

			// Locale specific
			if (localeId) {
				const localeMatch = configs.find(
					(c) => c.channelId === null && c.localeId === localeId,
				);
				if (localeMatch) return localeMatch;
			}

			// Global fallback
			return (
				configs.find((c) => c.channelId === null && c.localeId === null) ?? null
			);
		}),

	set: settingsManagementProcedure
		.input(
			z.object({
				code: z.string().min(1),
				value: z.string(),
				channelId: z.string().nullable().optional(),
				localeId: z.string().nullable().optional(),
			}),
		)
		.handler(async ({ input }) => {
			const channelId = input.channelId ?? null;
			const localeId = input.localeId ?? null;

			// Find existing config
			const existing = await prisma.coreConfig.findFirst({
				where: {
					code: input.code,
					channelId,
					localeId,
				},
			});

			if (existing) {
				return prisma.coreConfig.update({
					where: { id: existing.id },
					data: { value: input.value },
				});
			}

			return prisma.coreConfig.create({
				data: {
					code: input.code,
					value: input.value,
					channelId,
					localeId,
				},
			});
		}),

	delete: settingsManagementProcedure
		.input(z.object({ id: z.string() }))
		.handler(async ({ input }) => {
			return prisma.coreConfig.delete({
				where: { id: input.id },
			});
		}),

	getBulk: settingsManagementProcedure
		.input(
			z.object({
				codes: z.array(z.string()),
				channelId: z.string().nullable().optional(),
				localeId: z.string().nullable().optional(),
			}),
		)
		.handler(async ({ input }) => {
			const channelId = input.channelId ?? null;
			const localeId = input.localeId ?? null;

			const configs = await prisma.coreConfig.findMany({
				where: {
					code: { in: input.codes },
				},
			});

			// Build result map with fallback logic for each code
			const result: Record<string, string | null> = {};

			for (const code of input.codes) {
				const codeConfigs = configs.filter((c) => c.code === code);

				// Priority order (same as get)
				const exactMatch = codeConfigs.find(
					(c) => c.channelId === channelId && c.localeId === localeId,
				);
				if (exactMatch) {
					result[code] = exactMatch.value;
					continue;
				}

				if (channelId) {
					const channelMatch = codeConfigs.find(
						(c) => c.channelId === channelId && c.localeId === null,
					);
					if (channelMatch) {
						result[code] = channelMatch.value;
						continue;
					}
				}

				if (localeId) {
					const localeMatch = codeConfigs.find(
						(c) => c.channelId === null && c.localeId === localeId,
					);
					if (localeMatch) {
						result[code] = localeMatch.value;
						continue;
					}
				}

				const globalMatch = codeConfigs.find(
					(c) => c.channelId === null && c.localeId === null,
				);
				result[code] = globalMatch?.value ?? null;
			}

			return result;
		}),
};
