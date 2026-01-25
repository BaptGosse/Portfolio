import { error, fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { POR_SKILLS, POR_SKILL_CATEGORIES } from '$lib/server/db/schema';
import { validateSession } from '$lib/server/auth';
import { eq, asc } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const [skill] = await db
		.select()
		.from(POR_SKILLS)
		.where(eq(POR_SKILLS.SKI_ID, params.id))
		.limit(1);

	if (!skill) {
		throw error(404, 'Compétence non trouvée');
	}

	const categories = await db
		.select()
		.from(POR_SKILL_CATEGORIES)
		.orderBy(asc(POR_SKILL_CATEGORIES.CAT_ORDER));

	return { skill, categories };
};

export const actions: Actions = {
	update: async ({ request, params, cookies }) => {
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
			await db
				.update(POR_SKILLS)
				.set({
					SKI_NAME: { fr: name_fr, en: name_en },
					SKI_CONTEXT: { fr: context_fr, en: context_en },
					CAT_ID: category_id,
					SKI_ORDER: order,
					SKI_UPDATED_AT: new Date()
				})
				.where(eq(POR_SKILLS.SKI_ID, params.id));
		} catch (err) {
			console.error('Erreur:', err);
			return fail(500, {
				error: `Erreur: ${err instanceof Error ? err.message : 'Erreur inconnue'}`
			});
		}

		throw redirect(302, '/admin/skills');
	},

	delete: async ({ params, cookies }) => {
		const sessionToken = cookies.get('session');
		if (!sessionToken) {
			return fail(401, { error: 'Non autorisé' });
		}

		const user = await validateSession(sessionToken);
		if (!user) {
			return fail(401, { error: 'Non autorisé' });
		}

		try {
			await db.delete(POR_SKILLS).where(eq(POR_SKILLS.SKI_ID, params.id));
		} catch (err) {
			console.error('Erreur:', err);
			return fail(500, {
				error: `Erreur: ${err instanceof Error ? err.message : 'Erreur inconnue'}`
			});
		}

		throw redirect(302, '/admin/skills');
	}
};
