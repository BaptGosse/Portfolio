import { fail, redirect } from '@sveltejs/kit';
import { getUserByEmail, verifyPassword, createSession } from '$lib/server/auth';
import type { Actions } from './$types';
import {env} from "$env/dynamic/public";

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const email = data.get('email')?.toString();
		const password = data.get('password')?.toString();

		if (!email || !password) {
			return fail(400, {
				error: 'Email et mot de passe requis',
				email
			});
		}

		const user = await getUserByEmail(email);
		if (!user) {
			return fail(401, {
				error: 'Identifiants incorrects',
				email
			});
		}

		const validPassword = await verifyPassword(password, user.USR_PASSWORD_HASH);
		if (!validPassword) {
			return fail(401, {
				error: 'Identifiants incorrects',
				email
			});
		}

		const token = await createSession(user.USR_ID);
		cookies.set('session', token, {
			path: '/',
			httpOnly: true,
			secure: env.NODE_ENV === 'production',
			sameSite: 'lax',
			maxAge: 60 * 60 * 24 * 7 // 7 jours
		});

		throw redirect(302, '/admin');
	}
};
