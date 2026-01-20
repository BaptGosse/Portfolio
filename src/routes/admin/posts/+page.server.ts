import { db } from '$lib/server/db';
import { POR_POSTS, POR_USERS } from '$lib/server/db/schema';
import { desc, eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const posts = await db
		.select({
			id: POR_POSTS.POS_ID,
			slug: POR_POSTS.POS_SLUG,
			title: POR_POSTS.POS_TITLE,
			description: POR_POSTS.POS_DESCRIPTION,
			published: POR_POSTS.POS_PUBLISHED,
			createdAt: POR_POSTS.POS_CREATED_AT,
			publishedAt: POR_POSTS.POS_PUBLISHED_AT,
			authorName: POR_USERS.USR_NAME
		})
		.from(POR_POSTS)
		.leftJoin(POR_USERS, eq(POR_POSTS.USR_ID, POR_USERS.USR_ID))
		.orderBy(desc(POR_POSTS.POS_CREATED_AT));

	return { posts };
};
