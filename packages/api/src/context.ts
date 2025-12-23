import {
	type AdminSession,
	type AuthDomain,
	adminAuth,
	type CustomerSession,
	customerAuth,
} from "@pampas-store/auth";
import type { Context as ElysiaContext } from "elysia";

import {
	DEFAULT_LOCALE,
	getTranslator,
	SUPPORTED_LOCALES,
	type SupportedLocale,
	type TranslationFunction,
} from "./i18n";

export type CreateContextOptions = {
	context: ElysiaContext | { request: Request };
};

const LOCALE_COOKIE_NAME = "locale";

function parseCookies(cookieHeader: string): Record<string, string> {
	return Object.fromEntries(
		cookieHeader.split(";").map((cookie) => {
			const [key, ...val] = cookie.trim().split("=");
			return [key, val.join("=")];
		}),
	);
}

function parseAcceptLanguage(header: string): SupportedLocale | null {
	const languages = header
		.split(",")
		.map((lang) => {
			const parts = lang.trim().split(";q=");
			const langCode = parts[0] ?? "";
			const qValue = parts[1];
			const baseCode = langCode.split("-")[0] ?? "";
			return {
				code: baseCode.toLowerCase(),
				quality: qValue ? Number.parseFloat(qValue) : 1.0,
			};
		})
		.sort((a, b) => b.quality - a.quality);

	for (const { code } of languages) {
		if (SUPPORTED_LOCALES.includes(code as SupportedLocale)) {
			return code as SupportedLocale;
		}
	}
	return null;
}

function extractLocaleFromRequest(request: Request): SupportedLocale {
	// 1. Check cookie first
	const cookieHeader = request.headers.get("cookie");
	if (cookieHeader) {
		const cookies = parseCookies(cookieHeader);
		const cookieLocale = cookies[LOCALE_COOKIE_NAME];
		if (
			cookieLocale &&
			SUPPORTED_LOCALES.includes(cookieLocale as SupportedLocale)
		) {
			return cookieLocale as SupportedLocale;
		}
	}

	// 2. Fallback to Accept-Language header
	const acceptLanguage = request.headers.get("accept-language");
	if (acceptLanguage) {
		const parsedLocale = parseAcceptLanguage(acceptLanguage);
		if (parsedLocale) {
			return parsedLocale;
		}
	}

	// 3. Default fallback
	return DEFAULT_LOCALE;
}

// Detect which auth domain based on cookies present
function detectAuthDomain(request: Request): AuthDomain {
	const cookieHeader = request.headers.get("cookie");
	if (!cookieHeader) return null;

	const cookies = parseCookies(cookieHeader);

	// Check for admin session cookie first (more restrictive)
	// Better-Auth uses format: {prefix}.session_token
	if (cookies["admin.session_token"]) {
		return "admin";
	}

	// Check for customer session cookie
	if (cookies["customer.session_token"]) {
		return "customer";
	}

	return null;
}

export async function createContext({ context }: CreateContextOptions) {
	const authDomain = detectAuthDomain(context.request);

	let customerSession: CustomerSession | null = null;
	let adminSession: AdminSession | null = null;

	// Only fetch the session for the detected domain
	if (authDomain === "customer") {
		customerSession = await customerAuth.api.getSession({
			headers: context.request.headers,
		});
	} else if (authDomain === "admin") {
		adminSession = await adminAuth.api.getSession({
			headers: context.request.headers,
		});
	}

	const locale = extractLocaleFromRequest(context.request);
	const t = getTranslator(locale);

	return {
		// Domain identification
		authDomain,

		// Separate session objects - NEVER mixed
		customerSession,
		adminSession,

		// Convenience getters
		isCustomerAuthenticated: !!customerSession?.user,
		isAdminAuthenticated: !!adminSession?.user,

		// Locale
		locale,
		t,
	};
}

export type Context = Awaited<ReturnType<typeof createContext>>;
export type { TranslationFunction };
