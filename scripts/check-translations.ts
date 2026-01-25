import 'dotenv/config';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from '../src/lib/server/db/schema';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
	throw new Error('DATABASE_URL is not set');
}

const client = postgres(connectionString);
const db = drizzle(client, { schema });

type TranslatedField = { fr: string; en: string };

function checkTranslation(fieldName: string, field: TranslatedField): boolean {
	if (!field.fr || field.fr.trim() === '') {
		console.log(`  ❌ ${fieldName}: Traduction FR manquante`);
		return false;
	}
	if (!field.en || field.en.trim() === '') {
		console.log(`  ❌ ${fieldName}: Traduction EN manquante`);
		return false;
	}
	return true;
}

async function checkAllTranslations() {
	console.log('🔍 Vérification des traductions dans la base de données...\n');

	let allGood = true;

	// Check Technologies
	console.log('📦 Technologies:');
	const technologies = await db.select().from(schema.POR_TECHNOLOGIES);
	for (const tech of technologies) {
		const isGood = checkTranslation(`${tech.TEC_SLUG}`, tech.TEC_NAME as any);
		if (!isGood) allGood = false;
	}
	console.log(`  ✅ ${technologies.length} technologies vérifiées\n`);

	// Check Projects
	console.log('💼 Projets:');
	const projects = await db.select().from(schema.POR_PROJECTS);
	for (const project of projects) {
		const titleGood = checkTranslation(`${project.PRJ_SLUG} - title`, project.PRJ_TITLE as any);
		const descGood = checkTranslation(
			`${project.PRJ_SLUG} - description`,
			project.PRJ_DESCRIPTION as any
		);
		if (!titleGood || !descGood) allGood = false;
	}
	console.log(`  ✅ ${projects.length} projets vérifiés\n`);

	// Check Experiences
	console.log('💼 Expériences:');
	const experiences = await db.select().from(schema.POR_EXPERIENCES);
	for (const exp of experiences) {
		const companyGood = checkTranslation(
			`Experience ${exp.EXP_ID} - company`,
			exp.EXP_COMPANY as any
		);
		const roleGood = checkTranslation(`Experience ${exp.EXP_ID} - role`, exp.EXP_ROLE as any);
		const descGood = checkTranslation(
			`Experience ${exp.EXP_ID} - description`,
			exp.EXP_DESCRIPTION as any
		);
		if (!companyGood || !roleGood || !descGood) allGood = false;
	}
	console.log(`  ✅ ${experiences.length} expériences vérifiées\n`);

	// Check Skills
	console.log('💪 Compétences:');
	const skills = await db.select().from(schema.POR_SKILLS);
	for (const skill of skills) {
		const nameGood = checkTranslation(`Skill ${skill.SKI_ID} - name`, skill.SKI_NAME as any);
		const contextGood = checkTranslation(
			`Skill ${skill.SKI_ID} - context`,
			skill.SKI_CONTEXT as any
		);
		if (!nameGood || !contextGood) allGood = false;
	}
	console.log(`  ✅ ${skills.length} compétences vérifiées\n`);

	// Check Skill Categories
	console.log('📂 Catégories de compétences:');
	const categories = await db.select().from(schema.POR_SKILL_CATEGORIES);
	for (const cat of categories) {
		const isGood = checkTranslation(`Category ${cat.CAT_ID}`, cat.CAT_NAME as any);
		if (!isGood) allGood = false;
	}
	console.log(`  ✅ ${categories.length} catégories vérifiées\n`);

	// Check Passions
	console.log('❤️ Passions:');
	const passions = await db.select().from(schema.POR_PASSIONS);
	for (const passion of passions) {
		const titleGood = checkTranslation(`Passion ${passion.PAS_ID} - title`, passion.PAS_TITLE as any);
		const descGood = checkTranslation(
			`Passion ${passion.PAS_ID} - description`,
			passion.PAS_DESCRIPTION as any
		);
		if (!titleGood || !descGood) allGood = false;
	}
	console.log(`  ✅ ${passions.length} passions vérifiées\n`);

	// Check Soft Skills
	console.log('✨ Soft Skills:');
	const softSkills = await db.select().from(schema.POR_SOFT_SKILLS);
	for (const skill of softSkills) {
		const nameGood = checkTranslation(`Soft Skill ${skill.SSK_ID} - name`, skill.SSK_NAME as any);
		const descGood = checkTranslation(
			`Soft Skill ${skill.SSK_ID} - description`,
			skill.SSK_DESCRIPTION as any
		);
		if (!nameGood || !descGood) allGood = false;
	}
	console.log(`  ✅ ${softSkills.length} soft skills vérifiées\n`);

	// Check Posts
	console.log('📝 Articles de blog:');
	const posts = await db.select().from(schema.POR_POSTS);
	for (const post of posts) {
		const titleGood = checkTranslation(`Post ${post.POS_SLUG} - title`, post.POS_TITLE as any);
		const descGood = checkTranslation(
			`Post ${post.POS_SLUG} - description`,
			post.POS_DESCRIPTION as any
		);
		const contentGood = checkTranslation(
			`Post ${post.POS_SLUG} - content`,
			post.POS_CONTENT as any
		);
		if (!titleGood || !descGood || !contentGood) allGood = false;
	}
	console.log(`  ✅ ${posts.length} articles vérifiés\n`);

	if (allGood) {
		console.log('✅ ✅ ✅ Toutes les traductions sont complètes! ✅ ✅ ✅');
	} else {
		console.log('⚠️  Certaines traductions sont manquantes ou vides.');
		process.exit(1);
	}
}

checkAllTranslations()
	.then(() => {
		client.end();
	})
	.catch((error) => {
		console.error('❌ Erreur:', error);
		client.end();
		process.exit(1);
	});
