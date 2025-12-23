import type { QueryClient } from "@tanstack/react-query";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
	createRootRouteWithContext,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useTranslation } from "react-i18next";
import { Toaster } from "@/components/ui/sonner";
import { getLocale } from "@/functions/get-locale";
import { initI18n } from "@/lib/i18n";
import type { orpc } from "@/utils/orpc";

import Header from "../components/header";
import appCss from "../index.css?url";

export interface RouterAppContext {
	orpc: typeof orpc;
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterAppContext>()({
	beforeLoad: async () => {
		const locale = await getLocale();
		initI18n(locale);
		return { locale };
	},
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "My App",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),

	component: RootDocument,
});

function RootDocument() {
	const { i18n } = useTranslation();
	const { locale } = Route.useRouteContext();
	return (
		<html lang={locale || i18n.language} className="dark">
			<head>
				<HeadContent />
			</head>
			<body>
				<div className="grid h-svh grid-rows-[auto_1fr]">
						<Outlet />
				</div>
				<Toaster richColors />
				<TanStackRouterDevtools position="bottom-left" />
				<ReactQueryDevtools position="bottom" buttonPosition="bottom-right" />
				<Scripts />
			</body>
		</html>
	);
}
