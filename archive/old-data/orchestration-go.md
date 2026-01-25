---
title: 'Développer un orchestrateur de services en Go'
description: 'Retour d''expérience sur le développement d''un orchestrateur de services personnalisé en Go pour gérer l''infrastructure UnxWares.'
date: '2025-12-10'
tags: ['go', 'backend', 'infrastructure', 'orchestration']
published: true
---

# Développer un orchestrateur de services en Go

Chez UnxWares, j'ai développé un orchestrateur de services personnalisé en Go pour gérer notre infrastructure. Voici un retour d'expérience sur ce projet.

## Pourquoi un orchestrateur personnalisé ?

Nos besoins spécifiques nécessitaient :

- **Gestion fine des dépendances** entre services
- **Orchestration dynamique** basée sur l'état du système
- **Intégration étroite** avec systemd
- **Performance** et faible consommation de ressources

## Architecture technique

### Stack technologique

```go
// Exemple simplifié de la structure principale
type Orchestrator struct {
    services map[string]*Service
    router   *mux.Router
    config   *Config
}

type Service struct {
    Name         string
    Dependencies []string
    Status       ServiceStatus
    Health       HealthCheck
}
```

### Fonctionnalités clés

1. **Monitoring en temps réel**
   - Health checks automatiques
   - Détection de pannes
   - Récupération automatique

2. **Gestion des dépendances**
   - Graphe de dépendances
   - Démarrage ordonné
   - Arrêt gracieux

3. **API REST**
   - Contrôle des services
   - Métriques et statistiques
   - Configuration dynamique

## Intégration avec systemd

L'orchestrateur s'intègre parfaitement avec systemd :

```bash
# Service systemd pour l'orchestrateur
[Unit]
Description=UnxWares Service Orchestrator
After=network.target

[Service]
Type=notify
ExecStart=/usr/local/bin/orchestrator
Restart=always

[Install]
WantedBy=multi-user.target
```

## Défis rencontrés

### 1. Gestion de la concurrence

Go excelle dans la gestion de la concurrence avec les goroutines :

```go
func (o *Orchestrator) MonitorServices() {
    for name, service := range o.services {
        go func(s *Service) {
            for {
                s.CheckHealth()
                time.Sleep(30 * time.Second)
            }
        }(service)
    }
}
```

### 2. Récupération d'erreurs

Mise en place de mécanismes de récupération robustes pour éviter les cascades de pannes.

### 3. Performance

Optimisation pour gérer des centaines de services simultanément avec une faible empreinte mémoire.

## Résultats

Après plusieurs mois d'utilisation :

- ✅ **Stabilité accrue** de l'infrastructure
- ✅ **Déploiements plus rapides** et sûrs
- ✅ **Monitoring centralisé** de tous les services
- ✅ **Réduction du temps de récupération** après incident

## Conclusion

Développer un orchestrateur en Go a été un excellent choix pour notre infrastructure. La simplicité du langage, ses performances et sa gestion native de la concurrence en font un outil idéal pour ce type de projet.

Le code source pourra être publié une fois nettoyé et documenté !

---

*Article technique - Baptiste Gosselin*
