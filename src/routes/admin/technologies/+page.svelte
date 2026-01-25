<script lang="ts">
	import { Plus, Edit } from 'lucide-svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Technologies - Admin</title>
</svelte:head>

<div class="page">
	<header class="page-header">
		<div>
			<h1>Technologies</h1>
			<p class="subtitle">{data.technologies.length} technologie{data.technologies.length > 1 ? 's' : ''}</p>
		</div>
		<a href="/admin/technologies/new" class="btn-primary">
			<Plus size={18} />
			Nouvelle technologie
		</a>
	</header>

	{#if data.technologies.length > 0}
		<div class="technologies-grid">
			{#each data.technologies as tech}
				<a href="/admin/technologies/{tech.TEC_ID}" class="tech-card">
					<div class="tech-name">{tech.TEC_NAME.fr}</div>
					<div class="tech-slug">{tech.TEC_SLUG}</div>
					<Edit size={14} class="edit-icon" />
				</a>
			{/each}
		</div>
	{:else}
		<div class="empty-state">
			<p>Aucune technologie.</p>
			<a href="/admin/technologies/new" class="btn-secondary">
				<Plus size={18} />
				Créer la première technologie
			</a>
		</div>
	{/if}
</div>

<style>
	.page {
		max-width: 1200px;
		margin: 0 auto;
	}

	.page-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: var(--spacing-xl);
	}

	.page-header h1 {
		font-size: 1.5rem;
		color: var(--text-primary);
		margin-bottom: var(--spacing-xs);
	}

	.subtitle {
		color: var(--text-tertiary);
		font-size: 0.875rem;
	}

	.btn-primary {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-xs);
		padding: var(--spacing-sm) var(--spacing-md);
		background: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-700));
		color: white;
		border: none;
		border-radius: var(--radius-md);
		font-size: 0.875rem;
		font-weight: 600;
		text-decoration: none;
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.btn-primary:hover {
		transform: translateY(-1px);
		box-shadow: 0 4px 12px rgba(192, 158, 253, 0.4);
	}

	.technologies-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: var(--spacing-md);
	}

	.tech-card {
		position: relative;
		padding: var(--spacing-md);
		background-color: var(--bg-secondary);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-lg);
		text-decoration: none;
		transition: all var(--transition-fast);
	}

	.tech-card:hover {
		border-color: var(--color-primary-400);
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(192, 158, 253, 0.1);
	}

	.tech-name {
		font-weight: 500;
		color: var(--text-primary);
		margin-bottom: var(--spacing-xs);
	}

	.tech-slug {
		font-size: 0.75rem;
		color: var(--text-tertiary);
		font-family: monospace;
	}

	.edit-icon {
		position: absolute;
		top: var(--spacing-sm);
		right: var(--spacing-sm);
		color: var(--text-tertiary);
	}

	.empty-state {
		text-align: center;
		padding: var(--spacing-3xl) var(--spacing-md);
		background-color: var(--bg-secondary);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-lg);
	}

	.empty-state p {
		color: var(--text-secondary);
		margin-bottom: var(--spacing-lg);
	}

	.btn-secondary {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-xs);
		padding: var(--spacing-sm) var(--spacing-md);
		background-color: var(--bg-elevated);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-md);
		color: var(--text-secondary);
		font-size: 0.875rem;
		text-decoration: none;
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.btn-secondary:hover {
		background-color: var(--bg-primary);
		color: var(--text-primary);
	}
</style>
