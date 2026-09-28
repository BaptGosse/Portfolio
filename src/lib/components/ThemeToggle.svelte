<script lang="ts">
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import { theme } from '$lib/stores/theme';
	import Servante from './Servante.svelte';

	onMount(() => {
		theme.init();
	});

	const label = $derived($theme === 'dark' ? $_('theme.toLight') : $_('theme.toDark'));
</script>

<button class="theme-toggle" onclick={() => theme.toggle()} aria-label={label} title={label}>
	<Servante lit={$theme === 'dark'} size={30} />
</button>

<style>
	.theme-toggle {
		display: grid;
		place-items: center;
		width: 2.5rem;
		height: 2.75rem;
		padding: 0;
		background: none;
		border: 0;
		color: var(--ink);
		cursor: pointer;
	}

	.theme-toggle:hover {
		color: var(--link);
	}
</style>
