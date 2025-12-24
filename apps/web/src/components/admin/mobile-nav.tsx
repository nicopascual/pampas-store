"use client";

import { Menu } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useSidebar } from "@/contexts/sidebar-context";
import { SidebarNav } from "./sidebar";

export function MobileNav() {
	const { isMobileOpen, setIsMobileOpen } = useSidebar();

	return (
		<Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
			<SheetContent side="left" className="w-72 p-0" showClose={false}>
				<SheetHeader className="border-sidebar-border border-b">
					<SheetTitle>Pampas Admin</SheetTitle>
				</SheetHeader>
				<TooltipProvider>
					<SidebarNav onNavigate={() => setIsMobileOpen(false)} />
				</TooltipProvider>
			</SheetContent>
		</Sheet>
	);
}

export function MobileNavTrigger() {
	const { t } = useTranslation("admin");
	const { setIsMobileOpen } = useSidebar();

	return (
		<Button
			variant="ghost"
			size="icon"
			className="lg:hidden"
			onClick={() => setIsMobileOpen(true)}
		>
			<Menu className="size-5" />
			<span className="sr-only">{t("header.menu")}</span>
		</Button>
	);
}
