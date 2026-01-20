import { redirect } from '@sveltejs/kit';
import { validateSession } from '$lib/server/auth';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies, url }) => {
	const sessionToken = cookies.get('session');

	// Permettre l'accès à la page de login sans authentification
	if (url.pathname === '/admin/login') {
		if (sessionToken) {
			const user = await validateSession(sessionToken);
			if (user) {
				throw redirect(302, '/admin');
			}
		}
		return { user: null };
	}

	// Pour toutes les autres pages admin, vérifier l'authentification
	if (!sessionToken) {
		throw redirect(302, '/admin/login');
	}

	const user = await validateSession(sessionToken);
	if (!user) {
		cookies.delete('session', { path: '/' });
		throw redirect(302, '/admin/login');
	}

	return {
		user: {
			id: user.USR_ID,
			email: user.USR_EMAIL,
			name: user.USR_NAME
		}
	};
};
