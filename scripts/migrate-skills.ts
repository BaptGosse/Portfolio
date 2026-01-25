import 'dotenv/config';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from '../src/lib/server/db/schema';
import { skills } from '../archive/old-data/projects';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
	throw new Error('DATABASE_URL is not set');
}

const client = postgres(connectionString);
const db = drizzle(client, { schema });

async function migrateSkills() {
	console.log('🚀 Migration des compétences...');

	try {
		// Récupérer le premier utilisateur admin
		const [adminUser] = await db.select().from(schema.POR_USERS).limit(1);
		if (!adminUser) {
			throw new Error('Aucun utilisateur trouvé dans la base de données');
		}
		console.log(`👤 Utilisateur admin: ${adminUser.USR_EMAIL}`);
		const ADMIN_USER_ID = adminUser.USR_ID;
		for (const [categoryIndex, skillGroup] of skills.entries()) {
			console.log(`\n📁 Catégorie: ${skillGroup.category}`);

			// Créer la catégorie
			const [category] = await db
				.insert(schema.POR_SKILL_CATEGORIES)
				.values({
					CAT_NAME: {
						fr: skillGroup.category,
						en: skillGroup.category // À traduire manuellement plus tard via admin
					},
					CAT_ORDER: categoryIndex.toString(),
					USR_ID: ADMIN_USER_ID
				})
				.returning();

			console.log(`  ✅ Catégorie créée: ${category.CAT_ID}`);

			// Créer les compétences de cette catégorie
			for (const [skillIndex, skill] of skillGroup.items.entries()) {
				await db.insert(schema.POR_SKILLS).values({
					SKI_NAME: {
						fr: skill.name,
						en: skill.name // À traduire manuellement
					},
					SKI_CONTEXT: {
						fr: skill.context,
						en: skill.context // À traduire manuellement
					},
					SKI_ORDER: skillIndex.toString(),
					CAT_ID: category.CAT_ID,
					USR_ID: ADMIN_USER_ID
				});

				console.log(`    ✅ Compétence: ${skill.name}`);
			}
		}

		console.log('\n✨ Migration des compétences terminée avec succès!');
	} catch (error) {
		console.error('❌ Erreur lors de la migration:', error);
		throw error;
	} finally {
		await client.end();
	}
}

migrateSkills();
