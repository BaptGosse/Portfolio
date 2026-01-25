import { db } from '$lib/server/db';
import {
	POR_PASSIONS,
	POR_PASSIONS_SOFT_SKILLS,
	POR_SOFT_SKILLS
} from '$lib/server/db/schema';
import { redirect, fail, error } from '@sveltejs/kit';
import { validateSession } from '$lib/server/auth';
import { eq, asc } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	// Load passion
	const [passion] = await db
		.select()
		.from(POR_PASSIONS)
		.where(eq(POR_PASSIONS.PAS_ID, params.id))
		.limit(1);

	if (!passion) {
		throw error(404, 'Passion not found');
	}

	// Load all soft skills
	const allSoftSkills = await db
		.select()
		.from(POR_SOFT_SKILLS)
		.orderBy(asc(POR_SOFT_SKILLS.SSK_ORDER));

	// Load linked soft skills
	const linkedSoftSkills = await db
		.select({
			id: POR_SOFT_SKILLS.SSK_ID
		})
		.from(POR_PASSIONS_SOFT_SKILLS)
		.innerJoin(
			POR_SOFT_SKILLS,
			eq(POR_PASSIONS_SOFT_SKILLS.SSK_ID, POR_SOFT_SKILLS.SSK_ID)
		)
		.where(eq(POR_PASSIONS_SOFT_SKILLS.PAS_ID, params.id));

	return {
		passion,
		allSoftSkills,
		linkedSoftSkillIds: linkedSoftSkills.map((s) => s.id)
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
			// Update passion
			await db
				.update(POR_PASSIONS)
				.set({
					PAS_TITLE: { fr: titleFr, en: titleEn },
					PAS_DESCRIPTION: { fr: descriptionFr, en: descriptionEn },
					PAS_ICON: icon,
					PAS_ORDER: order || '0',
					PAS_UPDATED_AT: new Date()
				})
				.where(eq(POR_PASSIONS.PAS_ID, params.id));

			// Delete existing links
			await db
				.delete(POR_PASSIONS_SOFT_SKILLS)
				.where(eq(POR_PASSIONS_SOFT_SKILLS.PAS_ID, params.id));

			// Create new links
			if (softSkillIds.length > 0) {
				await db.insert(POR_PASSIONS_SOFT_SKILLS).values(
					softSkillIds.map((skillId) => ({
						PAS_ID: params.id,
						SSK_ID: skillId
					}))
				);
			}

			throw redirect(303, '/admin/passions');
		} catch (error) {
			console.error('Error updating passion:', error);
			return fail(500, {
				error: 'Erreur lors de la mise à jour de la passion'
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
			await db.delete(POR_PASSIONS).where(eq(POR_PASSIONS.PAS_ID, params.id));
			throw redirect(303, '/admin/passions');
		} catch (error) {
			console.error('Error deleting passion:', error);
			return fail(500, {
				error: 'Erreur lors de la suppression de la passion'
			});
		}
	}
};
