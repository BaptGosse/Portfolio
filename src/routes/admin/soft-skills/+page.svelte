<script lang="ts">
	import { Plus, Edit, Sparkles } from 'lucide-svelte';
	import { getIcon, isLucideIcon } from '$lib/utils/iconMapper';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="page">
	<header class="page-header">
		<div class="header-content">
			<div class="header-icon">
				<Sparkles size={32} />
			</div>
			<div>
				<h1>Soft Skills</h1>
				<p class="subtitle">Gérez les compétences transversales</p>
			</div>
		</div>
		<div class="header-actions">
			<a href="/admin/passions" class="btn-secondary">
				Retour aux passions
			</a>
			<a href="/admin/soft-skills/new" class="btn-primary">
				<Plus size={20} />
				Nouvelle soft skill
			</a>
		</div>
	</header>

	<div class="skills-grid">
		{#each data.softSkills as skill}
			<div class="skill-card">
				<div class="skill-header">
					<div class="skill-info">
						<div class="skill-icon">
						{#if isLucideIcon(skill.SSK_ICON)}
							<svelte:component this={getIcon(skill.SSK_ICON)} size={24} />
						{:else}
							<span class="skill-icon-text">{skill.SSK_ICON}</span>
						{/if}
					</div>
						<div>
							<h3>{skill.SSK_NAME.fr}</h3>
							<p class="skill-name-en">{skill.SSK_NAME.en}</p>
						</div>
					</div>
					<a href="/admin/soft-skills/{skill.SSK_ID}" class="btn-icon" title="Éditer">
						<Edit size={18} />
					</a>
				</div>

				<p class="skill-description">{skill.SSK_DESCRIPTION.fr}</p>

				<div class="skill-meta">
					<span class="order-badge">Ordre: {skill.SSK_ORDER}</span>
				</div>
			</div>
		{/each}

		{#if data.softSkills.length === 0}
			<div class="empty-state">
				<Sparkles size={48} />
				<h3>Aucune soft skill</h3>
				<p>Commencez par créer votre première compétence transversale</p>
				<a href="/admin/soft-skills/new" class="btn-primary">
					<Plus size={20} />
					Créer une soft skill
				</a>
			</div>
		{/if}
	</div>
</div>

<style>
	.page {
		padding: var(--spacing-2xl);
		max-width: 1400px;
		margin: 0 auto;
	}

	.page-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--spacing-3xl);
		flex-wrap: wrap;
		gap: var(--spacing-lg);
	}

	.header-content {
		display: flex;
		align-items: center;
		gap: var(--spacing-lg);
	}

	.header-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 64px;
		height: 64px;
		background: linear-gradient(135deg, var(--color-accent), var(--color-secondary-accent));
		border-radius: var(--radius-xl);
		color: white;
		box-shadow: 0 8px 24px var(--color-accent-glow);
	}

	h1 {
		font-size: 2rem;
		font-weight: 700;
		margin: 0;
		color: var(--text-primary);
	}

	.subtitle {
		color: var(--text-tertiary);
		margin: var(--spacing-xs) 0 0;
	}

	.header-actions {
		display: flex;
		gap: var(--spacing-md);
	}

	.skills-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
		gap: var(--spacing-xl);
	}

	.skill-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-xl);
		padding: var(--spacing-xl);
		transition: all var(--transition-normal);
	}

	.skill-card:hover {
		border-color: var(--color-accent);
		box-shadow: 0 8px 32px var(--color-accent-glow);
		transform: translateY(-4px);
	}

	.skill-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: var(--spacing-md);
	}

	.skill-info {
		display: flex;
		align-items: flex-start;
		gap: var(--spacing-md);
		flex: 1;
	}

	.skill-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		color: var(--color-accent);
	}

	.skill-icon-text {
		font-size: 1.5rem;
	}

	.skill-info h3 {
		font-size: 1.125rem;
		font-weight: 600;
		margin: 0;
		color: var(--text-primary);
	}

	.skill-name-en {
		font-size: 0.875rem;
		color: var(--text-tertiary);
		margin: var(--spacing-xs) 0 0;
	}

	.skill-description {
		color: var(--text-secondary);
		line-height: 1.6;
		margin-bottom: var(--spacing-lg);
	}

	.skill-meta {
		display: flex;
		justify-content: flex-end;
		padding-top: var(--spacing-md);
		border-top: 1px solid var(--border-color);
	}

	.order-badge {
		display: inline-flex;
		padding: var(--spacing-xs) var(--spacing-sm);
		background: var(--bg-tertiary);
		border-radius: var(--radius-md);
		font-size: 0.75rem;
		color: var(--text-tertiary);
		font-weight: 600;
	}

	.empty-state {
		grid-column: 1 / -1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-4xl);
		text-align: center;
		color: var(--text-tertiary);
	}

	.empty-state h3 {
		margin: var(--spacing-lg) 0 var(--spacing-sm);
		color: var(--text-primary);
	}

	.empty-state p {
		margin-bottom: var(--spacing-xl);
	}

	.btn-primary,
	.btn-secondary {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-xs);
		padding: var(--spacing-sm) var(--spacing-lg);
		border-radius: var(--radius-lg);
		font-weight: 500;
		text-decoration: none;
		transition: all var(--transition-fast);
	}

	.btn-primary {
		background: linear-gradient(135deg, var(--color-accent), var(--color-secondary-accent));
		color: white;
		border: none;
	}

	.btn-primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 16px var(--color-accent-glow);
	}

	.btn-secondary {
		background: var(--bg-secondary);
		color: var(--text-primary);
		border: 1px solid var(--border-color);
	}

	.btn-secondary:hover {
		border-color: var(--color-accent);
		color: var(--color-accent);
	}

	.btn-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		background: var(--bg-tertiary);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-md);
		color: var(--text-secondary);
		text-decoration: none;
		transition: all var(--transition-fast);
	}

	.btn-icon:hover {
		background: var(--color-accent);
		border-color: var(--color-accent);
		color: white;
	}

	@media (max-width: 768px) {
		.page {
			padding: var(--spacing-lg);
		}

		.skills-grid {
			grid-template-columns: 1fr;
		}

		.header-content {
			flex-direction: column;
			align-items: flex-start;
		}
	}
</style>
