import type { Handle } from '@sveltejs/kit';
import { validateSession } from '$lib/server/auth';

export const handle: Handle = async ({ event, resolve }) => {
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

	return resolve(event);
};
