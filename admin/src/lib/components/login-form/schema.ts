import { z } from 'zod/v4';
import * as m from '$lib/paraglide/messages';

export const loginForm = z.object({
	email: z
		.string({ message: m['validation.email.required']() })
		.min(1, { message: m['validation.email.required']() })
		.email({ message: m['validation.email.invalid']() })
		.min(2, { message: m['validation.email.min']({ min: '2' }) })
		.max(50, { message: m['validation.email.max']({ max: '50' }) }),
	password: z
		.string({ message: m['validation.password.required']() })
		.min(1, { message: m['validation.password.required']() })
		.min(6, { message: m['validation.password.min']({ min: '6' }) })
		.max(255, { message: m['validation.password.max']({ max: '255' }) })
});

export type LoginForm = typeof loginForm;
