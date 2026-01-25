import { db } from '$lib/server/db';
import { POR_PASSIONS, POR_PASSIONS_SOFT_SKILLS, POR_SOFT_SKILLS } from '$lib/server/db/schema';
import { redirect, fail } from '@sveltejs/kit';
import { validateSession } from '$lib/server/auth';
import { asc } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	// Load all soft skills for the checkboxes
	const softSkills = await db
		.select()
		.from(POR_SOFT_SKILLS)
		.orderBy(asc(POR_SOFT_SKILLS.SSK_ORDER));

	return {
		softSkills
	};
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
		const titleFr = formData.get('title_fr') as string;
		const titleEn = formData.get('title_en') as string;
		const descriptionFr = formData.get('description_fr') as string;
		const descriptionEn = formData.get('description_en') as string;
		const icon = formData.get('icon') as string;
		const order = formData.get('order') as string;
		const softSkillIds = formData.getAll('soft_skills') as string[];

		// Validation
		if (!titleFr || !titleEn || !descriptionFr || !descriptionEn || !icon) {
			return fail(400, {
				error: 'Tous les champs obligatoires doivent être remplis'
			});
		}

		try {
			// Create passion
			const [newPassion] = await db
				.insert(POR_PASSIONS)
				.values({
					PAS_TITLE: { fr: titleFr, en: titleEn },
					PAS_DESCRIPTION: { fr: descriptionFr, en: descriptionEn },
					PAS_ICON: icon,
					PAS_ORDER: order || '0',
					USR_ID: user.USR_ID
				})
				.returning();

			// Link soft skills
			if (softSkillIds.length > 0) {
				await db.insert(POR_PASSIONS_SOFT_SKILLS).values(
					softSkillIds.map((skillId) => ({
						PAS_ID: newPassion.PAS_ID,
						SSK_ID: skillId
					}))
				);
			}

			throw redirect(303, '/admin/passions');
		} catch (error) {
			console.error('Error creating passion:', error);
			return fail(500, {
				error: 'Erreur lors de la création de la passion'
			});
		}
	}
};
