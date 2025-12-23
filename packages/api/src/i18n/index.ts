import i18next, { type TFunction } from "i18next";
import enAuth from "./locales/en/auth.json";
import enErrors from "./locales/en/errors.json";
import enValidation from "./locales/en/validation.json";
import esAuth from "./locales/es/auth.json";
import esErrors from "./locales/es/errors.json";
import esValidation from "./locales/es/validation.json";
import ptAuth from "./locales/pt/auth.json";
import ptErrors from "./locales/pt/errors.json";
import ptValidation from "./locales/pt/validation.json";

export const SUPPORTED_LOCALES = ["en", "es", "pt"] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: SupportedLocale = "en";

const resources = {
	en: {
		errors: enErrors,
		validation: enValidation,
		auth: enAuth,
	},
	es: {
		errors: esErrors,
		validation: esValidation,
		auth: esAuth,
	},
	pt: {
		errors: ptErrors,
		validation: ptValidation,
		auth: ptAuth,
	},
} as const;

// Initialize i18next for server-side usage
const i18n = i18next.createInstance();

i18n.init({
	resources,
	fallbackLng: DEFAULT_LOCALE,
	supportedLngs: SUPPORTED_LOCALES,
	ns: ["errors", "validation", "auth"],
	defaultNS: "errors",
	interpolation: {
		escapeValue: false,
	},
});

export { i18n };

// Helper to get a translator for a specific locale
export function getTranslator(locale: string): TFunction {
	const validLocale = SUPPORTED_LOCALES.includes(locale as SupportedLocale)
		? locale
		: DEFAULT_LOCALE;
	return i18n.getFixedT(validLocale);
}

export type TranslationFunction = TFunction;
