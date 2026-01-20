<script lang="ts">
	import type { PageData } from './$types';
	import BlogPostCard from '$lib/components/BlogPostCard.svelte';
	import { Rss } from 'lucide-svelte';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Blog - Baptiste Gosselin</title>
	<meta name="description" content="Articles techniques sur Linux, DevOps, infrastructure et développement" />
</svelte:head>

<section class="section">
	<div class="container" style="max-width: 56rem;">
		<div class="page-header">
			<h1 class="page-title">
				Blog
			</h1>
			<p class="page-description">
				Articles techniques sur Linux, DevOps, infrastructure et développement
			</p>
			<div class="flex gap-4 mt-6">
				<a
					href="/rss.xml"
					class="section-link"
				>
					<Rss size={20} />
					Flux RSS
				</a>
				<a
					href="/atom.xml"
					class="section-link"
				>
					<Rss size={20} />
					Flux Atom
				</a>
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
				<p class="text-lg" style="color: var(--text-secondary);">Aucun article publié pour le moment.</p>
				<p class="text-sm mt-2" style="color: var(--text-tertiary);">Revenez bientôt pour du contenu technique !</p>
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
