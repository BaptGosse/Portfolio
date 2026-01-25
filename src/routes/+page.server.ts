import { db } from '$lib/server/db';
import {
	POR_PROJECTS,
	POR_EXPERIENCES,
	POR_TECHNOLOGIES,
	POR_PROJECTS_TECHNOLOGIES,
	POR_EXPERIENCES_TECHNOLOGIES,
	POR_SKILL_CATEGORIES,
	POR_SKILLS,
	POR_PASSIONS,
	POR_SOFT_SKILLS,
	POR_PASSIONS_SOFT_SKILLS
} from '$lib/server/db/schema';
import { eq, asc, desc } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {

	// Load featured projects
	const dbProjects = await db
		.select()
		.from(POR_PROJECTS)
		.where(eq(POR_PROJECTS.PRJ_FEATURED, true))
		.orderBy(asc(POR_PROJECTS.PRJ_ORDER), desc(POR_PROJECTS.PRJ_CREATED_AT));

	// Load technologies for each project
	const projects = await Promise.all(
		dbProjects.map(async (project) => {
			const techs = await db
				.select({
					id: POR_TECHNOLOGIES.TEC_ID,
					name: POR_TECHNOLOGIES.TEC_NAME,
					slug: POR_TECHNOLOGIES.TEC_SLUG
				})
				.from(POR_PROJECTS_TECHNOLOGIES)
				.innerJoin(
					POR_TECHNOLOGIES,
					eq(POR_PROJECTS_TECHNOLOGIES.TEC_ID, POR_TECHNOLOGIES.TEC_ID)
				)
				.where(eq(POR_PROJECTS_TECHNOLOGIES.PRJ_ID, project.PRJ_ID));

			return {
				id: project.PRJ_SLUG,
				title: project.PRJ_TITLE,
				description: project.PRJ_DESCRIPTION,
				technologies: techs.map((t) => t.name),
				github: project.PRJ_GITHUB,
				link: project.PRJ_LINK,
				featured: project.PRJ_FEATURED
			};
		})
	);

	// Load experiences
	const dbExperiences = await db
		.select()
		.from(POR_EXPERIENCES)
		.orderBy(asc(POR_EXPERIENCES.EXP_ORDER), desc(POR_EXPERIENCES.EXP_START_DATE));

	// Load technologies for each experience
	const experiences = await Promise.all(
		dbExperiences.map(async (exp) => {
			const techs = await db
				.select({
					name: POR_TECHNOLOGIES.TEC_NAME
				})
				.from(POR_EXPERIENCES_TECHNOLOGIES)
				.innerJoin(
					POR_TECHNOLOGIES,
					eq(POR_EXPERIENCES_TECHNOLOGIES.TEC_ID, POR_TECHNOLOGIES.TEC_ID)
				)
				.where(eq(POR_EXPERIENCES_TECHNOLOGIES.EXP_ID, exp.EXP_ID));

			return {
				company: exp.EXP_COMPANY,
				role: exp.EXP_ROLE,
				startDate: exp.EXP_START_DATE,
				endDate: exp.EXP_END_DATE,
				description: exp.EXP_DESCRIPTION,
				technologies: techs.map((t) => t.name),
				type: exp.EXP_TYPE
			};
		})
	);

	// Load skills grouped by categories
	const categories = await db
		.select()
		.from(POR_SKILL_CATEGORIES)
		.orderBy(asc(POR_SKILL_CATEGORIES.CAT_ORDER));

	const skills = await Promise.all(
		categories.map(async (category) => {
			const categorySkills = await db
				.select()
				.from(POR_SKILLS)
				.where(eq(POR_SKILLS.CAT_ID, category.CAT_ID))
				.orderBy(asc(POR_SKILLS.SKI_ORDER));

			return {
				category: category.CAT_NAME,
				items: categorySkills.map((skill) => ({
					name: skill.SKI_NAME,
					context: skill.SKI_CONTEXT
				}))
			};
		})
	);

	// Load passions with their soft skills
	const dbPassions = await db
		.select()
		.from(POR_PASSIONS)
		.orderBy(asc(POR_PASSIONS.PAS_ORDER));

	const passions = await Promise.all(
		dbPassions.map(async (passion) => {
			const softSkillsData = await db
				.select({
					name: POR_SOFT_SKILLS.SSK_NAME,
					description: POR_SOFT_SKILLS.SSK_DESCRIPTION,
					icon: POR_SOFT_SKILLS.SSK_ICON
				})
				.from(POR_PASSIONS_SOFT_SKILLS)
				.innerJoin(
					POR_SOFT_SKILLS,
					eq(POR_PASSIONS_SOFT_SKILLS.SSK_ID, POR_SOFT_SKILLS.SSK_ID)
				)
				.where(eq(POR_PASSIONS_SOFT_SKILLS.PAS_ID, passion.PAS_ID))
				.orderBy(asc(POR_SOFT_SKILLS.SSK_ORDER));

			return {
				title: passion.PAS_TITLE,
				description: passion.PAS_DESCRIPTION,
				icon: passion.PAS_ICON,
				softSkills: softSkillsData.map((skill) => ({
					name: skill.name,
					description: skill.description,
					icon: skill.icon
				}))
			};
		})
	);

	return {
		projects,
		experiences,
		skills,
		passions
	};
};
