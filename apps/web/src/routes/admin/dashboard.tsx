import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { getAdminUser } from "@/functions/get-admin-user";

export const Route = createFileRoute("/admin/dashboard")({
	component: RouteComponent,
	beforeLoad: async () => {
		const adminSession = await getAdminUser();
		return { adminSession };
	},
	loader: async ({ context }) => {
		if (!context.adminSession) {
			throw redirect({
				to: "/admin/sign-in",
			});
		}
	},
});

function RouteComponent() {
	return <Outlet />;
}
