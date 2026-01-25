import { db } from '$lib/server/db';
import { POR_SOFT_SKILLS } from '$lib/server/db/schema';
import { redirect, fail, error } from '@sveltejs/kit';
import { validateSession } from '$lib/server/auth';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const [softSkill] = await db
		.select()
		.from(POR_SOFT_SKILLS)
		.where(eq(POR_SOFT_SKILLS.SSK_ID, params.id))
		.limit(1);

	if (!softSkill) {
		throw error(404, 'Soft skill not found');
	}

	return {
		softSkill
	};
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

		const formData = await request.formData();
		const nameFr = formData.get('name_fr') as string;
		const nameEn = formData.get('name_en') as string;
		const descriptionFr = formData.get('description_fr') as string;
		const descriptionEn = formData.get('description_en') as string;
		const icon = formData.get('icon') as string;
		const order = formData.get('order') as string;

		// Validation
		if (!nameFr || !nameEn || !descriptionFr || !descriptionEn || !icon) {
			return fail(400, {
				error: 'Tous les champs obligatoires doivent être remplis'
			});
		}

		try {
			await db
				.update(POR_SOFT_SKILLS)
				.set({
					SSK_NAME: { fr: nameFr, en: nameEn },
					SSK_DESCRIPTION: { fr: descriptionFr, en: descriptionEn },
					SSK_ICON: icon,
					SSK_ORDER: order || '0',
					SSK_UPDATED_AT: new Date()
				})
				.where(eq(POR_SOFT_SKILLS.SSK_ID, params.id));

			throw redirect(303, '/admin/soft-skills');
		} catch (error) {
			console.error('Error updating soft skill:', error);
			return fail(500, {
				error: 'Erreur lors de la mise à jour de la soft skill'
			});
		}
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
			await db.delete(POR_SOFT_SKILLS).where(eq(POR_SOFT_SKILLS.SSK_ID, params.id));
			throw redirect(303, '/admin/soft-skills');
		} catch (error) {
			console.error('Error deleting soft skill:', error);
			return fail(500, {
				error: 'Erreur lors de la suppression de la soft skill'
			});
		}
	}
};
