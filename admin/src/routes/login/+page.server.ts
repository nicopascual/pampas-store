import type { Actions, PageServerLoad } from './$types.js';
import { superValidate } from 'sveltekit-superforms';

import { zod4 } from 'sveltekit-superforms/adapters';
import { loginForm } from '$lib/components/login-form/schema';
import { fail, redirect } from '@sveltejs/kit';
import { loginUserStore } from '$houdini';
import * as m from '$lib/paraglide/messages';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod4(loginForm))
	};
};
export const actions: Actions = {
	default: async (event) => {
		const { cookies } = event;
		const form = await superValidate(event, zod4(loginForm));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const result = await new loginUserStore().mutate(
			{
				input: { email: form.data.email, password: form.data.password }
			},
			{ event }
		);

		const loginResponse = result.data?.loginUser;

		if (!loginResponse) {
			return fail(500, {
				form: {
					...form,
					message: m['login.error.network']()
				}
			});
		}

		// Check if response is a MutationError (login error)
		if ('message' in loginResponse && 'code' in loginResponse) {
			// If there are validation errors, map them to form field errors
			if (loginResponse.validationErrors) {
				for (const error of loginResponse.validationErrors) {
					form.errors[error.field as keyof typeof form.errors] = error.messages;
				}
			}
			// Set the general error message
			return fail(400, {
				form: {
					...form,
					message: loginResponse.message
				}
			});
		}

		// Check if response is a LoginUserPayload (successful login)
		if ('accessToken' in loginResponse && 'refreshToken' in loginResponse) {
			// Store tokens in secure cookies
			cookies.set('accessToken', loginResponse.accessToken, {
				httpOnly: true,
				secure: true,
				sameSite: 'strict',
				maxAge: 60 * 60 * 24 * 7, // 7 days
				path: '/'
			});

			cookies.set('refreshToken', loginResponse.refreshToken, {
				httpOnly: true,
				secure: true,
				sameSite: 'strict',
				maxAge: 60 * 60 * 24 * 30, // 30 days
				path: '/'
			});

			// Redirect to dashboard or intended page
			throw redirect(302, '/dashboard');
		}

		// Unexpected response format
		return fail(500, {
			form: {
				...form,
				message: m['login.error.unexpected']()
			}
		});
	}
};
