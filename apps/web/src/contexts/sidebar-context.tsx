"use client";

import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";

interface SidebarContextValue {
	isCollapsed: boolean;
	setIsCollapsed: (value: boolean) => void;
	toggleCollapsed: () => void;
	isMobileOpen: boolean;
	setIsMobileOpen: (value: boolean) => void;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

const STORAGE_KEY = "admin-sidebar-collapsed";

export function SidebarProvider({ children }: { children: ReactNode }) {
	const [isCollapsed, setIsCollapsedState] = useState(false);
	const [isMobileOpen, setIsMobileOpen] = useState(false);
	const [isHydrated, setIsHydrated] = useState(false);

	useEffect(() => {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored !== null) {
			setIsCollapsedState(stored === "true");
		}
		setIsHydrated(true);
	}, []);

	const setIsCollapsed = useCallback((value: boolean) => {
		setIsCollapsedState(value);
		localStorage.setItem(STORAGE_KEY, String(value));
	}, []);

	const toggleCollapsed = useCallback(() => {
		setIsCollapsed(!isCollapsed);
	}, [isCollapsed, setIsCollapsed]);

	if (!isHydrated) {
		return null;
	}

	return (
		<SidebarContext.Provider
			value={{
				isCollapsed,
				setIsCollapsed,
				toggleCollapsed,
				isMobileOpen,
				setIsMobileOpen,
			}}
		>
			{children}
		</SidebarContext.Provider>
	);
}

export function useSidebar() {
	const context = useContext(SidebarContext);
	if (!context) {
		throw new Error("useSidebar must be used within a SidebarProvider");
	}
	return context;
}
