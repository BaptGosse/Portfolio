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
		const titleFr = data.get('title_fr')?.toString();
		const titleEn = data.get('title_en')?.toString();
		const descFr = data.get('description_fr')?.toString();
		const descEn = data.get('description_en')?.toString();
		const contentFr = data.get('content_fr')?.toString();
		const contentEn = data.get('content_en')?.toString();
		const published = data.get('published') === 'on';
		const tagIds = data.getAll('tags').map((t) => t.toString());

		if (!titleFr || !titleEn || !descFr || !descEn || !contentFr || !contentEn) {
			return fail(400, {
				error: 'Titre, description et contenu requis en FR et EN'
			});
		}

		const slug = slugify(titleFr);

		try {
			const [newPost] = await db
				.insert(POR_POSTS)
				.values({
					POS_SLUG: slug,
					POS_TITLE: { fr: titleFr, en: titleEn },
					POS_DESCRIPTION: { fr: descFr, en: descEn },
					POS_CONTENT: { fr: contentFr, en: contentEn },
					POS_PUBLISHED: published,
					USR_ID: locals.user.id,
					POS_PUBLISHED_AT: published ? new Date() : null
				})
				.returning();

			// Add tags
			if (tagIds.length > 0 && newPost) {
				await db.insert(POR_POSTS_TAGS).values(
					tagIds.map((tagId) => ({
						POS_ID: newPost.POS_ID,
						TAG_ID: tagId as string
					}))
				);
			}
		} catch (err) {
			console.error('Erreur lors de la création:', err);
			return fail(500, {
				error: `Erreur: ${err instanceof Error ? err.message : 'Erreur inconnue'}`
			});
		}

		throw redirect(302, '/admin/posts');
	}
};
