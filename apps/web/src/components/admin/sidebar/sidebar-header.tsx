"use client";

import { Link } from "@tanstack/react-router";
import { Store } from "lucide-react";
import { useSidebar } from "@/contexts/sidebar-context";
import { cn } from "@/lib/utils";

export function SidebarHeader() {
	const { isCollapsed } = useSidebar();

	return (
		<div
			className={cn(
				"flex h-14 items-center border-sidebar-border border-b px-4",
				isCollapsed && "justify-center px-2",
			)}
		>
			<Link
				to="/admin/dashboard"
				className="flex items-center gap-2 font-semibold text-sidebar-foreground"
			>
				<Store className="size-6 shrink-0" />
				{!isCollapsed && <span>Pampas Admin</span>}
			</Link>
		</div>
	);
}
