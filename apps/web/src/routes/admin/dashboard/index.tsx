import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/admin/dashboard/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { t } = useTranslation("auth");
	const { adminSession } = Route.useRouteContext();

	return (
		<div className="min-h-screen bg-muted/40 p-8">
			<div className="mx-auto max-w-7xl">
				<h1 className="font-bold text-3xl">{t("admin.dashboard.title")}</h1>
				<p className="mt-2 text-muted-foreground">
					{t("admin.dashboard.welcome", { name: adminSession?.user.name })}
				</p>
			</div>
		</div>
	);
}
