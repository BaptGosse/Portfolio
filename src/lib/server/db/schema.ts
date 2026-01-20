import { pgTable, text, timestamp, boolean, uuid, varchar, primaryKey } from 'drizzle-orm/pg-core';

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
	POS_TITLE: varchar('POS_TITLE', { length: 255 }).notNull(),
	POS_DESCRIPTION: varchar('POS_DESCRIPTION', { length: 500 }).notNull(),
	POS_CONTENT: text('POS_CONTENT').notNull(),
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
	PRJ_TITLE: varchar('PRJ_TITLE', { length: 255 }).notNull(),
	PRJ_DESCRIPTION: text('PRJ_DESCRIPTION').notNull(),
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
	TEC_NAME: varchar('TEC_NAME', { length: 64 }).notNull().unique(),
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
