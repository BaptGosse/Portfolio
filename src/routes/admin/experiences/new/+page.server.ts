import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import {
	POR_EXPERIENCES,
	POR_TECHNOLOGIES,
	POR_EXPERIENCES_TECHNOLOGIES
} from '$lib/server/db/schema';
import { validateSession } from '$lib/server/auth';
import type { Actions, PageServerLoad } from './$types';

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
		const companyFr = data.get('company_fr')?.toString();
		const companyEn = data.get('company_en')?.toString();
		const roleFr = data.get('role_fr')?.toString();
		const roleEn = data.get('role_en')?.toString();
		const descFr = data.get('description_fr')?.toString();
		const descEn = data.get('description_en')?.toString();
		const type = data.get('type')?.toString();
		const startDate = data.get('start_date')?.toString();
		const endDate = data.get('end_date')?.toString();
		const companyUrl = data.get('company_url')?.toString();
		const logo = data.get('logo')?.toString();
		const order = data.get('order')?.toString() || '0';
		const techIds = data.getAll('technologies').map((t) => t.toString());

		if (!companyFr || !companyEn || !roleFr || !roleEn || !descFr || !descEn || !type || !startDate) {
			return fail(400, {
				error: 'Tous les champs obligatoires doivent être remplis'
			});
		}

		if (!['work', 'education'].includes(type)) {
			return fail(400, { error: 'Type invalide' });
		}

		try {
			const [newExp] = await db
				.insert(POR_EXPERIENCES)
				.values({
					EXP_COMPANY: { fr: companyFr, en: companyEn },
					EXP_ROLE: { fr: roleFr, en: roleEn },
					EXP_DESCRIPTION: { fr: descFr, en: descEn },
					EXP_TYPE: type,
					EXP_ORDER: order,
					EXP_START_DATE: new Date(startDate),
					EXP_END_DATE: endDate ? new Date(endDate) : null,
					EXP_COMPANY_URL: companyUrl || null,
					EXP_LOGO: logo || null,
					USR_ID: user.USR_ID
				})
				.returning();

			// Link technologies
			if (techIds.length > 0) {
				await db.insert(POR_EXPERIENCES_TECHNOLOGIES).values(
					techIds.map((techId) => ({
						EXP_ID: newExp.EXP_ID,
						TEC_ID: techId
					}))
				);
			}
		} catch (err) {
			console.error('Erreur lors de la création:', err);
			return fail(500, {
				error: `Erreur lors de la création: ${err instanceof Error ? err.message : 'Erreur inconnue'}`
			});
		}

		throw redirect(302, '/admin/experiences');
	}
};
