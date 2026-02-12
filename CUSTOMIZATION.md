# Guide de personnalisation

Ce guide explique comment personnaliser ton portfolio selon tes besoins, que ce soit au niveau des données ou du design.

## ✍️ Gestion du contenu

Le contenu est désormais géré via une base de données PostgreSQL et une interface d'administration.

### 1. Utiliser le Dashboard Admin

Le moyen le plus simple de personnaliser ton contenu est d'utiliser l'interface d'administration à `/admin`.

- **Projets** : Ajouter, modifier ou supprimer tes projets phares.
- **Expériences** : Gérer ton parcours professionnel et éducatif.
- **Compétences** : Organiser tes compétences techniques par catégories.
- **Blog** : Écrire des articles en Markdown avec support multilingue.
- **Passions & Soft Skills** : Personnaliser tes hobbies et compétences transversales.
- **Technologies** : Gérer la liste des technos partagées.

### 2. Internationalisation (FR/EN)

Chaque formulaire dans l'admin possède des onglets **Français** et **Anglais**. Assure-toi de remplir les deux pour une expérience utilisateur complète.

Si tu as beaucoup de contenu en français, tu peux utiliser le script de traduction automatique :
```bash
npm run translate
```

### 3. Migration initiale

Si tu souhaites repartir des données statiques présentes dans `src/lib/data/projects.ts` ou des fichiers Markdown dans `src/posts/`, utilise les scripts de migration :

```bash
npm run migrate:data
npm run migrate:skills
npm run migrate:passions
```

## 🎨 Design et Style

Le projet utilise des variables CSS (Custom Properties) pour une personnalisation facile et globale.

### 1. Couleurs et Thèmes

Toutes les couleurs sont définies dans `src/app.css` sous le sélecteur `:root`.

#### Palette de base
Modifie les variables `--color-primary-*` pour changer la couleur d'accentuation principale (actuellement violet).

```css
:root {
  --color-primary-500: #a855f7; /* Couleur principale */
  /* ... */
}
```

#### Variables thématiques
Tu peux ajuster les couleurs de fond et de texte pour le mode sombre (défaut) et le mode clair :

```css
:root {
  /* Mode Sombre */
  --bg-primary: #0f1420;
  --text-primary: #f8fafc;
}

[data-theme="light"] {
  /* Mode Clair */
  --bg-primary: #ffffff;
  --text-primary: #1e293b;
}
```

### 2. Typographie

Les polices sont importées au début de `src/app.css`. Tu peux changer les polices par défaut en modifiant les variables :

```css
:root {
  --font-display: 'Sora', sans-serif; /* Titres */
  --font-body: 'DM Sans', sans-serif;  /* Corps de texte */
  --font-mono: 'JetBrains Mono', monospace; /* Code */
}
```

### 3. Espacements et Bordures

Tu peux globalement changer l'arrondi des cartes ou les espacements :

```css
:root {
  --radius-lg: 0.75rem;
  --spacing-md: 1rem;
}
```

## ⚙️ Configuration système

Les informations globales (Email, GitHub, LinkedIn) se configurent via les variables d'environnement dans le fichier `.env`.

```env
PUBLIC_SITE_URL=https://ton-domaine.com
PUBLIC_EMAIL=contact@ton-domaine.com
PUBLIC_GITHUB=https://github.com/ton-username
PUBLIC_LINKEDIN=https://linkedin.com/in/ton-username
```

## 🖼️ Médias et Favicon

- **Favicon** : Remplace `static/favicon.svg` ou `static/images/favicon.jpg`.
- **CV** : Remplace `static/documents/CV.pdf`.
- **Signature** : Remplace `static/images/signature.png`.
- **Images Projets** : Télécharge-les dans `static/images/` et utilise le chemin relatif dans l'admin (ex: `/images/mon-projet.png`).

## 🚀 Fonctionnalités avancées

### Flux RSS/Atom

Les informations de l'auteur pour les flux RSS sont récupérées depuis les variables d'environnement `PUBLIC_EMAIL` et `PUBLIC_SITE_URL`. Pour changer le nom de l'auteur, modifie :
- `src/routes/rss.xml/+server.ts`
- `src/routes/atom.xml/+server.ts`

### SEO

Pour modifier les meta tags globaux, édite `src/routes/+layout.svelte`. Pour des pages spécifiques, utilise le bloc `<svelte:head>` dans le fichier `+page.svelte` correspondant.

---

Besoin d'aide ? Consulte la documentation SvelteKit ou contacte-moi via GitHub.