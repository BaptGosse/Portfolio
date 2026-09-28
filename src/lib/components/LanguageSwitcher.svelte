<script lang="ts">
	import { locale, _ } from 'svelte-i18n';
	import { invalidateAll } from '$app/navigation';

	const target = $derived($locale === 'en' ? 'fr' : 'en');

	async function switchLocale(newLocale: string) {
		locale.set(newLocale);
		try {
			localStorage.setItem('locale', newLocale);
		} catch {
			// Stockage indisponible : le cookie suffit
		}

		// Le cookie permet au serveur de rendre la bonne langue
		try {
			await fetch('/api/locale', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ locale: newLocale })
			});
			await invalidateAll();
		} catch (error) {
			console.error('Failed to save locale:', error);
		}
	}
</script>

<button
	class="lang"
	lang={target}
	aria-label={$_('lang.switchLabel')}
	title={$_('lang.switchLabel')}
	onclick={() => switchLocale(target)}
>
	{$_('lang.switchTo')}
</button>

<style>
	.lang {
		min-width: 2.5rem;
		height: 2.75rem;
		padding: 0 0.25rem;
		background: none;
		border: 0;
		color: var(--ink);
		font-family: var(--font-poster);
		font-weight: 800;
		font-size: 1.2rem;
		letter-spacing: 0.04em;
		cursor: pointer;
	}

	.lang:hover {
		color: var(--link);
	}
</style>
