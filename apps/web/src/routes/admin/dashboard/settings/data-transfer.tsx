import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/admin/dashboard/settings/data-transfer")(
	{
		component: RouteComponent,
	},
);

function RouteComponent() {
	const { t } = useTranslation("admin");

	return (
		<div className="p-6">
			<h1 className="font-semibold text-2xl">
				{t("sidebar.settings.dataTransfer")}
			</h1>
		</div>
	);
}
