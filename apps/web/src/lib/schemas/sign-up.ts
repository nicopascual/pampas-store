import type { TFunction } from "i18next";
import z from "zod";

export const createSignUpSchema = (t: TFunction<"validation">) =>
	z.object({
		name: z
			.string()
			.min(1, t("name.required"))
			.min(2, t("name.minLength", { min: 2 })),
		email: z.string().min(1, t("email.required")).email(t("email.invalid")),
		password: z
			.string()
			.min(1, t("password.required"))
			.min(8, t("password.minLength", { min: 8 })),
	});

export type SignUpSchema = z.infer<ReturnType<typeof createSignUpSchema>>;
