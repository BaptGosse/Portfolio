import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { POR_POSTS, POR_POSTS_TAGS, POR_TAGS } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { marked } from 'marked';

export const load: PageServerLoad = async ({ params }) => {
	// Récupérer l'article depuis la base de données
	const [post] = await db
		.select()
		.from(POR_POSTS)
		.where(eq(POR_POSTS.POS_SLUG, params.slug))
		.limit(1);

	if (!post || !post.POS_PUBLISHED) {
		throw error(404, 'Article non trouvé');
	}

	// Récupérer les tags de l'article
	const postTags = await db
		.select({
			name: POR_TAGS.TAG_NAME,
			slug: POR_TAGS.TAG_SLUG
		})
		.from(POR_POSTS_TAGS)
		.innerJoin(POR_TAGS, eq(POR_POSTS_TAGS.TAG_ID, POR_TAGS.TAG_ID))
		.where(eq(POR_POSTS_TAGS.POS_ID, post.POS_ID));

	// Convertir le Markdown en HTML
	const htmlContent = await marked(post.POS_CONTENT);

	return {
		post: {
			title: post.POS_TITLE,
			description: post.POS_DESCRIPTION,
			content: htmlContent,
			date: post.POS_PUBLISHED_AT?.toISOString() || post.POS_CREATED_AT.toISOString(),
			tags: postTags.map(t => t.name)
		}
	};
};
