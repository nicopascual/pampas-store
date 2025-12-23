import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import {
	createSignInSchema,
	createSignUpSchema,
	createTodoSchema,
} from "./schemas";

export function useSignInSchema() {
	const { t } = useTranslation("validation");
	return useMemo(() => createSignInSchema(t), [t]);
}

export function useSignUpSchema() {
	const { t } = useTranslation("validation");
	return useMemo(() => createSignUpSchema(t), [t]);
}

export function useTodoSchema() {
	const { t } = useTranslation("validation");
	return useMemo(() => createTodoSchema(t), [t]);
}
