import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { POR_SKILLS, POR_SKILL_CATEGORIES } from '$lib/server/db/schema';
import { validateSession } from '$lib/server/auth';
import { asc } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const categories = await db
		.select()
		.from(POR_SKILL_CATEGORIES)
		.orderBy(asc(POR_SKILL_CATEGORIES.CAT_ORDER));

	return { categories };
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
		const context_fr = data.get('context_fr')?.toString();
		const context_en = data.get('context_en')?.toString();
		const category_id = data.get('category_id')?.toString();
		const order = data.get('order')?.toString() || '0';

		if (!name_fr || !name_en || !context_fr || !context_en || !category_id) {
			return fail(400, {
				error: 'Tous les champs sont requis'
			});
		}

		try {
			await db.insert(POR_SKILLS).values({
				SKI_NAME: { fr: name_fr, en: name_en },
				SKI_CONTEXT: { fr: context_fr, en: context_en },
				CAT_ID: category_id,
				SKI_ORDER: order,
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
