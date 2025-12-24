import { createFileRoute, redirect } from "@tanstack/react-router";

import AdminSignInForm from "@/components/admin-sign-in-form";
import { getAdminUser } from "@/functions/get-admin-user";
import i18n from "@/lib/i18n";

export const Route = createFileRoute("/admin/sign-in")({
	component: RouteComponent,
	beforeLoad: async () => {
		const session = await getAdminUser();
		if (session) {
			throw redirect({ to: "/admin/dashboard" });
		}
	},
	head: () => ({
		meta: [
			{
				title: i18n.t("auth:admin.signIn.meta.title"),
			},
			{
				name: "robots",
				content: "noindex, nofollow",
			},
		],
	}),
});

function RouteComponent() {
	return <AdminSignInForm />;
}
