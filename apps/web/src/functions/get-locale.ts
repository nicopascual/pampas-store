import { createMiddleware, createServerFn } from "@tanstack/react-start";
import {
	defaultLanguage,
	type SupportedLanguage,
	supportedLanguages,
} from "@/lib/i18n";

const LOCALE_COOKIE_NAME = "locale";

function parseCookies(cookieHeader: string): Record<string, string> {
	return Object.fromEntries(
		cookieHeader.split(";").map((cookie) => {
			const [key, ...val] = cookie.trim().split("=");
			return [key, val.join("=")];
		}),
	);
}

function parseAcceptLanguage(header: string): SupportedLanguage | null {
	const languages = header
		.split(",")
		.map((lang) => {
			const [code, qValue] = lang.trim().split(";q=");
			return {
				code: code.split("-")[0].toLowerCase(),
				quality: qValue ? Number.parseFloat(qValue) : 1.0,
			};
		})
		.sort((a, b) => b.quality - a.quality);

	for (const { code } of languages) {
		if (supportedLanguages.includes(code as SupportedLanguage)) {
			return code as SupportedLanguage;
		}
	}
	return null;
}

function detectLocale(request: Request): SupportedLanguage {
	// 1. Check cookie first
	const cookieHeader = request.headers.get("cookie");
	if (cookieHeader) {
		const cookies = parseCookies(cookieHeader);
		const cookieLocale = cookies[LOCALE_COOKIE_NAME];
		if (
			cookieLocale &&
			supportedLanguages.includes(cookieLocale as SupportedLanguage)
		) {
			return cookieLocale as SupportedLanguage;
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
	return defaultLanguage;
}

export const localeMiddleware = createMiddleware().server(
	async ({ next, request }) => {
		const locale = detectLocale(request);
		return next({ context: { locale } });
	},
);

export const getLocale = createServerFn({ method: "GET" })
	.middleware([localeMiddleware])
	.handler(async ({ context }) => {
		return context.locale;
	});
