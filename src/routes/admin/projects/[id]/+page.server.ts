import { error, fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import {
	POR_PROJECTS,
	POR_TECHNOLOGIES,
	POR_PROJECTS_TECHNOLOGIES
} from '$lib/server/db/schema';
import { validateSession } from '$lib/server/auth';
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
	const [project] = await db
		.select()
		.from(POR_PROJECTS)
		.where(eq(POR_PROJECTS.PRJ_ID, params.id))
		.limit(1);

	if (!project) {
		throw error(404, 'Projet non trouvé');
	}

	const technologies = await db.select().from(POR_TECHNOLOGIES);

	const projectTechs = await db
		.select({ techId: POR_PROJECTS_TECHNOLOGIES.TEC_ID })
		.from(POR_PROJECTS_TECHNOLOGIES)
		.where(eq(POR_PROJECTS_TECHNOLOGIES.PRJ_ID, params.id));

	return {
		project,
		technologies,
		selectedTechs: projectTechs.map((t) => t.techId)
	};
};

export const actions: Actions = {
	update: async ({ request, params, cookies }) => {
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
		const techIds = data.getAll('technologies').map((t) => t.toString());

		if (!titleFr || !titleEn || !descFr || !descEn) {
			return fail(400, {
				error: 'Titre et description requis en FR et EN'
			});
		}

		const slug = slugify(titleFr);

		try {
			await db
				.update(POR_PROJECTS)
				.set({
					PRJ_SLUG: slug,
					PRJ_TITLE: { fr: titleFr, en: titleEn },
					PRJ_DESCRIPTION: { fr: descFr, en: descEn },
					PRJ_GITHUB: github || null,
					PRJ_LINK: link || null,
					PRJ_IMAGE: image || null,
					PRJ_FEATURED: featured,
					PRJ_UPDATED_AT: new Date()
				})
				.where(eq(POR_PROJECTS.PRJ_ID, params.id));

			// Update technologies
			await db.delete(POR_PROJECTS_TECHNOLOGIES).where(eq(POR_PROJECTS_TECHNOLOGIES.PRJ_ID, params.id));

			if (techIds.length > 0) {
				await db.insert(POR_PROJECTS_TECHNOLOGIES).values(
					techIds.map((techId) => ({
						PRJ_ID: params.id,
						TEC_ID: techId
					}))
				);
			}
		} catch (err) {
			console.error('Erreur lors de la mise à jour:', err);
			return fail(500, {
				error: `Erreur lors de la mise à jour: ${err instanceof Error ? err.message : 'Erreur inconnue'}`
			});
		}

		throw redirect(302, '/admin/projects');
	},

	delete: async ({ params, cookies }) => {
		const sessionToken = cookies.get('session');
		if (!sessionToken) {
			return fail(401, { error: 'Non autorisé' });
		}

		const user = await validateSession(sessionToken);
		if (!user) {
			return fail(401, { error: 'Non autorisé' });
		}

		try {
			await db.delete(POR_PROJECTS).where(eq(POR_PROJECTS.PRJ_ID, params.id));
		} catch (err) {
			console.error('Erreur lors de la suppression:', err);
			return fail(500, {
				error: `Erreur lors de la suppression: ${err instanceof Error ? err.message : 'Erreur inconnue'}`
			});
		}

		throw redirect(302, '/admin/projects');
	},

	toggleFeatured: async ({ params, cookies }) => {
		const sessionToken = cookies.get('session');
		if (!sessionToken) {
			return fail(401, { error: 'Non autorisé' });
		}

		const user = await validateSession(sessionToken);
		if (!user) {
			return fail(401, { error: 'Non autorisé' });
		}

		try {
			const [project] = await db
				.select()
				.from(POR_PROJECTS)
				.where(eq(POR_PROJECTS.PRJ_ID, params.id))
				.limit(1);

			if (!project) {
				return fail(404, { error: 'Projet non trouvé' });
			}

			await db
				.update(POR_PROJECTS)
				.set({
					PRJ_FEATURED: !project.PRJ_FEATURED,
					PRJ_UPDATED_AT: new Date()
				})
				.where(eq(POR_PROJECTS.PRJ_ID, params.id));

			return { success: true };
		} catch (err) {
			console.error('Erreur:', err);
			return fail(500, {
				error: `Erreur: ${err instanceof Error ? err.message : 'Erreur inconnue'}`
			});
		}
	}
};
