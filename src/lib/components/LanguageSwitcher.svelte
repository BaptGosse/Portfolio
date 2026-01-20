<script lang="ts">
	import { locale, locales } from 'svelte-i18n';
	import { Languages } from 'lucide-svelte';

	const availableLocales = [
		{ code: 'fr', label: 'FR', flag: '🇫🇷' },
		{ code: 'en', label: 'EN', flag: '🇬🇧' }
	];

	function switchLocale(newLocale: string) {
		locale.set(newLocale);
		if (typeof window !== 'undefined') {
			localStorage.setItem('locale', newLocale);
		}
	}
</script>

<div class="language-switcher">
	<button class="current-lang" aria-label="Change language">
		<Languages size={18} />
		<span class="lang-code">{$locale?.toUpperCase() || 'FR'}</span>
	</button>
	<div class="lang-menu">
		{#each availableLocales as lang}
			<button
				class="lang-option"
				class:active={$locale === lang.code}
				onclick={() => switchLocale(lang.code)}
				aria-label="Switch to {lang.label}"
			>
				<span class="flag">{lang.flag}</span>
				<span class="label">{lang.label}</span>
			</button>
		{/each}
	</div>
</div>

<style>
	.language-switcher {
		position: relative;
	}

	.current-lang {
		display: flex;
		align-items: center;
		gap: var(--spacing-xs);
		padding: var(--spacing-sm) var(--spacing-md);
		background: var(--bg-tertiary);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-lg);
		color: var(--text-secondary);
		cursor: pointer;
		transition: all var(--transition-fast);
		font-family: var(--font-display);
		font-size: 0.875rem;
		font-weight: 600;
	}

	.current-lang:hover {
		background: var(--bg-hover);
		border-color: var(--color-accent);
		color: var(--color-accent);
	}

	.lang-code {
		line-height: 1;
	}

	.lang-menu {
		position: absolute;
		top: calc(100% + var(--spacing-xs));
		right: 0;
		background: var(--bg-secondary);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-lg);
		padding: var(--spacing-xs);
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
		opacity: 0;
		visibility: hidden;
		transform: translateY(-8px);
		transition: all var(--transition-fast);
		box-shadow: var(--shadow-lg);
		min-width: 120px;
		z-index: 100;
	}

	.language-switcher:hover .lang-menu {
		opacity: 1;
		visibility: visible;
		transform: translateY(0);
	}

	.lang-option {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		padding: var(--spacing-sm) var(--spacing-md);
		background: transparent;
		border: none;
		border-radius: var(--radius-md);
		color: var(--text-secondary);
		cursor: pointer;
		transition: all var(--transition-fast);
		font-family: var(--font-body);
		font-size: 0.875rem;
		width: 100%;
		text-align: left;
	}

	.lang-option:hover {
		background: var(--bg-hover);
		color: var(--color-accent);
	}

	.lang-option.active {
		background: var(--bg-hover);
		color: var(--color-accent);
		font-weight: 600;
	}

	.flag {
		font-size: 1.25rem;
		line-height: 1;
	}

	.label {
		font-weight: 600;
	}

	@media (max-width: 768px) {
		.lang-menu {
			left: 0;
			right: auto;
		}
	}
</style>
