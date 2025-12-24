"use client";

import type { ReactNode } from "react";
import { AdminHeader } from "./admin-header";
import { MobileNav } from "./mobile-nav";
import { Sidebar } from "./sidebar";

interface AdminLayoutProps {
	children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
	return (
		<div className="flex h-screen overflow-hidden">
			<Sidebar />
			<div className="flex flex-1 flex-col overflow-hidden">
				<AdminHeader />
				<MobileNav />
				<main className="flex-1 overflow-y-auto bg-muted/40">{children}</main>
			</div>
		</div>
	);
}
