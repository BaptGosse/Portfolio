# Scripts Utilitaires

Ce dossier contient tous les scripts utilitaires pour gérer votre portfolio.

## 🔐 Administration

### `create-admin.ts`
Créer un utilisateur administrateur pour accéder au dashboard `/admin`.

```bash
# Créer un admin
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
DATABASE_URL="postgresql://user:pass@host:5432/db" ./scripts/backup-db.sh

# Les backups sont stockés dans ./backups/
# Format: portfolio_YYYYMMDD_HHMMSS.sql.gz
```

### `restore-db.sh`
Restaurer une sauvegarde de la base de données.

```bash
# Restaurer un backup
DATABASE_URL="postgresql://user:pass@host:5432/db" ./scripts/restore-db.sh backups/portfolio_20250125_120000.sql.gz

# ⚠️ ATTENTION : Cela remplace toutes les données existantes !
```

## 📦 Migration de Données

### `migrate-data.ts`
Migrer les données initiales (technologies, projets, expériences).

```bash
tsx scripts/migrate-data.ts
```

### `migrate-skills.ts`
Migrer les compétences et catégories.

```bash
tsx scripts/migrate-skills.ts
```

### `migrate-passions.ts`
Migrer les passions et soft skills.

```bash
tsx scripts/migrate-passions.ts
```

## 🌐 Traduction

### `translate-content.ts`
Traduire automatiquement le contenu manquant.

```bash
tsx scripts/translate-content.ts
```

### `check-translations.ts`
Vérifier la cohérence des traductions.

```bash
tsx scripts/check-translations.ts
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
