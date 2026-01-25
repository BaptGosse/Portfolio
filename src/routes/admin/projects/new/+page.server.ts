import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { POR_PROJECTS, POR_TECHNOLOGIES, POR_PROJECTS_TECHNOLOGIES } from '$lib/server/db/schema';
import { validateSession } from '$lib/server/auth';
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
	const technologies = await db.select().from(POR_TECHNOLOGIES);
	return { technologies };
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const sessionToken = cookies.get('session');
		if (!sessionToken) {
			return fail(401, { error: 'Non autorisé' });
		}

		const user = await validateSession(sessionToken);
		if (!user) {
			return fail(401, { error: 'Non autorisé' });
		}

		const data = await request.formData();
		const titleFr = data.get('title_fr')?.toString();
		const titleEn = data.get('title_en')?.toString();
		const descFr = data.get('description_fr')?.toString();
		const descEn = data.get('description_en')?.toString();
		const github = data.get('github')?.toString();
		const link = data.get('link')?.toString();
		const image = data.get('image')?.toString();
		const featured = data.get('featured') === 'on';
		const techIds = data.getAll('technologies').map(t => t.toString());

		if (!titleFr || !titleEn || !descFr || !descEn) {
			return fail(400, {
				error: 'Titre et description requis en FR et EN',
				titleFr,
				titleEn,
				descFr,
				descEn
			});
		}

		const slug = slugify(titleFr);

		try {
			const [newProject] = await db
				.insert(POR_PROJECTS)
				.values({
					PRJ_SLUG: slug,
					PRJ_TITLE: { fr: titleFr, en: titleEn },
					PRJ_DESCRIPTION: { fr: descFr, en: descEn },
					PRJ_GITHUB: github || null,
					PRJ_LINK: link || null,
					PRJ_IMAGE: image || null,
					PRJ_FEATURED: featured,
					USR_ID: user.USR_ID
				})
				.returning();

			// Link technologies
			if (techIds.length > 0) {
				await db.insert(POR_PROJECTS_TECHNOLOGIES).values(
					techIds.map((techId) => ({
						PRJ_ID: newProject.PRJ_ID,
						TEC_ID: techId
					}))
				);
			}
		} catch (err) {
			console.error('Erreur lors de la création:', err);
			return fail(500, {
				error: `Erreur lors de la création du projet: ${err instanceof Error ? err.message : 'Erreur inconnue'}`
			});
		}

		throw redirect(302, '/admin/projects');
	}
};
