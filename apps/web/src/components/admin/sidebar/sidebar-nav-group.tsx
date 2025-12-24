"use client";

import { useRouterState } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import type { NavItem } from "@/config/admin-navigation";
import { useSidebar } from "@/contexts/sidebar-context";
import { cn } from "@/lib/utils";
import { SidebarNavItem } from "./sidebar-nav-item";

interface SidebarNavGroupProps {
	item: NavItem;
	onNavigate?: () => void;
}

export function SidebarNavGroup({ item, onNavigate }: SidebarNavGroupProps) {
	const { t } = useTranslation("admin");
	const { isCollapsed } = useSidebar();
	const routerState = useRouterState();

	const hasActiveChild = item.children?.some(
		(child) =>
			routerState.location.pathname === child.href ||
			routerState.location.pathname.startsWith(child.href + "/"),
	);

	const [isOpen, setIsOpen] = useState(hasActiveChild ?? false);

	useEffect(() => {
		if (hasActiveChild) {
			setIsOpen(true);
		}
	}, [hasActiveChild]);

	const Icon = item.icon;

	if (isCollapsed) {
		return (
			<Tooltip>
				<TooltipTrigger
					className={cn(
						"flex w-full items-center justify-center rounded-lg px-2 py-2 text-sm transition-colors",
						hasActiveChild
							? "bg-sidebar-accent text-sidebar-accent-foreground"
							: "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
					)}
				>
					<Icon className="size-5 shrink-0" />
				</TooltipTrigger>
				<TooltipContent side="right" className="flex flex-col gap-1 p-2">
					<span className="font-medium">{t(item.title)}</span>
					{item.children?.map((child) => (
						<a
							key={child.href}
							href={child.href}
							onClick={onNavigate}
							className="text-xs hover:underline"
						>
							{t(child.title)}
						</a>
					))}
				</TooltipContent>
			</Tooltip>
		);
	}

	return (
		<Collapsible open={isOpen} onOpenChange={setIsOpen}>
			<CollapsibleTrigger
				className={cn(
					"flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
					hasActiveChild
						? "bg-sidebar-accent/50 text-sidebar-accent-foreground"
						: "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
				)}
			>
				<Icon className="size-5 shrink-0" />
				<span className="flex-1 text-left">{t(item.title)}</span>
				<ChevronRight
					className={cn(
						"size-4 shrink-0 transition-transform duration-200",
						isOpen && "rotate-90",
					)}
				/>
			</CollapsibleTrigger>
			<CollapsibleContent>
				<div className="mt-1 ml-4 flex flex-col gap-1 border-sidebar-border border-l pl-2">
					{item.children?.map((child) => (
						<SidebarNavItem
							key={child.href}
							title={child.title}
							href={child.href}
							icon={child.icon}
							onClick={onNavigate}
						/>
					))}
				</div>
			</CollapsibleContent>
		</Collapsible>
	);
}
