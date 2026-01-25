# Database Schema Documentation

Ce fichier explique comment utiliser et maintenir les différents formats de schéma de base de données.

## Fichiers de Schéma

### 1. `src/lib/server/db/schema.ts` (Source de vérité)
Le schéma TypeScript Drizzle ORM est le **fichier source principal**. C'est lui qui définit la structure réelle de la base de données.

**Utilisation :**
```bash
# Générer une nouvelle migration après modification
npx drizzle-kit generate

# Appliquer les migrations à la base
npx drizzle-kit push

# Vérifier la cohérence
npx drizzle-kit check
```

### 2. `schema.dbml` (Visualisation)
Le fichier DBML est utilisé pour **visualiser** le schéma dans des outils comme :
- [dbdiagram.io](https://dbdiagram.io)
- [DrawDB.io](https://drawdb.vercel.app)

**⚠️ Important :** Ce fichier doit être maintenu **manuellement** en synchronisation avec `schema.ts`.

**Comment l'utiliser :**
1. Ouvrez [dbdiagram.io](https://dbdiagram.io) ou [DrawDB.io](https://drawdb.vercel.app)
2. Importez le fichier `schema.dbml`
3. Visualisez le diagramme ER complet

**Mise à jour :**
Après avoir modifié `schema.ts`, mettez à jour `schema.dbml` pour refléter les changements.

### 3. `docs/DATABASE.md` (Documentation)
Documentation complète de la base de données avec :
- Description de chaque table
- Exemples de requêtes Drizzle
- Guide des migrations
- Bonnes pratiques

**Mise à jour :**
Documentez toute modification majeure du schéma dans ce fichier.

## Structure de la Base de Données

### Tables Principales (15 tables)

**Authentification :**
- `POR_USERS` - Utilisateurs admin
- `POR_SESSIONS` - Sessions d'authentification

**Blog :**
- `POR_POSTS` - Articles de blog
- `POR_TAGS` - Tags pour les articles
- `POR_POSTS_TAGS` - Liaison Many-to-Many posts ↔ tags

**Projets :**
- `POR_PROJECTS` - Projets portfolio
- `POR_TECHNOLOGIES` - Technologies (partagée)
- `POR_PROJECTS_TECHNOLOGIES` - Liaison Many-to-Many projets ↔ technologies

**Expériences :**
- `POR_EXPERIENCES` - Expériences professionnelles/éducatives
- `POR_EXPERIENCES_TECHNOLOGIES` - Liaison Many-to-Many expériences ↔ technologies

**Compétences :**
- `POR_SKILL_CATEGORIES` - Catégories de compétences
- `POR_SKILLS` - Compétences techniques

**Passions :**
- `POR_PASSIONS` - Passions et hobbies
- `POR_SOFT_SKILLS` - Compétences transversales
- `POR_PASSIONS_SOFT_SKILLS` - Liaison Many-to-Many passions ↔ soft skills

## Internationalisation (i18n)

Tous les champs de contenu utilisent **JSONB** avec la structure :
```json
{
  "fr": "Texte en français",
  "en": "Text in English"
}
```

**Tables avec contenu multilingue :**
- POR_POSTS : title, description, content
- POR_PROJECTS : title, description
- POR_TECHNOLOGIES : name
- POR_EXPERIENCES : company, role, description
- POR_SKILL_CATEGORIES : name
- POR_SKILLS : name, context
- POR_PASSIONS : title, description
- POR_SOFT_SKILLS : name, description

## Clés Primaires Composites

Les tables de liaison utilisent des **clés primaires composites** :

```sql
-- Exemple : POR_POSTS_TAGS
PRIMARY KEY ("POS_ID", "TAG_ID")
```

**Tables concernées :**
- `POR_POSTS_TAGS` : (POS_ID, TAG_ID)
- `POR_PROJECTS_TECHNOLOGIES` : (PRJ_ID, TEC_ID)
- `POR_EXPERIENCES_TECHNOLOGIES` : (EXP_ID, TEC_ID)
- `POR_PASSIONS_SOFT_SKILLS` : (PAS_ID, SSK_ID)

## Workflow de Modification

### 1. Modifier le schéma TypeScript
```typescript
// src/lib/server/db/schema.ts
export const MA_NOUVELLE_TABLE = pgTable('MA_NOUVELLE_TABLE', {
  ID: uuid('ID').primaryKey().defaultRandom(),
  NAME: varchar('NAME', { length: 255 }).notNull()
});
```

### 2. Générer et appliquer la migration
```bash
npx drizzle-kit generate
npx drizzle-kit push
```

### 3. Mettre à jour le DBML
```dbml
// schema.dbml
Table MA_NOUVELLE_TABLE [headercolor: #123456] {
  ID uuid [ pk, not null ]
  NAME varchar(255) [ not null ]
}
```

### 4. Documenter le changement
Ajoutez une section dans `docs/DATABASE.md` pour expliquer la nouvelle table.

## Vérification de Cohérence

### Vérifier Drizzle
```bash
npx drizzle-kit check
```

### Vérifier la base PostgreSQL
```bash
docker exec portfolio-db psql -U portfolio -d portfolio -c "\dt"
```

### Visualiser le schéma
```bash
# Avec Drizzle Studio (interface graphique)
npx drizzle-kit studio
```

## Outils Recommandés

- **Drizzle Studio** : Interface graphique pour explorer la DB
  ```bash
  npx drizzle-kit studio
  ```

- **dbdiagram.io** : Visualisation ER interactive
  - Importez `schema.dbml`

- **pgAdmin / DBeaver** : Gestion PostgreSQL avancée

## Sécurité

- ✅ Les mots de passe sont hashés avec **Argon2id**
- ✅ Les sessions utilisent des **tokens UUID aléatoires**
- ✅ Toutes les routes admin nécessitent **authentification**
- ✅ Foreign keys avec **CASCADE** pour éviter les orphelins
- ✅ Paramètres bindés (protection SQL injection)

## Backup

### Créer un backup
```bash
docker exec portfolio-db pg_dump -U portfolio portfolio > backup.sql
```

### Restaurer un backup
```bash
docker exec -i portfolio-db psql -U portfolio portfolio < backup.sql
```

## Support

Pour toute question sur le schéma, consultez :
1. `docs/DATABASE.md` - Documentation détaillée
2. `schema.dbml` - Visualisation ER
3. `src/lib/server/db/schema.ts` - Définitions TypeScript
