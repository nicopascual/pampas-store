import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import enAuth from "@/locales/en/auth.json";
import enCommon from "@/locales/en/common.json";
import enErrors from "@/locales/en/errors.json";
import enTodos from "@/locales/en/todos.json";
import enValidation from "@/locales/en/validation.json";
import esAuth from "@/locales/es/auth.json";
import esCommon from "@/locales/es/common.json";
import esErrors from "@/locales/es/errors.json";
import esTodos from "@/locales/es/todos.json";
import esValidation from "@/locales/es/validation.json";
import ptAuth from "@/locales/pt/auth.json";
import ptCommon from "@/locales/pt/common.json";
import ptErrors from "@/locales/pt/errors.json";
import ptTodos from "@/locales/pt/todos.json";
import ptValidation from "@/locales/pt/validation.json";

export const supportedLanguages = ["en", "es", "pt"] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];
export const defaultLanguage: SupportedLanguage = "en";

export const resources = {
	en: {
		common: enCommon,
		auth: enAuth,
		todos: enTodos,
		errors: enErrors,
		validation: enValidation,
	},
	es: {
		common: esCommon,
		auth: esAuth,
		todos: esTodos,
		errors: esErrors,
		validation: esValidation,
	},
	pt: {
		common: ptCommon,
		auth: ptAuth,
		todos: ptTodos,
		errors: ptErrors,
		validation: ptValidation,
	},
} as const;

export const defaultNS = "common";
export const namespaces = [
	"common",
	"auth",
	"todos",
	"errors",
	"validation",
] as const;

export function initI18n(initialLanguage?: string) {
	if (i18n.isInitialized) {
		if (initialLanguage && initialLanguage !== i18n.language) {
			i18n.changeLanguage(initialLanguage);
		}
		return i18n;
	}

	i18n
		.use(LanguageDetector)
		.use(initReactI18next)
		.init({
			resources,
			fallbackLng: defaultLanguage,
			defaultNS,
			ns: namespaces,
			lng: initialLanguage,

			detection: {
				order: ["cookie", "navigator"],
				lookupCookie: "locale",
				caches: ["cookie"],
				cookieOptions: {
					path: "/",
					sameSite: "strict",
				},
			},

			interpolation: {
				escapeValue: false,
			},

			react: {
				useSuspense: false,
			},
		});

	return i18n;
}

export default i18n;
