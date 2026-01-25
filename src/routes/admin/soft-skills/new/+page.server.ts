import { db } from '$lib/server/db';
import { POR_SOFT_SKILLS } from '$lib/server/db/schema';
import { redirect, fail } from '@sveltejs/kit';
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
			await db.insert(POR_SOFT_SKILLS).values({
				SSK_NAME: { fr: nameFr, en: nameEn },
				SSK_DESCRIPTION: { fr: descriptionFr, en: descriptionEn },
				SSK_ICON: icon,
				SSK_ORDER: order || '0',
				USR_ID: user.USR_ID
			});

			throw redirect(303, '/admin/soft-skills');
		} catch (error) {
			console.error('Error creating soft skill:', error);
			return fail(500, {
				error: 'Erreur lors de la création de la soft skill'
			});
		}
	}
};
