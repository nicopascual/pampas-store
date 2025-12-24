"use client";

import { useRouteContext } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSidebar } from "@/contexts/sidebar-context";
import { adminAuthClient } from "@/lib/admin-auth-client";

export function SidebarFooter() {
	const { t } = useTranslation("auth");
	const { isCollapsed } = useSidebar();
	const context = useRouteContext({ from: "/admin/dashboard" });
	const adminSession = context.adminSession;

	const handleSignOut = async () => {
		await adminAuthClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					toast.success(t("signOut.success"));
					window.location.href = "/admin/sign-in";
				},
			},
		});
	};

	const initials = adminSession?.user?.name
		? adminSession.user.name
				.split(" ")
				.map((n) => n[0])
				.join("")
				.toUpperCase()
				.slice(0, 2)
		: "A";

	if (isCollapsed) {
		return (
			<div className="flex flex-col items-center gap-2 border-sidebar-border border-t p-2">
				<Tooltip>
					<TooltipTrigger>
						<Avatar className="size-8">
							<AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground text-xs">
								{initials}
							</AvatarFallback>
						</Avatar>
					</TooltipTrigger>
					<TooltipContent side="right">
						{adminSession?.user?.name ?? "Admin"}
					</TooltipContent>
				</Tooltip>
				<Tooltip>
					<TooltipTrigger
						render={
							<Button
								variant="ghost"
								size="icon"
								onClick={handleSignOut}
								className="size-8 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
							/>
						}
					>
						<LogOut className="size-4" />
					</TooltipTrigger>
					<TooltipContent side="right">{t("signOut.label")}</TooltipContent>
				</Tooltip>
			</div>
		);
	}

	return (
		<div className="border-sidebar-border border-t p-3">
			<div className="flex items-center gap-3">
				<Avatar className="size-9">
					<AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground">
						{initials}
					</AvatarFallback>
				</Avatar>
				<div className="flex flex-1 flex-col overflow-hidden">
					<span className="truncate font-medium text-sidebar-foreground text-sm">
						{adminSession?.user?.name ?? "Admin"}
					</span>
					<span className="truncate text-sidebar-foreground/70 text-xs">
						{adminSession?.user?.email}
					</span>
				</div>
				<Button
					variant="ghost"
					size="icon"
					onClick={handleSignOut}
					className="size-8 shrink-0 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
				>
					<LogOut className="size-4" />
				</Button>
			</div>
		</div>
	);
}
