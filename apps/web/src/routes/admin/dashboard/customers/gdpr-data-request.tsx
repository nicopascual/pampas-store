import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute(
	"/admin/dashboard/customers/gdpr-data-request",
)({
	component: RouteComponent,
});

function RouteComponent() {
	const { t } = useTranslation("admin");

	return (
		<div className="p-6">
			<h1 className="font-semibold text-2xl">
				{t("sidebar.customers.gdprDataRequest")}
			</h1>
		</div>
	);
}
