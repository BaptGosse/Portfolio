<script lang="ts">
	import { FileText, Tag, Eye, Clock } from 'lucide-svelte';

	let { data } = $props();

	const stats = [
		{
			label: 'Articles publiés',
			value: data.publishedCount,
			icon: FileText,
			color: '#10b981'
		},
		{
			label: 'Brouillons',
			value: data.draftCount,
			icon: Clock,
			color: '#f59e0b'
		},
		{
			label: 'Tags',
			value: data.tagsCount,
			icon: Tag,
			color: '#8b5cf6'
		}
	];
</script>

<svelte:head>
	<title>Dashboard - Admin</title>
</svelte:head>

<div class="dashboard">
	<header class="dashboard-header">
		<h1>Bienvenue, {data.user?.name}</h1>
		<p>Gérez votre blog depuis cette interface</p>
	</header>

	<div class="stats-grid">
		{#each stats as stat}
			<div class="stat-card" style="--stat-color: {stat.color}">
				<div class="stat-icon">
					<svelte:component this={stat.icon} size={24} />
				</div>
				<div class="stat-info">
					<span class="stat-value">{stat.value}</span>
					<span class="stat-label">{stat.label}</span>
				</div>
			</div>
		{/each}
	</div>

	<div class="quick-actions">
		<h2>Actions rapides</h2>
		<div class="actions-grid">
			<a href="/admin/posts/new" class="action-card">
				<FileText size={24} />
				<span>Nouvel article</span>
			</a>
			<a href="/admin/tags" class="action-card">
				<Tag size={24} />
				<span>Gérer les tags</span>
			</a>
			<a href="/blog" target="_blank" class="action-card">
				<Eye size={24} />
				<span>Voir le blog</span>
			</a>
		</div>
	</div>

	{#if data.recentPosts.length > 0}
		<div class="recent-posts">
			<h2>Articles récents</h2>
			<div class="posts-list">
				{#each data.recentPosts as post}
					<a href="/admin/posts/{post.POS_ID}" class="post-item">
						<div class="post-info">
							<span class="post-title">{post.POS_TITLE.fr}</span>
							<span class="post-date">
								{new Date(post.POS_CREATED_AT).toLocaleDateString('fr-FR')}
							</span>
						</div>
						<span class="post-status" class:published={post.POS_PUBLISHED}>
							{post.POS_PUBLISHED ? 'Publié' : 'Brouillon'}
						</span>
					</a>
				{/each}
			</div>
		</div>
	{/if}
</div>

<style>
	.dashboard {
		max-width: 1200px;
		margin: 0 auto;
	}

	.dashboard-header {
		margin-bottom: var(--spacing-xl);
	}

	.dashboard-header h1 {
		font-size: 1.75rem;
		color: var(--text-primary);
		margin-bottom: var(--spacing-xs);
	}

	.dashboard-header p {
		color: var(--text-tertiary);
		margin: 0;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: var(--spacing-lg);
		margin-bottom: var(--spacing-xl);
	}

	.stat-card {
		background-color: var(--bg-secondary);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-lg);
		padding: var(--spacing-lg);
		display: flex;
		align-items: center;
		gap: var(--spacing-md);
	}

	.stat-icon {
		width: 48px;
		height: 48px;
		border-radius: var(--radius-md);
		background-color: color-mix(in srgb, var(--stat-color) 15%, transparent);
		color: var(--stat-color);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.stat-info {
		display: flex;
		flex-direction: column;
	}

	.stat-value {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--text-primary);
	}

	.stat-label {
		font-size: 0.875rem;
		color: var(--text-tertiary);
	}

	.quick-actions,
	.recent-posts {
		margin-bottom: var(--spacing-xl);
	}

	.quick-actions h2,
	.recent-posts h2 {
		font-size: 1.125rem;
		color: var(--text-primary);
		margin-bottom: var(--spacing-md);
	}

	.actions-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: var(--spacing-md);
	}

	.action-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-sm);
		padding: var(--spacing-lg);
		background-color: var(--bg-secondary);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-lg);
		color: var(--text-secondary);
		text-decoration: none;
		transition: all var(--transition-fast);
	}

	.action-card:hover {
		background-color: var(--bg-elevated);
		color: var(--color-primary-400);
		border-color: var(--color-primary-400);
		transform: translateY(-2px);
	}

	.posts-list {
		background-color: var(--bg-secondary);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-lg);
		overflow: hidden;
	}

	.post-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--spacing-md) var(--spacing-lg);
		border-bottom: 1px solid var(--border-color);
		text-decoration: none;
		transition: background-color var(--transition-fast);
	}

	.post-item:last-child {
		border-bottom: none;
	}

	.post-item:hover {
		background-color: var(--bg-elevated);
	}

	.post-info {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.post-title {
		color: var(--text-primary);
		font-weight: 500;
	}

	.post-date {
		font-size: 0.75rem;
		color: var(--text-tertiary);
	}

	.post-status {
		font-size: 0.75rem;
		padding: 2px 8px;
		border-radius: 9999px;
		background-color: rgba(245, 158, 11, 0.1);
		color: #f59e0b;
	}

	.post-status.published {
		background-color: rgba(16, 185, 129, 0.1);
		color: #10b981;
	}
</style>
