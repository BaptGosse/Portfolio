import { db } from '$lib/server/db';
import { POR_EXPERIENCES } from '$lib/server/db/schema';
import { asc, desc } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const experiences = await db
		.select()
		.from(POR_EXPERIENCES)
		.orderBy(asc(POR_EXPERIENCES.EXP_ORDER), desc(POR_EXPERIENCES.EXP_START_DATE));

	return {
		experiences
	};
};
