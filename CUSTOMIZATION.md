# Guide de personnalisation

Ce guide explique comment personnaliser ton portfolio selon tes besoins.

## 📝 Informations personnelles

### 1. Données de base

Modifier `src/lib/data/projects.ts` :

```typescript
// Ajouter tes projets
export const projects: Project[] = [
  {
    id: 'mon-projet',
    title: 'Mon Super Projet',
    description: 'Description...',
    technologies: ['Tech1', 'Tech2'],
    github: 'https://github.com/...',
    featured: true
  }
];

// Ajouter tes expériences
export const experiences: Experience[] = [
  // ...
];

// Modifier tes compétences
export const skills = {
  'Catégorie 1': ['Skill 1', 'Skill 2'],
  // ...
};
```

### 2. Footer et contact

Modifier `src/lib/components/Footer.svelte` :

```typescript
const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/ton-username', icon: 'github' },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/ton-profil', icon: 'linkedin' },
  { name: 'Email', href: 'mailto:ton-email@exemple.com', icon: 'email' }
];
```

### 3. Configuration des flux RSS/Atom

Modifier dans `src/routes/rss.xml/+server.ts` et `src/routes/atom.xml/+server.ts` :

```typescript
const siteUrl = 'https://ton-domaine.com';
const author = {
  name: 'Ton Nom',
  email: 'ton-email@exemple.com'
};
```

## 🎨 Design et couleurs

### Thème de couleurs

Modifier `tailwind.config.js` :

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#...',
        100: '#...',
        // ... personnaliser toute la palette
        900: '#...',
      }
    }
  }
}
```

### Couleurs de fond

Modifier `src/app.css` :

```css
@layer base {
  body {
    @apply bg-gray-950 text-gray-100; /* Changer ici */
  }
}
```

## ✍️ Créer du contenu

### Ajouter un article de blog

1. Créer un fichier dans `src/posts/nom-article.md`
2. Ajouter le frontmatter :

```markdown
---
title: 'Titre de mon article'
description: 'Description courte'
date: '2025-12-12'
tags: ['tag1', 'tag2', 'tag3']
published: true
---

# Titre

Contenu en Markdown...
```

### Syntaxe Markdown supportée

- Headings : `# H1`, `## H2`, etc.
- **Gras** : `**texte**`
- *Italique* : `*texte*`
- Listes : `- item` ou `1. item`
- Code inline : `` `code` ``
- Blocs de code :
  ````markdown
  ```javascript
  const code = 'here';
  ```
  ````
- Liens : `[texte](url)`
- Images : `![alt](url)`

## 🖼️ Images et médias

### Ajouter des images statiques

1. Placer les images dans `static/`
2. Référencer : `/nom-image.jpg`

Exemple dans un composant :
```svelte
<img src="/projets/mon-projet.png" alt="Description" />
```

### Images dans les articles

```markdown
![Description de l'image](/images/mon-image.png)
```

## 🔧 Composants personnalisés

### Créer un nouveau composant

1. Créer un fichier dans `src/lib/components/MonComposant.svelte`
2. Utiliser dans une page :

```svelte
<script>
  import MonComposant from '$lib/components/MonComposant.svelte';
</script>

<MonComposant prop="valeur" />
```

## 🌐 SEO et métadonnées

### Modifier les meta tags

Dans chaque page, utiliser :

```svelte
<svelte:head>
  <title>Titre de la page</title>
  <meta name="description" content="Description..." />
</svelte:head>
```

### Ajouter Open Graph (réseaux sociaux)

```svelte
<svelte:head>
  <meta property="og:title" content="Titre" />
  <meta property="og:description" content="Description" />
  <meta property="og:image" content="https://ton-site.com/image.jpg" />
  <meta property="og:url" content="https://ton-site.com/page" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>
```

## 📱 Responsive design

Les breakpoints Tailwind :
- `sm:` : ≥640px
- `md:` : ≥768px
- `lg:` : ≥1024px
- `xl:` : ≥1280px
- `2xl:` : ≥1536px

Exemple :
```svelte
<div class="text-base md:text-lg lg:text-xl">
  Texte responsive
</div>
```

## 🚀 Déploiement

### Variables d'environnement

Créer un fichier `.env` basé sur `.env.example` :

```bash
cp .env.example .env
```

Puis modifier les valeurs.

### Build de production

```bash
npm run build
npm run preview  # Tester localement
```

### Adapters SvelteKit

Pour un déploiement spécifique, installer l'adapter approprié :

```bash
# Node.js
npm i -D @sveltejs/adapter-node

# Static (GitHub Pages, etc.)
npm i -D @sveltejs/adapter-static

# Vercel
npm i -D @sveltejs/adapter-vercel

# Netlify
npm i -D @sveltejs/adapter-netlify
```

Puis modifier `svelte.config.js` :

```javascript
import adapter from '@sveltejs/adapter-node'; // ou autre

const config = {
  kit: {
    adapter: adapter()
  }
};
```

## 💡 Astuces

### Performance

- Optimiser les images (WebP, compression)
- Utiliser le lazy loading : `<img loading="lazy" />`
- Minimiser les imports

### Accessibilité

- Toujours ajouter des `alt` aux images
- Utiliser des titres hiérarchiques (H1 → H2 → H3)
- Tester au clavier (navigation Tab)

### TypeScript

Typer les props des composants :

```typescript
<script lang="ts">
  import type { MonType } from '$lib/types';

  let { prop1, prop2 }: {
    prop1: string;
    prop2: MonType
  } = $props();
</script>
```

---

Pour plus d'informations, consulter la [documentation SvelteKit](https://svelte.dev/docs/kit).
