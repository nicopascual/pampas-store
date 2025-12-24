import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/admin/dashboard/settings/currencies")({
	component: RouteComponent,
});

function RouteComponent() {
	const { t } = useTranslation("admin");

	return (
		<div className="p-6">
			<h1 className="font-semibold text-2xl">
				{t("sidebar.settings.currencies")}
			</h1>
		</div>
	);
}
