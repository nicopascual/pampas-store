import { createFileRoute } from "@tanstack/react-router";
import {
	DollarSign,
	Package,
	ShoppingCart,
	TrendingUp,
	Users,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute("/admin/dashboard/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { t } = useTranslation(["auth", "admin"]);
	const { adminSession } = Route.useRouteContext();

	const stats = [
		{
			title: t("admin:dashboard.stats.totalRevenue"),
			value: "$45,231.89",
			change: "+20.1%",
			changeType: "positive" as const,
			icon: DollarSign,
		},
		{
			title: t("admin:dashboard.stats.orders"),
			value: "356",
			change: "+12.5%",
			changeType: "positive" as const,
			icon: ShoppingCart,
		},
		{
			title: t("admin:dashboard.stats.customers"),
			value: "2,350",
			change: "+8.2%",
			changeType: "positive" as const,
			icon: Users,
		},
		{
			title: t("admin:dashboard.stats.products"),
			value: "1,247",
			change: "+4.3%",
			changeType: "positive" as const,
			icon: Package,
		},
	];

	return (
		<div className="space-y-6 p-6">
			<div>
				<h1 className="font-bold text-3xl">
					{t("auth:admin.dashboard.title")}
				</h1>
				<p className="mt-2 text-muted-foreground">
					{t("auth:admin.dashboard.welcome", { name: adminSession?.user.name })}
				</p>
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				{stats.map((stat) => (
					<Card key={stat.title}>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="font-medium text-sm">
								{stat.title}
							</CardTitle>
							<stat.icon className="size-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="font-bold text-2xl">{stat.value}</div>
							<p className="flex items-center gap-1 text-muted-foreground text-xs">
								<TrendingUp className="size-3 text-green-500" />
								<span className="text-green-500">{stat.change}</span>
								{t("admin:dashboard.stats.fromLastMonth")}
							</p>
						</CardContent>
					</Card>
				))}
			</div>

			<div className="grid gap-4 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>{t("admin:dashboard.recentOrders.title")}</CardTitle>
						<CardDescription>
							{t("admin:dashboard.recentOrders.description")}
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{[1, 2, 3, 4, 5].map((i) => (
								<div
									key={i}
									className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
								>
									<div>
										<p className="font-medium text-sm">Order #{1000 + i}</p>
										<p className="text-muted-foreground text-xs">
											Customer {i}
										</p>
									</div>
									<div className="text-right">
										<p className="font-medium text-sm">
											${(Math.random() * 500 + 50).toFixed(2)}
										</p>
										<p className="text-muted-foreground text-xs">
											{t("admin:dashboard.recentOrders.pending")}
										</p>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>{t("admin:dashboard.topProducts.title")}</CardTitle>
						<CardDescription>
							{t("admin:dashboard.topProducts.description")}
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{[
								{ name: "Product A", sales: 234 },
								{ name: "Product B", sales: 187 },
								{ name: "Product C", sales: 156 },
								{ name: "Product D", sales: 142 },
								{ name: "Product E", sales: 98 },
							].map((product) => (
								<div
									key={product.name}
									className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
								>
									<p className="font-medium text-sm">{product.name}</p>
									<p className="text-muted-foreground text-sm">
										{product.sales} {t("admin:dashboard.topProducts.sales")}
									</p>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
