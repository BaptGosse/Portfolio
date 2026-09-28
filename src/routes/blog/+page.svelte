<script lang="ts">
	import type { PageData } from './$types';
	import { _ } from 'svelte-i18n';
	import SceneTitle from '$lib/components/SceneTitle.svelte';
	import BlogPostCard from '$lib/components/BlogPostCard.svelte';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{$_('blog.metaTitle')}</title>
	<meta name="description" content={$_('blog.metaDescription')} />
	<link rel="alternate" type="application/rss+xml" title="RSS Blog (FR)" href="/rss.xml?lang=fr" />
	<link rel="alternate" type="application/rss+xml" title="RSS Blog (EN)" href="/rss.xml?lang=en" />
	<link rel="alternate" type="application/atom+xml" title="Atom Blog (FR)" href="/atom.xml?lang=fr" />
	<link rel="alternate" type="application/atom+xml" title="Atom Blog (EN)" href="/atom.xml?lang=en" />
</svelte:head>

<section class="scene page" aria-labelledby="blog-title">
	<div class="wrap">
		<SceneTitle as="h1" id="blog-title" title={$_('blog.title')} note={$_('blog.note')} />

		<p class="feeds">
			{$_('blog.subscribe')}
			{$_('blog.rss')}
			<a href="/rss.xml?lang=fr" hreflang="fr">{$_('blog.inFrench')}</a>,
			<a href="/rss.xml?lang=en" hreflang="en">{$_('blog.inEnglish')}</a>;
			{$_('blog.atom')}
			<a href="/atom.xml?lang=fr" hreflang="fr">{$_('blog.inFrench')}</a>,
			<a href="/atom.xml?lang=en" hreflang="en">{$_('blog.inEnglish')}</a>.
		</p>

		{#if data.posts.length > 0}
			<div class="notes">
				{#each data.posts as post (post.slug)}
					<BlogPostCard {post} />
				{/each}
			</div>
		{:else}
			<div class="empty">
				<p class="empty-title">{$_('blog.empty.title')}</p>
				<p class="didascalie">({$_('blog.empty.text')})</p>
				<a href="/projects">{$_('blog.empty.action')}</a>
			</div>
		{/if}
	</div>
</section>

<style>
	.page {
		padding-top: clamp(2.5rem, 7vw, 5rem);
	}

	.feeds {
		margin-top: -1.5rem;
		margin-bottom: clamp(3rem, 7vw, 4.5rem);
		color: var(--ink-soft);
		font-size: var(--step--1);
	}

	.notes {
		display: grid;
		gap: clamp(3rem, 6vw, 4rem);
	}

	.empty {
		display: grid;
		justify-items: start;
		gap: 0.6rem;
	}

	.empty-title {
		font-family: var(--font-poster);
		font-weight: 800;
		font-size: var(--step-2);
		line-height: 1;
	}

	.empty a {
		margin-top: 0.75rem;
		font-weight: 600;
	}
</style>
