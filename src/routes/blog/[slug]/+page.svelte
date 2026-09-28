<script lang="ts">
	import type { PageData } from './$types';
	import { _, locale } from 'svelte-i18n';

	let { data }: { data: PageData } = $props();

	const date = $derived(
		new Intl.DateTimeFormat($locale || 'fr', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		}).format(new Date(data.post.date))
	);
</script>

<svelte:head>
	<title>{data.post.title} - Baptiste Gosselin</title>
	<meta name="description" content={data.post.description} />
</svelte:head>

<article class="scene page">
	<div class="wrap">
		<header class="head">
			<p class="back"><a href="/blog">{$_('blog.backToBlog')}</a></p>
			<h1>{data.post.title}</h1>
			<p class="meta">
				<time datetime={data.post.date}>{date}</time>
				{#if data.post.tags?.length}
					<span class="tags">
						{#each data.post.tags as tag}
							<span>#{tag}</span>
						{/each}
					</span>
				{/if}
			</p>
			{#if data.post.description}
				<p class="didascalie lede">({data.post.description})</p>
			{/if}
		</header>

		<div class="prose">
			{@html data.post.content}
		</div>

		<footer class="end">
			<a href="/blog">{$_('blog.backToBlog')}</a>
		</footer>
	</div>
</article>

<style>
	.page {
		padding-top: clamp(2.5rem, 7vw, 5rem);
	}

	.head {
		display: grid;
		gap: 1rem;
		max-width: 48rem;
		margin-bottom: clamp(2.5rem, 6vw, 4rem);
	}

	.back {
		font-size: var(--step--1);
	}

	h1 {
		font-size: var(--step-4);
		font-weight: 900;
		line-height: 0.9;
	}

	.meta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem 1.25rem;
		font-style: italic;
		color: var(--ink-soft);
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem 1rem;
	}

	.lede {
		font-size: var(--step-1);
	}

	.end {
		max-width: var(--measure);
		margin-top: clamp(3rem, 7vw, 4.5rem);
		font-weight: 600;
	}
</style>
