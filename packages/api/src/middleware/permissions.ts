import { ORPCError } from "@orpc/server";
import prisma from "@pampas-store/db";
import { adminProcedure } from "./admin-auth";

// Permission-aware admin procedure factory
export function createPermissionProcedure(requiredPermissions: string[]) {
	return adminProcedure.use(async ({ context, next }) => {
		const admin = context.admin;

		if (!admin.roleId) {
			throw new ORPCError("FORBIDDEN", {
				message: context.t("errors:noRoleAssigned"),
			});
		}

		// Fetch role with permissions
		const role = await prisma.adminRole.findUnique({
			where: { id: admin.roleId },
		});

		if (!role) {
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
			throw new ORPCError("FORBIDDEN", {
				message: context.t("errors:insufficientPermissions"),
			});
		}

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
export const superAdminProcedure = createPermissionProcedure(["*"]);
