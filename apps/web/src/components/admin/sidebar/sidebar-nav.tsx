"use client";

import { navigationConfig } from "@/config/admin-navigation";
import { SidebarNavGroup } from "./sidebar-nav-group";
import { SidebarNavItem } from "./sidebar-nav-item";

interface SidebarNavProps {
	onNavigate?: () => void;
}

export function SidebarNav({ onNavigate }: SidebarNavProps) {
	return (
		<nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-2">
			{navigationConfig.map((item) =>
				item.children ? (
					<SidebarNavGroup
						key={item.href}
						item={item}
						onNavigate={onNavigate}
					/>
				) : (
					<SidebarNavItem
						key={item.href}
						title={item.title}
						href={item.href}
						icon={item.icon}
						onClick={onNavigate}
					/>
				),
			)}
		</nav>
	);
}
