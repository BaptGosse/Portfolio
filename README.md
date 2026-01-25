# Portfolio - Baptiste Gosselin

Portfolio personnel moderne développé avec SvelteKit et PostgreSQL, avec support multilingue (FR/EN) et interface d'administration complète.

## 🚀 Technologies

### Frontend
- **SvelteKit** - Framework web moderne avec Svelte 5 Runes
- **TypeScript** - Typage statique
- **svelte-i18n** - Internationalisation FR/EN
- **marked** - Parsing Markdown pour le blog
- **Lucide Svelte** - Icônes modernes

### Backend
- **PostgreSQL** - Base de données relationnelle
- **Drizzle ORM** - ORM TypeScript avec migrations
- **Argon2id** - Hashing sécurisé des mots de passe

### Outils
- **Vite** - Build tool ultra-rapide
- **Docker Compose** - Orchestration PostgreSQL
- **tsx** - Exécution TypeScript pour les scripts

## 📦 Installation

### Prérequis

- Node.js 20+
- PostgreSQL 14+ (ou Docker)
- npm ou pnpm

### Démarrage rapide

```bash
# Cloner le dépôt
git clone https://github.com/BaptGosse/portfolio.git
cd portfolio

# Installer les dépendances
npm install

# Copier le fichier d'environnement
cp .env.example .env
# Éditer .env avec vos informations

# Lancer PostgreSQL avec Docker (optionnel)
docker-compose up -d

# Générer et appliquer les migrations
npx drizzle-kit push

# Migrer les données initiales (optionnel)
tsx scripts/migrate-data.ts
tsx scripts/migrate-skills.ts

# Lancer le serveur de développement
npm run dev

# Ouvrir dans le navigateur
open http://localhost:5173
```

## 🏗️ Structure du projet

```
src/
├── lib/
│   ├── components/           # Composants Svelte réutilisables
│   │   ├── HeroSection.svelte
│   │   ├── ProjectsSection.svelte
│   │   ├── StackSection.svelte
│   │   ├── ExperienceSection.svelte
│   │   └── ContactSection.svelte
│   ├── server/
│   │   └── db/
│   │       ├── index.ts     # Configuration Drizzle
│   │       └── schema.ts    # Schéma de la base de données
│   ├── types/               # Types TypeScript
│   └── utils/               # Utilitaires (i18n-helpers, etc.)
├── routes/
│   ├── +layout.svelte       # Layout principal
│   ├── +page.svelte         # Page d'accueil
│   ├── +page.server.ts      # Chargement données depuis BDD
│   ├── projects/            # Page projets
│   ├── blog/                # Articles de blog
│   └── admin/               # Dashboard d'administration
│       ├── posts/           # CRUD articles
│       ├── projects/        # CRUD projets
│       ├── experiences/     # CRUD expériences
│       ├── technologies/    # CRUD technologies
│       └── skills/          # CRUD compétences
├── hooks.server.ts          # Détection locale FR/EN
└── posts/                   # (vide, données en BDD)

scripts/
├── migrate-data.ts          # Migration projets/posts/expériences
├── migrate-skills.ts        # Migration compétences
└── translate-content.ts     # Traduction automatique FR→EN

docs/
└── DATABASE.md              # Documentation complète du schéma

archive/
└── old-data/                # Anciens fichiers statiques archivés
```

## 💾 Base de Données

### Schéma

Le projet utilise PostgreSQL avec des colonnes JSONB pour le multilingue:

- **POR_USERS** - Utilisateurs administrateurs
- **POR_POSTS** - Articles de blog multilingues
- **POR_TAGS** - Tags pour les articles
- **POR_PROJECTS** - Projets multilingues avec featured flag
- **POR_TECHNOLOGIES** - Technologies (partagées entre projets/expériences/skills)
- **POR_EXPERIENCES** - Parcours professionnel et éducatif
- **POR_SKILL_CATEGORIES** - Catégories de compétences
- **POR_SKILLS** - Compétences individuelles
- **POR_SESSIONS** - Sessions d'authentification

Voir la [documentation complète du schéma](./docs/DATABASE.md).

### Migrations

```bash
# Générer une nouvelle migration
npx drizzle-kit generate

# Appliquer les migrations
npx drizzle-kit push

# Voir le schéma actuel
npx drizzle-kit studio
```

## 🔐 Administration

### Accès au dashboard

L'interface d'administration est disponible à `/admin` :

```
URL: http://localhost:5173/admin
Email: portfolio@baptiste-gosselin.fr
Mot de passe: (configuré lors de la création utilisateur)
```

### Fonctionnalités admin

- ✅ **Articles de blog** : Création avec support Markdown et JSONB FR/EN
- ✅ **Projets** : Gestion des projets avec technologies et featured toggle
- ✅ **Expériences** : Timeline professionnelle avec dates et technologies
- ✅ **Compétences** : Catégories et compétences (Stack technique)
- ✅ **Technologies** : Base partagée par projets/expériences/skills
- ✅ **Tags** : Organisation des articles

Toutes les interfaces incluent des onglets FR/EN pour saisir les traductions.

## 🌍 Internationalisation

Le site supporte français et anglais via `svelte-i18n`.

### Détection de la langue

1. Cookie `locale` (si défini)
2. Header `Accept-Language` du navigateur
3. Fallback sur français

### Traduction automatique

```bash
# Traduire automatiquement tous les contenus FR → EN
tsx scripts/translate-content.ts
```

### Traductions dans le code

```typescript
// Accès aux champs JSONB
const locale = locals.locale || 'fr';
const title = project.PRJ_TITLE[locale] || project.PRJ_TITLE.fr;
```

## ✍️ Ajouter du contenu

### Via l'interface admin (recommandé)

1. Se connecter à `/admin`
2. Naviguer vers la section voulue (Posts, Projects, etc.)
3. Cliquer sur "Nouveau"
4. Remplir les champs FR et EN
5. Publier

### Via scripts de migration

Pour importer des données en masse, créer un script dans `/scripts/`:

```typescript
import { db } from '../src/lib/server/db';
import { POR_PROJECTS } from '../src/lib/server/db/schema';

const projects = [
  {
    PRJ_TITLE: { fr: 'Mon Projet', en: 'My Project' },
    PRJ_DESCRIPTION: { fr: '...', en: '...' },
    // ...
  }
];

await db.insert(POR_PROJECTS).values(projects);
```

## 🎨 Personnalisation

### Variables CSS

Les couleurs et styles sont définis dans `src/app.css` avec des CSS custom properties:

```css
:root {
  --color-primary-400: #c19fff;
  --color-accent: #c19fff;
  --bg-primary: #0f1420;
  /* ... */
}
```

### Informations personnelles

Configurer dans `.env`:

```env
PUBLIC_SITE_URL=https://yoursite.com
PUBLIC_EMAIL=contact@yoursite.com
PUBLIC_GITHUB=https://github.com/yourusername
PUBLIC_LINKEDIN=https://linkedin.com/in/yourusername
```

## 📝 Build pour production

```bash
# Build optimisé
npm run build

# Prévisualiser le build
npm run preview

# Linter et type-check
npm run check
```

## 🐳 Docker

### Lancer PostgreSQL

```bash
docker-compose up -d
```

### Configuration

Les variables sont dans `.env`:

```env
POSTGRES_USER=portfolio
POSTGRES_PASSWORD=portfolio
POSTGRES_DB=portfolio
```

## 🚀 Déploiement

Le projet utilise `adapter-auto` compatible avec:

- **Vercel** - Déploiement automatique avec PostgreSQL externe
- **Netlify** - Nécessite PostgreSQL externe
- **VPS/Serveur** - Node.js + PostgreSQL + PM2/systemd

### Variables d'environnement requises

```env
DATABASE_URL=postgresql://user:pass@host:5432/db
PUBLIC_SITE_URL=https://yoursite.com
PUBLIC_EMAIL=contact@yoursite.com
```

## 📡 API & Flux

### RSS/Atom

- RSS : `/rss.xml`
- Atom : `/atom.xml`

### Routes API futures

- [ ] `/api/projects` - Liste publique des projets
- [ ] `/api/posts` - Articles de blog avec pagination

## 🧪 Tests

_(À implémenter)_

```bash
npm run test
npm run test:unit
npm run test:integration
```

## 📚 Documentation

- [Schéma de la base de données](./docs/DATABASE.md)
- [SvelteKit Docs](https://svelte.dev/docs/kit)
- [Drizzle ORM Docs](https://orm.drizzle.team)

## 🛠️ Scripts disponibles

```bash
npm run dev              # Serveur de développement
npm run build            # Build production
npm run preview          # Preview build local
npm run check            # Type-check TypeScript
npm run migrate:data     # Migrer données initiales
npm run migrate:skills   # Migrer compétences
npm run translate        # Traduction auto FR→EN
```

## 📄 Licence

Projet personnel - Baptiste Gosselin © 2026

---

**Baptiste Gosselin**
Étudiant en Informatique - Infrastructure & Cloud-Native
Spécialisé en Kubernetes, DevOps et Développement Système

🌐 [baptiste-gosselin.fr](https://baptiste-gosselin.fr)
📧 [contact@baptiste-gosselin.fr](mailto:contact@baptiste-gosselin.fr)
💼 [LinkedIn](https://linkedin.com/in/baptgosse)
🐙 [GitHub](https://github.com/BaptGosse)
