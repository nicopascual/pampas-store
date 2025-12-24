import type { LucideIcon } from "lucide-react";
import {
	ArrowLeftRight,
	BarChart3,
	Boxes,
	ClipboardList,
	CreditCard,
	DollarSign,
	Download,
	FileText,
	Globe,
	Layers,
	LayoutDashboard,
	ListTree,
	Mail,
	Megaphone,
	Package,
	Percent,
	Receipt,
	RefreshCw,
	Search,
	Settings,
	Shield,
	ShoppingCart,
	Star,
	Tags,
	TrendingUp,
	Truck,
	UserCheck,
	Users,
	Warehouse,
	Wrench,
} from "lucide-react";

export interface NavItem {
	title: string;
	href: string;
	icon: LucideIcon;
	children?: NavItem[];
}

export const navigationConfig: NavItem[] = [
	{
		title: "sidebar.dashboard",
		href: "/admin/dashboard",
		icon: LayoutDashboard,
	},
	{
		title: "sidebar.sales.title",
		href: "/admin/dashboard/sales",
		icon: ShoppingCart,
		children: [
			{
				title: "sidebar.sales.orders",
				href: "/admin/dashboard/sales/orders",
				icon: ClipboardList,
			},
			{
				title: "sidebar.sales.shipments",
				href: "/admin/dashboard/sales/shipments",
				icon: Truck,
			},
			{
				title: "sidebar.sales.invoices",
				href: "/admin/dashboard/sales/invoices",
				icon: Receipt,
			},
			{
				title: "sidebar.sales.refunds",
				href: "/admin/dashboard/sales/refunds",
				icon: RefreshCw,
			},
			{
				title: "sidebar.sales.transactions",
				href: "/admin/dashboard/sales/transactions",
				icon: CreditCard,
			},
		],
	},
	{
		title: "sidebar.catalog.title",
		href: "/admin/dashboard/catalog",
		icon: Package,
		children: [
			{
				title: "sidebar.catalog.products",
				href: "/admin/dashboard/catalog/products",
				icon: Boxes,
			},
			{
				title: "sidebar.catalog.categories",
				href: "/admin/dashboard/catalog/categories",
				icon: Tags,
			},
			{
				title: "sidebar.catalog.attributes",
				href: "/admin/dashboard/catalog/attributes",
				icon: Layers,
			},
			{
				title: "sidebar.catalog.attributeFamilies",
				href: "/admin/dashboard/catalog/attribute-families",
				icon: ListTree,
			},
		],
	},
	{
		title: "sidebar.customers.title",
		href: "/admin/dashboard/customers",
		icon: Users,
		children: [
			{
				title: "sidebar.customers.list",
				href: "/admin/dashboard/customers/list",
				icon: Users,
			},
			{
				title: "sidebar.customers.groups",
				href: "/admin/dashboard/customers/groups",
				icon: UserCheck,
			},
			{
				title: "sidebar.customers.reviews",
				href: "/admin/dashboard/customers/reviews",
				icon: Star,
			},
			{
				title: "sidebar.customers.gdprDataRequest",
				href: "/admin/dashboard/customers/gdpr-data-request",
				icon: Shield,
			},
		],
	},
	{
		title: "sidebar.cms",
		href: "/admin/dashboard/cms",
		icon: FileText,
	},
	{
		title: "sidebar.marketing.title",
		href: "/admin/dashboard/marketing",
		icon: Megaphone,
		children: [
			{
				title: "sidebar.marketing.promotions",
				href: "/admin/dashboard/marketing/promotions",
				icon: Percent,
			},
			{
				title: "sidebar.marketing.communications",
				href: "/admin/dashboard/marketing/communications",
				icon: Mail,
			},
			{
				title: "sidebar.marketing.searchSeo",
				href: "/admin/dashboard/marketing/search-seo",
				icon: Search,
			},
		],
	},
	{
		title: "sidebar.reporting.title",
		href: "/admin/dashboard/reporting",
		icon: BarChart3,
		children: [
			{
				title: "sidebar.reporting.sales",
				href: "/admin/dashboard/reporting/sales",
				icon: TrendingUp,
			},
			{
				title: "sidebar.reporting.customers",
				href: "/admin/dashboard/reporting/customers",
				icon: Users,
			},
			{
				title: "sidebar.reporting.products",
				href: "/admin/dashboard/reporting/products",
				icon: Package,
			},
		],
	},
	{
		title: "sidebar.settings.title",
		href: "/admin/dashboard/settings",
		icon: Settings,
		children: [
			{
				title: "sidebar.settings.locales",
				href: "/admin/dashboard/settings/locales",
				icon: Globe,
			},
			{
				title: "sidebar.settings.currencies",
				href: "/admin/dashboard/settings/currencies",
				icon: DollarSign,
			},
			{
				title: "sidebar.settings.exchangeRates",
				href: "/admin/dashboard/settings/exchange-rates",
				icon: ArrowLeftRight,
			},
			{
				title: "sidebar.settings.inventorySources",
				href: "/admin/dashboard/settings/inventory-sources",
				icon: Warehouse,
			},
			{
				title: "sidebar.settings.taxes",
				href: "/admin/dashboard/settings/taxes",
				icon: Percent,
			},
			{
				title: "sidebar.settings.dataTransfer",
				href: "/admin/dashboard/settings/data-transfer",
				icon: Download,
			},
			{
				title: "sidebar.settings.configure",
				href: "/admin/dashboard/settings/configure",
				icon: Wrench,
			},
		],
	},
];
