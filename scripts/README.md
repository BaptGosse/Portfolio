# Scripts Utilitaires

Ce dossier contient tous les scripts utilitaires pour gérer votre portfolio.

## 🔐 Administration

### `create-admin.ts`
Créer un utilisateur administrateur pour accéder au dashboard `/admin`.

```bash
# Via npm
npm run db:create-admin admin@example.com MotDePasse123 "Votre Nom"

# Ou via tsx
tsx scripts/create-admin.ts admin@example.com MotDePasse123 "Votre Nom"

# Arguments :
# 1. Email (obligatoire)
# 2. Mot de passe (obligatoire, min 8 caractères)
# 3. Nom (optionnel, défaut: "Admin")
```

## 💾 Backup & Restauration

### `backup-db.sh`
Créer une sauvegarde de la base de données.

```bash
# Backup manuel
./scripts/backup-db.sh

# Les backups sont stockés dans ./backups/
# Format: portfolio_YYYYMMDD_HHMMSS.sql.gz
# Nécessite DATABASE_URL dans .env
```

### `restore-db.sh`
Restaurer une sauvegarde de la base de données.

```bash
# Restaurer un backup
./scripts/restore-db.sh backups/portfolio_20250125_120000.sql.gz

# ⚠️ ATTENTION : Cela remplace toutes les données existantes !
```

## 📦 Migration de Données

### `migrate-data.ts`
Migrer les données initiales (technologies, projets, expériences).

```bash
npm run migrate:data
```

### `migrate-skills.ts`
Migrer les compétences et catégories.

```bash
npm run migrate:skills
```

### `migrate-passions.ts`
Migrer les passions et soft skills.

```bash
npm run migrate:passions
```

## 🌐 Traduction

### `translate-content.ts`
Traduire automatiquement le contenu manquant.

```bash
npm run translate
```

### `check-translations.ts`
Vérifier la cohérence des traductions.

```bash
npm run check:translations
```

## 📝 Notes

- Tous les scripts TypeScript nécessitent `tsx` : `npm install -g tsx`
- Les scripts shell nécessitent `bash` et `pg_dump`/`psql`
- Définissez toujours `DATABASE_URL` dans votre `.env` ou en variable d'environnement

## ⚙️ Automatisation

Pour automatiser les backups quotidiens :

```bash
# Ajouter au crontab
crontab -e

# Backup tous les jours à 2h du matin
0 2 * * * cd /path/to/portfolio && DATABASE_URL="..." ./scripts/backup-db.sh >> /var/log/portfolio-backup.log 2>&1
```
