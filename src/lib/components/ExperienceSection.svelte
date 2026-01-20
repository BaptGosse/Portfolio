<script lang="ts">
	import { Zap } from 'lucide-svelte';
	import { _ } from 'svelte-i18n';
	import { experiences } from '$lib/data/projects';
</script>

<section class="section experience-section-enhanced">
	<div class="container">
		<div class="section-header-enhanced">
			<div class="section-icon">
				<Zap size={32} />
			</div>
			<h2 class="section-title-enhanced">{$_('experience.title')}</h2>
			<p class="section-subtitle-enhanced">
				{$_('experience.subtitle')}
			</p>
		</div>

		<div class="timeline-enhanced">
			{#each experiences as exp, index}
				<div class="timeline-item-enhanced" style="animation-delay: {index * 200}ms">
					<div class="timeline-marker-enhanced"></div>
					<div class="timeline-card-enhanced">
						<div class="timeline-glow"></div>
						<div class="timeline-header">
							<div>
								<h3 class="timeline-role">{exp.role}</h3>
								<p class="timeline-company">{exp.company}</p>
							</div>
							<span class="timeline-period">{exp.period}</span>
						</div>
						<p class="timeline-description">{exp.description}</p>
						{#if exp.technologies}
							<div class="timeline-tags">
								{#each exp.technologies as tech}
									<span class="tech-tag">{tech}</span>
								{/each}
							</div>
						{/if}
					</div>
				</div>
			{/each}
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

	.experience-section-enhanced {
		background: transparent;
	}

	.timeline-enhanced {
		max-width: 900px;
		margin: 0 auto;
		position: relative;
		z-index: 1;
	}

	.timeline-enhanced::after {
		content: '';
		position: absolute;
		left: 20px;
		top: 0;
		bottom: 0;
		width: 2px;
		background: linear-gradient(180deg, rgba(193, 159, 255, 0.3) 0%, rgba(167, 139, 250, 0.3) 100%);
	}

	.timeline-item-enhanced {
		position: relative;
		padding-left: var(--spacing-4xl);
		margin-bottom: var(--spacing-3xl);
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

	.timeline-item-enhanced:last-child {
		margin-bottom: 0;
	}

	.timeline-marker-enhanced {
		position: absolute;
		left: 12px;
		top: 0;
		width: 16px;
		height: 16px;
		background: linear-gradient(135deg, var(--color-accent), var(--color-secondary-accent));
		border-radius: 50%;
		box-shadow: 0 0 16px var(--color-accent-glow), 0 0 0 4px var(--bg-primary), 0 0 0 6px var(--border-color);
		z-index: 2;
	}

	.timeline-card-enhanced {
		position: relative;
		background: var(--bg-secondary);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-2xl);
		padding: var(--spacing-xl);
		transition: all var(--transition-normal);
		overflow: hidden;
	}

	.timeline-glow {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 100%;
		background: radial-gradient(circle at top right, var(--color-accent-glow) 0%, transparent 60%);
		opacity: 0;
		transition: opacity var(--transition-normal);
	}

	.timeline-card-enhanced:hover {
		border-color: var(--color-accent);
		transform: translateX(8px);
		box-shadow: 0 20px 60px rgba(193, 159, 255, 0.2);
	}

	.timeline-card-enhanced:hover .timeline-glow {
		opacity: 1;
	}

	.timeline-header {
		display: flex;
		justify-content: space-between;
		align-items: start;
		margin-bottom: var(--spacing-lg);
		gap: var(--spacing-md);
		position: relative;
		z-index: 1;
	}

	.timeline-role {
		font-size: 1.375rem;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: var(--spacing-xs);
	}

	.timeline-company {
		font-size: 1.125rem;
		color: var(--color-accent);
		font-weight: 500;
	}

	.timeline-period {
		padding: var(--spacing-sm) var(--spacing-lg);
		background: var(--bg-hover);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-full);
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--text-secondary);
		white-space: nowrap;
	}

	.timeline-description {
		color: var(--text-secondary);
		line-height: 1.7;
		margin-bottom: var(--spacing-lg);
		position: relative;
		z-index: 1;
	}

	.timeline-tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-sm);
		position: relative;
		z-index: 1;
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

	@media (max-width: 768px) {
		.timeline-enhanced {
			padding-left: 12px;
		}

		.timeline-item-enhanced {
			padding-left: var(--spacing-3xl);
		}

		.timeline-marker-enhanced {
			left: 4px;
		}
	}
</style>
