<script lang="ts">
	// Titre de scène + didascalie qui dit en clair ce qu'on va trouver.
	let {
		id,
		title,
		note = '',
		as = 'h2'
	}: { id?: string; title: string; note?: string; as?: 'h1' | 'h2' } = $props();
</script>

<header class="scene-title">
	<svelte:element this={as} {id}>{title}</svelte:element>
	{#if note}
		<p class="didascalie">({note})</p>
	{/if}
</header>

<style>
	.scene-title {
		display: grid;
		gap: 1rem;
		margin-bottom: clamp(2.5rem, 6vw, 4rem);
	}

	.scene-title :global(h1),
	.scene-title :global(h2) {
		font-size: var(--step-4);
		font-weight: 900;
		line-height: 0.88;
	}
</style>
