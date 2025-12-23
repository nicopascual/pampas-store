import { createFileRoute, useNavigate } from "@tanstack/react-router";

import EmailSignUpForm from "@/components/email-sign-up-form";
import i18n from "@/lib/i18n";

export const Route = createFileRoute("/sign-up/email")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{
				title: i18n.t("auth:signUp.emailForm.meta.title"),
			},
			{
				name: "description",
				content: i18n.t("auth:signUp.emailForm.meta.description"),
			},
		],
	}),
});

function RouteComponent() {
	const navigate = useNavigate();

	return (
		<EmailSignUpForm onSwitchToSignIn={() => navigate({ to: "/login" })} />
	);
}
