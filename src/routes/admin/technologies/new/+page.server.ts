import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { POR_TECHNOLOGIES } from '$lib/server/db/schema';
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
	return {};
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
		const name_fr = data.get('name_fr')?.toString();
		const name_en = data.get('name_en')?.toString();

		if (!name_fr || !name_en) {
			return fail(400, {
				error: 'Nom en FR et EN requis'
			});
		}

		const slug = slugify(name_fr);

		try {
			await db.insert(POR_TECHNOLOGIES).values({
				TEC_NAME: { fr: name_fr, en: name_en },
				TEC_SLUG: slug
			});
		} catch (err) {
			console.error('Erreur:', err);
			return fail(500, {
				error: `Erreur: ${err instanceof Error ? err.message : 'Erreur inconnue'}`
			});
		}

		throw redirect(302, '/admin/technologies');
	}
};
