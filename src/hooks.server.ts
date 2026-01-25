import type { Handle } from '@sveltejs/kit';
import { getLocale, type Locale } from '$lib/utils/locale';

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

	return resolve(event);
};
