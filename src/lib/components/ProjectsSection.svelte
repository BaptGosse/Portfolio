<script lang="ts">
	import { Rocket, Cloud, Server, Terminal, Sparkles, ArrowRight, Github } from 'lucide-svelte';
	import { _ } from 'svelte-i18n';
	import { projects } from '$lib/data/projects';

	const featuredProjects = projects.filter(p => p.featured).slice(0, 3);
</script>

<section class="section projects-section-enhanced" id="projects">
	<div class="container">
		<div class="section-header-enhanced">
			<div class="section-icon">
				<Rocket size={32} />
			</div>
			<h2 class="section-title-enhanced">{$_('projects.title')}</h2>
			<p class="section-subtitle-enhanced">
				{$_('projects.subtitle')}
			</p>
		</div>

		<div class="bento-grid">
			{#each featuredProjects as project, index}
				<article class="bento-item" class:featured={index === 0} style="animation-delay: {index * 150}ms">
					<div class="bento-glow"></div>
					<div class="bento-content">
						<div class="bento-header">
							<div class="bento-icon">
								{#if project.id.includes('k8s')}
									<Cloud size={28} />
								{:else if project.id.includes('orchestrator')}
									<Server size={28} />
								{:else}
									<Terminal size={28} />
								{/if}
							</div>
							{#if project.featured}
								<span class="featured-badge-enhanced">
									<Sparkles size={14} />
									{$_('projects.featured')}
								</span>
							{/if}
						</div>

						<h3 class="bento-title">{project.title}</h3>
						<p class="bento-description">{project.description}</p>

						<div class="bento-tags">
							{#each project.technologies.slice(0, 4) as tech}
								<span class="tech-tag">{tech}</span>
							{/each}
						</div>

						{#if project.github}
							<a href={project.github} class="bento-link" target="_blank" rel="noopener noreferrer">
								<Github size={18} />
								{$_('projects.viewOnGithub')}
								<ArrowRight size={16} class="arrow-icon" />
							</a>
						{/if}
					</div>
				</article>
			{/each}
		</div>

		<div class="section-cta-enhanced">
			<a href="/projects" class="btn-enhanced btn-primary-enhanced">
				<span>{$_('projects.allProjects')}</span>
				<ArrowRight size={20} />
			</a>
		</div>
	</div>
</section>

<style>
	.section {
		position: relative;
		padding: var(--spacing-3xl) 0;
	}

	.section .container {
		position: relative;
		z-index: 1;
	}

	.section-header-enhanced {
		text-align: center;
		margin-bottom: var(--spacing-4xl);
		position: relative;
	}

	.section-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 64px;
		height: 64px;
		background: linear-gradient(135deg, var(--color-accent), var(--color-secondary-accent));
		border-radius: var(--radius-2xl);
		color: var(--bg-primary);
		margin-bottom: var(--spacing-lg);
		box-shadow: 0 8px 32px var(--color-accent-glow);
		animation: iconFloat 3s ease-in-out infinite;
	}

	@keyframes iconFloat {
		0%, 100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-10px);
		}
	}

	.section-title-enhanced {
		font-size: clamp(2.5rem, 5vw, 3.5rem);
		font-weight: 800;
		margin-bottom: var(--spacing-md);
		background: linear-gradient(135deg, var(--text-primary), var(--color-accent));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.section-subtitle-enhanced {
		font-size: clamp(1rem, 2vw, 1.25rem);
		color: var(--text-tertiary);
		max-width: 600px;
		margin: 0 auto;
	}

	.projects-section-enhanced {
		background: transparent;
	}

	.bento-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		gap: var(--spacing-xl);
		margin-bottom: var(--spacing-4xl);
		position: relative;
		z-index: 1;
	}

	.bento-item {
		position: relative;
		background: var(--bg-secondary);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-2xl);
		padding: var(--spacing-xl);
		transition: all var(--transition-normal);
		overflow: hidden;
		animation: fadeInUp 0.6s ease-out both;
	}

	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.bento-item.featured {
		grid-column: span 1;
	}

	.bento-glow {
		position: absolute;
		inset: 0;
		background: radial-gradient(circle at top left, var(--color-accent-glow) 0%, transparent 70%);
		opacity: 0;
		transition: opacity var(--transition-normal);
	}

	.bento-item:hover {
		border-color: var(--color-accent);
		transform: translateY(-8px) scale(1.02);
		box-shadow: 0 24px 64px rgba(193, 159, 255, 0.25);
	}

	.bento-item:hover .bento-glow {
		opacity: 1;
	}

	.bento-content {
		position: relative;
		z-index: 1;
	}

	.bento-header {
		display: flex;
		justify-content: space-between;
		align-items: start;
		margin-bottom: var(--spacing-lg);
	}

	.bento-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 56px;
		height: 56px;
		background: var(--bg-hover);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-xl);
		color: var(--color-accent);
	}

	.featured-badge-enhanced {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-xs);
		padding: var(--spacing-xs) var(--spacing-md);
		background: linear-gradient(135deg, var(--color-accent), var(--color-secondary-accent));
		color: var(--bg-primary);
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		border-radius: var(--radius-full);
		box-shadow: 0 4px 12px var(--color-accent-glow);
	}

	.bento-title {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: var(--spacing-md);
	}

	.bento-description {
		color: var(--text-tertiary);
		line-height: 1.7;
		margin-bottom: var(--spacing-lg);
	}

	.bento-tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-sm);
		margin-bottom: var(--spacing-lg);
	}

	.tech-tag {
		padding: var(--spacing-xs) var(--spacing-md);
		background: var(--bg-tertiary);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-full);
		font-size: 0.8125rem;
		font-weight: 500;
		color: var(--text-secondary);
		transition: all var(--transition-fast);
	}

	.tech-tag:hover {
		border-color: var(--color-accent);
		color: var(--color-accent);
		background: var(--bg-hover);
	}

	.bento-link {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-sm);
		padding: var(--spacing-md) var(--spacing-xl);
		background: var(--bg-secondary);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-lg);
		color: var(--text-primary);
		font-weight: 500;
		transition: all var(--transition-normal);
	}

	.bento-link:hover {
		border-color: var(--color-accent);
		background: var(--bg-hover);
		transform: translateX(4px);
	}

	.bento-link :global(.arrow-icon) {
		transition: transform var(--transition-fast);
	}

	.bento-link:hover :global(.arrow-icon) {
		transform: translateX(4px);
	}

	.section-cta-enhanced {
		display: flex;
		justify-content: center;
		position: relative;
		z-index: 1;
	}

	.btn-enhanced {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-md);
		padding: var(--spacing-lg) var(--spacing-2xl);
		font-family: var(--font-display);
		font-size: 1.125rem;
		font-weight: 600;
		border: none;
		border-radius: var(--radius-full);
		cursor: pointer;
		transition: all var(--transition-normal);
		text-decoration: none;
		position: relative;
		overflow: hidden;
	}

	.btn-primary-enhanced {
		background: linear-gradient(135deg, var(--color-accent), var(--color-secondary-accent));
		color: var(--bg-primary);
		box-shadow: 0 8px 32px var(--color-accent-glow);
	}

	.btn-primary-enhanced:hover {
		transform: translateY(-4px);
		box-shadow: 0 16px 48px var(--color-accent-glow);
		background: linear-gradient(135deg, var(--color-secondary-accent), var(--color-accent));
	}

	@media (min-width: 768px) {
		.bento-item.featured {
			grid-column: span 2;
		}
	}

	@media (max-width: 768px) {
		.bento-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
