import type { TFunction } from "i18next";
import z from "zod";

export const createSignInSchema = (t: TFunction<"validation">) =>
	z.object({
		email: z.string().min(1, t("email.required")).email(t("email.invalid")),
		password: z
			.string()
			.min(1, t("password.required"))
			.min(8, t("password.minLength", { min: 8 })),
	});

export type SignInSchema = z.infer<ReturnType<typeof createSignInSchema>>;
