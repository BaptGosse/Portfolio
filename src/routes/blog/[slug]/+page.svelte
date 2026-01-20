<script lang="ts">
	import type { PageData } from './$types';
	import { Calendar, ChevronLeft } from 'lucide-svelte';

	let { data }: { data: PageData } = $props();

	function formatDate(dateStr: string): string {
		const date = new Date(dateStr);
		return new Intl.DateTimeFormat('fr-FR', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		}).format(date);
	}
</script>

<svelte:head>
	<title>{data.post.title} - Baptiste Gosselin</title>
	<meta name="description" content={data.post.description} />
</svelte:head>

<article class="article">
	<div class="container" style="max-width: 56rem;">
		<!-- Header -->
		<header class="article-header">
			<h1 class="article-title">
				{data.post.title}
			</h1>

			<div class="article-meta">
				<div class="meta-item">
					<Calendar size={16} />
					<time datetime={data.post.date}>
						{formatDate(data.post.date)}
					</time>
				</div>
				{#if data.post.tags && data.post.tags.length > 0}
					<span class="meta-separator">•</span>
					<div class="article-tags">
						{#each data.post.tags as tag}
							<span class="article-tag">
								#{tag}
							</span>
						{/each}
					</div>
				{/if}
			</div>

			{#if data.post.description}
				<p class="article-description">
					{data.post.description}
				</p>
			{/if}
		</header>

		<!-- Content -->
		<div class="prose">
			{@html data.post.content}
		</div>

		<!-- Footer -->
		<div class="article-footer">
			<a href="/blog" class="back-link">
				<ChevronLeft size={20} />
				Retour au blog
			</a>
		</div>
	</div>
</article>

<style>
	.article {
		padding: var(--spacing-2xl) var(--spacing-md);
	}

	.article-header {
		margin-bottom: var(--spacing-2xl);
	}

	.article-title {
		font-size: 2.25rem;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: var(--spacing-md);
	}

	.article-meta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--spacing-md);
		color: var(--text-tertiary);
		margin-bottom: var(--spacing-lg);
	}

	.meta-item {
		display: flex;
		align-items: center;
		gap: var(--spacing-xs);
	}

	.meta-separator {
		color: var(--border-color);
	}

	.article-tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-sm);
	}

	.article-tag {
		padding: var(--spacing-xs) 0.75rem;
		font-size: 0.75rem;
		font-weight: 500;
		background-color: var(--bg-elevated);
		color: var(--text-secondary);
		border-radius: 9999px;
		border: 1px solid var(--border-color);
	}

	.article-description {
		font-size: 1.125rem;
		color: var(--text-secondary);
		line-height: 1.75;
	}

	.article-footer {
		margin-top: var(--spacing-2xl);
		padding-top: var(--spacing-xl);
		border-top: 1px solid var(--border-color);
	}

	.back-link {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-sm);
		color: var(--color-primary-400);
		font-weight: 500;
		transition: color var(--transition-fast);
	}

	.back-link:hover {
		color: var(--color-primary-300);
	}

	@media (min-width: 768px) {
		.article-title {
			font-size: 3rem;
		}
	}
</style>
