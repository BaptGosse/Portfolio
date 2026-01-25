<script lang="ts">
	import { Plus, Edit, Trash2, Eye, EyeOff, ExternalLink } from 'lucide-svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Articles - Admin</title>
</svelte:head>

<div class="posts-page">
	<header class="page-header">
		<div>
			<h1>Articles</h1>
			<p>Gérez vos articles de blog</p>
		</div>
		<a href="/admin/posts/new" class="btn-primary">
			<Plus size={18} />
			Nouvel article
		</a>
	</header>

	{#if data.posts.length === 0}
		<div class="empty-state">
			<p>Aucun article pour le moment</p>
			<a href="/admin/posts/new" class="btn-primary">
				<Plus size={18} />
				Créer votre premier article
			</a>
		</div>
	{:else}
		<div class="posts-table-container">
			<table class="posts-table">
				<thead>
					<tr>
						<th>Titre</th>
						<th>Auteur</th>
						<th>Statut</th>
						<th>Date</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{#each data.posts as post}
						<tr>
							<td class="title-cell">
								<a href="/admin/posts/{post.id}" class="post-title">
									{post.title.fr}
								</a>
								<span class="post-slug">/{post.slug}</span>
							</td>
							<td>{post.authorName}</td>
							<td>
								<span class="status-badge" class:published={post.published}>
									{#if post.published}
										<Eye size={14} />
										Publié
									{:else}
										<EyeOff size={14} />
										Brouillon
									{/if}
								</span>
							</td>
							<td class="date-cell">
								{new Date(post.createdAt).toLocaleDateString('fr-FR', {
									day: 'numeric',
									month: 'short',
									year: 'numeric'
								})}
							</td>
							<td class="actions-cell">
								<a href="/admin/posts/{post.id}" class="action-btn" title="Modifier">
									<Edit size={16} />
								</a>
								{#if post.published}
									<a href="/blog/{post.slug}" target="_blank" class="action-btn" title="Voir">
										<ExternalLink size={16} />
									</a>
								{/if}
								<form action="/admin/posts/{post.id}?/delete" method="POST" class="inline-form">
									<button type="submit" class="action-btn delete" title="Supprimer">
										<Trash2 size={16} />
									</button>
								</form>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>

<style>
	.posts-page {
		max-width: 1200px;
		margin: 0 auto;
	}

	.page-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--spacing-xl);
	}

	.page-header h1 {
		font-size: 1.5rem;
		color: var(--text-primary);
		margin-bottom: var(--spacing-xs);
	}

	.page-header p {
		color: var(--text-tertiary);
		margin: 0;
	}

	.btn-primary {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-sm);
		padding: var(--spacing-sm) var(--spacing-lg);
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

	.empty-state {
		text-align: center;
		padding: var(--spacing-3xl);
		background-color: var(--bg-secondary);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-lg);
	}

	.empty-state p {
		color: var(--text-tertiary);
		margin-bottom: var(--spacing-lg);
	}

	.posts-table-container {
		background-color: var(--bg-secondary);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-lg);
		overflow: hidden;
	}

	.posts-table {
		width: 100%;
		border-collapse: collapse;
	}

	.posts-table th {
		text-align: left;
		padding: var(--spacing-md) var(--spacing-lg);
		background-color: var(--bg-elevated);
		color: var(--text-secondary);
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		border-bottom: 1px solid var(--border-color);
	}

	.posts-table td {
		padding: var(--spacing-md) var(--spacing-lg);
		border-bottom: 1px solid var(--border-color);
		color: var(--text-secondary);
		font-size: 0.875rem;
	}

	.posts-table tr:last-child td {
		border-bottom: none;
	}

	.posts-table tr:hover td {
		background-color: var(--bg-elevated);
	}

	.title-cell {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.post-title {
		color: var(--text-primary);
		font-weight: 500;
		text-decoration: none;
	}

	.post-title:hover {
		color: var(--color-primary-400);
	}

	.post-slug {
		font-size: 0.75rem;
		color: var(--text-tertiary);
		font-family: monospace;
	}

	.status-badge {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		padding: 2px 8px;
		border-radius: 9999px;
		font-size: 0.75rem;
		font-weight: 500;
		background-color: rgba(245, 158, 11, 0.1);
		color: #f59e0b;
	}

	.status-badge.published {
		background-color: rgba(16, 185, 129, 0.1);
		color: #10b981;
	}

	.date-cell {
		white-space: nowrap;
	}

	.actions-cell {
		display: flex;
		gap: var(--spacing-xs);
	}

	.action-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border: none;
		border-radius: var(--radius-md);
		background-color: var(--bg-elevated);
		color: var(--text-secondary);
		cursor: pointer;
		transition: all var(--transition-fast);
		text-decoration: none;
	}

	.action-btn:hover {
		background-color: var(--bg-primary);
		color: var(--color-primary-400);
	}

	.action-btn.delete:hover {
		background-color: rgba(239, 68, 68, 0.1);
		color: #ef4444;
	}

	.inline-form {
		display: inline;
	}
</style>
