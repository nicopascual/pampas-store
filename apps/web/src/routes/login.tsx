import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";

import SignInForm from "@/components/sign-in-form";
import { getUser } from "@/functions/get-user";

export const Route = createFileRoute("/login")({
	component: RouteComponent,
	beforeLoad: async () => {
		const session = await getUser();
		if (session) {
			throw redirect({ to: "/dashboard" });
		}
	},
});

function RouteComponent() {
	const navigate = useNavigate();

	return <SignInForm onSwitchToSignUp={() => navigate({ to: "/sign-up" })} />;
}
