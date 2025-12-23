import { createFileRoute, useNavigate } from "@tanstack/react-router";

import EmailSignUpForm from "@/components/email-sign-up-form";

export const Route = createFileRoute("/sign-up/email")({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate();

	return (
		<EmailSignUpForm
			onSwitchToSignIn={() => navigate({ to: "/login" })}
		/>
	);
}
