import { db } from '$lib/server/db';
import {
	POR_PASSIONS,
	POR_SOFT_SKILLS,
	POR_PASSIONS_SOFT_SKILLS
} from '$lib/server/db/schema';
import { redirect } from '@sveltejs/kit';
import { eq, asc } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	// Load all passions
	const passions = await db
		.select()
		.from(POR_PASSIONS)
		.orderBy(asc(POR_PASSIONS.PAS_ORDER));

	// Load soft skills for each passion
	const passionsWithSkills = await Promise.all(
		passions.map(async (passion) => {
			const softSkills = await db
				.select({
					id: POR_SOFT_SKILLS.SSK_ID,
					name: POR_SOFT_SKILLS.SSK_NAME
				})
				.from(POR_PASSIONS_SOFT_SKILLS)
				.innerJoin(
					POR_SOFT_SKILLS,
					eq(POR_PASSIONS_SOFT_SKILLS.SSK_ID, POR_SOFT_SKILLS.SSK_ID)
				)
				.where(eq(POR_PASSIONS_SOFT_SKILLS.PAS_ID, passion.PAS_ID));

			return {
				...passion,
				softSkills
			};
		})
	);

	return {
		passions: passionsWithSkills
	};
};
