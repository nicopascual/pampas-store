import type { Handle } from '@sveltejs/kit';
import { paraglideMiddleware } from '$lib/paraglide/server';
import { redirect } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const handleParaglide: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request, locale }) => {
		event.request = request;

		return resolve(event, {
			transformPageChunk: ({ html }) => html.replace('%paraglide.lang%', locale)
		});
	});

const handleAuth: Handle = ({ event, resolve }) => {
	const accessToken = event.cookies.get('accessToken');
	const isAuthenticated = !!accessToken;

	// If user is authenticated and trying to access login page, redirect to dashboard
	if (isAuthenticated && event.url.pathname === '/login') {
		throw redirect(302, '/dashboard');
	}

	return resolve(event);
};

export const handle = sequence(handleAuth, handleParaglide);
