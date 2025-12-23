import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sign-up")({
	component: RouteComponent,
});

function RouteComponent() {
	return <Outlet />;
}
