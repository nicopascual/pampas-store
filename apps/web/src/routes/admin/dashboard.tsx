import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin";
import { SidebarProvider } from "@/contexts/sidebar-context";
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
	return (
		<SidebarProvider>
			<AdminLayout>
				<Outlet />
			</AdminLayout>
		</SidebarProvider>
	);
}
