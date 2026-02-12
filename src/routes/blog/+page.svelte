<script lang="ts">
	import type { PageData } from './$types';
	import BlogPostCard from '$lib/components/BlogPostCard.svelte';
	import { Rss } from 'lucide-svelte';
	import { _, locale } from 'svelte-i18n';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{$_('blog.title')} - Baptiste Gosselin</title>
	<meta name="description" content={$_('blog.metaDescription')} />
	<!-- RSS Discovery -->
	<link rel="alternate" type="application/rss+xml" title="RSS Blog (FR)" href="/rss.xml?lang=fr" />
	<link rel="alternate" type="application/rss+xml" title="RSS Blog (EN)" href="/rss.xml?lang=en" />
	<link rel="alternate" type="application/atom+xml" title="Atom Blog (FR)" href="/atom.xml?lang=fr" />
	<link rel="alternate" type="application/atom+xml" title="Atom Blog (EN)" href="/atom.xml?lang=en" />
</svelte:head>

<section class="section">
	<div class="container" style="max-width: 56rem;">
		<div class="page-header">
			<h1 class="page-title">
				{$_('blog.title')}
			</h1>
			<p class="page-description">
				{$_('blog.subtitle')}
			</p>
			
			<div class="mt-8 space-y-4">
				<div class="flex flex-wrap gap-4 items-center">
					<span class="text-sm font-medium text-tertiary">Flux RSS :</span>
					<a href="/rss.xml?lang=fr" class="section-link text-xs">
						<Rss size={16} />
						Français
					</a>
					<a href="/rss.xml?lang=en" class="section-link text-xs">
						<Rss size={16} />
						English
					</a>
				</div>
				<div class="flex flex-wrap gap-4 items-center">
					<span class="text-sm font-medium text-tertiary">Flux Atom :</span>
					<a href="/atom.xml?lang=fr" class="section-link text-xs">
						<Rss size={16} />
						Français
					</a>
					<a href="/atom.xml?lang=en" class="section-link text-xs">
						<Rss size={16} />
						English
					</a>
				</div>
			</div>
		</div>

		{#if data.posts.length > 0}
			<div class="space-y-6">
				{#each data.posts as post}
					<BlogPostCard {post} />
				{/each}
			</div>
		{:else}
			<div class="empty-state">
				<p class="text-lg" style="color: var(--text-secondary);">{$_('blog.empty.title')}</p>
				<p class="text-sm mt-2" style="color: var(--text-tertiary);">{$_('blog.empty.description')}</p>
			</div>
		{/if}
	</div>
</section>

<style>
	.empty-state {
		text-align: center;
		padding: var(--spacing-2xl) var(--spacing-md);
		background-color: var(--bg-secondary);
		border-radius: var(--radius-lg);
		border: 1px solid var(--border-color);
	}
</style>
