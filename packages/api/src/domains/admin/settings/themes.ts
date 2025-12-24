import prisma from "@pampas-store/db";
import { z } from "zod";
import { settingsManagementProcedure } from "../../../index";

export const themesRouter = {
	list: settingsManagementProcedure
		.input(
			z
				.object({
					channelId: z.string().optional(),
					type: z.string().optional(),
				})
				.optional(),
		)
		.handler(async ({ input }) => {
			const where = {
				...(input?.channelId ? { channelId: input.channelId } : {}),
				...(input?.type ? { type: input.type } : {}),
			};

			return prisma.themeCustomization.findMany({
				where,
				orderBy: [{ type: "asc" }, { name: "asc" }],
				include: { channel: true },
			});
		}),

	get: settingsManagementProcedure
		.input(
			z.object({
				type: z.string(),
				name: z.string(),
				channelId: z.string().nullable().optional(),
			}),
		)
		.handler(async ({ input }) => {
			const channelId = input.channelId ?? null;

			// Try channel-specific first, then fall back to global
			const customization = await prisma.themeCustomization.findFirst({
				where: {
					type: input.type,
					name: input.name,
					channelId,
				},
				include: { channel: true },
			});

			if (customization) return customization;

			// Fallback to global if looking for channel-specific
			if (channelId) {
				return prisma.themeCustomization.findFirst({
					where: {
						type: input.type,
						name: input.name,
						channelId: null,
					},
					include: { channel: true },
				});
			}

			return null;
		}),

	set: settingsManagementProcedure
		.input(
			z.object({
				type: z.string().min(1),
				name: z.string().min(1),
				value: z.string().nullable().optional(),
				channelId: z.string().nullable().optional(),
			}),
		)
		.handler(async ({ input }) => {
			const channelId = input.channelId ?? null;

			// Find existing customization
			const existing = await prisma.themeCustomization.findFirst({
				where: {
					type: input.type,
					name: input.name,
					channelId,
				},
			});

			if (existing) {
				return prisma.themeCustomization.update({
					where: { id: existing.id },
					data: { value: input.value ?? null },
				});
			}

			return prisma.themeCustomization.create({
				data: {
					type: input.type,
					name: input.name,
					value: input.value ?? null,
					channelId,
				},
			});
		}),

	delete: settingsManagementProcedure
		.input(z.object({ id: z.string() }))
		.handler(async ({ input }) => {
			return prisma.themeCustomization.delete({
				where: { id: input.id },
			});
		}),

	// Get all customizations for a channel (with global fallbacks)
	getForChannel: settingsManagementProcedure
		.input(z.object({ channelId: z.string() }))
		.handler(async ({ input }) => {
			// Get both channel-specific and global customizations
			const customizations = await prisma.themeCustomization.findMany({
				where: {
					OR: [{ channelId: input.channelId }, { channelId: null }],
				},
				orderBy: [{ type: "asc" }, { name: "asc" }],
			});

			// Build map with channel-specific overriding global
			const resultMap = new Map<string, (typeof customizations)[0]>();

			// Add global first
			for (const c of customizations.filter((c) => c.channelId === null)) {
				resultMap.set(`${c.type}:${c.name}`, c);
			}

			// Override with channel-specific
			for (const c of customizations.filter(
				(c) => c.channelId === input.channelId,
			)) {
				resultMap.set(`${c.type}:${c.name}`, c);
			}

			return Array.from(resultMap.values());
		}),
};
