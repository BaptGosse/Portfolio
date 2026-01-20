import { db } from '$lib/server/db';
import { POR_POSTS, POR_TAGS } from '$lib/server/db/schema';
import { eq, desc, count } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	// Compter les articles publiés
	const [publishedResult] = await db
		.select({ count: count() })
		.from(POR_POSTS)
		.where(eq(POR_POSTS.POS_PUBLISHED, true));

	// Compter les brouillons
	const [draftResult] = await db
		.select({ count: count() })
		.from(POR_POSTS)
		.where(eq(POR_POSTS.POS_PUBLISHED, false));

	// Compter les tags
	const [tagsResult] = await db
		.select({ count: count() })
		.from(POR_TAGS);

	// Récupérer les 5 derniers articles
	const recentPosts = await db
		.select()
		.from(POR_POSTS)
		.orderBy(desc(POR_POSTS.POS_CREATED_AT))
		.limit(5);

	return {
		publishedCount: publishedResult?.count ?? 0,
		draftCount: draftResult?.count ?? 0,
		tagsCount: tagsResult?.count ?? 0,
		recentPosts
	};
};
