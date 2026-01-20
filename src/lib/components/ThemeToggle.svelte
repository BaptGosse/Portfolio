<script lang="ts">
	import { Sun, Moon } from 'lucide-svelte';
	import { theme } from '$lib/stores/theme';
	import { onMount } from 'svelte';

	onMount(() => {
		theme.init();
	});
</script>

<button
	class="theme-toggle"
	onclick={() => theme.toggle()}
	aria-label="Changer le thème"
	title="Changer le thème"
>
	{#if $theme === 'dark'}
		<Sun size={20} />
	{:else}
		<Moon size={20} />
	{/if}
</button>

<style>
	.theme-toggle {
		display: flex;
		align-items: center;
		justify-content: center;
		background: none;
		border: none;
		color: var(--text-secondary);
		cursor: pointer;
		padding: var(--spacing-xs);
		border-radius: var(--radius-md);
		transition: all var(--transition-fast);
	}

	.theme-toggle:hover {
		color: var(--color-primary-400);
		background-color: var(--bg-elevated);
	}
</style>
