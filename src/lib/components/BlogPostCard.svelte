<script lang="ts">
	import type { BlogPost } from '$lib/types';
	import { _, locale } from 'svelte-i18n';

	let { post }: { post: BlogPost } = $props();

	const date = $derived(
		new Intl.DateTimeFormat($locale || 'fr', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		}).format(new Date(post.date))
	);
</script>

<article class="note">
	<time datetime={post.date}>{date}</time>
	<h2><a href="/blog/{post.slug}">{post.title}</a></h2>
	<p>{post.description}</p>
	{#if post.tags.length}
		<p class="tags">
			{#each post.tags as tag}
				<span>#{tag}</span>
			{/each}
		</p>
	{/if}
	<a class="read" href="/blog/{post.slug}" aria-hidden="true" tabindex="-1">{$_('blog.readMore')}</a>
</article>

<style>
	.note {
		display: grid;
		gap: 0.6rem;
		max-width: 42rem;
	}

	time {
		font-style: italic;
		color: var(--ink-soft);
	}

	h2 {
		font-size: var(--step-3);
		font-weight: 800;
	}

	h2 a {
		color: var(--ink);
		text-decoration: none;
	}

	h2 a:hover {
		color: var(--link);
		text-decoration: underline;
		text-decoration-color: var(--mark);
		text-decoration-thickness: 0.12em;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem 1rem;
		font-style: italic;
		color: var(--ink-soft);
	}

	.read {
		justify-self: start;
		font-weight: 600;
	}
</style>
