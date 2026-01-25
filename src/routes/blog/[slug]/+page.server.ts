import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { POR_POSTS, POR_POSTS_TAGS, POR_TAGS } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { marked } from 'marked';
import { getLocale } from '$lib/utils/locale';

export const load: PageServerLoad = async ({ params, locals }) => {
	const locale = getLocale(locals.locale);

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

	// Convertir le Markdown en HTML avec la bonne locale
	const markdownContent = post.POS_CONTENT[locale] || post.POS_CONTENT.fr;
	const htmlContent = await marked(markdownContent);

	return {
		post: {
			title: post.POS_TITLE[locale] || post.POS_TITLE.fr,
			description: post.POS_DESCRIPTION[locale] || post.POS_DESCRIPTION.fr,
			content: htmlContent,
			date: post.POS_PUBLISHED_AT?.toISOString() || post.POS_CREATED_AT.toISOString(),
			tags: postTags.map((t) => t.name)
		}
	};
};
