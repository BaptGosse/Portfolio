import { error, fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { POR_SKILL_CATEGORIES, POR_SKILLS } from '$lib/server/db/schema';
import { validateSession } from '$lib/server/auth';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const [category] = await db
		.select()
		.from(POR_SKILL_CATEGORIES)
		.where(eq(POR_SKILL_CATEGORIES.CAT_ID, params.id))
		.limit(1);

	if (!category) {
		throw error(404, 'Catégorie non trouvée');
	}

	return { category };
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
		const order = data.get('order')?.toString() || '0';

		if (!name_fr || !name_en) {
			return fail(400, {
				error: 'Nom en FR et EN requis'
			});
		}

		try {
			await db
				.update(POR_SKILL_CATEGORIES)
				.set({
					CAT_NAME: { fr: name_fr, en: name_en },
					CAT_ORDER: order,
					CAT_UPDATED_AT: new Date()
				})
				.where(eq(POR_SKILL_CATEGORIES.CAT_ID, params.id));
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
			// Check if category has skills
			const skills = await db.select().from(POR_SKILLS).where(eq(POR_SKILLS.CAT_ID, params.id));

			if (skills.length > 0) {
				return fail(400, {
					error: 'Impossible de supprimer une catégorie contenant des compétences'
				});
			}

			await db.delete(POR_SKILL_CATEGORIES).where(eq(POR_SKILL_CATEGORIES.CAT_ID, params.id));
		} catch (err) {
			console.error('Erreur:', err);
			return fail(500, {
				error: `Erreur: ${err instanceof Error ? err.message : 'Erreur inconnue'}`
			});
		}

		throw redirect(302, '/admin/skills');
	}
};
