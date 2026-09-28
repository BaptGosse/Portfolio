<script lang="ts">
	import '../app.css';
	import '$lib/i18n';
	import { locale, isLoading } from 'svelte-i18n';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import type { LayoutData } from './$types';

	let { children, data }: { children: any; data: LayoutData } = $props();

	// Aligne la langue du client sur celle rendue par le serveur
	onMount(() => {
		if (data.locale && $locale !== data.locale) {
			locale.set(data.locale);
			try {
				localStorage.setItem('locale', data.locale);
			} catch {
				// Stockage indisponible : le cookie suffit
			}
		}
	});

	const isAdminPage = $derived($page.url.pathname.startsWith('/admin'));
</script>

<svelte:head>
	<title>Baptiste Gosselin</title>
	<link rel="icon" type="image/jpeg" href="/images/favicon.jpg" />
</svelte:head>

{#if $isLoading}
	<!-- Noir plateau le temps que les textes arrivent -->
	<div class="noir" aria-busy="true"></div>
{:else if isAdminPage}
	{@render children()}
{:else}
	<Header />
	<main id="main">
		{@render children()}
	</main>
	<Footer />
{/if}

<style>
	.noir {
		min-height: 100vh;
		background: var(--paper);
	}

	main {
		display: block;
	}
</style>
