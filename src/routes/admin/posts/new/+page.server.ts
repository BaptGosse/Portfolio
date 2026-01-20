import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { POR_POSTS, POR_TAGS, POR_POSTS_TAGS } from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';

function slugify(text: string): string {
	return text
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)+/g, '');
}

export const load: PageServerLoad = async () => {
	const tags = await db.select().from(POR_TAGS);
	return { tags };
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const data = await request.formData();
		const title = data.get('title')?.toString();
		const description = data.get('description')?.toString();
		const content = data.get('content')?.toString();
		const published = data.get('published') === 'on';
		const tagIds = data.getAll('tags').map(t => t.toString());

		if (!title || !description || !content) {
			return fail(400, {
				error: 'Titre, description et contenu requis',
				title,
				description,
				content
			});
		}

		const slug = slugify(title);

		try {
			// @ts-ignore

            const [newPost] = await db.insert(POR_POSTS).values({
				POS_SLUG: slug,
				POS_TITLE: title,
				POS_DESCRIPTION: description,
				POS_CONTENT: content,
				POS_PUBLISHED: published,
				USR_ID: locals.user.id,
				POS_PUBLISHED_AT: published ? new Date() : null
			}).returning();

			// Ajouter les tags
			if (tagIds.length > 0 && newPost) {
				await db.insert(POR_POSTS_TAGS).values(
					tagIds.map(tagId => ({
						POS_ID: newPost.POS_ID,
						TAG_ID: tagId as string
					}))
				);
			}

		} catch (err) {
			console.error('Erreur lors de la création:', err);
			return fail(500, {
				error: `Erreur lors de la création de l'article: ${err instanceof Error ? err.message : 'Erreur inconnue'}`,
				title,
				description,
				content
			});
		}

		throw redirect(302, '/admin/posts');
	}
};
