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

Le site est pensé comme une salle de spectacle : le plateau est baigné de bleu Congo (la gélatine Lee 181), une poursuite ambrée éclaire la signature, et les marques au sol sont du scotch rose. Chaque section porte un nom de plateau (Répertoire, Fiche technique, Entracte, Conduite, Sortie des artistes) suivi d'une didascalie qui dit en clair ce qu'on y trouve.

### 1. Couleurs et thèmes

Tout est défini dans `src/app.css`. Les couleurs de base :

```css
:root {
  --congo: #1c1842;      /* fond du plateau */
  --ivory: #f3ead9;      /* texte */
  --amber: #ffb547;      /* poursuite, liens */
  --spike: #ff5a8f;      /* marques de scotch, soulignés */
}
```

Les composants n'utilisent que les jetons sémantiques (`--paper`, `--ink`, `--ink-soft`, `--link`, `--mark`, `--spot`). Le thème clair (« salle allumée ») les redéfinit sous `[data-theme='light']`. Les anciens noms (`--bg-primary`, `--text-primary`, `--color-primary-*`…) restent disponibles pour l'admin.

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
- Les textes des annonces « Cherche compagnie » sont dans `opportunities.notices` des fichiers de traduction : ajoute, modifie ou retire une annonce directement là.

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