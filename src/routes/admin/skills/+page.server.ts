import { db } from '$lib/server/db';
import { POR_SKILL_CATEGORIES, POR_SKILLS } from '$lib/server/db/schema';
import { asc, eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const categories = await db
		.select()
		.from(POR_SKILL_CATEGORIES)
		.orderBy(asc(POR_SKILL_CATEGORIES.CAT_ORDER));

	// Pour chaque catégorie, récupérer ses compétences
	const categoriesWithSkills = await Promise.all(
		categories.map(async (category) => {
			const skills = await db
				.select()
				.from(POR_SKILLS)
				.where(eq(POR_SKILLS.CAT_ID, category.CAT_ID))
				.orderBy(asc(POR_SKILLS.SKI_ORDER));

			return {
				...category,
				skills
			};
		})
	);

	return {
		categories: categoriesWithSkills
	};
};
