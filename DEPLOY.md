# Guide de déploiement (Application & VM)

Ce guide explique comment déployer l'application portfolio sur un serveur Linux (VPS) utilisant Node.js et PM2.

## 📋 Prérequis

- Node.js 20+ installé sur le serveur
- PostgreSQL 14+ (voir le [Guide de déploiement PostgreSQL](./docs/DEPLOYMENT.md))
- Git
- PM2 (`npm install -g pm2`)

## 🛠️ Préparation du serveur

### 1. Installation de Node.js (si nécessaire)
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 2. Cloner le projet
```bash
cd /var/www
git clone https://github.com/BaptGosse/portfolio.git
cd portfolio
```

### 3. Configuration de l'environnement
Copiez le fichier d'exemple et éditez-le avec vos informations de production.
```bash
cp .env.example .env
nano .env
```

Assurez-vous que `DATABASE_URL` pointe vers votre base de données PostgreSQL de production.

## 🚀 Déploiement

### 1. Installer les dépendances et Build
```bash
npm install
npm run build
```

### 2. Initialiser la base de données
Si c'est votre premier déploiement, assurez-vous que les tables sont créées :
```bash
npm run db:push
```

Importez les données initiales si nécessaire :
```bash
npm run migrate:data
npm run migrate:skills
npm run migrate:passions
```

Créez votre utilisateur admin :
```bash
npm run db:create-admin votre@email.com "votre-mot-de-passe" "Votre Nom"
```

### 3. Démarrer avec PM2
L'application utilise `ecosystem.config.cjs` pour la gestion par PM2.

```bash
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

## 🌐 Configuration Nginx (Reverse Proxy)

Créez un fichier de configuration pour votre site :
```bash
sudo nano /etc/nginx/sites-available/portfolio
```

Exemple de configuration :
```nginx
server {
    listen 80;
    server_name votre-domaine.fr;

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

Activez le site et rechargez Nginx :
```bash
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 🔐 SSL avec Let's Encrypt

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d votre-domaine.fr
```

## 🔄 Mise à jour du projet

Pour déployer une nouvelle version :
```bash
git pull
npm install
npm run build
pm2 restart portfolio
```

## 📂 Documentation complémentaire

- [Déploiement Base de Données](./docs/DEPLOYMENT.md)
- [Documentation Schéma DB](./docs/DATABASE.md)
- [Guide de personnalisation](./CUSTOMIZATION.md)

---

**Note** : Ce projet est configuré pour utiliser `@sveltejs/adapter-node` ou `adapter-auto`. Assurez-vous que l'adapter correct est sélectionné dans `svelte.config.js` si vous avez des besoins spécifiques.