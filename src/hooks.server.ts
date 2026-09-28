import type { Handle } from '@sveltejs/kit';
import { getLocale, type Locale } from '$lib/utils/locale';
import { validateSession } from '$lib/server/auth';

export const handle: Handle = async ({ event, resolve }) => {
	// Get locale from cookie
	const cookieLocale = event.cookies.get('locale');

	let locale: Locale;

	if (cookieLocale) {
		// Cookie exists, use it
		locale = getLocale(cookieLocale);
	} else {
		// No cookie, detect from Accept-Language header and create cookie
		const headerLocale = event.request.headers
			.get('accept-language')
			?.split(',')[0]
			?.split('-')[0];

		locale = getLocale(headerLocale);

		// Set cookie based on system language (1 year expiry)
		event.cookies.set('locale', locale, {
			path: '/',
			maxAge: 60 * 60 * 24 * 365,
			sameSite: 'lax',
			httpOnly: false
		});
	}

	event.locals.locale = locale;

	// User session validation
	const sessionToken = event.cookies.get('session');
	if (sessionToken) {
		const user = await validateSession(sessionToken);
		if (user) {
			event.locals.user = {
				id: user.USR_ID,
				email: user.USR_EMAIL,
				name: user.USR_NAME
			};
		}
	}

	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', locale)
	});
};
