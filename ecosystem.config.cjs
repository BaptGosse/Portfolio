// Configuration PM2 pour gérer l'application Node.js
module.exports = {
  apps: [{
    name: 'portfolio',
    script: './build/index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env_file: '.env',
    node_args: '-r dotenv/config',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
