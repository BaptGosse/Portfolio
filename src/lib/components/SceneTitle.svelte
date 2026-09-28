<script lang="ts">
	// Scene title, its plain-language label, and a stage direction saying what the section holds.
	let {
		id,
		title,
		label = '',
		note = '',
		as = 'h2'
	}: { id?: string; title: string; label?: string; note?: string; as?: 'h1' | 'h2' } = $props();
</script>

<header class="scene-title">
	<svelte:element this={as} {id}>
		{title}{#if label}<span class="label"><span class="visually-hidden">, </span>{label}</span>{/if}
	</svelte:element>
	{#if note}
		<p class="didascalie">({note})</p>
	{/if}
</header>

<style>
	.scene-title {
		display: grid;
		gap: 0.9rem;
		margin-bottom: clamp(2rem, 5vw, 3rem);
	}

	.scene-title :global(h1),
	.scene-title :global(h2) {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 0.2em 0.6em;
		font-size: var(--step-3);
		font-weight: 900;
		line-height: 0.9;
	}

	.scene-title :global(h1) {
		font-size: var(--step-4);
	}

	/* What the section is, in plain words */
	.label {
		font-family: var(--font-text);
		font-weight: 400;
		font-style: italic;
		font-size: 0.42em;
		letter-spacing: 0;
		color: var(--mark);
	}
</style>
