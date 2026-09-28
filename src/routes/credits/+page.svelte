<script lang="ts">
	import { _, locale } from 'svelte-i18n';
	import SceneTitle from '$lib/components/SceneTitle.svelte';

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

	const categoryOrder = ['framework', 'language', 'database', 'ui', 'devops', 'tools'];

	const groups = $derived(
		categoryOrder
			.map((key) => ({ key, techs: technologies.filter((tech) => tech.category === key) }))
			.filter((group) => group.techs.length > 0)
	);

	const lang = $derived($locale === 'en' ? 'en' : 'fr');
</script>

<svelte:head>
	<title>{$_('credits.metaTitle')}</title>
	<meta name="description" content={$_('credits.metaDescription')} />
</svelte:head>

<section class="scene page" aria-labelledby="credits-title">
	<div class="wrap">
		<SceneTitle as="h1" id="credits-title" title={$_('credits.title')} note={$_('credits.note')} />

		<div class="rider">
			{#each groups as group (group.key)}
				<section class="block">
					<h2>{$_(`credits.categories.${group.key}`)}</h2>
					<dl>
						{#each group.techs as tech}
							<div>
								<dt>{tech.name}</dt>
								<dd>
									{tech.description[lang]}
									<span class="links">
										<a href={tech.url} rel="noopener noreferrer">{$_('credits.site')}</a>
										{#if tech.github}
											<a href={tech.github} rel="noopener noreferrer">{$_('credits.source')}</a>
										{/if}
									</span>
								</dd>
							</div>
						{/each}
					</dl>
				</section>
			{/each}
		</div>

		<p class="own">
			{$_('credits.openSource')}
			<a href="https://github.com/BaptGosse/Portfolio" rel="noopener noreferrer">{$_('credits.viewSource')}</a>
		</p>
	</div>
</section>

<style>
	.page {
		padding-top: clamp(2.5rem, 7vw, 5rem);
	}

	.rider {
		columns: 3 17rem;
		column-gap: clamp(2rem, 5vw, 4rem);
	}

	.block {
		break-inside: avoid;
		margin-bottom: clamp(2.5rem, 5vw, 3.5rem);
	}

	h2 {
		margin-bottom: 1.1rem;
		font-size: var(--step-2);
	}

	dl {
		display: grid;
		gap: 1rem;
	}

	dt {
		font-weight: 600;
	}

	dd {
		color: var(--ink-soft);
		font-size: 0.95em;
		line-height: 1.5;
	}

	.links {
		display: flex;
		gap: 1rem;
		margin-top: 0.2rem;
		font-style: italic;
	}

	.own {
		margin-top: clamp(1rem, 3vw, 2rem);
		font-size: var(--step-1);
	}

	.own a {
		display: inline-block;
		margin-left: 0.25rem;
		font-weight: 600;
	}
</style>
