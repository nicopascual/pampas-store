import prisma from "@pampas-store/db";
import { z } from "zod";
import {
	adminProcedure,
	customerManagementProcedure,
	roleManagementProcedure,
} from "../../index";

export const adminRouter = {
	// Get current admin profile
	getProfile: adminProcedure.handler(async ({ context }) => {
		const admin = await prisma.admin.findUnique({
			where: { id: context.admin.id },
			include: { role: true },
		});
		return admin;
	}),

	// Customer management (requires permissions)
	customers: {
		list: customerManagementProcedure
			.input(
				z.object({
					page: z.number().min(1).default(1),
					limit: z.number().min(1).max(100).default(20),
					status: z.enum(["active", "inactive", "suspended"]).optional(),
					search: z.string().optional(),
				}),
			)
			.handler(async ({ input }) => {
				const skip = (input.page - 1) * input.limit;

				const where = {
					...(input.status ? { status: input.status } : {}),
					...(input.search
						? {
								OR: [
									{ email: { contains: input.search } },
									{ firstName: { contains: input.search } },
									{ lastName: { contains: input.search } },
								],
							}
						: {}),
				};

				const [customers, total] = await Promise.all([
					prisma.customer.findMany({
						where,
						skip,
						take: input.limit,
						orderBy: { createdAt: "desc" },
						include: { customerGroup: true },
					}),
					prisma.customer.count({ where }),
				]);

				return {
					customers,
					pagination: {
						page: input.page,
						limit: input.limit,
						total,
						totalPages: Math.ceil(total / input.limit),
					},
				};
			}),

		get: customerManagementProcedure
			.input(z.object({ customerId: z.string() }))
			.handler(async ({ input }) => {
				return prisma.customer.findUnique({
					where: { id: input.customerId },
					include: {
						customerGroup: true,
						notes: { orderBy: { createdAt: "desc" } },
					},
				});
			}),

		suspend: customerManagementProcedure
			.input(z.object({ customerId: z.string() }))
			.handler(async ({ input, context }) => {
				// Add audit note
				await prisma.customerNote.create({
					data: {
						customerId: input.customerId,
						note: `Suspended by admin ${context.admin.email}`,
					},
				});

				return prisma.customer.update({
					where: { id: input.customerId },
					data: {
						isSuspended: true,
						status: "suspended",
					},
				});
			}),

		unsuspend: customerManagementProcedure
			.input(z.object({ customerId: z.string() }))
			.handler(async ({ input, context }) => {
				// Add audit note
				await prisma.customerNote.create({
					data: {
						customerId: input.customerId,
						note: `Unsuspended by admin ${context.admin.email}`,
					},
				});

				return prisma.customer.update({
					where: { id: input.customerId },
					data: {
						isSuspended: false,
						status: "active",
					},
				});
			}),

		addNote: customerManagementProcedure
			.input(
				z.object({
					customerId: z.string(),
					note: z.string().min(1),
				}),
			)
			.handler(async ({ input }) => {
				return prisma.customerNote.create({
					data: {
						customerId: input.customerId,
						note: input.note,
					},
				});
			}),
	},

	// Customer groups management
	customerGroups: {
		list: adminProcedure.handler(async () => {
			return prisma.customerGroup.findMany({
				orderBy: { name: "asc" },
				include: { _count: { select: { customers: true } } },
			});
		}),

		create: customerManagementProcedure
			.input(
				z.object({
					code: z.string().min(1),
					name: z.string().min(1),
				}),
			)
			.handler(async ({ input }) => {
				return prisma.customerGroup.create({
					data: {
						code: input.code,
						name: input.name,
					},
				});
			}),

		update: customerManagementProcedure
			.input(
				z.object({
					id: z.string(),
					code: z.string().min(1).optional(),
					name: z.string().min(1).optional(),
				}),
			)
			.handler(async ({ input }) => {
				const { id, ...data } = input;
				return prisma.customerGroup.update({
					where: { id },
					data,
				});
			}),

		delete: customerManagementProcedure
			.input(z.object({ id: z.string() }))
			.handler(async ({ input }) => {
				return prisma.customerGroup.delete({
					where: { id: input.id },
				});
			}),
	},

	// Role management (requires role permissions)
	roles: {
		list: roleManagementProcedure.handler(async () => {
			return prisma.adminRole.findMany({
				orderBy: { name: "asc" },
				include: { _count: { select: { admins: true } } },
			});
		}),

		get: roleManagementProcedure
			.input(z.object({ id: z.string() }))
			.handler(async ({ input }) => {
				const role = await prisma.adminRole.findUnique({
					where: { id: input.id },
				});
				if (role) {
					return {
						...role,
						permissions: JSON.parse(role.permissionsJson || "[]") as string[],
					};
				}
				return null;
			}),

		create: roleManagementProcedure
			.input(
				z.object({
					name: z.string().min(1),
					description: z.string().optional(),
					permissions: z.array(z.string()),
				}),
			)
			.handler(async ({ input }) => {
				return prisma.adminRole.create({
					data: {
						name: input.name,
						description: input.description,
						permissionsJson: JSON.stringify(input.permissions),
					},
				});
			}),

		update: roleManagementProcedure
			.input(
				z.object({
					id: z.string(),
					name: z.string().min(1).optional(),
					description: z.string().optional(),
					permissions: z.array(z.string()).optional(),
				}),
			)
			.handler(async ({ input }) => {
				const { id, permissions, ...data } = input;
				return prisma.adminRole.update({
					where: { id },
					data: {
						...data,
						...(permissions
							? { permissionsJson: JSON.stringify(permissions) }
							: {}),
					},
				});
			}),

		delete: roleManagementProcedure
			.input(z.object({ id: z.string() }))
			.handler(async ({ input }) => {
				return prisma.adminRole.delete({
					where: { id: input.id },
				});
			}),
	},
};
