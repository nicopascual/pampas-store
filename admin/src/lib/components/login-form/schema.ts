import { z } from 'zod/v4';
import * as m from '$lib/paraglide/messages';

export const loginForm = z.object({
	email: z.email({ message: m['validation.email.invalid']() }),
	password: z
		.string({ message: m['validation.password.required']() })
		.min(1, { message: m['validation.password.required']() })
		.min(6, { message: m['validation.password.min']({ min: '6' }) })
		.max(255, { message: m['validation.password.max']({ max: '255' }) })
});

export type LoginForm = typeof loginForm;
