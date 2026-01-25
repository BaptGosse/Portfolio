import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { POR_PROJECTS, POR_TECHNOLOGIES, POR_PROJECTS_TECHNOLOGIES } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { getLocale } from '$lib/utils/locale';

export const load: PageServerLoad = async ({ locals }) => {
	const locale = getLocale(locals.locale);

	// Récupérer tous les projets depuis la base de données
	const dbProjects = await db.select().from(POR_PROJECTS);

	// Récupérer les technologies pour chaque projet
	const projects = await Promise.all(
		dbProjects.map(async (project) => {
			const techs = await db
				.select({
					name: POR_TECHNOLOGIES.TEC_NAME
				})
				.from(POR_PROJECTS_TECHNOLOGIES)
				.innerJoin(POR_TECHNOLOGIES, eq(POR_PROJECTS_TECHNOLOGIES.TEC_ID, POR_TECHNOLOGIES.TEC_ID))
				.where(eq(POR_PROJECTS_TECHNOLOGIES.PRJ_ID, project.PRJ_ID));

			return {
				id: project.PRJ_SLUG,
				title: project.PRJ_TITLE[locale] || project.PRJ_TITLE.fr,
				description: project.PRJ_DESCRIPTION[locale] || project.PRJ_DESCRIPTION.fr,
				technologies: techs.map((t) => t.name[locale] || t.name.fr),
				github: project.PRJ_GITHUB,
				demo: project.PRJ_LINK,
				featured: project.PRJ_FEATURED
			};
		})
	);

	return {
		projects
	};
};
