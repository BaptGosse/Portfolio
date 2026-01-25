<script lang="ts">
	import { Plus, Edit, GripVertical } from 'lucide-svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Compétences - Admin</title>
</svelte:head>

<div class="page">
	<header class="page-header">
		<div>
			<h1>Compétences</h1>
			<p class="subtitle">
				{data.categories.length} catégorie{data.categories.length > 1 ? 's' : ''} •
				{data.categories.reduce((sum, cat) => sum + cat.skills.length, 0)} compétences
			</p>
		</div>
		<div class="header-actions">
			<a href="/admin/skills/categories/new" class="btn-secondary">
				<Plus size={18} />
				Nouvelle catégorie
			</a>
			<a href="/admin/skills/new" class="btn-primary">
				<Plus size={18} />
				Nouvelle compétence
			</a>
		</div>
	</header>

	{#if data.categories.length > 0}
		<div class="categories-list">
			{#each data.categories as category}
				<div class="category-card">
					<div class="category-header">
						<div class="category-info">
							<GripVertical size={20} class="drag-handle" />
							<div>
								<h3>{category.CAT_NAME.fr}</h3>
								<p class="category-subtitle">{category.skills.length} compétences</p>
							</div>
						</div>
						<a href="/admin/skills/categories/{category.CAT_ID}" class="btn-icon" title="Modifier">
							<Edit size={16} />
						</a>
					</div>

					{#if category.skills.length > 0}
						<div class="skills-grid">
							{#each category.skills as skill}
								<a href="/admin/skills/{skill.SKI_ID}" class="skill-item">
									<div class="skill-content">
										<h4>{skill.SKI_NAME.fr}</h4>
										<p>{skill.SKI_CONTEXT.fr.slice(0, 80)}...</p>
									</div>
									<Edit size={14} class="edit-icon" />
								</a>
							{/each}
						</div>
					{:else}
						<div class="empty-category">
							<p>Aucune compétence dans cette catégorie</p>
							<a href="/admin/skills/new?category={category.CAT_ID}" class="btn-text">
								<Plus size={16} />
								Ajouter une compétence
			</a>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	{:else}
		<div class="empty-state">
			<p>Aucune catégorie pour le moment.</p>
			<a href="/admin/skills/categories/new" class="btn-secondary">
				<Plus size={18} />
				Créer la première catégorie
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
		gap: var(--spacing-md);
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

	.header-actions {
		display: flex;
		gap: var(--spacing-sm);
	}

	.btn-primary,
	.btn-secondary {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-xs);
		padding: var(--spacing-sm) var(--spacing-md);
		border-radius: var(--radius-md);
		font-size: 0.875rem;
		font-weight: 600;
		text-decoration: none;
		cursor: pointer;
		transition: all var(--transition-fast);
		border: 1px solid;
	}

	.btn-primary {
		background: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-700));
		color: white;
		border-color: transparent;
	}

	.btn-primary:hover {
		transform: translateY(-1px);
		box-shadow: 0 4px 12px rgba(192, 158, 253, 0.4);
	}

	.btn-secondary {
		background-color: var(--bg-elevated);
		border-color: var(--border-color);
		color: var(--text-secondary);
	}

	.btn-secondary:hover {
		background-color: var(--bg-primary);
		color: var(--text-primary);
	}

	.categories-list {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xl);
	}

	.category-card {
		background-color: var(--bg-secondary);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-lg);
		padding: var(--spacing-xl);
		transition: all var(--transition-fast);
	}

	.category-card:hover {
		border-color: var(--color-primary-400);
		box-shadow: 0 4px 12px rgba(192, 158, 253, 0.1);
	}

	.category-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--spacing-lg);
	}

	.category-info {
		display: flex;
		align-items: center;
		gap: var(--spacing-md);
	}

	.drag-handle {
		color: var(--text-tertiary);
		cursor: grab;
	}

	.drag-handle:active {
		cursor: grabbing;
	}

	.category-header h3 {
		font-size: 1.25rem;
		color: var(--text-primary);
		margin-bottom: var(--spacing-xs);
	}

	.category-subtitle {
		color: var(--text-tertiary);
		font-size: 0.875rem;
	}

	.btn-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border-radius: var(--radius-sm);
		color: var(--text-tertiary);
		transition: all var(--transition-fast);
	}

	.btn-icon:hover {
		background-color: var(--bg-elevated);
		color: var(--text-primary);
	}

	.skills-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: var(--spacing-md);
	}

	.skill-item {
		display: flex;
		justify-content: space-between;
		align-items: start;
		gap: var(--spacing-sm);
		padding: var(--spacing-md);
		background-color: var(--bg-elevated);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-md);
		transition: all var(--transition-fast);
		text-decoration: none;
	}

	.skill-item:hover {
		border-color: var(--color-primary-400);
		background-color: var(--bg-hover);
	}

	.skill-content {
		flex: 1;
		min-width: 0;
	}

	.skill-content h4 {
		font-size: 0.9375rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: var(--spacing-xs);
	}

	.skill-content p {
		font-size: 0.8125rem;
		color: var(--text-tertiary);
		line-height: 1.5;
	}

	.edit-icon {
		flex-shrink: 0;
		color: var(--text-tertiary);
	}

	.empty-category {
		text-align: center;
		padding: var(--spacing-xl);
		background-color: var(--bg-elevated);
		border-radius: var(--radius-md);
	}

	.empty-category p {
		color: var(--text-secondary);
		margin-bottom: var(--spacing-md);
	}

	.btn-text {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-xs);
		color: var(--color-primary-400);
		font-size: 0.875rem;
		font-weight: 500;
		text-decoration: none;
	}

	.btn-text:hover {
		color: var(--color-primary-300);
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

	@media (max-width: 768px) {
		.page-header {
			flex-direction: column;
			align-items: flex-start;
		}

		.header-actions {
			width: 100%;
		}

		.btn-primary,
		.btn-secondary {
			flex: 1;
		}

		.skills-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
