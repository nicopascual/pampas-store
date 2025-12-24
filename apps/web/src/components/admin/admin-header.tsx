"use client";

import LanguageSwitcher from "@/components/language-switcher";
import { MobileNavTrigger } from "./mobile-nav";

export function AdminHeader() {
	return (
		<header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background px-4 lg:hidden">
			<MobileNavTrigger />
			<div className="flex flex-1 items-center justify-end gap-2">
				<LanguageSwitcher />
			</div>
		</header>
	);
}
