# Guide de Déploiement - Base de Données PostgreSQL

Ce guide vous explique comment déployer votre base de données sur un serveur PostgreSQL de production.

## Option 1 : Serveur Cloud Managé (Recommandé)

### Providers Populaires

#### 🟢 Neon (Gratuit + Serverless)
- ✅ **Gratuit** : 0.5 GB de stockage, 10 GB de transfert
- ✅ Serverless (mise à l'échelle automatique)
- ✅ Branches de base de données (comme Git)
- 🔗 https://neon.tech

**Étapes :**
```bash
# 1. Créer un compte sur neon.tech
# 2. Créer un nouveau projet
# 3. Copier la CONNECTION STRING fournie
```

#### 🔵 Supabase (Gratuit + Features)
- ✅ **Gratuit** : 500 MB de stockage
- ✅ Interface d'administration incluse
- ✅ Backups automatiques
- 🔗 https://supabase.com

**Étapes :**
```bash
# 1. Créer un compte sur supabase.com
# 2. Créer un nouveau projet
# 3. Aller dans Settings > Database
# 4. Copier la CONNECTION STRING (mode "Session")
```

#### 🟣 Railway
- ✅ **Gratuit** : 500 heures/mois
- ✅ Déploiement simple
- ✅ Pas de carte de crédit requise
- 🔗 https://railway.app

**Étapes :**
```bash
# 1. Créer un compte sur railway.app
# 2. New Project > Deploy PostgreSQL
# 3. Copier la DATABASE_URL dans les variables
```

#### ⚫ Autres Providers
- **Render** : https://render.com (Free tier)
- **DigitalOcean** : $15/mois (Managed Database)
- **AWS RDS** : Variable selon usage
- **Google Cloud SQL** : Variable selon usage

---

## Option 2 : Serveur Auto-hébergé (VPS)

### Prérequis
- Un serveur Linux (Ubuntu/Debian recommandé)
- Accès SSH root ou sudo
- Minimum 1 GB RAM

### Installation PostgreSQL

#### Sur Ubuntu/Debian :
```bash
# 1. Mise à jour du système
sudo apt update
sudo apt upgrade -y

# 2. Installation PostgreSQL 16
sudo apt install -y postgresql-16 postgresql-contrib-16

# 3. Vérifier que PostgreSQL tourne
sudo systemctl status postgresql

# 4. Se connecter à PostgreSQL
sudo -u postgres psql
```

#### Sur CentOS/RHEL :
```bash
# 1. Installer le repository PostgreSQL
sudo dnf install -y https://download.postgresql.org/pub/repos/yum/reporpms/EL-9-x86_64/pgdg-redhat-repo-latest.noarch.rpm

# 2. Installer PostgreSQL 16
sudo dnf install -y postgresql16-server postgresql16-contrib

# 3. Initialiser la base
sudo /usr/pgsql-16/bin/postgresql-16-setup initdb

# 4. Démarrer le service
sudo systemctl start postgresql-16
sudo systemctl enable postgresql-16
```

### Configuration PostgreSQL

#### 1. Créer la base de données et l'utilisateur

```bash
# Se connecter en tant que postgres
sudo -u postgres psql

# Dans psql:
```

```sql
-- Créer l'utilisateur
CREATE USER portfolio_user WITH PASSWORD 'VOTRE_MOT_DE_PASSE_SECURISE';

-- Créer la base de données
CREATE DATABASE portfolio OWNER portfolio_user;

-- Donner tous les privilèges
GRANT ALL PRIVILEGES ON DATABASE portfolio TO portfolio_user;

-- Se connecter à la base
\c portfolio

-- Donner les privilèges sur le schéma public
GRANT ALL ON SCHEMA public TO portfolio_user;
GRANT ALL ON ALL TABLES IN SCHEMA public TO portfolio_user;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO portfolio_user;

-- Définir les privilèges par défaut
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO portfolio_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO portfolio_user;

-- Quitter
\q
```

#### 2. Configurer l'accès distant (si nécessaire)

```bash
# Éditer postgresql.conf
sudo nano /etc/postgresql/16/main/postgresql.conf

# Modifier la ligne :
listen_addresses = '*'  # ou l'IP de votre serveur web

# Éditer pg_hba.conf
sudo nano /etc/postgresql/16/main/pg_hba.conf

# Ajouter à la fin (remplacez l'IP par celle de votre serveur web) :
host    portfolio    portfolio_user    0.0.0.0/0    scram-sha-256

# Redémarrer PostgreSQL
sudo systemctl restart postgresql
```

#### 3. Configurer le pare-feu

```bash
# UFW (Ubuntu/Debian)
sudo ufw allow 5432/tcp

# FirewallD (CentOS/RHEL)
sudo firewall-cmd --permanent --add-port=5432/tcp
sudo firewall-cmd --reload
```

---

## Configuration de l'Application

### 1. Mettre à jour le fichier .env

**En local (développement) :**
```env
# .env.local
DATABASE_URL=postgresql://portfolio_user:VOTRE_MOT_DE_PASSE@VOTRE_SERVEUR:5432/portfolio
```

**En production :**
```env
# .env.production ou variables d'environnement
DATABASE_URL=postgresql://portfolio_user:VOTRE_MOT_DE_PASSE@VOTRE_SERVEUR:5432/portfolio

# Avec SSL (recommandé) :
DATABASE_URL=postgresql://portfolio_user:VOTRE_MOT_DE_PASSE@VOTRE_SERVEUR:5432/portfolio?sslmode=require
```

### 2. Exécuter les migrations

**Important** : Assurez-vous que votre `.env` ou `.env.production` contient la bonne `DATABASE_URL`.

```bash
# Depuis votre machine locale ou serveur
npm install

# Appliquer toutes les migrations
npx drizzle-kit push

# Alternative : Exécuter les fichiers SQL manuellement
psql "postgresql://portfolio_user:PASSWORD@SERVEUR:5432/portfolio" < drizzle/0000_handy_mulholland_black.sql
psql "postgresql://portfolio_user:PASSWORD@SERVEUR:5432/portfolio" < drizzle/0001_good_norrin_radd.sql
psql "postgresql://portfolio_user:PASSWORD@SERVEUR:5432/portfolio" < drizzle/0002_silent_captain_flint.sql
psql "postgresql://portfolio_user:PASSWORD@SERVEUR:5432/portfolio" < drizzle/0003_optimal_wilson_fisk.sql
```

### 3. Vérifier la création des tables

```bash
# Se connecter à la base
psql "postgresql://portfolio_user:PASSWORD@SERVEUR:5432/portfolio"

# Lister les tables
\dt

# Vous devriez voir les 15 tables
# Quitter
\q
```

---

## Créer le Premier Utilisateur Admin

Vous devez créer un utilisateur admin pour accéder au dashboard `/admin`.

### Méthode 1 : Script Node.js

Créez un fichier `scripts/create-admin.ts` :

```typescript
import { db } from '$lib/server/db';
import { POR_USERS } from '$lib/server/db/schema';
import { hash } from '@node-rs/argon2';

async function createAdmin() {
	const email = process.argv[2];
	const password = process.argv[3];
	const name = process.argv[4] || 'Admin';

	if (!email || !password) {
		console.error('Usage: tsx scripts/create-admin.ts <email> <password> [name]');
		process.exit(1);
	}

	try {
		// Hash le mot de passe
		const passwordHash = await hash(password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

		// Créer l'utilisateur
		await db.insert(POR_USERS).values({
			USR_EMAIL: email,
			USR_PASSWORD_HASH: passwordHash,
			USR_NAME: name
		});

		console.log(`✅ Admin user created successfully!`);
		console.log(`Email: ${email}`);
		console.log(`Name: ${name}`);
		process.exit(0);
	} catch (error) {
		console.error('❌ Error creating admin user:', error);
		process.exit(1);
	}
}

createAdmin();
```

**Exécution :**
```bash
tsx scripts/create-admin.ts admin@example.com MotDePasseSecurise "Votre Nom"
```

### Méthode 2 : Directement en SQL

```bash
# Se connecter à la base
psql "postgresql://portfolio_user:PASSWORD@SERVEUR:5432/portfolio"
```

```sql
-- Créer l'utilisateur (remplacez les valeurs)
INSERT INTO "POR_USERS" ("USR_ID", "USR_EMAIL", "USR_PASSWORD_HASH", "USR_NAME", "USR_CREATED_AT", "USR_UPDATED_AT")
VALUES (
    gen_random_uuid(),
    'admin@example.com',
    '$argon2id$v=19$m=19456,t=2,p=1$VOTRE_HASH_ICI',
    'Admin',
    NOW(),
    NOW()
);
```

**Note** : Pour obtenir le hash Argon2, vous pouvez utiliser un outil en ligne ou la méthode 1 ci-dessus.

---

## Sécurité et Bonnes Pratiques

### ✅ Checklist Sécurité

**Mots de passe :**
- [ ] Utilisez un mot de passe fort pour l'utilisateur PostgreSQL (20+ caractères)
- [ ] Ne commitez JAMAIS le fichier `.env` avec les mots de passe
- [ ] Utilisez des variables d'environnement en production

**Connexion :**
- [ ] Utilisez SSL/TLS pour les connexions (`sslmode=require`)
- [ ] Limitez les connexions aux IPs autorisées dans `pg_hba.conf`
- [ ] Utilisez un firewall (ufw, firewalld, Security Groups)

**Base de données :**
- [ ] Sauvegardez régulièrement (pg_dump automatisé)
- [ ] Testez les restaurations de backup
- [ ] Surveillez l'espace disque
- [ ] Activez les logs PostgreSQL

### 📦 Backups Automatiques

**Script de backup quotidien :**

```bash
#!/bin/bash
# backup-db.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/postgresql"
DATABASE="portfolio"
USER="portfolio_user"

mkdir -p $BACKUP_DIR

pg_dump -U $USER -h localhost $DATABASE | gzip > $BACKUP_DIR/portfolio_$DATE.sql.gz

# Garder seulement les 7 derniers jours
find $BACKUP_DIR -name "portfolio_*.sql.gz" -mtime +7 -delete

echo "Backup completed: portfolio_$DATE.sql.gz"
```

**Ajouter au cron :**
```bash
# Éditer crontab
crontab -e

# Ajouter (backup tous les jours à 2h du matin)
0 2 * * * /path/to/backup-db.sh >> /var/log/backup-db.log 2>&1
```

### 🔍 Monitoring

**Vérifier l'état de la base :**
```bash
# Connexions actives
psql -U portfolio_user -d portfolio -c "SELECT count(*) FROM pg_stat_activity;"

# Taille de la base
psql -U portfolio_user -d portfolio -c "SELECT pg_size_pretty(pg_database_size('portfolio'));"

# Tables les plus volumineuses
psql -U portfolio_user -d portfolio -c "
SELECT
    schemaname || '.' || tablename AS table,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC
LIMIT 10;
"
```

---

## Déploiement avec Docker (Alternative)

Si vous préférez Docker sur votre serveur :

**docker-compose.production.yml :**
```yaml
services:
  postgres:
    image: postgres:16-alpine
    container_name: portfolio-db-prod
    restart: always
    environment:
      POSTGRES_USER: portfolio_user
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: portfolio
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./backups:/backups
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U portfolio_user -d portfolio"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:
    driver: local
```

**Démarrage :**
```bash
# Avec mot de passe sécurisé
export POSTGRES_PASSWORD="votre_mot_de_passe_securise"
docker compose -f docker-compose.production.yml up -d
```

---

## Connexion depuis l'Application

Dans votre code SvelteKit (`src/lib/server/db/index.ts`), la connexion se fait automatiquement via la variable `DATABASE_URL` :

```typescript
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '$env/dynamic/private';

const connectionString = env.DATABASE_URL;

if (!connectionString) {
	throw new Error('DATABASE_URL is not set');
}

const client = postgres(connectionString);
export const db = drizzle(client, { schema });
```

**En production, définissez `DATABASE_URL` comme variable d'environnement** (Vercel, Railway, PM2, etc.)

---

## Troubleshooting

### Erreur : "connection refused"
```bash
# Vérifier que PostgreSQL tourne
sudo systemctl status postgresql

# Vérifier le port
sudo netstat -tulpn | grep 5432

# Vérifier le pare-feu
sudo ufw status
```

### Erreur : "password authentication failed"
```bash
# Réinitialiser le mot de passe
sudo -u postgres psql
ALTER USER portfolio_user WITH PASSWORD 'nouveau_mot_de_passe';
```

### Erreur : "permission denied for schema public"
```sql
-- Se connecter en tant que postgres
sudo -u postgres psql -d portfolio

-- Donner les permissions
GRANT ALL ON SCHEMA public TO portfolio_user;
GRANT ALL ON ALL TABLES IN SCHEMA public TO portfolio_user;
```

### Erreur : "SSL connection required"
```bash
# Ajouter sslmode dans la connexion
DATABASE_URL=postgresql://user:pass@host:5432/db?sslmode=require
```

---

## Ressources

- 📚 [PostgreSQL Official Docs](https://www.postgresql.org/docs/)
- 📚 [Drizzle ORM Docs](https://orm.drizzle.team/docs/overview)
- 🔐 [PostgreSQL Security](https://www.postgresql.org/docs/current/auth-pg-hba-conf.html)
- 💾 [Backup Best Practices](https://www.postgresql.org/docs/current/backup.html)

---

**Besoin d'aide ?** Consultez la documentation ou ouvrez une issue sur GitHub.
