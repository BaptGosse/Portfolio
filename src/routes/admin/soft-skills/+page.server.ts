import { db } from '$lib/server/db';
import { POR_SOFT_SKILLS } from '$lib/server/db/schema';
import { redirect } from '@sveltejs/kit';
import { asc } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const softSkills = await db
		.select()
		.from(POR_SOFT_SKILLS)
		.orderBy(asc(POR_SOFT_SKILLS.SSK_ORDER));

	return {
		softSkills
	};
};
