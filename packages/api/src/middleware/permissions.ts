import { ORPCError } from "@orpc/server";
import prisma from "@pampas-store/db";
import { adminProcedure } from "./admin-auth";

// Permission-aware admin procedure factory
export function createPermissionProcedure(requiredPermissions: string[]) {
	return adminProcedure.use(async ({ context, next }) => {
		const admin = context.admin;

		context.log.debug(
			{
				category: "security",
				requestId: context.requestId,
				userId: admin.id,
				requiredPermissions,
			},
			"Checking permissions",
		);

		if (!admin.roleId) {
			context.log.warn(
				{
					category: "security",
					requestId: context.requestId,
					userId: admin.id,
				},
				"Permission denied: no role assigned",
			);
			throw new ORPCError("FORBIDDEN", {
				message: context.t("errors:noRoleAssigned"),
			});
		}

		// Fetch role with permissions
		const role = await prisma.adminRole.findUnique({
			where: { id: admin.roleId },
		});

		if (!role) {
			context.log.error(
				{
					category: "security",
					requestId: context.requestId,
					userId: admin.id,
					roleId: admin.roleId,
				},
				"Permission denied: role not found",
			);
			throw new ORPCError("FORBIDDEN", {
				message: context.t("errors:roleNotFound"),
			});
		}

		// Parse permissions JSON
		const permissions: string[] = JSON.parse(role.permissionsJson || "[]");

		// Check if admin has all required permissions
		const hasAllPermissions = requiredPermissions.every(
			(perm) => permissions.includes(perm) || permissions.includes("*"),
		);

		if (!hasAllPermissions) {
			context.log.warn(
				{
					category: "security",
					requestId: context.requestId,
					userId: admin.id,
					roleId: admin.roleId,
					requiredPermissions,
					actualPermissions: permissions,
				},
				"Permission denied: insufficient permissions",
			);
			throw new ORPCError("FORBIDDEN", {
				message: context.t("errors:insufficientPermissions"),
			});
		}

		context.log.debug(
			{
				category: "security",
				requestId: context.requestId,
				userId: admin.id,
				roleId: admin.roleId,
				permissions,
			},
			"Permission check passed",
		);

		return next({
			context: {
				...context,
				permissions,
				role,
			},
		});
	});
}

// Pre-built permission procedures for common use cases
export const customerManagementProcedure = createPermissionProcedure([
	"customers:read",
	"customers:write",
]);
export const customerReadOnlyProcedure = createPermissionProcedure([
	"customers:read",
]);
export const roleManagementProcedure = createPermissionProcedure([
	"roles:manage",
]);
export const settingsManagementProcedure = createPermissionProcedure([
	"settings:manage",
]);
export const superAdminProcedure = createPermissionProcedure(["*"]);
