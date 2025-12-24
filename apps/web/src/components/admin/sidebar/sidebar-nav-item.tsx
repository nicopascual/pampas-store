"use client";

import { Link, useRouterState } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSidebar } from "@/contexts/sidebar-context";
import { cn } from "@/lib/utils";

interface SidebarNavItemProps {
	title: string;
	href: string;
	icon: LucideIcon;
	onClick?: () => void;
}

export function SidebarNavItem({
	title,
	href,
	icon: Icon,
	onClick,
}: SidebarNavItemProps) {
	const { t } = useTranslation("admin");
	const { isCollapsed } = useSidebar();
	const routerState = useRouterState();

	const isActive =
		routerState.location.pathname === href ||
		(href !== "/admin/dashboard" &&
			routerState.location.pathname.startsWith(href + "/"));

	const linkClasses = cn(
		"flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
		isActive
			? "bg-sidebar-accent text-sidebar-accent-foreground"
			: "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
		isCollapsed && "justify-center px-2",
	);

	if (isCollapsed) {
		return (
			<Tooltip>
				<TooltipTrigger
					render={<Link to={href} onClick={onClick} className={linkClasses} />}
				>
					<Icon className="size-5 shrink-0" />
				</TooltipTrigger>
				<TooltipContent side="right">{t(title)}</TooltipContent>
			</Tooltip>
		);
	}

	return (
		<Link to={href} onClick={onClick} className={linkClasses}>
			<Icon className="size-5 shrink-0" />
			<span>{t(title)}</span>
		</Link>
	);
}
