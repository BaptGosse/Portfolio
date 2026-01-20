# Portfolio - Baptiste Gosselin

Portfolio personnel développé avec SvelteKit, présentant mes projets, compétences et articles techniques.

## 🚀 Technologies

- **SvelteKit** - Framework web moderne
- **TypeScript** - Typage statique
- **TailwindCSS** - Styling avec @tailwindcss/typography
- **mdsvex** - Support Markdown pour le blog
- **RSS/Atom** - Flux de syndication pour les articles

## 📦 Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Ouvrir dans le navigateur
npm run dev -- --open
```

## 🏗️ Structure du projet

```
src/
├── lib/
│   ├── components/      # Composants réutilisables
│   │   ├── Header.svelte
│   │   ├── Footer.svelte
│   │   ├── ProjectCard.svelte
│   │   └── BlogPostCard.svelte
│   ├── layouts/         # Layouts pour le contenu
│   │   └── BlogLayout.svelte
│   ├── data/            # Données statiques
│   │   └── projects.ts
│   └── types/           # Types TypeScript
│       └── index.ts
├── routes/              # Routes et pages
│   ├── +layout.svelte   # Layout principal
│   ├── +page.svelte     # Page d'accueil
│   ├── projects/        # Page projets
│   ├── blog/            # Blog avec posts markdown
│   ├── rss.xml/         # Flux RSS
│   └── atom.xml/        # Flux Atom
└── posts/               # Articles de blog (Markdown)
    ├── bienvenue.md
    └── orchestration-go.md
```

## ✍️ Ajouter un article de blog

Créer un fichier `.md` dans `src/posts/` avec le frontmatter suivant :

```markdown
---
title: 'Titre de l''article'
description: 'Description courte'
date: '2025-12-12'
tags: ['tag1', 'tag2']
published: true
---

# Contenu de l'article

Votre contenu en Markdown...
```

## 🔧 Personnalisation

### Modifier les informations personnelles

- **Données** : `src/lib/data/projects.ts`
- **Footer** : `src/lib/components/Footer.svelte`
- **URLs des flux** : `src/routes/rss.xml/+server.ts` et `src/routes/atom.xml/+server.ts`

### Couleurs du thème

Les couleurs sont configurées dans `tailwind.config.js` :

```js
colors: {
  primary: {
    // Personnaliser ici
  }
}
```

## 📝 Build pour production

```bash
# Créer un build de production
npm run build

# Prévisualiser le build
npm run preview
```

## 🌐 Déploiement

Le projet est configuré avec `adapter-auto` qui détecte automatiquement la plateforme :

- Vercel
- Netlify
- Cloudflare Pages
- Node.js

Pour un déploiement spécifique, consulter [la documentation SvelteKit](https://svelte.dev/docs/kit/adapters).

## 📡 Flux RSS/Atom

Les flux sont disponibles aux URLs :
- RSS : `/rss.xml`
- Atom : `/atom.xml`

## 🛠️ Développement futur

- [ ] API publique
- [ ] Dépôt Debian
- [ ] Dépôt Arch
- [ ] Plus d'articles techniques
- [ ] Section contact avec formulaire

## 📄 Licence

Projet personnel - Baptiste Gosselin

---

**Baptiste Gosselin** - Ingénieur Systèmes & Développeur Backend
Spécialisé en Linux, DevOps et Infrastructure
