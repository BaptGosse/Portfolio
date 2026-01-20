<script lang="ts">
	import type { BlogPost } from '$lib/types';
	import { ChevronRight, Calendar, Tags } from 'lucide-svelte';

	let { post }: { post: BlogPost } = $props();

	function formatDate(dateStr: string): string {
		const date = new Date(dateStr);
		return new Intl.DateTimeFormat('fr-FR', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		}).format(date);
	}
</script>

<article class="card">
	<div class="meta">
		<div class="meta-item">
			<Calendar size={14} />
			<time datetime={post.date}>
				{formatDate(post.date)}
			</time>
		</div>
		<span class="meta-separator">•</span>
		<div class="meta-item">
			<Tags size={14} />
			<span>{post.tags.length} tags</span>
		</div>
	</div>

	<h3 class="card-title">
		<a href="/blog/{post.slug}">
			{post.title}
		</a>
	</h3>

	<p class="card-description">
		{post.description}
	</p>

	<div class="tags">
		{#each post.tags as tag}
			<span class="tag">
				#{tag}
			</span>
		{/each}
	</div>

	<a
		href="/blog/{post.slug}"
		class="read-more"
	>
		Lire la suite
		<ChevronRight size={16} />
	</a>
</article>

<style>
	.card {
		background-color: var(--bg-secondary);
		border-radius: var(--radius-lg);
		padding: var(--spacing-lg);
		border: 1px solid var(--border-color);
		transition: background-color var(--transition-fast), border-color var(--transition-fast);
	}

	.card:hover {
		background-color: var(--bg-elevated);
		border-color: var(--color-primary-500);
	}

	.meta {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		font-size: 0.875rem;
		color: var(--text-tertiary);
		margin-bottom: 0.75rem;
	}

	.meta-item {
		display: flex;
		align-items: center;
		gap: var(--spacing-xs);
	}

	.meta-separator {
		color: var(--border-color);
	}

	.card-title {
		font-size: 1.25rem;
		font-weight: 700;
		margin-bottom: 0.75rem;
	}

	.card-title a {
		color: var(--text-primary);
		transition: color var(--transition-fast);
	}

	.card-title a:hover {
		color: var(--color-primary-400);
	}

	.card-description {
		color: var(--text-secondary);
		margin-bottom: var(--spacing-md);
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-sm);
		margin-bottom: var(--spacing-md);
	}

	.tag {
		padding: var(--spacing-xs) 0.75rem;
		font-size: 0.75rem;
		font-weight: 500;
		background-color: var(--bg-elevated);
		color: var(--text-secondary);
		border-radius: 9999px;
	}

	.read-more {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-xs);
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--color-primary-400);
		transition: color var(--transition-fast);
	}

	.read-more:hover {
		color: var(--color-primary-300);
	}
</style>
