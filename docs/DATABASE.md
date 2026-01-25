# Documentation Base de Données - Portfolio

## Vue d'ensemble

Le portfolio utilise PostgreSQL avec Drizzle ORM pour gérer toutes les données dynamiques. Toutes les données multilingues (FR/EN) sont stockées dans des colonnes JSONB.

## Schéma de la Base de Données

### Tables Principales

#### POR_USERS
Table des utilisateurs administrateurs.

```sql
- USR_ID: UUID (Primary Key)
- USR_EMAIL: VARCHAR(255) UNIQUE
- USR_PASSWORD_HASH: VARCHAR(255)
- USR_NAME: VARCHAR(64)
- USR_CREATED_AT: TIMESTAMP
- USR_UPDATED_AT: TIMESTAMP
```

#### POR_POSTS
Articles de blog avec contenu multilingue.

```sql
- POS_ID: UUID (Primary Key)
- POS_SLUG: VARCHAR(128) UNIQUE
- POS_TITLE: JSONB { fr: string, en: string }
- POS_DESCRIPTION: JSONB { fr: string, en: string }
- POS_CONTENT: JSONB { fr: string, en: string }
- POS_PUBLISHED: BOOLEAN
- POS_PUBLISHED_AT: TIMESTAMP
- USR_ID: UUID (Foreign Key → POR_USERS)
- POS_CREATED_AT: TIMESTAMP
- POS_UPDATED_AT: TIMESTAMP
```

#### POR_TAGS
Tags pour les articles de blog.

```sql
- TAG_ID: UUID (Primary Key)
- TAG_NAME: VARCHAR(64) UNIQUE
- TAG_SLUG: VARCHAR(64) UNIQUE
- TAG_CREATED_AT: TIMESTAMP
```

#### POR_POSTS_TAGS
Table de liaison entre posts et tags (Many-to-Many).

```sql
- POS_ID: UUID (Foreign Key → POR_POSTS)
- TAG_ID: UUID (Foreign Key → POR_TAGS)
- Primary Key: (POS_ID, TAG_ID)
```

#### POR_PROJECTS
Projets avec contenu multilingue.

```sql
- PRJ_ID: UUID (Primary Key)
- PRJ_SLUG: VARCHAR(128) UNIQUE
- PRJ_TITLE: JSONB { fr: string, en: string }
- PRJ_DESCRIPTION: JSONB { fr: string, en: string }
- PRJ_LINK: VARCHAR(255) (URL du projet live)
- PRJ_GITHUB: VARCHAR(255) (URL GitHub)
- PRJ_IMAGE: VARCHAR(255) (Chemin de l'image)
- PRJ_FEATURED: BOOLEAN (Projet phare)
- PRJ_ORDER: VARCHAR(10) (Ordre d'affichage)
- USR_ID: UUID (Foreign Key → POR_USERS)
- PRJ_CREATED_AT: TIMESTAMP
- PRJ_UPDATED_AT: TIMESTAMP
```

#### POR_TECHNOLOGIES
Technologies avec noms multilingues.

```sql
- TEC_ID: UUID (Primary Key)
- TEC_NAME: JSONB { fr: string, en: string }
- TEC_SLUG: VARCHAR(64) UNIQUE
- TEC_CREATED_AT: TIMESTAMP
```

#### POR_PROJECTS_TECHNOLOGIES
Table de liaison entre projets et technologies (Many-to-Many).

```sql
- PRJ_ID: UUID (Foreign Key → POR_PROJECTS)
- TEC_ID: UUID (Foreign Key → POR_TECHNOLOGIES)
- Primary Key: (PRJ_ID, TEC_ID)
```

#### POR_EXPERIENCES
Expériences professionnelles et éducatives.

```sql
- EXP_ID: UUID (Primary Key)
- EXP_COMPANY: JSONB { fr: string, en: string }
- EXP_ROLE: JSONB { fr: string, en: string }
- EXP_DESCRIPTION: JSONB { fr: string, en: string }
- EXP_TYPE: VARCHAR(20) ('work' ou 'education')
- EXP_ORDER: VARCHAR(10) (Ordre d'affichage)
- EXP_START_DATE: TIMESTAMP
- EXP_END_DATE: TIMESTAMP (null = présent)
- EXP_COMPANY_URL: VARCHAR(255)
- EXP_LOGO: VARCHAR(255)
- USR_ID: UUID (Foreign Key → POR_USERS)
- EXP_CREATED_AT: TIMESTAMP
- EXP_UPDATED_AT: TIMESTAMP
```

#### POR_EXPERIENCES_TECHNOLOGIES
Table de liaison entre expériences et technologies (Many-to-Many).

```sql
- EXP_ID: UUID (Foreign Key → POR_EXPERIENCES)
- TEC_ID: UUID (Foreign Key → POR_TECHNOLOGIES)
- Primary Key: (EXP_ID, TEC_ID)
```

#### POR_SKILL_CATEGORIES
Catégories de compétences (Stack technique).

```sql
- CAT_ID: UUID (Primary Key)
- CAT_NAME: JSONB { fr: string, en: string }
- CAT_ORDER: VARCHAR(10) (Ordre d'affichage)
- USR_ID: UUID (Foreign Key → POR_USERS)
- CAT_CREATED_AT: TIMESTAMP
- CAT_UPDATED_AT: TIMESTAMP
```

#### POR_SKILLS
Compétences individuelles par catégorie.

```sql
- SKI_ID: UUID (Primary Key)
- SKI_NAME: JSONB { fr: string, en: string }
- SKI_CONTEXT: JSONB { fr: string, en: string } (Description/contexte)
- SKI_ORDER: VARCHAR(10) (Ordre d'affichage)
- CAT_ID: UUID (Foreign Key → POR_SKILL_CATEGORIES)
- USR_ID: UUID (Foreign Key → POR_USERS)
- SKI_CREATED_AT: TIMESTAMP
- SKI_UPDATED_AT: TIMESTAMP
```

#### POR_PASSIONS
Passions et hobbies personnels.

```sql
- PAS_ID: UUID (Primary Key)
- PAS_TITLE: JSONB { fr: string, en: string }
- PAS_DESCRIPTION: JSONB { fr: string, en: string }
- PAS_ICON: VARCHAR(50) (Nom de l'icône Lucide)
- PAS_IMAGE: VARCHAR(255) (URL d'image optionnelle)
- PAS_ORDER: VARCHAR(10) (Ordre d'affichage)
- USR_ID: UUID (Foreign Key → POR_USERS)
- PAS_CREATED_AT: TIMESTAMP
- PAS_UPDATED_AT: TIMESTAMP
```

#### POR_SOFT_SKILLS
Compétences transversales (soft skills).

```sql
- SSK_ID: UUID (Primary Key)
- SSK_NAME: JSONB { fr: string, en: string }
- SSK_DESCRIPTION: JSONB { fr: string, en: string }
- SSK_ICON: VARCHAR(50) (Nom de l'icône Lucide)
- SSK_ORDER: VARCHAR(10) (Ordre d'affichage)
- USR_ID: UUID (Foreign Key → POR_USERS)
- SSK_CREATED_AT: TIMESTAMP
- SSK_UPDATED_AT: TIMESTAMP
```

#### POR_PASSIONS_SOFT_SKILLS
Table de liaison entre passions et soft skills (Many-to-Many).

```sql
- PAS_ID: UUID (Foreign Key → POR_PASSIONS)
- SSK_ID: UUID (Foreign Key → POR_SOFT_SKILLS)
- Primary Key: (PAS_ID, SSK_ID)
```

#### POR_SESSIONS
Sessions d'authentification.

```sql
- SES_ID: UUID (Primary Key)
- USR_ID: UUID (Foreign Key → POR_USERS)
- SES_TOKEN: VARCHAR(255) UNIQUE
- SES_EXPIRES_AT: TIMESTAMP
- SES_CREATED_AT: TIMESTAMP
```

## Exemples de Requêtes

### Récupérer tous les projets phares avec leurs technologies

```typescript
const featuredProjects = await db
	.select()
	.from(POR_PROJECTS)
	.where(eq(POR_PROJECTS.PRJ_FEATURED, true))
	.orderBy(asc(POR_PROJECTS.PRJ_ORDER), desc(POR_PROJECTS.PRJ_CREATED_AT));

// Pour chaque projet, récupérer ses technologies
const techs = await db
	.select({
		name: POR_TECHNOLOGIES.TEC_NAME
	})
	.from(POR_PROJECTS_TECHNOLOGIES)
	.innerJoin(POR_TECHNOLOGIES, eq(POR_PROJECTS_TECHNOLOGIES.TEC_ID, POR_TECHNOLOGIES.TEC_ID))
	.where(eq(POR_PROJECTS_TECHNOLOGIES.PRJ_ID, projectId));
```

### Récupérer les posts publiés avec leurs tags

```typescript
const posts = await db
	.select()
	.from(POR_POSTS)
	.where(eq(POR_POSTS.POS_PUBLISHED, true))
	.orderBy(desc(POR_POSTS.POS_PUBLISHED_AT));

// Tags pour un post
const postTags = await db
	.select({
		name: POR_TAGS.TAG_NAME,
		slug: POR_TAGS.TAG_SLUG
	})
	.from(POR_POSTS_TAGS)
	.innerJoin(POR_TAGS, eq(POR_POSTS_TAGS.TAG_ID, POR_TAGS.TAG_ID))
	.where(eq(POR_POSTS_TAGS.POS_ID, postId));
```

### Récupérer les expériences triées par ordre et date

```typescript
const experiences = await db
	.select()
	.from(POR_EXPERIENCES)
	.orderBy(asc(POR_EXPERIENCES.EXP_ORDER), desc(POR_EXPERIENCES.EXP_START_DATE));
```

### Récupérer les compétences groupées par catégories

```typescript
const categories = await db
	.select()
	.from(POR_SKILL_CATEGORIES)
	.orderBy(asc(POR_SKILL_CATEGORIES.CAT_ORDER));

// Pour chaque catégorie, récupérer les compétences
const skills = await db
	.select()
	.from(POR_SKILLS)
	.where(eq(POR_SKILLS.CAT_ID, categoryId))
	.orderBy(asc(POR_SKILLS.SKI_ORDER));
```

### Récupérer les passions avec leurs soft skills associées

```typescript
const passions = await db
	.select()
	.from(POR_PASSIONS)
	.orderBy(asc(POR_PASSIONS.PAS_ORDER));

// Pour chaque passion, récupérer les soft skills
const softSkills = await db
	.select({
		id: POR_SOFT_SKILLS.SSK_ID,
		name: POR_SOFT_SKILLS.SSK_NAME,
		description: POR_SOFT_SKILLS.SSK_DESCRIPTION,
		icon: POR_SOFT_SKILLS.SSK_ICON
	})
	.from(POR_PASSIONS_SOFT_SKILLS)
	.innerJoin(POR_SOFT_SKILLS, eq(POR_PASSIONS_SOFT_SKILLS.SSK_ID, POR_SOFT_SKILLS.SSK_ID))
	.where(eq(POR_PASSIONS_SOFT_SKILLS.PAS_ID, passionId));
```

### Accéder aux champs JSONB avec locale

```typescript
const locale = 'fr'; // ou 'en'

// Accès simple
const title = post.POS_TITLE[locale] || post.POS_TITLE.fr;

// Dans une query
const posts = dbPosts.map(p => ({
	title: p.POS_TITLE[locale] || p.POS_TITLE.fr,
	description: p.POS_DESCRIPTION[locale] || p.POS_DESCRIPTION.fr,
	content: p.POS_CONTENT[locale] || p.POS_CONTENT.fr
}));
```

## Migrations

Les migrations sont gérées par Drizzle Kit.

### Générer une migration

```bash
npx drizzle-kit generate
```

### Appliquer les migrations

```bash
npx drizzle-kit push
```

### Scripts de migration de données

Des scripts sont disponibles dans `/scripts/` pour migrer les données depuis les fichiers statiques :

- `migrate-data.ts` : Migration complète des technologies, projets, expériences et posts
- `migrate-skills.ts` : Migration des compétences et catégories
- `migrate-passions.ts` : Migration des passions et soft skills

```bash
tsx scripts/migrate-data.ts
tsx scripts/migrate-skills.ts
tsx scripts/migrate-passions.ts
```

## Configuration

### Variables d'environnement

```env
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
```

### Connexion à la base

```typescript
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle(client);
```

## Admin Dashboard

Le dashboard admin (`/admin`) permet de gérer toutes les données:

**Blog :**
- **/admin/posts** : Gestion des articles de blog
- **/admin/tags** : Gestion des tags

**Portfolio :**
- **/admin/projects** : Gestion des projets
- **/admin/experiences** : Gestion des expériences professionnelles/éducatives
- **/admin/technologies** : Gestion des technologies (partagées)

**Compétences & Passions :**
- **/admin/skills** : Gestion des compétences techniques par catégories
- **/admin/passions** : Gestion des passions et hobbies
- **/admin/soft-skills** : Gestion des soft skills (compétences transversales)

Toutes les interfaces incluent des onglets FR/EN pour la saisie multilingue.

## Bonnes Pratiques

1. **Toujours prévoir un fallback** : `data[locale] || data.fr`
2. **Utiliser les transactions** pour les opérations qui modifient plusieurs tables
3. **Valider les données** avant insertion (longueur, format, etc.)
4. **Indexer** les colonnes fréquemment recherchées (slug, published, featured, etc.)
5. **Utiliser CASCADE** sur les foreign keys pour éviter les données orphelines
6. **Ne jamais exposer** les mots de passe hashés ou tokens de session

## Sécurité

- Les mots de passe sont hashés avec **Argon2id**
- Les sessions utilisent des **tokens UUIDv4 aléatoires**
- Toutes les routes admin nécessitent **authentification**
- Les inputs utilisateurs sont **validés** et **échappés**
- Les requêtes utilisent des **paramètres bindés** (protection SQL injection)
