import { createFileRoute } from "@tanstack/react-router";

import AdminSignInForm from "@/components/admin-sign-in-form";

export const Route = createFileRoute("/admin/sign-in")({
	component: RouteComponent,
});

function RouteComponent() {
	return <AdminSignInForm />;
}
