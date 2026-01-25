import { db } from '$lib/server/db';
import { POR_TECHNOLOGIES } from '$lib/server/db/schema';
import { asc } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const technologies = await db
		.select()
		.from(POR_TECHNOLOGIES)
		.orderBy(asc(POR_TECHNOLOGIES.TEC_NAME));

	return { technologies };
};
