import prisma from "@pampas-store/db";
import { z } from "zod";
import { settingsManagementProcedure } from "../../../index";

export const currenciesRouter = {
	list: settingsManagementProcedure.handler(async () => {
		return prisma.currency.findMany({
			orderBy: { name: "asc" },
			include: {
				_count: {
					select: {
						channels: true,
						channelsAsBase: true,
						exchangeRates: true,
					},
				},
			},
		});
	}),

	get: settingsManagementProcedure
		.input(z.object({ id: z.string() }))
		.handler(async ({ input }) => {
			return prisma.currency.findUnique({
				where: { id: input.id },
				include: {
					exchangeRates: true,
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
				symbol: z.string().min(1).max(10),
				decimal: z.number().min(0).max(10).default(2),
			}),
		)
		.handler(async ({ input }) => {
			return prisma.currency.create({
				data: input,
			});
		}),

	update: settingsManagementProcedure
		.input(
			z.object({
				id: z.string(),
				code: z.string().min(1).max(10).optional(),
				name: z.string().min(1).max(255).optional(),
				symbol: z.string().min(1).max(10).optional(),
				decimal: z.number().min(0).max(10).optional(),
			}),
		)
		.handler(async ({ input }) => {
			const { id, ...data } = input;
			return prisma.currency.update({
				where: { id },
				data,
			});
		}),

	delete: settingsManagementProcedure
		.input(z.object({ id: z.string() }))
		.handler(async ({ input }) => {
			return prisma.currency.delete({
				where: { id: input.id },
			});
		}),

	// Exchange rate management
	setExchangeRate: settingsManagementProcedure
		.input(
			z.object({
				sourceCurrencyId: z.string(),
				targetCurrency: z.string(),
				rate: z.number().positive(),
			}),
		)
		.handler(async ({ input }) => {
			return prisma.currencyExchangeRate.upsert({
				where: {
					sourceCurrencyId_targetCurrency: {
						sourceCurrencyId: input.sourceCurrencyId,
						targetCurrency: input.targetCurrency,
					},
				},
				create: {
					sourceCurrencyId: input.sourceCurrencyId,
					targetCurrency: input.targetCurrency,
					rate: input.rate,
				},
				update: {
					rate: input.rate,
				},
			});
		}),

	removeExchangeRate: settingsManagementProcedure
		.input(
			z.object({
				sourceCurrencyId: z.string(),
				targetCurrency: z.string(),
			}),
		)
		.handler(async ({ input }) => {
			return prisma.currencyExchangeRate.delete({
				where: {
					sourceCurrencyId_targetCurrency: {
						sourceCurrencyId: input.sourceCurrencyId,
						targetCurrency: input.targetCurrency,
					},
				},
			});
		}),

	getExchangeRates: settingsManagementProcedure
		.input(z.object({ currencyId: z.string() }))
		.handler(async ({ input }) => {
			return prisma.currencyExchangeRate.findMany({
				where: { sourceCurrencyId: input.currencyId },
				orderBy: { targetCurrency: "asc" },
			});
		}),
};
