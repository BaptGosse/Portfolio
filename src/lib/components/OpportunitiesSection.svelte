<script lang="ts">
	import { Sparkles, Terminal, Rocket, ArrowRight } from 'lucide-svelte';
	import { _ } from 'svelte-i18n';
</script>

<section class="section opportunities-section">
	<div class="container">
		<div class="section-header-enhanced">
			<div class="section-icon">
				<Sparkles size={32} />
			</div>
			<h2 class="section-title-enhanced">{$_('opportunities.title')}</h2>
			<p class="section-subtitle-enhanced">
				{$_('opportunities.subtitle')}
			</p>
		</div>

		<div class="opportunities-grid">
			<div class="opportunity-card">
				<div class="opportunity-header">
					<div class="opportunity-icon stage">
						<Terminal size={28} />
					</div>
					<span class="opportunity-badge">{$_('opportunities.internship.badge')}</span>
				</div>
				<h3 class="opportunity-title">{$_('opportunities.internship.title')}</h3>
				<p class="opportunity-duration">{$_('opportunities.internship.duration')}</p>
				<p class="opportunity-description">
					{$_('opportunities.internship.description')}
				</p>
				<ul class="opportunity-skills">
					{#each $_('opportunities.internship.skills') as skill}
						<li>{skill}</li>
					{/each}
				</ul>
			</div>

			<div class="opportunity-card featured">
				<div class="opportunity-header">
					<div class="opportunity-icon alternance">
						<Rocket size={28} />
					</div>
					<span class="opportunity-badge featured">{$_('opportunities.apprenticeship.badge')}</span>
				</div>
				<h3 class="opportunity-title">{$_('opportunities.apprenticeship.title')}</h3>
				<p class="opportunity-duration">{$_('opportunities.apprenticeship.duration')}</p>
				<p class="opportunity-description">
					{$_('opportunities.apprenticeship.description')}
				</p>
				<ul class="opportunity-skills">
					{#each $_('opportunities.apprenticeship.skills') as skill}
						<li>{skill}</li>
					{/each}
				</ul>
			</div>
		</div>

		<div class="opportunities-cta">
			<a href="/documents/CV.pdf" download class="btn-enhanced btn-primary-enhanced">
				<span>{$_('opportunities.downloadCV')}</span>
				<ArrowRight size={20} />
			</a>
			<a href="#contact" class="btn-enhanced btn-secondary-enhanced">
				<span>{$_('opportunities.contactMe')}</span>
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

	.opportunities-section {
		background: transparent;
	}

	.opportunities-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		gap: var(--spacing-xl);
		margin-bottom: var(--spacing-4xl);
	}

	.opportunity-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-2xl);
		padding: var(--spacing-2xl);
		transition: all var(--transition-normal);
		position: relative;
		overflow: hidden;
	}

	.opportunity-card.featured {
		border: 2px solid var(--color-accent);
		background: linear-gradient(135deg, var(--bg-secondary) 0%, rgba(162, 109, 249, 0.05) 100%);
	}

	.opportunity-card:hover {
		border-color: var(--color-accent);
		transform: translateY(-8px);
		box-shadow: 0 24px 64px rgba(193, 159, 255, 0.25);
	}

	.opportunity-header {
		display: flex;
		justify-content: space-between;
		align-items: start;
		margin-bottom: var(--spacing-lg);
	}

	.opportunity-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 56px;
		height: 56px;
		border-radius: var(--radius-xl);
		transition: all var(--transition-normal);
	}

	.opportunity-icon.stage {
		background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(192, 132, 252, 0.1));
		border: 1px solid rgba(139, 92, 246, 0.3);
		color: var(--color-accent);
	}

	.opportunity-icon.alternance {
		background: linear-gradient(135deg, rgba(162, 109, 249, 0.15), rgba(192, 132, 252, 0.15));
		border: 2px solid var(--color-accent);
		color: var(--color-accent);
	}

	.opportunity-card:hover .opportunity-icon {
		transform: scale(1.1) rotate(5deg);
	}

	.opportunity-badge {
		padding: var(--spacing-xs) var(--spacing-md);
		background: var(--bg-tertiary);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-full);
		font-size: 0.8125rem;
		font-weight: 600;
		color: var(--text-secondary);
	}

	.opportunity-badge.featured {
		background: linear-gradient(135deg, var(--color-accent), var(--color-secondary-accent));
		color: #ffffff;
		border: none;
	}

	.opportunity-title {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: var(--spacing-sm);
	}

	.opportunity-duration {
		font-size: 0.9375rem;
		color: var(--color-accent);
		font-weight: 500;
		margin-bottom: var(--spacing-lg);
	}

	.opportunity-description {
		color: var(--text-secondary);
		line-height: 1.7;
		margin-bottom: var(--spacing-lg);
	}

	.opportunity-skills {
		list-style: none;
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-sm);
		margin: 0;
		padding: 0;
	}

	.opportunity-skills li {
		padding: var(--spacing-xs) var(--spacing-md);
		background: var(--bg-tertiary);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-full);
		font-size: 0.8125rem;
		color: var(--text-secondary);
		transition: all var(--transition-fast);
	}

	.opportunity-skills li:hover {
		border-color: var(--color-accent);
		color: var(--color-accent);
		background: var(--bg-hover);
	}

	.opportunities-cta {
		display: flex;
		justify-content: center;
		gap: var(--spacing-md);
		flex-wrap: wrap;
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

	.btn-secondary-enhanced {
		background: var(--bg-tertiary);
		color: var(--text-primary);
		border: 1px solid var(--border-color);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	.btn-secondary-enhanced:hover {
		border-color: var(--color-accent);
		background: var(--bg-hover);
		box-shadow: 0 8px 24px rgba(139, 92, 246, 0.15);
	}
</style>
