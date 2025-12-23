import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import z from "zod";

export function useLocalizedZodSchema() {
	const { t } = useTranslation("validation");

	return useMemo(
		() => ({
			signIn: z.object({
				email: z.string().min(1, t("email.required")).email(t("email.invalid")),
				password: z
					.string()
					.min(1, t("password.required"))
					.min(8, t("password.minLength", { min: 8 })),
			}),
			signUp: z.object({
				name: z
					.string()
					.min(1, t("name.required"))
					.min(2, t("name.minLength", { min: 2 })),
				email: z.string().min(1, t("email.required")).email(t("email.invalid")),
				password: z
					.string()
					.min(1, t("password.required"))
					.min(8, t("password.minLength", { min: 8 })),
			}),
			todo: z.object({
				text: z.string().min(1, t("todo.required")),
			}),
		}),
		[t],
	);
}
