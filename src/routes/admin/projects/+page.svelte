<script lang="ts">
	import { Plus, Edit, Trash2, Star, StarOff } from 'lucide-svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Projets - Admin</title>
</svelte:head>

<div class="page">
	<header class="page-header">
		<div>
			<h1>Projets</h1>
			<p class="subtitle">{data.projects.length} projet{data.projects.length > 1 ? 's' : ''}</p>
		</div>
		<a href="/admin/projects/new" class="btn-primary">
			<Plus size={18} />
			Nouveau projet
		</a>
	</header>

	{#if data.projects.length > 0}
		<div class="table-container">
			<table class="table">
				<thead>
					<tr>
						<th>Titre</th>
						<th>Slug</th>
						<th>Featured</th>
						<th>Créé le</th>
						<th class="actions-column">Actions</th>
					</tr>
				</thead>
				<tbody>
					{#each data.projects as project}
						<tr>
							<td>
								<div class="project-title">
									{project.PRJ_TITLE}
								</div>
							</td>
							<td>
								<code class="slug">{project.PRJ_SLUG}</code>
							</td>
							<td>
								{#if project.PRJ_FEATURED}
									<span class="badge badge-featured">
										<Star size={14} />
										Featured
									</span>
								{:else}
									<span class="badge">
										<StarOff size={14} />
										Normal
									</span>
								{/if}
							</td>
							<td>
								<time datetime={project.PRJ_CREATED_AT.toISOString()}>
									{project.PRJ_CREATED_AT.toLocaleDateString('fr-FR')}
								</time>
							</td>
							<td class="actions">
								<a href="/admin/projects/{project.PRJ_ID}" class="btn-icon" title="Modifier">
									<Edit size={16} />
								</a>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{:else}
		<div class="empty-state">
			<p>Aucun projet pour le moment.</p>
			<a href="/admin/projects/new" class="btn-secondary">
				<Plus size={18} />
				Créer le premier projet
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

	.table-container {
		background-color: var(--bg-secondary);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-lg);
		overflow: hidden;
	}

	.table {
		width: 100%;
		border-collapse: collapse;
	}

	.table thead {
		background-color: var(--bg-elevated);
	}

	.table th {
		text-align: left;
		padding: var(--spacing-sm) var(--spacing-md);
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--text-tertiary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.table td {
		padding: var(--spacing-md);
		border-top: 1px solid var(--border-color);
		font-size: 0.875rem;
	}

	.table tbody tr {
		transition: background-color var(--transition-fast);
	}

	.table tbody tr:hover {
		background-color: var(--bg-elevated);
	}

	.project-title {
		font-weight: 500;
		color: var(--text-primary);
	}

	.slug {
		font-family: 'Consolas', 'Monaco', monospace;
		font-size: 0.75rem;
		color: var(--text-tertiary);
		background-color: var(--bg-elevated);
		padding: 0.125rem 0.375rem;
		border-radius: var(--radius-sm);
	}

	.badge {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-xs);
		padding: var(--spacing-xs) 0.75rem;
		font-size: 0.75rem;
		font-weight: 500;
		background-color: var(--bg-elevated);
		color: var(--text-secondary);
		border-radius: 9999px;
	}

	.badge-featured {
		background-color: rgba(192, 158, 253, 0.1);
		color: var(--color-primary-400);
	}

	.actions-column {
		width: 100px;
	}

	.actions {
		display: flex;
		gap: var(--spacing-xs);
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
