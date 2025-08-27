import type { Actions, PageServerLoad } from './$types.js';
import { superValidate } from 'sveltekit-superforms';

import { zod4 } from 'sveltekit-superforms/adapters';
import { loginForm } from '$lib/components/login-form/schema';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod4(loginForm))
	};
};
export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod4(loginForm));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		return {
			form
		};
	}
};
