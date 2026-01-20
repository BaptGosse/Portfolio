import { redirect } from '@sveltejs/kit';
import { deleteSession } from '$lib/server/auth';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ cookies }) => {
		const sessionToken = cookies.get('session');
		if (sessionToken) {
			await deleteSession(sessionToken);
		}
		cookies.delete('session', { path: '/' });
		throw redirect(302, '/admin/login');
	}
};
