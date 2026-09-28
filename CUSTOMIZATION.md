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

Le site est pensé comme une salle de spectacle et son programme imprimé : papier blanc, encre noire, rouge rideau. Chaque section porte un nom de plateau (Répertoire, Fiche technique, Entracte, Conduite, Prochaine saison, Sortie des artistes) suivi d'un sous-titre en clair et d'une didascalie.

### 1. Couleurs et thèmes

Tout est défini dans `src/app.css`. Deux thèmes :

- **Clair** (`[data-theme='light']`, par défaut) : le programme, papier `#fbf9f5`, encre `#1b1715`, rouge `#c4261e`.
- **Sombre** (`[data-theme='dark']`) : son négatif, noir neutre `#161616`, texte `#f2f0ec`, même rouge.

Le thème suit le réglage du système tant que le visiteur n'a pas cliqué sur la servante ; son choix est ensuite mémorisé. Le script inline de `src/app.html` applique le thème avant le premier affichage.

Les composants n'utilisent que les jetons sémantiques (`--paper`, `--ink`, `--ink-soft`, `--link`, `--mark`, `--spot`). La classe `.inverse` imprime une bande en négatif (noire en clair, papier en sombre). Les anciens noms (`--bg-primary`, `--text-primary`, `--color-primary-*`…) restent disponibles pour l'admin.

### 2. Typographie

Deux familles, chargées depuis Google Fonts dans `src/app.html` :

- **Big Shoulders Display** (`--font-poster`) : titres, navigation, numéros de la conduite.
- **Spectral** (`--font-text`) : texte courant et didascalies en italique.

L'échelle typographique est dans les variables `--step--1` à `--step-4`.

### 3. La signature

`static/images/signature-mask.png` est une version recadrée et allégée (≈ 110 Ko) de `signature.png`. Elle est utilisée comme masque CSS par `Signature.svelte` : elle prend donc la couleur du texte autour d'elle. Si tu changes de signature, régénère le masque au même format (blanc sur fond transparent).

### 4. Composants de mise en scène

- `SceneTitle.svelte` : titre de section + didascalie.
- `Servante.svelte` : l'ampoule de la servante, utilisée pour le bouton de thème et la page 404.
- `ProjectEntry.svelte` : une entrée du répertoire (accueil et page projets).
- `NextSeasonSection.svelte` : « Prochaine saison », les directions vers lesquelles tu t'orientes. Les textes sont dans `next.items` des fichiers de traduction.

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
- **Signature** : Remplace `static/images/signature.png` et régénère `static/images/signature-mask.png`.
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