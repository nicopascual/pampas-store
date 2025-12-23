import prisma from "@pampas-store/db";
import { z } from "zod";
import { customerProcedure } from "../../index";

export const customerRouter = {
	// Get current customer profile
	getProfile: customerProcedure.handler(async ({ context }) => {
		return context.customer;
	}),

	// Update profile
	updateProfile: customerProcedure
		.input(
			z.object({
				firstName: z.string().min(1).optional(),
				lastName: z.string().min(1).optional(),
				phone: z.string().optional(),
			}),
		)
		.handler(async ({ input, context }) => {
			return prisma.customer.update({
				where: { id: context.customer.id },
				data: input,
			});
		}),

	// Wishlist operations
	wishlist: {
		getAll: customerProcedure.handler(async ({ context }) => {
			return prisma.wishlist.findMany({
				where: { customerId: context.customer.id },
				orderBy: { createdAt: "desc" },
			});
		}),

		add: customerProcedure
			.input(
				z.object({
					productId: z.string(),
					channelId: z.string().optional(),
					options: z.record(z.string(), z.unknown()).optional(),
				}),
			)
			.handler(async ({ input, context }) => {
				return prisma.wishlist.create({
					data: {
						customerId: context.customer.id,
						productId: input.productId,
						channelId: input.channelId,
						optionsJson: input.options ? JSON.stringify(input.options) : null,
					},
				});
			}),

		remove: customerProcedure
			.input(z.object({ productId: z.string() }))
			.handler(async ({ input, context }) => {
				return prisma.wishlist.delete({
					where: {
						customerId_productId: {
							customerId: context.customer.id,
							productId: input.productId,
						},
					},
				});
			}),
	},

	// Compare items operations
	compareItems: {
		getAll: customerProcedure.handler(async ({ context }) => {
			return prisma.compareItem.findMany({
				where: { customerId: context.customer.id },
				orderBy: { createdAt: "desc" },
			});
		}),

		add: customerProcedure
			.input(z.object({ productId: z.string() }))
			.handler(async ({ input, context }) => {
				return prisma.compareItem.create({
					data: {
						customerId: context.customer.id,
						productId: input.productId,
					},
				});
			}),

		remove: customerProcedure
			.input(z.object({ productId: z.string() }))
			.handler(async ({ input, context }) => {
				return prisma.compareItem.delete({
					where: {
						customerId_productId: {
							customerId: context.customer.id,
							productId: input.productId,
						},
					},
				});
			}),

		clear: customerProcedure.handler(async ({ context }) => {
			return prisma.compareItem.deleteMany({
				where: { customerId: context.customer.id },
			});
		}),
	},
};
