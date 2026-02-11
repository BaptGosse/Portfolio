#!/bin/bash

# Script de restauration PostgreSQL
# Usage: ./scripts/restore-db.sh <backup_file>

set -e

# Vérifier les arguments
if [ -z "$1" ]; then
    echo "❌ Error: Backup file not specified"
    echo "Usage: ./scripts/restore-db.sh <backup_file>"
    echo ""
    echo "Available backups:"
    ls -1 backups/portfolio_*.sql.gz 2>/dev/null || echo "No backups found"
    exit 1
fi

BACKUP_FILE="$1"
DB_URL="${DATABASE_URL}"

# Vérifier que le fichier existe
if [ ! -f "$BACKUP_FILE" ]; then
    echo "❌ Error: Backup file not found: $BACKUP_FILE"
    exit 1
fi

# Vérifier DATABASE_URL
if [ -z "$DB_URL" ]; then
    echo "❌ Error: DATABASE_URL environment variable is not set"
    exit 1
fi

echo "🔄 Restoring database from: $BACKUP_FILE"
echo ""
echo "⚠️  WARNING: This will REPLACE all existing data!"
read -p "Are you sure you want to continue? (yes/no): " -r
echo

if [[ ! $REPLY =~ ^[Yy][Ee][Ss]$ ]]; then
    echo "❌ Restore cancelled"
    exit 1
fi

echo "📦 Extracting and restoring backup..."

# Décompresser et restaurer
gunzip -c "$BACKUP_FILE" | psql "$DB_URL"

echo ""
echo "✅ Database restored successfully!"
echo "📄 From: $BACKUP_FILE"
echo ""
