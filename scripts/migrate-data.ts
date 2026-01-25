import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import {
	POR_TECHNOLOGIES,
	POR_PROJECTS,
	POR_PROJECTS_TECHNOLOGIES,
	POR_EXPERIENCES,
	POR_EXPERIENCES_TECHNOLOGIES,
	POR_POSTS,
	POR_USERS
} from '../src/lib/server/db/schema.js';
import { projects, experiences } from '../src/lib/data/projects.js';
import { eq } from 'drizzle-orm';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Create database connection for migration script
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
	console.error('❌ DATABASE_URL environment variable is not set');
	process.exit(1);
}
const client = postgres(connectionString);
const db = drizzle(client);

function slugify(text: string): string {
	return text
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)+/g, '');
}

function parsePeriod(period: string): { startDate: Date; endDate: Date | null } {
	// Examples: "2024 - 2027", "Juin 2025 - Présent", "Mars 2025 - Présent", "2021 - 2024", "2022 - 2024"

	const months: Record<string, number> = {
		janvier: 0, février: 1, mars: 2, avril: 3, mai: 4, juin: 5,
		juillet: 6, août: 7, septembre: 8, octobre: 9, novembre: 10, décembre: 11
	};

	const parts = period.split('-').map(p => p.trim().toLowerCase());

	let startDate: Date;
	let endDate: Date | null = null;

	// Parse start date
	const startParts = parts[0].split(' ');
	if (startParts.length === 1) {
		// Just year: "2024"
		startDate = new Date(parseInt(startParts[0]), 0, 1);
	} else {
		// Month and year: "juin 2025"
		const month = months[startParts[0]];
		const year = parseInt(startParts[1]);
		startDate = new Date(year, month, 1);
	}

	// Parse end date
	if (parts[1] && parts[1] !== 'présent') {
		const endParts = parts[1].split(' ');
		if (endParts.length === 1) {
			// Just year: "2027"
			endDate = new Date(parseInt(endParts[0]), 11, 31);
		} else {
			// Month and year: "décembre 2024"
			const month = months[endParts[0]];
			const year = parseInt(endParts[1]);
			// Get last day of month
			endDate = new Date(year, month + 1, 0);
		}
	}

	return { startDate, endDate };
}

async function main() {
	console.log('🚀 Starting data migration...\n');

	// Get admin user
	const [adminUser] = await db.select().from(POR_USERS).limit(1);
	if (!adminUser) {
		console.error('❌ No admin user found! Please create an admin user first.');
		console.error('Run: npm run db:create-admin <email> <password> <name>');
		process.exit(1);
	}
	console.log(`✓ Found admin user: ${adminUser.USR_EMAIL}\n`);

	// Step 1: Migrate Technologies
	console.log('📦 Migrating technologies...');
	const techMap = new Map<string, string>(); // name -> id

	// Collect unique technologies from projects and experiences
	const allTechs = new Set<string>();
	projects.forEach(p => p.technologies.forEach(t => allTechs.add(t)));
	experiences.forEach(e => e.technologies?.forEach(t => allTechs.add(t)));

	for (const techName of allTechs) {
		const slug = slugify(techName);

		// Check if tech already exists
		const [existing] = await db
			.select()
			.from(POR_TECHNOLOGIES)
			.where(eq(POR_TECHNOLOGIES.TEC_SLUG, slug))
			.limit(1);

		if (existing) {
			techMap.set(techName, existing.TEC_ID);
			console.log(`  ↪ Skipped (exists): ${techName}`);
		} else {
			const [tech] = await db
				.insert(POR_TECHNOLOGIES)
				.values({
					TEC_NAME: { fr: techName, en: techName }, // Will need manual EN translation
					TEC_SLUG: slug
				})
				.returning();

			techMap.set(techName, tech.TEC_ID);
			console.log(`  ✓ Created: ${techName}`);
		}
	}
	console.log(`✓ Migrated ${techMap.size} technologies\n`);

	// Step 2: Migrate Projects
	console.log('🏗️ Migrating projects...');
	for (const project of projects) {
		const slug = project.id;

		// Check if project already exists
		const [existing] = await db
			.select()
			.from(POR_PROJECTS)
			.where(eq(POR_PROJECTS.PRJ_SLUG, slug))
			.limit(1);

		if (existing) {
			console.log(`  ↪ Skipped (exists): ${project.title}`);
			continue;
		}

		const [dbProject] = await db
			.insert(POR_PROJECTS)
			.values({
				PRJ_SLUG: slug,
				PRJ_TITLE: { fr: project.title, en: project.title }, // Manual EN translation needed
				PRJ_DESCRIPTION: { fr: project.description, en: project.description },
				PRJ_GITHUB: project.github,
				PRJ_LINK: project.link,
				PRJ_IMAGE: project.image,
				PRJ_FEATURED: project.featured ?? false,
				PRJ_ORDER: '0',
				USR_ID: adminUser.USR_ID
			})
			.returning();

		// Link technologies
		const techIds = project.technologies
			.map(name => techMap.get(name))
			.filter((id): id is string => id !== undefined);

		if (techIds.length > 0) {
			await db.insert(POR_PROJECTS_TECHNOLOGIES).values(
				techIds.map(techId => ({
					PRJ_ID: dbProject.PRJ_ID,
					TEC_ID: techId
				}))
			);
		}

		console.log(`  ✓ Created: ${project.title} (${techIds.length} technologies)`);
	}
	console.log(`✓ Migrated ${projects.length} projects\n`);

	// Step 3: Migrate Experiences
	console.log('💼 Migrating experiences...');
	for (let i = 0; i < experiences.length; i++) {
		const exp = experiences[i];

		try {
			const { startDate, endDate } = parsePeriod(exp.period);

			const [dbExp] = await db
				.insert(POR_EXPERIENCES)
				.values({
					EXP_COMPANY: { fr: exp.company, en: exp.company }, // Manual EN translation needed
					EXP_ROLE: { fr: exp.role, en: exp.role },
					EXP_DESCRIPTION: { fr: exp.description, en: exp.description },
					EXP_TYPE: exp.type,
					EXP_ORDER: i.toString(),
					EXP_START_DATE: startDate,
					EXP_END_DATE: endDate,
					USR_ID: adminUser.USR_ID
				})
				.returning();

			// Link technologies
			if (exp.technologies) {
				const techIds = exp.technologies
					.map(name => techMap.get(name))
					.filter((id): id is string => id !== undefined);

				if (techIds.length > 0) {
					await db.insert(POR_EXPERIENCES_TECHNOLOGIES).values(
						techIds.map(techId => ({
							EXP_ID: dbExp.EXP_ID,
							TEC_ID: techId
						}))
					);
				}
			}

			const dateStr = endDate ? `${startDate.toISOString().split('T')[0]} - ${endDate.toISOString().split('T')[0]}` : `${startDate.toISOString().split('T')[0]} - Present`;
			console.log(`  ✓ Created: ${exp.role} at ${exp.company} (${dateStr})`);
		} catch (error) {
			console.error(`  ❌ Error migrating experience: ${exp.role} at ${exp.company}`);
			console.error(`     Period: ${exp.period}`);
			console.error(`     Error: ${error}`);
		}
	}
	console.log(`✓ Migrated ${experiences.length} experiences\n`);

	// Step 4: Migrate Posts from Markdown
	console.log('📝 Migrating blog posts from markdown files...');
	const postsDir = path.join(process.cwd(), 'src', 'posts');
	const files = fs.readdirSync(postsDir);

	let migratedPosts = 0;
	for (const file of files) {
		if (!file.endsWith('.md')) continue;

		const filePath = path.join(postsDir, file);
		const fileContent = fs.readFileSync(filePath, 'utf-8');
		const { data: frontmatter, content: markdown } = matter(fileContent);

		const slug = frontmatter.slug || file.replace('.md', '');

		// Check if post already exists
		const [existing] = await db
			.select()
			.from(POR_POSTS)
			.where(eq(POR_POSTS.POS_SLUG, slug))
			.limit(1);

		if (existing) {
			console.log(`  ↪ Skipped (exists): ${frontmatter.title}`);
			continue;
		}

		await db.insert(POR_POSTS).values({
			POS_SLUG: slug,
			POS_TITLE: { fr: frontmatter.title || 'Sans titre', en: frontmatter.title || 'Untitled' },
			POS_DESCRIPTION: { fr: frontmatter.description || '', en: frontmatter.description || '' },
			POS_CONTENT: { fr: markdown, en: markdown }, // Manual EN translation needed
			POS_PUBLISHED: frontmatter.published !== false,
			POS_PUBLISHED_AT: frontmatter.published !== false ? (frontmatter.date ? new Date(frontmatter.date) : new Date()) : null,
			USR_ID: adminUser.USR_ID
		});

		migratedPosts++;
		console.log(`  ✓ Created: ${frontmatter.title}`);
	}
	console.log(`✓ Migrated ${migratedPosts} blog posts\n`);

	console.log('🎉 Migration completed successfully!');
	console.log('\n📝 Next steps:');
	console.log('  1. Review data in admin dashboard');
	console.log('  2. Add English translations for projects, experiences, and posts');
	console.log('  3. Test frontend display in both FR and EN');

	process.exit(0);
}

main().catch((error) => {
	console.error('❌ Migration failed:', error);
	process.exit(1);
});
