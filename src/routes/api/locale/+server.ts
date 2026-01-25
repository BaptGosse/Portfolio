import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const { locale } = await request.json();

	if (!['fr', 'en'].includes(locale)) {
		return json({ error: 'Invalid locale' }, { status: 400 });
	}

	// Set cookie with 1 year expiry
	cookies.set('locale', locale, {
		path: '/',
		maxAge: 60 * 60 * 24 * 365,
		sameSite: 'lax',
		httpOnly: false
	});

	return json({ success: true, locale });
};
