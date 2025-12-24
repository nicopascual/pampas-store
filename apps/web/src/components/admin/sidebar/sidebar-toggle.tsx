"use client";

import { PanelLeft, PanelLeftClose } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSidebar } from "@/contexts/sidebar-context";

export function SidebarToggle() {
	const { t } = useTranslation("admin");
	const { isCollapsed, toggleCollapsed } = useSidebar();

	return (
		<Tooltip>
			<TooltipTrigger
				render={
					<Button
						variant="ghost"
						size="icon"
						onClick={toggleCollapsed}
						className="size-8 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
					/>
				}
			>
				{isCollapsed ? (
					<PanelLeft className="size-4" />
				) : (
					<PanelLeftClose className="size-4" />
				)}
			</TooltipTrigger>
			<TooltipContent side="right">
				{isCollapsed ? t("sidebar.expand") : t("sidebar.collapse")}
			</TooltipContent>
		</Tooltip>
	);
}
