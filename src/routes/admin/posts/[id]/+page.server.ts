import { error, fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { POR_POSTS, POR_TAGS, POR_POSTS_TAGS } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

function slugify(text: string): string {
	return text
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)+/g, '');
}

export const load: PageServerLoad = async ({ params }) => {
	const [post] = await db
		.select()
		.from(POR_POSTS)
		.where(eq(POR_POSTS.POS_ID, params.id))
		.limit(1);

	if (!post) {
		throw error(404, 'Article non trouvé');
	}

	const tags = await db.select().from(POR_TAGS);

	const postTags = await db
		.select({ tagId: POR_POSTS_TAGS.TAG_ID })
		.from(POR_POSTS_TAGS)
		.where(eq(POR_POSTS_TAGS.POS_ID, params.id));

	return {
		post,
		tags,
		selectedTags: postTags.map(t => t.tagId)
	};
};

export const actions: Actions = {
	update: async ({ request, params, locals }) => {
		if (!locals.user) {
			return fail(401, { error: 'Non autorisé' });
		}

		const data = await request.formData();
		const title_fr = data.get('title_fr')?.toString();
		const title_en = data.get('title_en')?.toString();
		const description_fr = data.get('description_fr')?.toString();
		const description_en = data.get('description_en')?.toString();
		const content_fr = data.get('content_fr')?.toString();
		const content_en = data.get('content_en')?.toString();
		const published = data.get('published') === 'on';
		const tagIds = data.getAll('tags').map(t => t.toString());

		if (!title_fr || !title_en || !description_fr || !description_en || !content_fr || !content_en) {
			return fail(400, {
				error: 'Tous les champs FR et EN sont requis'
			});
		}

		const slug = slugify(title_fr);

		try {
			// Récupérer l'état actuel de l'article
			const [currentPost] = await db
				.select()
				.from(POR_POSTS)
				.where(eq(POR_POSTS.POS_ID, params.id))
				.limit(1);

			await db.update(POR_POSTS)
				.set({
					POS_SLUG: slug,
					POS_TITLE: { fr: title_fr, en: title_en },
					POS_DESCRIPTION: { fr: description_fr, en: description_en },
					POS_CONTENT: { fr: content_fr, en: content_en },
					POS_PUBLISHED: published,
					POS_UPDATED_AT: new Date(),
					POS_PUBLISHED_AT: published && !currentPost?.POS_PUBLISHED ? new Date() : currentPost?.POS_PUBLISHED_AT
				})
				.where(eq(POR_POSTS.POS_ID, params.id));

			// Mettre à jour les tags
			await db.delete(POR_POSTS_TAGS).where(eq(POR_POSTS_TAGS.POS_ID, params.id));
			if (tagIds.length > 0) {
				await db.insert(POR_POSTS_TAGS).values(
					tagIds.map(tagId => ({
						POS_ID: params.id,
						TAG_ID: tagId as string
					}))
				);
			}
		} catch (err) {
			console.error('Erreur lors de la mise à jour:', err);
			return fail(500, {
				error: `Erreur lors de la mise à jour de l'article: ${err instanceof Error ? err.message : 'Erreur inconnue'}`
			});
		}

		throw redirect(302, '/admin/posts');
	},

	delete: async ({ params, locals }) => {
		if (!locals.user) {
			return fail(401, { error: 'Non autorisé' });
		}

		try {
			await db.delete(POR_POSTS).where(eq(POR_POSTS.POS_ID, params.id));
		} catch (err) {
			console.error('Erreur lors de la suppression:', err);
			return fail(500, {
				error: `Erreur lors de la suppression de l'article: ${err instanceof Error ? err.message : 'Erreur inconnue'}`
			});
		}

		throw redirect(302, '/admin/posts');
	}
};
