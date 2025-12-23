import {
	type DehydratedState,
	dehydrate,
	hydrate,
	QueryClientProvider,
} from "@tanstack/react-query";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { I18nextProvider } from "react-i18next";

import "./index.css";
import Loader from "./components/loader";
import i18n, { initI18n } from "./lib/i18n";
import { routeTree } from "./routeTree.gen";
import { orpc, queryClient } from "./utils/orpc";

// Initialize i18n on module load
initI18n();

// Type helper for serializable state - uses JSON.parse return type pattern
type JsonValue =
	| string
	| number
	| boolean
	| null
	| JsonValue[]
	| { [key: string]: JsonValue };

interface AppDehydratedState {
	queryClient: JsonValue;
	locale: string;
}

export const getRouter = () => {
	const router = createTanStackRouter({
		routeTree,
		scrollRestoration: true,
		defaultPreloadStaleTime: 0,
		context: { orpc, queryClient },
		defaultPendingComponent: () => <Loader />,
		defaultNotFoundComponent: () => <div>Not Found</div>,
		Wrap: ({ children }) => (
			<QueryClientProvider client={queryClient}>
				<I18nextProvider i18n={i18n}>{children}</I18nextProvider>
			</QueryClientProvider>
		),
		dehydrate: (): AppDehydratedState => ({
			// JSON.parse(JSON.stringify()) ensures clean serialization and returns any,
			// which safely assigns to JsonValue without explicit type assertions
			queryClient: JSON.parse(JSON.stringify(dehydrate(queryClient))),
			locale: i18n.language,
		}),
		hydrate: (state: AppDehydratedState) => {
			// The queryClient was serialized during SSR, cast through unknown to DehydratedState
			hydrate(queryClient, state.queryClient as unknown as DehydratedState);
			if (state.locale && state.locale !== i18n.language) {
				i18n.changeLanguage(state.locale);
			}
		},
	});
	return router;
};

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof getRouter>;
	}
}
