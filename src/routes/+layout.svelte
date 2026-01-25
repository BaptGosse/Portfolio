<script lang="ts">
	import '../app.css';
	import '$lib/styles/utils.css';
	import '$lib/styles/pages.css';
	import '$lib/i18n';
	import { locale, isLoading } from 'svelte-i18n';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import type { LayoutData } from './$types';

	let { children, data }: { children: any; data: LayoutData } = $props();

	// Synchronize server locale with client i18n if they differ
	onMount(() => {
		if (data.locale && $locale !== data.locale) {
			locale.set(data.locale);
			if (typeof window !== 'undefined') {
				localStorage.setItem('locale', data.locale);
			}
		}
	});

	// Check if we're on an admin page
	const isAdminPage = $derived($page.url.pathname.startsWith('/admin'));
</script>

<svelte:head>
	<title>Baptiste Gosselin - Étudiant Informatique, Infrastructure & Cloud-Native</title>
	<meta name="description" content="Portfolio de Baptiste Gosselin - Étudiant en informatique spécialisé en infrastructure cloud-native, Kubernetes, DevOps et développement système." />
	<link rel="icon" type="image/jpeg" href="/images/favicon.jpg" />
</svelte:head>

{#if $isLoading}
	<div class="loading-container">
		<div class="loading-spinner"></div>
	</div>
{:else if isAdminPage}
	{@render children()}
{:else}
	<div class="layout-wrapper">
		<Header />

		<main class="main-content">
			{@render children()}
		</main>

		<Footer />
	</div>
{/if}

<style>
	.layout-wrapper {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		position: relative;
	}

	.main-content {
		flex: 1;
		margin-top: var(--header-height);
		position: relative;
		overflow: hidden;
	}

	.main-content::before {
		content: '';
		position: absolute;
		inset: 0;
		z-index: 0;
		pointer-events: none;
		background:
			radial-gradient(at 20% 30%, rgba(193, 159, 255, 0.08) 0px, transparent 50%),
			radial-gradient(at 80% 70%, rgba(167, 139, 250, 0.08) 0px, transparent 50%),
			radial-gradient(at 40% 80%, rgba(193, 159, 255, 0.06) 0px, transparent 50%),
			radial-gradient(at 70% 20%, rgba(167, 139, 250, 0.06) 0px, transparent 50%);
		animation: meshMoveGlobal 25s ease-in-out infinite;
	}

	@keyframes meshMoveGlobal {
		0%, 100% {
			transform: scale(1) translate(0, 0);
		}
		50% {
			transform: scale(1.1) translate(30px, 30px);
		}
	}

	.loading-container {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 100vh;
		background: var(--bg-primary);
	}

	.loading-spinner {
		width: 48px;
		height: 48px;
		border: 4px solid var(--border-color);
		border-top-color: var(--color-accent);
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>
