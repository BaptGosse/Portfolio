<script lang="ts">
	import { Plus, Edit, Heart } from 'lucide-svelte';
	import { getIcon, isLucideIcon } from '$lib/utils/iconMapper';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="page">
	<header class="page-header">
		<div class="header-content">
			<div class="header-icon">
				<Heart size={32} />
			</div>
			<div>
				<h1>Passions Culturelles</h1>
				<p class="subtitle">Gérez vos passions et soft skills associées</p>
			</div>
		</div>
		<div class="header-actions">
			<a href="/admin/soft-skills" class="btn-secondary">
				Gérer les soft skills
			</a>
			<a href="/admin/passions/new" class="btn-primary">
				<Plus size={20} />
				Nouvelle passion
			</a>
		</div>
	</header>

	<div class="passions-grid">
		{#each data.passions as passion}
			<div class="passion-card">
				<div class="passion-header">
					<div class="passion-info">
						<div class="passion-icon">
							{#if isLucideIcon(passion.PAS_ICON)}
								<svelte:component this={getIcon(passion.PAS_ICON)} size={32} />
							{:else}
								<span class="passion-icon-text">{passion.PAS_ICON}</span>
							{/if}
						</div>
						<div>
							<h3>{passion.PAS_TITLE.fr}</h3>
							<p class="passion-title-en">{passion.PAS_TITLE.en}</p>
						</div>
					</div>
					<a href="/admin/passions/{passion.PAS_ID}" class="btn-icon" title="Éditer">
						<Edit size={18} />
					</a>
				</div>

				<p class="passion-description">{passion.PAS_DESCRIPTION.fr}</p>

				{#if passion.softSkills.length > 0}
					<div class="soft-skills">
						<span class="label">Soft skills:</span>
						<div class="skills-tags">
							{#each passion.softSkills as skill}
								<span class="skill-tag">{skill.name.fr}</span>
							{/each}
						</div>
					</div>
				{/if}

				<div class="passion-meta">
					<span class="order-badge">Ordre: {passion.PAS_ORDER}</span>
				</div>
			</div>
		{/each}

		{#if data.passions.length === 0}
			<div class="empty-state">
				<Heart size={48} />
				<h3>Aucune passion</h3>
				<p>Commencez par créer votre première passion culturelle</p>
				<a href="/admin/passions/new" class="btn-primary">
					<Plus size={20} />
					Créer une passion
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

	.passions-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
		gap: var(--spacing-xl);
	}

	.passion-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-xl);
		padding: var(--spacing-xl);
		transition: all var(--transition-normal);
	}

	.passion-card:hover {
		border-color: var(--color-accent);
		box-shadow: 0 8px 32px var(--color-accent-glow);
		transform: translateY(-4px);
	}

	.passion-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: var(--spacing-md);
	}

	.passion-info {
		display: flex;
		align-items: flex-start;
		gap: var(--spacing-md);
		flex: 1;
	}

	.passion-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		color: var(--color-accent);
	}

	.passion-icon-text {
		font-size: 2rem;
	}

	.passion-info h3 {
		font-size: 1.25rem;
		font-weight: 600;
		margin: 0;
		color: var(--text-primary);
	}

	.passion-title-en {
		font-size: 0.875rem;
		color: var(--text-tertiary);
		margin: var(--spacing-xs) 0 0;
	}

	.passion-description {
		color: var(--text-secondary);
		line-height: 1.6;
		margin-bottom: var(--spacing-lg);
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.soft-skills {
		padding-top: var(--spacing-md);
		border-top: 1px solid var(--border-color);
		margin-bottom: var(--spacing-md);
	}

	.label {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--text-tertiary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		display: block;
		margin-bottom: var(--spacing-sm);
	}

	.skills-tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-xs);
	}

	.skill-tag {
		display: inline-flex;
		padding: var(--spacing-xs) var(--spacing-sm);
		background: var(--bg-tertiary);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-full);
		font-size: 0.75rem;
		color: var(--text-secondary);
		font-weight: 500;
	}

	.passion-meta {
		display: flex;
		justify-content: flex-end;
		margin-top: var(--spacing-md);
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

		.passions-grid {
			grid-template-columns: 1fr;
		}

		.header-content {
			flex-direction: column;
			align-items: flex-start;
		}
	}
</style>
