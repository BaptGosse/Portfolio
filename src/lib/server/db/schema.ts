import { pgTable, text, timestamp, boolean, uuid, varchar, primaryKey, jsonb } from 'drizzle-orm/pg-core';

// Table des utilisateurs admin
export const POR_USERS = pgTable('POR_USERS', {
	USR_ID: uuid('USR_ID').primaryKey().defaultRandom(),
	USR_EMAIL: varchar('USR_EMAIL', { length: 255 }).notNull().unique(),
	USR_PASSWORD_HASH: varchar('USR_PASSWORD_HASH', { length: 255 }).notNull(),
	USR_NAME: varchar('USR_NAME', { length: 64 }).notNull(),
	USR_CREATED_AT: timestamp('USR_CREATED_AT').defaultNow().notNull(),
	USR_UPDATED_AT: timestamp('USR_UPDATED_AT').defaultNow()
});

// Table des articles de blog
export const POR_POSTS = pgTable('POR_POSTS', {
	POS_ID: uuid('POS_ID').primaryKey().defaultRandom(),
	POS_SLUG: varchar('POS_SLUG', { length: 128 }).notNull().unique(),
	POS_TITLE: jsonb('POS_TITLE').$type<{ fr: string; en: string }>().notNull(),
	POS_DESCRIPTION: jsonb('POS_DESCRIPTION').$type<{ fr: string; en: string }>().notNull(),
	POS_CONTENT: jsonb('POS_CONTENT').$type<{ fr: string; en: string }>().notNull(),
	POS_PUBLISHED: boolean('POS_PUBLISHED').default(false).notNull(),
	USR_ID: uuid('USR_ID').references(() => POR_USERS.USR_ID).notNull(),
	POS_CREATED_AT: timestamp('POS_CREATED_AT').defaultNow().notNull(),
	POS_UPDATED_AT: timestamp('POS_UPDATED_AT').defaultNow(),
	POS_PUBLISHED_AT: timestamp('POS_PUBLISHED_AT')
});

// Table des tags
export const POR_TAGS = pgTable('POR_TAGS', {
	TAG_ID: uuid('TAG_ID').primaryKey().defaultRandom(),
	TAG_NAME: varchar('TAG_NAME', { length: 64 }).notNull().unique(),
	TAG_SLUG: varchar('TAG_SLUG', { length: 64 }).notNull().unique(),
	TAG_CREATED_AT: timestamp('TAG_CREATED_AT').defaultNow().notNull()
});

// Table de liaison posts <-> tags
export const POR_POSTS_TAGS = pgTable('POR_POSTS_TAGS', {
	POS_ID: uuid('POS_ID').references(() => POR_POSTS.POS_ID, { onDelete: 'cascade' }).notNull(),
	TAG_ID: uuid('TAG_ID').references(() => POR_TAGS.TAG_ID, { onDelete: 'cascade' }).notNull()
}, (table) => [
	primaryKey({ columns: [table.POS_ID, table.TAG_ID] })
]);

// Table des sessions pour l'authentification
export const POR_SESSIONS = pgTable('POR_SESSIONS', {
	SES_ID: uuid('SES_ID').primaryKey().defaultRandom(),
	USR_ID: uuid('USR_ID').references(() => POR_USERS.USR_ID, { onDelete: 'cascade' }).notNull(),
	SES_TOKEN: varchar('SES_TOKEN', { length: 255 }).notNull().unique(),
	SES_EXPIRES_AT: timestamp('SES_EXPIRES_AT').notNull(),
	SES_CREATED_AT: timestamp('SES_CREATED_AT').defaultNow().notNull()
});

// Table des projets
export const POR_PROJECTS = pgTable('POR_PROJECTS', {
	PRJ_ID: uuid('PRJ_ID').primaryKey().defaultRandom(),
	PRJ_SLUG: varchar('PRJ_SLUG', { length: 128 }).notNull().unique(),
	PRJ_TITLE: jsonb('PRJ_TITLE').$type<{ fr: string; en: string }>().notNull(),
	PRJ_DESCRIPTION: jsonb('PRJ_DESCRIPTION').$type<{ fr: string; en: string }>().notNull(),
	PRJ_LINK: varchar('PRJ_LINK', { length: 255 }),
	PRJ_GITHUB: varchar('PRJ_GITHUB', { length: 255 }),
	PRJ_IMAGE: varchar('PRJ_IMAGE', { length: 255 }),
	PRJ_FEATURED: boolean('PRJ_FEATURED').default(false).notNull(),
	PRJ_ORDER: varchar('PRJ_ORDER', { length: 10 }).default('0').notNull(),
	USR_ID: uuid('USR_ID').references(() => POR_USERS.USR_ID).notNull(),
	PRJ_CREATED_AT: timestamp('PRJ_CREATED_AT').defaultNow().notNull(),
	PRJ_UPDATED_AT: timestamp('PRJ_UPDATED_AT').defaultNow()
});

// Table des technologies
export const POR_TECHNOLOGIES = pgTable('POR_TECHNOLOGIES', {
	TEC_ID: uuid('TEC_ID').primaryKey().defaultRandom(),
	TEC_NAME: jsonb('TEC_NAME').$type<{ fr: string; en: string }>().notNull(),
	TEC_SLUG: varchar('TEC_SLUG', { length: 64 }).notNull().unique(),
	TEC_CREATED_AT: timestamp('TEC_CREATED_AT').defaultNow().notNull()
});

// Table de liaison projets <-> technologies
export const POR_PROJECTS_TECHNOLOGIES = pgTable('POR_PROJECTS_TECHNOLOGIES', {
	PRJ_ID: uuid('PRJ_ID').references(() => POR_PROJECTS.PRJ_ID, { onDelete: 'cascade' }).notNull(),
	TEC_ID: uuid('TEC_ID').references(() => POR_TECHNOLOGIES.TEC_ID, { onDelete: 'cascade' }).notNull()
}, (table) => [
	primaryKey({ columns: [table.PRJ_ID, table.TEC_ID] })
]);

// Table des expériences professionnelles et éducatives
export const POR_EXPERIENCES = pgTable('POR_EXPERIENCES', {
	EXP_ID: uuid('EXP_ID').primaryKey().defaultRandom(),
	EXP_COMPANY: jsonb('EXP_COMPANY').$type<{ fr: string; en: string }>().notNull(),
	EXP_ROLE: jsonb('EXP_ROLE').$type<{ fr: string; en: string }>().notNull(),
	EXP_DESCRIPTION: jsonb('EXP_DESCRIPTION').$type<{ fr: string; en: string }>().notNull(),
	EXP_TYPE: varchar('EXP_TYPE', { length: 20 }).notNull(), // 'work' or 'education'
	EXP_ORDER: varchar('EXP_ORDER', { length: 10 }).default('0').notNull(),
	EXP_START_DATE: timestamp('EXP_START_DATE').notNull(),
	EXP_END_DATE: timestamp('EXP_END_DATE'), // null = present
	EXP_COMPANY_URL: varchar('EXP_COMPANY_URL', { length: 255 }),
	EXP_LOGO: varchar('EXP_LOGO', { length: 255 }),
	USR_ID: uuid('USR_ID').references(() => POR_USERS.USR_ID).notNull(),
	EXP_CREATED_AT: timestamp('EXP_CREATED_AT').defaultNow().notNull(),
	EXP_UPDATED_AT: timestamp('EXP_UPDATED_AT').defaultNow()
});

// Table de liaison expériences <-> technologies
export const POR_EXPERIENCES_TECHNOLOGIES = pgTable('POR_EXPERIENCES_TECHNOLOGIES', {
	EXP_ID: uuid('EXP_ID').references(() => POR_EXPERIENCES.EXP_ID, { onDelete: 'cascade' }).notNull(),
	TEC_ID: uuid('TEC_ID').references(() => POR_TECHNOLOGIES.TEC_ID, { onDelete: 'cascade' }).notNull()
}, (table) => [
	primaryKey({ columns: [table.EXP_ID, table.TEC_ID] })
]);

// Table des catégories de compétences
export const POR_SKILL_CATEGORIES = pgTable('POR_SKILL_CATEGORIES', {
	CAT_ID: uuid('CAT_ID').primaryKey().defaultRandom(),
	CAT_NAME: jsonb('CAT_NAME').$type<{ fr: string; en: string }>().notNull(),
	CAT_ORDER: varchar('CAT_ORDER', { length: 10 }).default('0').notNull(),
	USR_ID: uuid('USR_ID').references(() => POR_USERS.USR_ID).notNull(),
	CAT_CREATED_AT: timestamp('CAT_CREATED_AT').defaultNow().notNull(),
	CAT_UPDATED_AT: timestamp('CAT_UPDATED_AT').defaultNow()
});

// Table des compétences
export const POR_SKILLS = pgTable('POR_SKILLS', {
	SKI_ID: uuid('SKI_ID').primaryKey().defaultRandom(),
	SKI_NAME: jsonb('SKI_NAME').$type<{ fr: string; en: string }>().notNull(),
	SKI_CONTEXT: jsonb('SKI_CONTEXT').$type<{ fr: string; en: string }>().notNull(),
	SKI_ORDER: varchar('SKI_ORDER', { length: 10 }).default('0').notNull(),
	CAT_ID: uuid('CAT_ID').references(() => POR_SKILL_CATEGORIES.CAT_ID, { onDelete: 'cascade' }).notNull(),
	USR_ID: uuid('USR_ID').references(() => POR_USERS.USR_ID).notNull(),
	SKI_CREATED_AT: timestamp('SKI_CREATED_AT').defaultNow().notNull(),
	SKI_UPDATED_AT: timestamp('SKI_UPDATED_AT').defaultNow()
});

// Table des passions/hobbies
export const POR_PASSIONS = pgTable('POR_PASSIONS', {
	PAS_ID: uuid('PAS_ID').primaryKey().defaultRandom(),
	PAS_TITLE: jsonb('PAS_TITLE').$type<{ fr: string; en: string }>().notNull(),
	PAS_DESCRIPTION: jsonb('PAS_DESCRIPTION').$type<{ fr: string; en: string }>().notNull(),
	PAS_ICON: varchar('PAS_ICON', { length: 50 }).notNull(), // lucide icon name
	PAS_IMAGE: varchar('PAS_IMAGE', { length: 255 }), // optional image URL
	PAS_ORDER: varchar('PAS_ORDER', { length: 10 }).default('0').notNull(),
	USR_ID: uuid('USR_ID').references(() => POR_USERS.USR_ID).notNull(),
	PAS_CREATED_AT: timestamp('PAS_CREATED_AT').defaultNow().notNull(),
	PAS_UPDATED_AT: timestamp('PAS_UPDATED_AT').defaultNow()
});

// Table des soft skills
export const POR_SOFT_SKILLS = pgTable('POR_SOFT_SKILLS', {
	SSK_ID: uuid('SSK_ID').primaryKey().defaultRandom(),
	SSK_NAME: jsonb('SSK_NAME').$type<{ fr: string; en: string }>().notNull(),
	SSK_DESCRIPTION: jsonb('SSK_DESCRIPTION').$type<{ fr: string; en: string }>().notNull(),
	SSK_ICON: varchar('SSK_ICON', { length: 50 }).notNull(), // lucide icon name
	SSK_ORDER: varchar('SSK_ORDER', { length: 10 }).default('0').notNull(),
	USR_ID: uuid('USR_ID').references(() => POR_USERS.USR_ID).notNull(),
	SSK_CREATED_AT: timestamp('SSK_CREATED_AT').defaultNow().notNull(),
	SSK_UPDATED_AT: timestamp('SSK_UPDATED_AT').defaultNow()
});

// Table de liaison passions <-> soft skills
export const POR_PASSIONS_SOFT_SKILLS = pgTable('POR_PASSIONS_SOFT_SKILLS', {
	PAS_ID: uuid('PAS_ID').references(() => POR_PASSIONS.PAS_ID, { onDelete: 'cascade' }).notNull(),
	SSK_ID: uuid('SSK_ID').references(() => POR_SOFT_SKILLS.SSK_ID, { onDelete: 'cascade' }).notNull()
}, (table) => [
	primaryKey({ columns: [table.PAS_ID, table.SSK_ID] })
]);

// Types TypeScript inférés
export type User = typeof POR_USERS.$inferSelect;
export type NewUser = typeof POR_USERS.$inferInsert;
export type Post = typeof POR_POSTS.$inferSelect;
export type NewPost = typeof POR_POSTS.$inferInsert;
export type Tag = typeof POR_TAGS.$inferSelect;
export type NewTag = typeof POR_TAGS.$inferInsert;
export type Session = typeof POR_SESSIONS.$inferSelect;
export type NewSession = typeof POR_SESSIONS.$inferInsert;
export type Project = typeof POR_PROJECTS.$inferSelect;
export type NewProject = typeof POR_PROJECTS.$inferInsert;
export type Technology = typeof POR_TECHNOLOGIES.$inferSelect;
export type NewTechnology = typeof POR_TECHNOLOGIES.$inferInsert;
export type Experience = typeof POR_EXPERIENCES.$inferSelect;
export type NewExperience = typeof POR_EXPERIENCES.$inferInsert;
export type SkillCategory = typeof POR_SKILL_CATEGORIES.$inferSelect;
export type NewSkillCategory = typeof POR_SKILL_CATEGORIES.$inferInsert;
export type Skill = typeof POR_SKILLS.$inferSelect;
export type NewSkill = typeof POR_SKILLS.$inferInsert;
export type Passion = typeof POR_PASSIONS.$inferSelect;
export type NewPassion = typeof POR_PASSIONS.$inferInsert;
export type SoftSkill = typeof POR_SOFT_SKILLS.$inferSelect;
export type NewSoftSkill = typeof POR_SOFT_SKILLS.$inferInsert;
