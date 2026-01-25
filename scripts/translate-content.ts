import 'dotenv/config';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq } from 'drizzle-orm';
import * as schema from '../src/lib/server/db/schema';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
	throw new Error('DATABASE_URL is not set');
}

const client = postgres(connectionString);
const db = drizzle(client, { schema });

// Traductions manuelles de qualité professionnelle
const translations = {
	// Technologies
	technologies: {
		'Kubernetes': 'Kubernetes',
		'k3s': 'k3s',
		'ArgoCD': 'ArgoCD',
		'Helm': 'Helm',
		'GitOps': 'GitOps',
		'Go': 'Go',
		'Docker': 'Docker',
		'Systemd': 'Systemd',
		'Linux': 'Linux',
		'Debian': 'Debian',
		'NGINX': 'NGINX',
		'Jenkins': 'Jenkins',
		'Forgejo': 'Forgejo',
		'Prometheus': 'Prometheus',
		'Proxmox': 'Proxmox',
		'Python': 'Python',
		'Bash': 'Bash',
		'Cloud-Init': 'Cloud-Init',
		'Ceph': 'Ceph',
		'YAML': 'YAML',
		'Rust': 'Rust',
		'CLI': 'CLI',
		'Systems Programming': 'Systems Programming',
		'Arch Linux': 'Arch Linux',
		'Xorg': 'Xorg',
		'GPU Drivers': 'GPU Drivers',
		'Électronique': 'Electronics',
		'Microcontrôleurs': 'Microcontrollers',
		'C/C++': 'C/C++',
		'Hardware': 'Hardware'
	},

	// Projets
	projects: {
		'Cluster Kubernetes Homelab': 'Kubernetes Homelab Cluster',
		'Infrastructure cloud-native complète sur k3s avec GitOps (ArgoCD), stockage distribué, monitoring complet (Prometheus/Grafana), et CI/CD intégré.':
			'Complete cloud-native infrastructure on k3s with GitOps (ArgoCD), distributed storage, comprehensive monitoring (Prometheus/Grafana), and integrated CI/CD.',

		'Orchestrateur de Services en Go': 'Service Orchestrator in Go',
		'Système d\'orchestration custom développé en Go pour gérer l\'infrastructure UnxWares. Routing intelligent, health checks, auto-scaling et déploiements automatisés.':
			'Custom orchestration system developed in Go to manage UnxWares infrastructure. Intelligent routing, health checks, auto-scaling and automated deployments.',

		'Infrastructure Self-Hosted Complète': 'Complete Self-Hosted Infrastructure',
		'Stack complète self-hosted : Forgejo (Git), Jenkins (CI/CD), reverse proxy NGINX avec SSL, gestion DNS interne, monitoring et backup automatisés.':
			'Complete self-hosted stack: Forgejo (Git), Jenkins (CI/CD), NGINX reverse proxy with SSL, internal DNS management, automated monitoring and backup.',

		'Automatisation Proxmox': 'Proxmox Automation',
		'Scripts et outils d\'automatisation pour Proxmox VE : provisioning de VMs, gestion du stockage distribué (Ceph), templates cloud-init, et API intégration.':
			'Automation scripts and tools for Proxmox VE: VM provisioning, distributed storage management (Ceph), cloud-init templates, and API integration.',

		'Collection de Charts Helm': 'Helm Charts Collection',
		'Charts Helm personnalisés pour déployer et gérer des applications cloud-native : monitoring stack, databases, reverse proxies, et outils DevOps.':
			'Custom Helm charts to deploy and manage cloud-native applications: monitoring stack, databases, reverse proxies, and DevOps tools.',

		'Outils CLI en Rust': 'CLI Tools in Rust',
		'Suite d\'outils en ligne de commande développés en Rust pour l\'administration système, le monitoring et l\'automatisation quotidienne.':
			'Suite of command-line tools developed in Rust for system administration, monitoring and daily automation.',

		'Optimisations Linux Avancées': 'Advanced Linux Optimizations',
		'Solutions d\'optimisation système : configuration dual-GPU (AMD/NVIDIA), debugging Xorg, services systemd personnalisés, tuning kernel.':
			'System optimization solutions: dual-GPU configuration (AMD/NVIDIA), Xorg debugging, custom systemd services, kernel tuning.',

		'Contrôleur LED Embarqué': 'Embedded LED Controller',
		'Système de contrôle pour 400 LEDs haute puissance avec gestion de résistances variables, capteurs industriels et interface web de monitoring.':
			'Control system for 400 high-power LEDs with variable resistance management, industrial sensors and web monitoring interface.'
	},

	// Expériences
	experiences: {
		'IUT Grand Ouest Normandie - Site d\'IFS': 'IUT Grand Ouest Normandie - IFS Campus',
		'BUT Informatique': 'Bachelor in Computer Science',
		'Parcours A : Développement et Administration système. Formation complète en programmation, bases de données, réseau et infrastructure.':
			'Track A: Development and System Administration. Comprehensive training in programming, databases, networking and infrastructure.',

		'UnxWares SAS': 'UnxWares SAS',
		'Président & Administrateur Systèmes': 'President & Systems Administrator',
		'Direction de l\'entreprise et gestion complète de l\'infrastructure. Administration systèmes Debian, développement backend en Go, CI/CD, orchestration de services.':
			'Company leadership and complete infrastructure management. Debian systems administration, Go backend development, CI/CD, service orchestration.',

		'Développement d\'une API': 'API Development',
		'Création d\'un orchestrateur (API Rest) en Go et d\'un dashboard en Laravel pour la gestion d\'une infrastructure cloud. Développement Full-stack et plannification.':
			'Creation of an orchestrator (REST API) in Go and a Laravel dashboard for cloud infrastructure management. Full-stack development and planning.',

		'Déploiement d\'une infrastructure cloud': 'Cloud Infrastructure Deployment',
		'Création d\'une infrastructure cloud basée sur Kubernetes (Kubeadm et K3s) avec configuration d\'un réseau avancé à base de VLAN et de tunnel IP en GRE (matériel Fortinet et Mikrotik).':
			'Creation of a Kubernetes-based cloud infrastructure (Kubeadm and K3s) with advanced network configuration using VLANs and GRE IP tunnels (Fortinet and Mikrotik hardware).'
	},

	// Skills
	skills: {
		'Infrastructure & Cloud-Native': 'Infrastructure & Cloud-Native',
		'DevOps & Automatisation': 'DevOps & Automation',
		'Développement': 'Development',

		'Kubernetes & k3s': 'Kubernetes & k3s',
		'Cluster homelab complet, déploiements production': 'Complete homelab cluster, production deployments',

		'Docker & Containerisation': 'Docker & Containerization',
		'Dockerfiles optimisés, images multi-stage, registry privé': 'Optimized Dockerfiles, multi-stage images, private registry',

		'Helm & ArgoCD': 'Helm & ArgoCD',
		'Charts personnalisés, GitOps, CI/CD automatisé': 'Custom charts, GitOps, automated CI/CD',

		'Linux (Debian, Arch, Alpine)': 'Linux (Debian, Arch, Alpine)',
		'Administration serveurs UnxWares, homelab avec optimisations kernel': 'UnxWares server administration, homelab with kernel optimizations',

		'Proxmox VE': 'Proxmox VE',
		'Gestion cluster de VMs, automatisation avec scripts Python': 'VM cluster management, automation with Python scripts',

		'NGINX & Reverse Proxies': 'NGINX & Reverse Proxies',
		'Configuration SSL, load balancing pour infrastructure self-hosted': 'SSL configuration, load balancing for self-hosted infrastructure',

		'CI/CD (Jenkins, GitLab CI)': 'CI/CD (Jenkins, GitLab CI)',
		'Pipelines automatisés pour UnxWares, tests et déploiements': 'Automated pipelines for UnxWares, testing and deployments',

		'Infrastructure as Code': 'Infrastructure as Code',
		'Provisioning automatisé avec scripts et templates': 'Automated provisioning with scripts and templates',

		'Git & Forgejo/Gitea': 'Git & Forgejo/Gitea',
		'Instance self-hosted, gestion repos et CI/CD intégré': 'Self-hosted instance, repository management and integrated CI/CD',

		'Monitoring (Prometheus/Grafana)': 'Monitoring (Prometheus/Grafana)',
		'Stack complète de monitoring pour infrastructure': 'Complete monitoring stack for infrastructure',

		'Systemd & Services': 'Systemd & Services',
		'Services personnalisés, orchestration custom en Go': 'Custom services, custom orchestration in Go',

		'Scripts & Automatisation': 'Scripts & Automation',
		'Bash, Python pour automatisation quotidienne': 'Bash, Python for daily automation',

		'Go (Golang)': 'Go (Golang)',
		'Orchestrateur de services custom, outils CLI systèmes': 'Custom service orchestrator, system CLI tools',

		'Rust': 'Rust',
		'Outils CLI performants, projets systèmes bas niveau': 'High-performance CLI tools, low-level system projects',

		'TypeScript & SvelteKit': 'TypeScript & SvelteKit',
		'Applications web modernes, ce portfolio': 'Modern web applications, this portfolio',

		'PHP & Laravel': 'PHP & Laravel',
		'Backend UnxWares, APIs REST': 'UnxWares backend, REST APIs',

		'Python': 'Python',
		'Scripts automation, outils infrastructure': 'Automation scripts, infrastructure tools',

		'Bases de données': 'Databases',
		'PostgreSQL, MySQL, Redis pour applications': 'PostgreSQL, MySQL, Redis for applications'
	},

	// Posts
	posts: {
		'Bienvenue sur mon portfolio': 'Welcome to my portfolio',
		'Premier article présentant mon portfolio et mes domaines d\'expertise : Linux, DevOps et infrastructure.':
			'First article introducing my portfolio and areas of expertise: Linux, DevOps and infrastructure.',

		'Développer un orchestrateur de services en Go': 'Building a Service Orchestrator in Go',
		'Retour d\'expérience sur le développement d\'un orchestrateur de services personnalisé en Go pour gérer l\'infrastructure UnxWares.':
			'Experience report on developing a custom service orchestrator in Go to manage UnxWares infrastructure.'
	}
};

async function translateContent() {
	console.log('🌍 Début de la traduction automatique...\n');

	try {
		// 1. Traduire les technologies
		console.log('📦 Traduction des technologies...');
		const techs = await db.select().from(schema.POR_TECHNOLOGIES);

		for (const tech of techs) {
			const frName = tech.TEC_NAME.fr;
			const enName = translations.technologies[frName] || frName;

			if (tech.TEC_NAME.en === frName && enName !== frName) {
				await db
					.update(schema.POR_TECHNOLOGIES)
					.set({
						TEC_NAME: { fr: frName, en: enName }
					})
					.where(eq(schema.POR_TECHNOLOGIES.TEC_ID, tech.TEC_ID));

				console.log(`  ✅ ${frName} → ${enName}`);
			}
		}

		// 2. Traduire les projets
		console.log('\n🚀 Traduction des projets...');
		const projects = await db.select().from(schema.POR_PROJECTS);

		for (const project of projects) {
			const frTitle = project.PRJ_TITLE.fr;
			const frDesc = project.PRJ_DESCRIPTION.fr;

			const enTitle = translations.projects[frTitle] || frTitle;
			const enDesc = translations.projects[frDesc] || frDesc;

			if (project.PRJ_TITLE.en === frTitle || project.PRJ_DESCRIPTION.en === frDesc) {
				await db
					.update(schema.POR_PROJECTS)
					.set({
						PRJ_TITLE: { fr: frTitle, en: enTitle },
						PRJ_DESCRIPTION: { fr: frDesc, en: enDesc }
					})
					.where(eq(schema.POR_PROJECTS.PRJ_ID, project.PRJ_ID));

				console.log(`  ✅ ${frTitle}`);
			}
		}

		// 3. Traduire les expériences
		console.log('\n💼 Traduction des expériences...');
		const experiences = await db.select().from(schema.POR_EXPERIENCES);

		for (const exp of experiences) {
			const frCompany = exp.EXP_COMPANY.fr;
			const frRole = exp.EXP_ROLE.fr;
			const frDesc = exp.EXP_DESCRIPTION.fr;

			const enCompany = translations.experiences[frCompany] || frCompany;
			const enRole = translations.experiences[frRole] || frRole;
			const enDesc = translations.experiences[frDesc] || frDesc;

			if (exp.EXP_COMPANY.en === frCompany || exp.EXP_ROLE.en === frRole || exp.EXP_DESCRIPTION.en === frDesc) {
				await db
					.update(schema.POR_EXPERIENCES)
					.set({
						EXP_COMPANY: { fr: frCompany, en: enCompany },
						EXP_ROLE: { fr: frRole, en: enRole },
						EXP_DESCRIPTION: { fr: frDesc, en: enDesc }
					})
					.where(eq(schema.POR_EXPERIENCES.EXP_ID, exp.EXP_ID));

				console.log(`  ✅ ${frRole} @ ${frCompany}`);
			}
		}

		// 4. Traduire les catégories et skills
		console.log('\n🎯 Traduction des compétences...');
		const categories = await db.select().from(schema.POR_SKILL_CATEGORIES);

		for (const cat of categories) {
			const frName = cat.CAT_NAME.fr;
			const enName = translations.skills[frName] || frName;

			if (cat.CAT_NAME.en === frName && enName !== frName) {
				await db
					.update(schema.POR_SKILL_CATEGORIES)
					.set({
						CAT_NAME: { fr: frName, en: enName }
					})
					.where(eq(schema.POR_SKILL_CATEGORIES.CAT_ID, cat.CAT_ID));

				console.log(`  ✅ Catégorie: ${frName} → ${enName}`);
			}
		}

		const skills = await db.select().from(schema.POR_SKILLS);

		for (const skill of skills) {
			const frName = skill.SKI_NAME.fr;
			const frContext = skill.SKI_CONTEXT.fr;

			const enName = translations.skills[frName] || frName;
			const enContext = translations.skills[frContext] || frContext;

			if (skill.SKI_NAME.en === frName || skill.SKI_CONTEXT.en === frContext) {
				await db
					.update(schema.POR_SKILLS)
					.set({
						SKI_NAME: { fr: frName, en: enName },
						SKI_CONTEXT: { fr: frContext, en: enContext }
					})
					.where(eq(schema.POR_SKILLS.SKI_ID, skill.SKI_ID));

				console.log(`  ✅ ${frName}`);
			}
		}

		// 5. Traduire les posts
		console.log('\n📝 Traduction des posts...');
		const posts = await db.select().from(schema.POR_POSTS);

		for (const post of posts) {
			const frTitle = post.POS_TITLE.fr;
			const frDesc = post.POS_DESCRIPTION.fr;
			const frContent = post.POS_CONTENT.fr;

			const enTitle = translations.posts[frTitle] || frTitle;
			const enDesc = translations.posts[frDesc] || frDesc;
			const enContent = translations.posts[frContent] || frContent;

			if (post.POS_TITLE.en === frTitle || post.POS_DESCRIPTION.en === frDesc) {
				await db
					.update(schema.POR_POSTS)
					.set({
						POS_TITLE: { fr: frTitle, en: enTitle },
						POS_DESCRIPTION: { fr: frDesc, en: enDesc },
						POS_CONTENT: { fr: frContent, en: enContent }
					})
					.where(eq(schema.POR_POSTS.POS_ID, post.POS_ID));

				console.log(`  ✅ ${frTitle}`);
			}
		}

		console.log('\n✨ Traduction terminée avec succès!');
	} catch (error) {
		console.error('❌ Erreur lors de la traduction:', error);
		throw error;
	} finally {
		await client.end();
	}
}

translateContent();
