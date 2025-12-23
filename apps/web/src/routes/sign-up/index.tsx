import { createFileRoute, useNavigate } from "@tanstack/react-router";

import SignUpForm from "@/components/sign-up-form";
import i18n from "@/lib/i18n";

export const Route = createFileRoute("/sign-up/")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{
				title: i18n.t("auth:signUp.meta.title"),
			},
			{
				name: "description",
				content: i18n.t("auth:signUp.meta.description"),
			},
		],
	}),
});

function RouteComponent() {
	const navigate = useNavigate();

	return <SignUpForm onSwitchToSignIn={() => navigate({ to: "/login" })} />;
}
