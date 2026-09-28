<script lang="ts">
	import { _, locale } from 'svelte-i18n';
	import { formatList } from '$lib/utils/i18n-helpers';

	let {
		title,
		description,
		technologies = [],
		github = null,
		link = null,
		level = 'h3'
	}: {
		title: string;
		description: string;
		technologies?: string[];
		github?: string | null;
		link?: string | null;
		level?: 'h2' | 'h3';
	} = $props();

	const cast = $derived(technologies.length ? formatList(technologies, $locale) : '');
</script>

<article class="piece">
	<svelte:element this={level} class="piece-title">{title}</svelte:element>
	<div class="piece-body">
		<p>{description}</p>
		{#if cast}
			<p class="cast">{$_('projects.cast', { values: { list: cast } })}</p>
		{/if}
		{#if github || link}
			<p class="links">
				{#if github}
					<a href={github} rel="noopener noreferrer">{$_('projects.code')}</a>
				{/if}
				{#if link}
					<a href={link} rel="noopener noreferrer">{$_('projects.live')}</a>
				{/if}
			</p>
		{/if}
	</div>
</article>

<style>
	.piece {
		display: grid;
		grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
		gap: 1rem clamp(1.5rem, 4vw, 3.5rem);
		align-items: start;
	}

	.piece-title {
		font-size: var(--step-3);
		font-weight: 800;
		line-height: 0.92;
	}

	.piece-body {
		display: grid;
		gap: 0.75rem;
		max-width: var(--measure);
	}

	.cast {
		font-style: italic;
		color: var(--ink-soft);
	}

	.links {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem 1.5rem;
		font-weight: 600;
	}

	@media (max-width: 48rem) {
		.piece {
			grid-template-columns: 1fr;
		}
	}
</style>
