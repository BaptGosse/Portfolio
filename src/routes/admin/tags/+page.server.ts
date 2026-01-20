import { fail } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { POR_TAGS, POR_POSTS_TAGS } from '$lib/server/db/schema';
import { eq, count } from 'drizzle-orm';
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
	const tags = await db
		.select({
			id: POR_TAGS.TAG_ID,
			name: POR_TAGS.TAG_NAME,
			slug: POR_TAGS.TAG_SLUG,
			createdAt: POR_TAGS.TAG_CREATED_AT
		})
		.from(POR_TAGS);

	// Compter le nombre de posts par tag
	const tagsWithCount = await Promise.all(
		tags.map(async (tag) => {
			const [result] = await db
				.select({ count: count() })
				.from(POR_POSTS_TAGS)
				.where(eq(POR_POSTS_TAGS.TAG_ID, tag.id));
			return {
				...tag,
				postsCount: result?.count ?? 0
			};
		})
	);

	return { tags: tagsWithCount };
};

export const actions: Actions = {
	create: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('name')?.toString();

		if (!name) {
			return fail(400, { error: 'Le nom du tag est requis' });
		}

		const slug = slugify(name);

		try {
			await db.insert(POR_TAGS).values({
				TAG_NAME: name,
				TAG_SLUG: slug
			});
			return { success: true };
		} catch {
			return fail(500, { error: 'Erreur lors de la création du tag' });
		}
	},

	delete: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id')?.toString();

		if (!id) {
			return fail(400, { error: 'ID du tag requis' });
		}

		try {
			await db.delete(POR_TAGS).where(eq(POR_TAGS.TAG_ID, id));
			return { success: true };
		} catch {
			return fail(500, { error: 'Erreur lors de la suppression du tag' });
		}
	}
};
