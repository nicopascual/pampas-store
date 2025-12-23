import type { TFunction } from "i18next";
import z from "zod";

export const createTodoSchema = (t: TFunction<"validation">) =>
	z.object({
		text: z.string().min(1, t("todo.required")),
	});

export type TodoSchema = z.infer<ReturnType<typeof createTodoSchema>>;
