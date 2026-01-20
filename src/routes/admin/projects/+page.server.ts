import { db } from '$lib/server/db';
import { POR_PROJECTS } from '$lib/server/db/schema';
import { desc } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const projects = await db
		.select()
		.from(POR_PROJECTS)
		.orderBy(desc(POR_PROJECTS.PRJ_CREATED_AT));

	return {
		projects
	};
};
