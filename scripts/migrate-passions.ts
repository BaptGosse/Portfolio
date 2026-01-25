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

// Données des passions culturelles
const passionsData = [
	{
		title: { fr: 'Théâtre & Arts de la scène', en: 'Theater & Performing Arts' },
		description: {
			fr: 'Passionné par le théâtre depuis plusieurs années, j\'ai participé à diverses productions en tant que comédien et technicien. Cette passion m\'a appris l\'importance du travail d\'équipe, de la créativité et de la communication non-verbale.',
			en: 'Passionate about theater for several years, I have participated in various productions as an actor and technician. This passion taught me the importance of teamwork, creativity, and non-verbal communication.'
		},
		icon: 'Theater',
		order: '0',
		softSkills: ['Communication', 'Créativité', 'Travail d\'équipe', 'Gestion du stress']
	},
	{
		title: { fr: 'Production Vidéo & Montage', en: 'Video Production & Editing' },
		description: {
			fr: 'Création de contenu vidéo, du tournage au montage final. J\'aime raconter des histoires visuelles et maîtriser les outils de post-production. Cette activité développe ma rigueur et mon sens de l\'organisation.',
			en: 'Creating video content, from shooting to final editing. I enjoy telling visual stories and mastering post-production tools. This activity develops my rigor and organizational skills.'
		},
		icon: 'Video',
		order: '1',
		softSkills: ['Organisation', 'Rigueur', 'Créativité', 'Attention aux détails']
	},
	{
		title: { fr: 'Arts Visuels & Design', en: 'Visual Arts & Design' },
		description: {
			fr: 'Exploration de différentes formes d\'expression artistique : dessin, photographie, design graphique. Ces pratiques nourrissent ma créativité et mon sens esthétique, compétences précieuses dans le développement frontend.',
			en: 'Exploring different forms of artistic expression: drawing, photography, graphic design. These practices nurture my creativity and aesthetic sense, valuable skills in frontend development.'
		},
		icon: 'Palette',
		order: '2',
		softSkills: ['Créativité', 'Sens esthétique', 'Innovation', 'Sensibilité']
	}
];

// Données des soft skills
const softSkillsData = [
	{
		name: { fr: 'Communication', en: 'Communication' },
		description: {
			fr: 'Capacité à transmettre des idées clairement, à l\'écrit comme à l\'oral, développée notamment grâce au théâtre',
			en: 'Ability to convey ideas clearly, both in writing and orally, particularly developed through theater'
		},
		icon: 'MessageSquare',
		order: '0'
	},
	{
		name: { fr: 'Créativité', en: 'Creativity' },
		description: {
			fr: 'Approche innovante des problèmes, capacité à penser "outside the box" grâce aux activités artistiques',
			en: 'Innovative approach to problems, ability to think outside the box through artistic activities'
		},
		icon: 'Lightbulb',
		order: '1'
	},
	{
		name: { fr: 'Travail d\'équipe', en: 'Teamwork' },
		description: {
			fr: 'Collaboration efficace en groupe, écoute active et support mutuel appris sur scène',
			en: 'Effective group collaboration, active listening and mutual support learned on stage'
		},
		icon: 'Users',
		order: '2'
	},
	{
		name: { fr: 'Gestion du stress', en: 'Stress Management' },
		description: {
			fr: 'Capacité à rester performant sous pression, développée lors de représentations et deadlines',
			en: 'Ability to remain effective under pressure, developed during performances and deadlines'
		},
		icon: 'Target',
		order: '3'
	},
	{
		name: { fr: 'Organisation', en: 'Organization' },
		description: {
			fr: 'Planification rigoureuse et gestion efficace du temps, essentielle en production vidéo',
			en: 'Rigorous planning and effective time management, essential in video production'
		},
		icon: 'Calendar',
		order: '4'
	},
	{
		name: { fr: 'Rigueur', en: 'Rigor' },
		description: {
			fr: 'Attention aux détails et exigence de qualité dans chaque projet',
			en: 'Attention to detail and quality standards in every project'
		},
		icon: 'CheckCircle',
		order: '5'
	},
	{
		name: { fr: 'Attention aux détails', en: 'Attention to Detail' },
		description: {
			fr: 'Souci du détail dans l\'exécution, crucial en montage vidéo et en développement',
			en: 'Care for detail in execution, crucial in video editing and development'
		},
		icon: 'Eye',
		order: '6'
	},
	{
		name: { fr: 'Innovation', en: 'Innovation' },
		description: {
			fr: 'Recherche constante de nouvelles approches et solutions créatives',
			en: 'Constant search for new approaches and creative solutions'
		},
		icon: 'Sparkles',
		order: '7'
	},
	{
		name: { fr: 'Sens esthétique', en: 'Aesthetic Sense' },
		description: {
			fr: 'Sensibilité au design et à l\'harmonie visuelle, utile en UI/UX',
			en: 'Sensitivity to design and visual harmony, useful in UI/UX'
		},
		icon: 'Paintbrush',
		order: '8'
	},
	{
		name: { fr: 'Sensibilité', en: 'Sensitivity' },
		description: {
			fr: 'Empathie et compréhension des besoins des utilisateurs',
			en: 'Empathy and understanding of user needs'
		},
		icon: 'Heart',
		order: '9'
	}
];

async function migratePassions() {
	console.log('🎭 Début de la migration des passions et soft skills...\n');

	try {
		// Récupérer l'utilisateur admin
		const [adminUser] = await db.select().from(schema.POR_USERS).limit(1);
		if (!adminUser) {
			throw new Error('Aucun utilisateur trouvé dans la base de données');
		}
		console.log(`👤 Utilisateur admin: ${adminUser.USR_EMAIL}\n`);

		// 1. Créer les soft skills
		console.log('💡 Création des soft skills...');
		const softSkillsMap = new Map<string, string>();

		for (const softSkill of softSkillsData) {
			const [created] = await db
				.insert(schema.POR_SOFT_SKILLS)
				.values({
					SSK_NAME: softSkill.name,
					SSK_DESCRIPTION: softSkill.description,
					SSK_ICON: softSkill.icon,
					SSK_ORDER: softSkill.order,
					USR_ID: adminUser.USR_ID
				})
				.returning();

			softSkillsMap.set(softSkill.name.fr, created.SSK_ID);
			console.log(`  ✅ ${softSkill.name.fr}`);
		}

		// 2. Créer les passions et les lier aux soft skills
		console.log('\n🎨 Création des passions...');

		for (const passion of passionsData) {
			const [createdPassion] = await db
				.insert(schema.POR_PASSIONS)
				.values({
					PAS_TITLE: passion.title,
					PAS_DESCRIPTION: passion.description,
					PAS_ICON: passion.icon,
					PAS_ORDER: passion.order,
					USR_ID: adminUser.USR_ID
				})
				.returning();

			console.log(`  ✅ ${passion.title.fr}`);

			// Lier aux soft skills
			for (const softSkillName of passion.softSkills) {
				const softSkillId = softSkillsMap.get(softSkillName);
				if (softSkillId) {
					await db.insert(schema.POR_PASSIONS_SOFT_SKILLS).values({
						PAS_ID: createdPassion.PAS_ID,
						SSK_ID: softSkillId
					});
					console.log(`    → ${softSkillName}`);
				}
			}
		}

		console.log('\n✨ Migration terminée avec succès!');
		console.log(`📊 Résumé: ${softSkillsData.length} soft skills, ${passionsData.length} passions créées`);
	} catch (error) {
		console.error('❌ Erreur lors de la migration:', error);
		throw error;
	} finally {
		await client.end();
	}
}

migratePassions();
