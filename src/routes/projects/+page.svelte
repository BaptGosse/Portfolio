<script lang="ts">
	import { projects } from '$lib/data/projects';
	import { Github, ExternalLink, Cloud, Server, Terminal, Code2 } from 'lucide-svelte';

	let selectedFilter = $state('all');

	const categories = [
		{ id: 'all', label: 'Tous les projets' },
		{ id: 'infrastructure', label: 'Infrastructure' },
		{ id: 'cloud-native', label: 'Cloud-Native' },
		{ id: 'development', label: 'Développement' }
	];

	function getProjectCategory(project: typeof projects[0]) {
		if (project.technologies.some(t => ['Kubernetes', 'k3s', 'Helm'].includes(t))) {
			return 'cloud-native';
		} else if (project.technologies.some(t => ['Proxmox', 'Debian', 'NGINX'].includes(t))) {
			return 'infrastructure';
		}
		return 'development';
	}

	const filteredProjects = $derived(
		selectedFilter === 'all'
			? projects
			: projects.filter(p => getProjectCategory(p) === selectedFilter)
	);

	function getProjectIcon(project: typeof projects[0]) {
		if (project.id.includes('k8s') || project.technologies.includes('Kubernetes')) {
			return Cloud;
		} else if (project.id.includes('orchestrator') || project.technologies.includes('Go')) {
			return Server;
		} else if (project.technologies.includes('Rust') || project.technologies.includes('CLI')) {
			return Terminal;
		}
		return Code2;
	}
</script>

<svelte:head>
	<title>Projets - Baptiste Gosselin</title>
	<meta name="description" content="Découvrez mes projets en infrastructure cloud-native, Kubernetes, DevOps et développement système." />
</svelte:head>

<!-- Hero Section -->
<section class="page-hero">
	<div class="container">
		<div class="hero-content">
			<h1 class="page-title">
				Mes <span class="gradient-text">Projets</span>
			</h1>
			<p class="page-description">
				Une sélection de mes projets en infrastructure, cloud-native et développement système.
				De la virtualisation bare-metal aux applications distribuées sur Kubernetes.
			</p>
		</div>
	</div>
</section>

<!-- Filter Section -->
<section class="filter-section">
	<div class="container">
		<div class="filter-tabs">
			{#each categories as category}
				<button
					class="filter-tab"
					class:active={selectedFilter === category.id}
					onclick={() => selectedFilter = category.id}
				>
					{category.label}
					<span class="project-count">
						{category.id === 'all' ? projects.length : projects.filter(p => getProjectCategory(p) === category.id).length}
					</span>
				</button>
			{/each}
		</div>
	</div>
</section>

<!-- Projects Grid -->
<section class="section projects-section">
	<div class="container">
		<div class="projects-grid">
			{#each filteredProjects as project, index}
				{@const Icon = getProjectIcon(project)}
				<article
					class="project-card"
					style="animation-delay: {index * 50}ms"
				>
					<div class="project-card-header">
						<div class="project-icon">
							<Icon size={24} />
						</div>
						{#if project.featured}
							<span class="featured-badge">Phare</span>
						{/if}
					</div>

					<h3 class="project-title">{project.title}</h3>
					<p class="project-description">{project.description}</p>

					<div class="project-tags">
						{#each project.technologies as tech}
							<span class="tag">{tech}</span>
						{/each}
					</div>

					<div class="project-footer">
						{#if project.github}
							<a
								href={project.github}
								target="_blank"
								rel="noopener noreferrer"
								class="project-link"
							>
								<Github size={16} />
								GitHub
							</a>
						{/if}
						{#if project.demo}
							<a
								href={project.demo}
								target="_blank"
								rel="noopener noreferrer"
								class="project-link"
							>
								<ExternalLink size={16} />
								Demo
							</a>
						{/if}
					</div>
				</article>
			{/each}
		</div>

		{#if filteredProjects.length === 0}
			<div class="empty-state">
				<div class="empty-icon">
					<Terminal size={48} />
				</div>
				<h3 class="empty-title">Aucun projet trouvé</h3>
				<p class="empty-description">
					Essayez de changer les filtres pour voir d'autres projets.
				</p>
			</div>
		{/if}
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

	/* Filter Section */
	.filter-section {
		padding: var(--spacing-2xl) 0;
		background: var(--bg-secondary);
		border-bottom: 1px solid var(--border-color);
		position: sticky;
		top: var(--header-height);
		z-index: 100;
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
	}

	.filter-tabs {
		display: flex;
		gap: var(--spacing-sm);
		overflow-x: auto;
		-webkit-overflow-scrolling: touch;
		scrollbar-width: none;
		-ms-overflow-style: none;
	}

	.filter-tabs::-webkit-scrollbar {
		display: none;
	}

	.filter-tab {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-sm);
		padding: var(--spacing-sm) var(--spacing-lg);
		font-family: var(--font-display);
		font-size: 0.9375rem;
		font-weight: 500;
		background: var(--bg-tertiary);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-full);
		color: var(--text-secondary);
		cursor: pointer;
		transition: all var(--transition-normal);
		white-space: nowrap;
	}

	.filter-tab:hover {
		border-color: var(--color-accent);
		color: var(--color-accent);
		background: var(--bg-hover);
	}

	.filter-tab.active {
		background: linear-gradient(135deg, var(--color-accent), var(--color-accent-light));
		border-color: transparent;
		color: var(--bg-primary);
	}

	.project-count {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 24px;
		height: 24px;
		padding: 0 var(--spacing-xs);
		background: rgba(0, 0, 0, 0.2);
		border-radius: var(--radius-full);
		font-size: 0.75rem;
		font-weight: 600;
	}

	.filter-tab.active .project-count {
		background: rgba(255, 255, 255, 0.2);
	}

	/* Projects Section */
	.projects-section {
		padding: var(--spacing-4xl) 0;
	}

	.projects-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
		gap: var(--spacing-xl);
	}

	.project-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-xl);
		padding: var(--spacing-2xl);
		display: flex;
		flex-direction: column;
		gap: var(--spacing-lg);
		transition: all var(--transition-normal);
		position: relative;
		overflow: hidden;
		animation: fadeInUp var(--transition-slow) ease-out both;
	}

	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.project-card::before {
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

	.project-card:hover {
		border-color: var(--border-color-hover);
		transform: translateY(-8px);
		box-shadow: var(--shadow-xl);
	}

	.project-card:hover::before {
		opacity: 1;
	}

	.project-card-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.project-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
		background: var(--bg-hover);
		border-radius: var(--radius-lg);
		color: var(--color-accent);
		flex-shrink: 0;
	}

	.featured-badge {
		padding: var(--spacing-xs) var(--spacing-md);
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		background: linear-gradient(135deg, var(--color-secondary), var(--color-accent));
		color: var(--bg-primary);
		border-radius: var(--radius-full);
		letter-spacing: 0.05em;
	}

	.project-title {
		font-size: 1.375rem;
		font-weight: 700;
		color: var(--text-primary);
	}

	.project-description {
		color: var(--text-tertiary);
		line-height: 1.7;
		flex: 1;
	}

	.project-tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-sm);
	}

	.project-footer {
		display: flex;
		gap: var(--spacing-md);
		padding-top: var(--spacing-lg);
		border-top: 1px solid var(--border-color);
	}

	.project-link {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-xs);
		padding: var(--spacing-sm) var(--spacing-lg);
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--text-secondary);
		background: var(--bg-tertiary);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-md);
		transition: all var(--transition-fast);
	}

	.project-link:hover {
		color: var(--color-accent);
		border-color: var(--color-accent);
		background: var(--bg-hover);
		transform: translateY(-2px);
	}

	/* Empty State */
	.empty-state {
		text-align: center;
		padding: var(--spacing-5xl) var(--spacing-xl);
		max-width: 500px;
		margin: 0 auto;
	}

	.empty-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 96px;
		height: 96px;
		background: var(--bg-secondary);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-2xl);
		color: var(--text-tertiary);
		margin-bottom: var(--spacing-xl);
	}

	.empty-title {
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: var(--spacing-md);
	}

	.empty-description {
		color: var(--text-tertiary);
		line-height: 1.6;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.projects-grid {
			grid-template-columns: 1fr;
		}

		.page-hero {
			padding: var(--spacing-4xl) 0 var(--spacing-3xl);
		}

		.filter-section {
			position: relative;
			top: 0;
		}
	}
</style>
