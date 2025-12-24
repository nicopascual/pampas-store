import prisma from "@pampas-store/db";
import { z } from "zod";
import { settingsManagementProcedure } from "../../../index";

export const localesRouter = {
	list: settingsManagementProcedure.handler(async () => {
		return prisma.locale.findMany({
			orderBy: { name: "asc" },
			include: {
				_count: {
					select: {
						channels: true,
						channelsAsDefault: true,
					},
				},
			},
		});
	}),

	get: settingsManagementProcedure
		.input(z.object({ id: z.string() }))
		.handler(async ({ input }) => {
			return prisma.locale.findUnique({
				where: { id: input.id },
				include: {
					channels: {
						include: { channel: true },
					},
				},
			});
		}),

	create: settingsManagementProcedure
		.input(
			z.object({
				code: z.string().min(1).max(10),
				name: z.string().min(1).max(255),
				direction: z.enum(["ltr", "rtl"]).default("ltr"),
			}),
		)
		.handler(async ({ input }) => {
			return prisma.locale.create({
				data: input,
			});
		}),

	update: settingsManagementProcedure
		.input(
			z.object({
				id: z.string(),
				code: z.string().min(1).max(10).optional(),
				name: z.string().min(1).max(255).optional(),
				direction: z.enum(["ltr", "rtl"]).optional(),
			}),
		)
		.handler(async ({ input }) => {
			const { id, ...data } = input;
			return prisma.locale.update({
				where: { id },
				data,
			});
		}),

	delete: settingsManagementProcedure
		.input(z.object({ id: z.string() }))
		.handler(async ({ input }) => {
			return prisma.locale.delete({
				where: { id: input.id },
			});
		}),
};
