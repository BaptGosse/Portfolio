#!/bin/bash

# Script de backup PostgreSQL
# Usage: ./scripts/backup-db.sh

set -e

# Configuration
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="./backups"
DATABASE="${DATABASE_NAME:-portfolio}"
DB_URL="${DATABASE_URL}"

# Créer le dossier de backup
mkdir -p $BACKUP_DIR

echo "📦 Starting backup of database: $DATABASE"
echo "📅 Date: $DATE"

# Extraire les infos de connexion de DATABASE_URL
# Format: postgresql://user:password@host:port/database
if [ -z "$DB_URL" ]; then
    echo "❌ Error: DATABASE_URL environment variable is not set"
    exit 1
fi

# Exécuter le backup
pg_dump "$DB_URL" | gzip > "$BACKUP_DIR/portfolio_$DATE.sql.gz"

# Vérifier que le backup existe
if [ -f "$BACKUP_DIR/portfolio_$DATE.sql.gz" ]; then
    FILESIZE=$(du -h "$BACKUP_DIR/portfolio_$DATE.sql.gz" | cut -f1)
    echo "✅ Backup completed successfully!"
    echo "📄 File: portfolio_$DATE.sql.gz"
    echo "📊 Size: $FILESIZE"
else
    echo "❌ Backup failed!"
    exit 1
fi

# Nettoyer les anciens backups (garder seulement les 7 derniers jours)
echo "🧹 Cleaning old backups (keeping last 7 days)..."
find $BACKUP_DIR -name "portfolio_*.sql.gz" -mtime +7 -delete

# Lister les backups disponibles
echo ""
echo "📋 Available backups:"
ls -lh $BACKUP_DIR/portfolio_*.sql.gz 2>/dev/null || echo "No backups found"

echo ""
echo "✨ Done!"
