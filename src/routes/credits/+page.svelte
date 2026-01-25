<script lang="ts">
	import { t } from 'svelte-i18n';
	import { ExternalLink, Github, Heart } from 'lucide-svelte';

	interface Technology {
		name: string;
		description: { fr: string; en: string };
		url: string;
		github?: string;
		category: string;
	}

	const technologies: Technology[] = [
		// Framework & Build
		{
			name: 'SvelteKit',
			description: {
				fr: 'Framework web moderne basé sur Svelte avec SSR et routing',
				en: 'Modern web framework built on Svelte with SSR and routing'
			},
			url: 'https://kit.svelte.dev',
			github: 'https://github.com/sveltejs/kit',
			category: 'framework'
		},
		{
			name: 'Svelte',
			description: {
				fr: 'Framework JavaScript réactif qui compile en code optimisé',
				en: 'Reactive JavaScript framework that compiles to optimized code'
			},
			url: 'https://svelte.dev',
			github: 'https://github.com/sveltejs/svelte',
			category: 'framework'
		},
		{
			name: 'Vite',
			description: {
				fr: 'Outil de build ultra-rapide pour les applications modernes',
				en: 'Lightning-fast build tool for modern applications'
			},
			url: 'https://vitejs.dev',
			github: 'https://github.com/vitejs/vite',
			category: 'framework'
		},

		// Languages
		{
			name: 'TypeScript',
			description: {
				fr: 'Superset typé de JavaScript pour un code plus robuste',
				en: 'Typed superset of JavaScript for more robust code'
			},
			url: 'https://www.typescriptlang.org',
			github: 'https://github.com/microsoft/TypeScript',
			category: 'language'
		},

		// Database
		{
			name: 'PostgreSQL',
			description: {
				fr: 'Base de données relationnelle open source puissante',
				en: 'Powerful open source relational database'
			},
			url: 'https://www.postgresql.org',
			github: 'https://github.com/postgres/postgres',
			category: 'database'
		},
		{
			name: 'Drizzle ORM',
			description: {
				fr: 'ORM TypeScript moderne et performant pour SQL',
				en: 'Modern and performant TypeScript ORM for SQL'
			},
			url: 'https://orm.drizzle.team',
			github: 'https://github.com/drizzle-team/drizzle-orm',
			category: 'database'
		},

		// UI & Icons
		{
			name: 'Lucide Icons',
			description: {
				fr: 'Collection d\'icônes SVG élégantes et personnalisables',
				en: 'Elegant and customizable SVG icon collection'
			},
			url: 'https://lucide.dev',
			github: 'https://github.com/lucide-icons/lucide',
			category: 'ui'
		},
		{
			name: 'svelte-i18n',
			description: {
				fr: 'Bibliothèque d\'internationalisation pour Svelte',
				en: 'Internationalization library for Svelte'
			},
			url: 'https://github.com/kaisermann/svelte-i18n',
			github: 'https://github.com/kaisermann/svelte-i18n',
			category: 'ui'
		},

		// DevOps & Deployment
		{
			name: 'Docker',
			description: {
				fr: 'Plateforme de conteneurisation pour le déploiement',
				en: 'Containerization platform for deployment'
			},
			url: 'https://www.docker.com',
			github: 'https://github.com/docker',
			category: 'devops'
		},
		{
			name: 'Node.js',
			description: {
				fr: 'Runtime JavaScript côté serveur',
				en: 'Server-side JavaScript runtime'
			},
			url: 'https://nodejs.org',
			github: 'https://github.com/nodejs/node',
			category: 'devops'
		},

		// Development Tools
		{
			name: 'ESLint',
			description: {
				fr: 'Outil de linting pour maintenir la qualité du code',
				en: 'Linting tool to maintain code quality'
			},
			url: 'https://eslint.org',
			github: 'https://github.com/eslint/eslint',
			category: 'tools'
		},
		{
			name: 'Prettier',
			description: {
				fr: 'Formateur de code pour un style cohérent',
				en: 'Code formatter for consistent style'
			},
			url: 'https://prettier.io',
			github: 'https://github.com/prettier/prettier',
			category: 'tools'
		}
	];

	const locale = $derived($t('nav.home') === 'Accueil' ? 'fr' : 'en');

	const categorizedTechs = $derived(() => {
		const categories = {
			framework: [],
			language: [],
			database: [],
			ui: [],
			devops: [],
			tools: []
		};

		technologies.forEach(tech => {
			categories[tech.category].push(tech);
		});

		return categories;
	});
</script>

<svelte:head>
	<title>{$t('credits.metaTitle')}</title>
	<meta name="description" content={$t('credits.metaDescription')} />
</svelte:head>

<!-- Hero Section -->
<section class="page-hero">
	<div class="container">
		<div class="hero-content">
			<h1 class="page-title">
				{$t('credits.title')} & <span class="gradient-text">{$t('credits.titleGradient')}</span>
			</h1>
			<p class="page-description">
				{$t('credits.subtitle')}
			</p>
		</div>
	</div>
</section>

<!-- Technologies Section -->
<section class="section technologies-section">
	<div class="container">
		{#each Object.entries(categorizedTechs()) as [categoryKey, techs]}
			{#if techs.length > 0}
				<div class="category-section">
					<h2 class="category-title">{$t(`credits.categories.${categoryKey}`)}</h2>
					<div class="tech-grid">
						{#each techs as tech}
							<div class="tech-card">
								<div class="tech-header">
									<h3 class="tech-name">{tech.name}</h3>
									<div class="tech-links">
										{#if tech.github}
											<a
												href={tech.github}
												target="_blank"
												rel="noopener noreferrer"
												class="tech-link"
												title="GitHub"
											>
												<Github size={18} />
											</a>
										{/if}
										<a
											href={tech.url}
											target="_blank"
											rel="noopener noreferrer"
											class="tech-link"
											title="Website"
										>
											<ExternalLink size={18} />
										</a>
									</div>
								</div>
								<p class="tech-description">{tech.description[locale]}</p>
							</div>
						{/each}
					</div>
				</div>
			{/if}
		{/each}

		<!-- Open Source Section -->
		<div class="open-source-section">
			<div class="open-source-card">
				<Heart size={32} class="open-source-icon" />
				<h3>{$t('credits.madeWith')} ❤️</h3>
				<p>{$t('credits.openSource')}</p>
				<a
					href="https://github.com/BaptGosse/portfolio"
					target="_blank"
					rel="noopener noreferrer"
					class="btn-primary"
				>
					<Github size={20} />
					{$t('credits.viewSource')}
				</a>
			</div>
		</div>
	</div>
</section>

<style>
	/* Page Hero */
	.page-hero {
		padding: var(--spacing-5xl) 0 var(--spacing-4xl);
		background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
		position: relative;
		overflow: hidden;
	}

	.page-hero::before {
		content: '';
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(var(--border-color) 1px, transparent 1px),
			linear-gradient(90deg, var(--border-color) 1px, transparent 1px);
		background-size: 50px 50px;
		opacity: 0.2;
		mask-image: radial-gradient(ellipse 60% 40% at 50% 50%, black 40%, transparent 100%);
		-webkit-mask-image: radial-gradient(ellipse 60% 40% at 50% 50%, black 40%, transparent 100%);
	}

	.hero-content {
		text-align: center;
		max-width: 800px;
		margin: 0 auto;
		position: relative;
		z-index: 1;
	}

	.page-title {
		font-size: clamp(2.5rem, 5vw, 4rem);
		font-weight: 800;
		margin-bottom: var(--spacing-lg);
		line-height: 1.2;
	}

	.gradient-text {
		background: linear-gradient(135deg, var(--color-accent), var(--color-secondary-accent));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.page-description {
		font-size: clamp(1rem, 2vw, 1.25rem);
		color: var(--text-secondary);
		line-height: 1.7;
	}

	/* Technologies Section */
	.technologies-section {
		padding: var(--spacing-4xl) 0;
	}

	.category-section {
		margin-bottom: var(--spacing-4xl);
	}

	.category-title {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: var(--spacing-xl);
		padding-bottom: var(--spacing-md);
		border-bottom: 2px solid var(--border-color);
	}

	.tech-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: var(--spacing-lg);
	}

	.tech-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-xl);
		padding: var(--spacing-xl);
		transition: all var(--transition-normal);
		position: relative;
		overflow: hidden;
	}

	.tech-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 3px;
		background: linear-gradient(90deg, var(--color-accent), var(--color-secondary-accent));
		opacity: 0;
		transition: opacity var(--transition-normal);
	}

	.tech-card:hover {
		border-color: var(--border-color-hover);
		transform: translateY(-4px);
		box-shadow: var(--shadow-xl);
	}

	.tech-card:hover::before {
		opacity: 1;
	}

	.tech-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: var(--spacing-md);
	}

	.tech-name {
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.tech-links {
		display: flex;
		gap: var(--spacing-xs);
	}

	.tech-link {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		background: var(--bg-tertiary);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-md);
		color: var(--text-secondary);
		transition: all var(--transition-fast);
	}

	.tech-link:hover {
		background: var(--color-accent);
		border-color: var(--color-accent);
		color: white;
		transform: translateY(-2px);
	}

	.tech-description {
		color: var(--text-tertiary);
		line-height: 1.6;
		font-size: 0.9375rem;
	}

	/* Open Source Section */
	.open-source-section {
		margin-top: var(--spacing-5xl);
		display: flex;
		justify-content: center;
	}

	.open-source-card {
		background: linear-gradient(135deg, var(--bg-secondary), var(--bg-tertiary));
		border: 1px solid var(--border-color);
		border-radius: var(--radius-2xl);
		padding: var(--spacing-3xl);
		text-align: center;
		max-width: 600px;
		position: relative;
		overflow: hidden;
	}

	.open-source-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 4px;
		background: linear-gradient(90deg, var(--color-accent), var(--color-secondary-accent));
	}

	.open-source-card :global(.open-source-icon) {
		color: var(--color-accent);
		margin-bottom: var(--spacing-lg);
	}

	.open-source-card h3 {
		font-size: 1.75rem;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: var(--spacing-md);
	}

	.open-source-card p {
		color: var(--text-secondary);
		font-size: 1.125rem;
		margin-bottom: var(--spacing-xl);
	}

	.btn-primary {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-sm);
		padding: var(--spacing-md) var(--spacing-xl);
		background: linear-gradient(135deg, var(--color-accent), var(--color-secondary-accent));
		color: white;
		border: none;
		border-radius: var(--radius-lg);
		font-size: 1rem;
		font-weight: 600;
		text-decoration: none;
		transition: all var(--transition-normal);
	}

	.btn-primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 24px var(--color-accent-glow);
	}

	/* Responsive */
	@media (max-width: 768px) {
		.tech-grid {
			grid-template-columns: 1fr;
		}

		.page-hero {
			padding: var(--spacing-4xl) 0 var(--spacing-3xl);
		}

		.open-source-card {
			padding: var(--spacing-2xl);
		}
	}
</style>
