import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { POR_SKILL_CATEGORIES } from '$lib/server/db/schema';
import { validateSession } from '$lib/server/auth';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {};
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const sessionToken = cookies.get('session');
		if (!sessionToken) {
			return fail(401, { error: 'Non autorisé' });
		}

		const user = await validateSession(sessionToken);
		if (!user) {
			return fail(401, { error: 'Non autorisé' });
		}

		const data = await request.formData();
		const name_fr = data.get('name_fr')?.toString();
		const name_en = data.get('name_en')?.toString();
		const order = data.get('order')?.toString() || '0';

		if (!name_fr || !name_en) {
			return fail(400, {
				error: 'Nom en FR et EN requis'
			});
		}

		try {
			await db.insert(POR_SKILL_CATEGORIES).values({
				CAT_NAME: { fr: name_fr, en: name_en },
				CAT_ORDER: order,
				USR_ID: user.USR_ID
			});
		} catch (err) {
			console.error('Erreur:', err);
			return fail(500, {
				error: `Erreur: ${err instanceof Error ? err.message : 'Erreur inconnue'}`
			});
		}

		throw redirect(302, '/admin/skills');
	}
};
