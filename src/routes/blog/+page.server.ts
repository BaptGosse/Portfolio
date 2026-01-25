import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { POR_POSTS, POR_POSTS_TAGS, POR_TAGS } from '$lib/server/db/schema';
import { eq, desc } from 'drizzle-orm';
import { getLocale } from '$lib/utils/locale';

export const load: PageServerLoad = async ({ locals }) => {
	const locale = getLocale(locals.locale);

	// Récupérer les posts publiés depuis la base de données
	const dbPosts = await db
		.select()
		.from(POR_POSTS)
		.where(eq(POR_POSTS.POS_PUBLISHED, true))
		.orderBy(desc(POR_POSTS.POS_PUBLISHED_AT));

	// Récupérer les tags pour chaque post
	const posts = await Promise.all(
		dbPosts.map(async (post) => {
			const postTags = await db
				.select({
					name: POR_TAGS.TAG_NAME,
					slug: POR_TAGS.TAG_SLUG
				})
				.from(POR_POSTS_TAGS)
				.innerJoin(POR_TAGS, eq(POR_POSTS_TAGS.TAG_ID, POR_TAGS.TAG_ID))
				.where(eq(POR_POSTS_TAGS.POS_ID, post.POS_ID));

			return {
				slug: post.POS_SLUG,
				title: post.POS_TITLE[locale] || post.POS_TITLE.fr,
				description: post.POS_DESCRIPTION[locale] || post.POS_DESCRIPTION.fr,
				date: post.POS_PUBLISHED_AT?.toISOString() || post.POS_CREATED_AT.toISOString(),
				tags: postTags.map((t) => t.name),
				published: post.POS_PUBLISHED
			};
		})
	);

	return {
		posts
	};
};
