import {
	type AdminSession,
	type AuthDomain,
	adminAuth,
	type CustomerSession,
	customerAuth,
} from "@pampas-store/auth";
import { platformPrisma } from "@pampas-store/db/platform-client";
import {
	getStorePrismaClient,
	type StoreConnectionInfo,
} from "@pampas-store/db/tenant-client";
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

// Store cache configuration
const STORE_CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

interface CachedStore {
	store: StoreConnectionInfo;
	expires: number;
}

const storeCache = new Map<string, CachedStore>();

// Base domain for subdomain extraction
const BASE_DOMAIN = process.env.BASE_DOMAIN || "localhost:3001";

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

// Extract subdomain from host
function extractSubdomain(host: string): string | null {
	// Remove port if present
	const hostWithoutPort = host.split(":")[0] ?? host;
	const baseDomainWithoutPort = BASE_DOMAIN.split(":")[0] ?? BASE_DOMAIN;

	// Check if host ends with base domain
	if (!hostWithoutPort.endsWith(baseDomainWithoutPort)) {
		return null;
	}

	// Extract subdomain
	const subdomain = hostWithoutPort.slice(
		0,
		hostWithoutPort.length - baseDomainWithoutPort.length - 1,
	);

	// Return null if no subdomain or it's empty
	return subdomain || null;
}

// Lookup store by ID (for header override)
async function lookupStoreById(
	storeId: string,
): Promise<StoreConnectionInfo | null> {
	const store = await platformPrisma.store.findUnique({
		where: { id: storeId },
		select: {
			id: true,
			slug: true,
			isLocal: true,
			databaseUrl: true,
			databaseToken: true,
			status: true,
		},
	});

	if (!store || store.status !== "active") {
		return null;
	}

	return {
		storeId: store.id,
		slug: store.slug,
		isLocal: store.isLocal,
		databaseUrl: store.databaseUrl,
		databaseToken: store.databaseToken,
	};
}

// Resolve store from request
async function resolveStore(
	request: Request,
): Promise<StoreConnectionInfo | null> {
	const host = request.headers.get("host") || "";
	console.log("[Context] Resolving store for host:", host);

	// Check header override (for admin tools / testing)
	const storeHeader = request.headers.get("x-store-id");
	if (storeHeader) {
		console.log("[Context] Using x-store-id header:", storeHeader);
		return lookupStoreById(storeHeader);
	}

	// Check cache first
	const cached = storeCache.get(host);
	if (cached && cached.expires > Date.now()) {
		console.log("[Context] Store found in cache:", cached.store.slug);
		return cached.store;
	}

	// Lookup by custom domain first
	let store = await platformPrisma.store.findUnique({
		where: { customDomain: host },
		select: {
			id: true,
			slug: true,
			isLocal: true,
			databaseUrl: true,
			databaseToken: true,
			status: true,
		},
	});

	if (store) {
		console.log("[Context] Store found by custom domain:", store.slug);
	}

	// Fallback to subdomain lookup
	if (!store) {
		const subdomain = extractSubdomain(host);
		console.log("[Context] Extracted subdomain:", subdomain);
		if (subdomain) {
			store = await platformPrisma.store.findUnique({
				where: { subdomain },
				select: {
					id: true,
					slug: true,
					isLocal: true,
					databaseUrl: true,
					databaseToken: true,
					status: true,
				},
			});
			if (store) {
				console.log("[Context] Store found by subdomain:", store.slug);
			}
		}
	}

	if (store && store.status === "active") {
		const info: StoreConnectionInfo = {
			storeId: store.id,
			slug: store.slug,
			isLocal: store.isLocal,
			databaseUrl: store.databaseUrl,
			databaseToken: store.databaseToken,
		};
		storeCache.set(host, { store: info, expires: Date.now() + STORE_CACHE_TTL_MS });
		console.log("[Context] Store resolved successfully:", info.slug);
		return info;
	}

	console.log("[Context] No store found for host:", host);
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

	// Resolve store from request (multi-tenant)
	const storeInfo = await resolveStore(context.request);

	// Get store-specific Prisma client (or null for platform-only routes)
	const prisma = storeInfo ? getStorePrismaClient(storeInfo) : null;

	return {
		// Store context (multi-tenant)
		store: storeInfo ? { id: storeInfo.storeId, slug: storeInfo.slug } : null,
		prisma, // Store-specific database (null if no store resolved)
		platformPrisma, // Platform database (always available)

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
