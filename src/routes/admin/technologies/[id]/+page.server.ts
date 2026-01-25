import { error, fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { POR_TECHNOLOGIES } from '$lib/server/db/schema';
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
	const [technology] = await db
		.select()
		.from(POR_TECHNOLOGIES)
		.where(eq(POR_TECHNOLOGIES.TEC_ID, params.id))
		.limit(1);

	if (!technology) {
		throw error(404, 'Technologie non trouvée');
	}

	return { technology };
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
		const name_fr = data.get('name_fr')?.toString();
		const name_en = data.get('name_en')?.toString();

		if (!name_fr || !name_en) {
			return fail(400, {
				error: 'Nom en FR et EN requis'
			});
		}

		const slug = slugify(name_fr);

		try {
			await db
				.update(POR_TECHNOLOGIES)
				.set({
					TEC_NAME: { fr: name_fr, en: name_en },
					TEC_SLUG: slug
				})
				.where(eq(POR_TECHNOLOGIES.TEC_ID, params.id));
		} catch (err) {
			console.error('Erreur:', err);
			return fail(500, {
				error: `Erreur: ${err instanceof Error ? err.message : 'Erreur inconnue'}`
			});
		}

		throw redirect(302, '/admin/technologies');
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
			await db.delete(POR_TECHNOLOGIES).where(eq(POR_TECHNOLOGIES.TEC_ID, params.id));
		} catch (err) {
			console.error('Erreur:', err);
			return fail(500, {
				error: `Erreur: ${err instanceof Error ? err.message : 'Erreur inconnue'}`
			});
		}

		throw redirect(302, '/admin/technologies');
	}
};
