"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { useSidebar } from "@/contexts/sidebar-context";
import { cn } from "@/lib/utils";
import { SidebarFooter } from "./sidebar-footer";
import { SidebarHeader } from "./sidebar-header";
import { SidebarNav } from "./sidebar-nav";
import { SidebarToggle } from "./sidebar-toggle";

export function Sidebar() {
	const { isCollapsed } = useSidebar();

	return (
		<TooltipProvider>
			<aside
				className={cn(
					"hidden h-screen flex-col border-sidebar-border border-r bg-sidebar transition-all duration-300 lg:flex",
					isCollapsed ? "w-16" : "w-64",
				)}
			>
				<SidebarHeader />
				<SidebarNav />
				<div
					className={cn(
						"flex items-center border-sidebar-border border-t p-2",
						isCollapsed ? "justify-center" : "justify-end",
					)}
				>
					<SidebarToggle />
				</div>
				<SidebarFooter />
			</aside>
		</TooltipProvider>
	);
}
