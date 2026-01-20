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
		const title = data.get('title')?.toString();
		const description = data.get('description')?.toString();
		const content = data.get('content')?.toString();
		const published = data.get('published') === 'on';
		const tagIds = data.getAll('tags').map(t => t.toString());

		if (!title || !description || !content) {
			return fail(400, {
				error: 'Titre, description et contenu requis'
			});
		}

		const slug = slugify(title);

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
					POS_TITLE: title,
					POS_DESCRIPTION: description,
					POS_CONTENT: content,
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
