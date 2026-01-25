import type { Project, Experience, Testimonial } from '$lib/types';

export const projects: Project[] = [
	{
		id: 'k8s-homelab',
		title: 'Cluster Kubernetes Homelab',
		description: 'Infrastructure cloud-native complète sur k3s avec GitOps (ArgoCD), stockage distribué, monitoring complet (Prometheus/Grafana), et CI/CD intégré.',
		technologies: ['Kubernetes', 'k3s', 'ArgoCD', 'Helm', 'GitOps'],
		github: 'https://github.com/baptgosse',
		featured: true
	},
	{
		id: 'orchestrator',
		title: 'Orchestrateur de Services en Go',
		description: 'Système d\'orchestration custom développé en Go pour gérer l\'infrastructure UnxWares. Routing intelligent, health checks, auto-scaling et déploiements automatisés.',
		technologies: ['Go', 'Docker', 'Systemd', 'Linux'],
		github: 'https://github.com/baptgosse',
		featured: true
	},
	{
		id: 'infrastructure',
		title: 'Infrastructure Self-Hosted Complète',
		description: 'Stack complète self-hosted : Forgejo (Git), Jenkins (CI/CD), reverse proxy NGINX avec SSL, gestion DNS interne, monitoring et backup automatisés.',
		technologies: ['Debian', 'NGINX', 'Jenkins', 'Forgejo', 'Prometheus'],
		github: 'https://github.com/baptgosse',
		featured: true
	},
	{
		id: 'proxmox-automation',
		title: 'Automatisation Proxmox',
		description: 'Scripts et outils d\'automatisation pour Proxmox VE : provisioning de VMs, gestion du stockage distribué (Ceph), templates cloud-init, et API intégration.',
		technologies: ['Proxmox', 'Python', 'Bash', 'Cloud-Init', 'Ceph'],
		github: 'https://github.com/baptgosse',
		featured: true
	},
	{
		id: 'helm-charts',
		title: 'Collection de Charts Helm',
		description: 'Charts Helm personnalisés pour déployer et gérer des applications cloud-native : monitoring stack, databases, reverse proxies, et outils DevOps.',
		technologies: ['Helm', 'Kubernetes', 'YAML', 'GitOps'],
		github: 'https://github.com/baptgosse',
		featured: true
	},
	{
		id: 'rust-cli-tools',
		title: 'Outils CLI en Rust',
		description: 'Suite d\'outils en ligne de commande développés en Rust pour l\'administration système, le monitoring et l\'automatisation quotidienne.',
		technologies: ['Rust', 'CLI', 'Linux', 'Systems Programming'],
		github: 'https://github.com/baptgosse',
		featured: true
	},
	{
		id: 'linux-optimization',
		title: 'Optimisations Linux Avancées',
		description: 'Solutions d\'optimisation système : configuration dual-GPU (AMD/NVIDIA), debugging Xorg, services systemd personnalisés, tuning kernel.',
		technologies: ['Arch Linux', 'Xorg', 'GPU Drivers', 'Systemd'],
		github: 'https://github.com/baptgosse',
		featured: false
	},
	{
		id: 'led-controller',
		title: 'Contrôleur LED Embarqué',
		description: 'Système de contrôle pour 400 LEDs haute puissance avec gestion de résistances variables, capteurs industriels et interface web de monitoring.',
		technologies: ['Électronique', 'Microcontrôleurs', 'C/C++', 'Hardware'],
		github: 'https://github.com/baptgosse',
		featured: false
	}
];

export const experiences: Experience[] = [
	{
		company: 'IUT Grand Ouest Normandie - Site d\'IFS',
		role: 'BUT Informatique',
		period: '2024 - 2027',
		description: 'Parcours A : Développement et Administration système. Formation complète en programmation, bases de données, réseau et infrastructure.',
		technologies: ['C', 'Java', 'Web', 'SQL', 'Linux'],
		type: 'education'
	},
	{
		company: 'UnxWares SAS',
		role: 'Président & Administrateur Systèmes',
		period: 'Juin 2025 - Présent',
		description: 'Direction de l\'entreprise et gestion complète de l\'infrastructure. Administration systèmes Debian, développement backend en Go, CI/CD, orchestration de services.',
		technologies: ['Go', 'Debian', 'Docker', 'Jenkins', 'NGINX', 'Systemd'],
		type: 'work'
	},
	{
		company: 'UnxWares SAS',
		role: 'Développement d\'une API',
		period: 'Septembre 2025 - Présent',
		description: 'Création d\'un orchestrateur (API Rest) en Go et d\'un dashboard en Laravel pour la gestion d\'une infrastructure cloud. Développement Full-stack et plannification.',
		technologies: ['Go', 'Laravel', 'PHP', 'API REST', 'Docker'],
		type: 'work'
	},
	{
		company: 'UnxWares SAS',
		role: 'Déploiement d\'une infrastructure cloud',
		period: 'Juin 2025 - Présent',
		description: 'Création d\'une infrastructure cloud basée sur Kubernetes (Kubeadm et K3s) avec configuration d\'un réseau avancé à base de VLAN et de tunnel IP en GRE (matériel Fortinet et Mikrotik).',
		technologies: ['Kubernetes', 'k3s', 'Kubeadm', 'VLAN', 'GRE', 'Fortinet', 'Mikrotik'],
		type: 'work'
	},
	{
		company: 'Projet Bazenville',
		role: 'Création d\'un site web',
		period: 'Mars 2025 - Présent',
		description: 'Développement Full-stack et relation client pour la création d\'un site web sur l\'histoire du village de Bazenville (Calvados), en collaboration avec deux journalistes nationales.',
		technologies: ['Web', 'Full-stack', 'Relation client'],
		type: 'work'
	},
	{
		company: 'Lycée Saint Thomas d\'Aquin - Flers',
		role: 'Baccalauréat Général',
		period: '2021 - 2024',
		description: 'Mention Bien. Spécialités Mathématiques, Numérique et sciences informatiques. Délégué E3D pour le développement durable et l\'écoresponsabilité.',
		technologies: ['Mathématiques', 'NSI', 'Développement durable'],
		type: 'education'
	},
	{
		company: 'SummumNetwork',
		role: 'Développeur',
		period: '2022 - 2024',
		description: 'Développement et administration dans un environnement communautaire. Gestion d\'environnements applicatifs et infrastructure.',
		technologies: ['Backend', 'Infrastructure', 'DevOps'],
		type: 'work'
	}
];

export const skills = [
	{
		category: 'Infrastructure & Cloud-Native',
		items: [
			{ name: 'Kubernetes & k3s', context: 'Cluster homelab complet, déploiements production' },
			{ name: 'Docker & Containerisation', context: 'Dockerfiles optimisés, images multi-stage, registry privé' },
			{ name: 'Helm & ArgoCD', context: 'Charts personnalisés, GitOps, CI/CD automatisé' },
			{ name: 'Linux (Debian, Arch, Alpine)', context: 'Administration serveurs UnxWares, homelab avec optimisations kernel' },
			{ name: 'Proxmox VE', context: 'Gestion cluster de VMs, automatisation avec scripts Python' },
			{ name: 'NGINX & Reverse Proxies', context: 'Configuration SSL, load balancing pour infrastructure self-hosted' }
		]
	},
	{
		category: 'DevOps & Automatisation',
		items: [
			{ name: 'CI/CD (Jenkins, GitLab CI)', context: 'Pipelines automatisés pour UnxWares, tests et déploiements' },
			{ name: 'Infrastructure as Code', context: 'Provisioning automatisé avec scripts et templates' },
			{ name: 'Git & Forgejo/Gitea', context: 'Instance self-hosted, gestion repos et CI/CD intégré' },
			{ name: 'Monitoring (Prometheus/Grafana)', context: 'Stack complète de monitoring pour infrastructure' },
			{ name: 'Systemd & Services', context: 'Services personnalisés, orchestration custom en Go' },
			{ name: 'Scripts & Automatisation', context: 'Bash, Python pour automatisation quotidienne' }
		]
	},
	{
		category: 'Développement',
		items: [
			{ name: 'Go (Golang)', context: 'Orchestrateur de services custom, outils CLI systèmes' },
			{ name: 'Rust', context: 'Outils CLI performants, projets systèmes bas niveau' },
			{ name: 'TypeScript & SvelteKit', context: 'Applications web modernes, ce portfolio' },
			{ name: 'PHP & Laravel', context: 'Backend UnxWares, APIs REST' },
			{ name: 'Python', context: 'Scripts automation, outils infrastructure' },
			{ name: 'Bases de données', context: 'PostgreSQL, MySQL, Redis pour applications' }
		]
	}
];

export const testimonials: Testimonial[] = [
	{
		name: 'Jean-Philippe Martin',
		role: 'CTO',
		company: 'TechCorp',
		content: 'Baptiste a démontré une expertise exceptionnelle en infrastructure et DevOps. Son approche méthodique et sa maîtrise technique ont été déterminantes pour la réussite de nos projets.'
	},
	{
		name: 'Sophie Durand',
		role: 'Chef de Projet',
		company: 'InnovateSoft',
		content: 'Collaboration remarquable avec Baptiste. Sa capacité à résoudre des problèmes complexes d\'infrastructure et son professionnalisme en font un partenaire de choix.'
	}
];
