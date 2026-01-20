# Guide de déploiement sur VM Linux

## Prérequis sur la VM

```bash
# Installer Node.js (version 18 ou supérieure)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Installer PostgreSQL
sudo apt-get install -y postgresql postgresql-contrib

# Installer PM2 (gestionnaire de processus Node.js)
sudo npm install -g pm2
```

## Configuration de la base de données

```bash
# Se connecter à PostgreSQL
sudo -u postgres psql

# Créer la base de données et l'utilisateur
CREATE DATABASE portfolio;
CREATE USER portfolio_user WITH ENCRYPTED PASSWORD 'ton_mot_de_passe_fort';
GRANT ALL PRIVILEGES ON DATABASE portfolio TO portfolio_user;
\q
```

## Déploiement du projet

### Option 1: Avec Git (recommandé)

```bash
# Sur ta VM
cd /var/www
sudo git clone https://github.com/ton-username/portfolio.git
cd portfolio

# Copier et configurer le .env
sudo nano .env
```

Contenu du `.env`:
```env
# Database
DATABASE_URL="postgresql://portfolio_user:ton_mot_de_passe@localhost:5432/portfolio"

# Auth
SESSION_SECRET="ton_secret_aleatoire_tres_long_et_securise"

# Email (si configuré)
SMTP_HOST="smtp.ton-provider.com"
SMTP_PORT=587
SMTP_USER="ton-email@example.com"
SMTP_PASS="ton-mot-de-passe"

# Node
NODE_ENV=production
PORT=3000
```

```bash
# Installer les dépendances
npm install --production

# Initialiser la base de données
npm run db:push

# Construire le projet (si pas déjà fait)
npm run build

# Démarrer avec PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### Option 2: Transfert manuel

```bash
# Sur ta machine locale, créer une archive
tar -czf portfolio.tar.gz build/ package.json package-lock.json ecosystem.config.js static/ drizzle/

# Transférer vers la VM (depuis ta machine locale)
scp portfolio.tar.gz user@ip-de-ta-vm:/var/www/

# Sur la VM
cd /var/www
tar -xzf portfolio.tar.gz
npm install --production
```

## Configuration Nginx (reverse proxy)

```bash
sudo nano /etc/nginx/sites-available/portfolio
```

Contenu:
```nginx
server {
    listen 80;
    server_name ton-domaine.fr www.ton-domaine.fr;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# Activer le site
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## SSL avec Let's Encrypt

```bash
# Installer Certbot
sudo apt-get install -y certbot python3-certbot-nginx

# Obtenir un certificat SSL
sudo certbot --nginx -d ton-domaine.fr -d www.ton-domaine.fr
```

## Alternative: Service systemd (sans PM2)

Créer `/etc/systemd/system/portfolio.service`:

```ini
[Unit]
Description=Portfolio SvelteKit
After=network.target postgresql.service

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/portfolio
Environment=NODE_ENV=production
Environment=PORT=3000
ExecStart=/usr/bin/node build/index.js
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
```

```bash
# Activer et démarrer le service
sudo systemctl daemon-reload
sudo systemctl enable portfolio
sudo systemctl start portfolio
sudo systemctl status portfolio
```

## Commandes utiles

```bash
# Voir les logs PM2
pm2 logs portfolio

# Redémarrer l'application
pm2 restart portfolio

# Avec systemd
sudo journalctl -u portfolio -f
sudo systemctl restart portfolio

# Mise à jour du projet
cd /var/www/portfolio
git pull
npm install --production
npm run build
pm2 restart portfolio
```

## Sécurité

1. **Firewall**: Autoriser seulement les ports nécessaires
```bash
sudo ufw allow 22/tcp  # SSH
sudo ufw allow 80/tcp  # HTTP
sudo ufw allow 443/tcp # HTTPS
sudo ufw enable
```

2. **PostgreSQL**: N'autoriser que les connexions locales
3. **Variables d'environnement**: Utiliser des mots de passe forts
4. **Sauvegardes**: Configurer des backups automatiques de la DB

```bash
# Backup manuel
pg_dump -U portfolio_user portfolio > backup_$(date +%Y%m%d).sql
```
