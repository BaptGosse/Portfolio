<script lang="ts">
	import { page } from '$app/stores';
	import { Menu, X } from 'lucide-svelte';
	import { _ } from 'svelte-i18n';
	import ThemeToggle from './ThemeToggle.svelte';
	import LanguageSwitcher from './LanguageSwitcher.svelte';

	const navItems = $derived([
		{ href: '/', label: $_('nav.home') },
		{ href: '/projects', label: $_('nav.projects') },
		{ href: '/blog', label: $_('nav.blog') }
	]);

	let mobileMenuOpen = $state(false);
	let scrolled = $state(false);

	// Détecter le scroll pour ajouter l'effet glassmorphism
	if (typeof window !== 'undefined') {
		window.addEventListener('scroll', () => {
			scrolled = window.scrollY > 50;
		});
	}
</script>

<header class="header" class:scrolled>
	<nav class="container">
		<div class="nav-container">
			<a href="/" class="logo">
				<img src="/images/favicon.jpg" alt="Baptiste Gosselin" class="logo-image" />
				<span class="logo-text">Baptiste Gosselin</span>
			</a>

			<!-- Desktop Navigation -->
			<div class="nav-desktop">
				{#each navItems as item}
					<a
						href={item.href}
						class="nav-link"
						class:active={$page.url.pathname === item.href}
					>
						{item.label}
						{#if $page.url.pathname === item.href}
							<span class="active-indicator"></span>
						{/if}
					</a>
				{/each}

				<div class="divider"></div>
				<LanguageSwitcher />
				<ThemeToggle />
			</div>

			<!-- Mobile Menu Button -->
			<button
				class="mobile-menu-button"
				onclick={() => mobileMenuOpen = !mobileMenuOpen}
				aria-label="Toggle menu"
			>
				{#if mobileMenuOpen}
					<X size={24} />
				{:else}
					<Menu size={24} />
				{/if}
			</button>
		</div>

		<!-- Mobile Navigation -->
		{#if mobileMenuOpen}
			<div class="nav-mobile">
				{#each navItems as item}
					<a
						href={item.href}
						class="nav-link-mobile"
						class:active={$page.url.pathname === item.href}
						onclick={() => mobileMenuOpen = false}
					>
						{item.label}
					</a>
				{/each}
				<div class="mobile-actions">
					<ThemeToggle />
				</div>
			</div>
		{/if}
	</nav>
</header>

<style>
	.header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 1000;
		background-color: var(--bg-primary);
		border-bottom: 1px solid transparent;
		transition: all var(--transition-normal);
		height: var(--header-height);
		display: flex;
		align-items: center;
	}

	.header.scrolled {
		background-color: var(--bg-glass);
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
		border-bottom-color: var(--border-color);
		box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
	}

	.nav-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 100%;
	}

	.logo {
		position: relative;
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		transition: all var(--transition-normal);
	}

	.logo-image {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		object-fit: cover;
		border: 2px solid var(--color-accent);
		transition: all var(--transition-normal);
	}

	.logo:hover .logo-image {
		transform: scale(1.1);
		box-shadow: 0 0 20px var(--color-accent-glow);
	}

	.logo-text {
		font-family: var(--font-display);
		font-size: 1.125rem;
		font-weight: 700;
		background: linear-gradient(135deg, var(--color-accent), var(--color-secondary-accent));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		letter-spacing: -0.01em;
		position: relative;
		transition: all var(--transition-normal);
	}

	.logo:hover .logo-text {
		transform: scale(1.05);
		filter: brightness(1.2);
	}

	.nav-desktop {
		display: none;
		align-items: center;
		gap: var(--spacing-sm);
	}

	.nav-link {
		position: relative;
		padding: var(--spacing-sm) var(--spacing-md);
		color: var(--text-secondary);
		font-family: var(--font-display);
		font-size: 0.9375rem;
		font-weight: 500;
		transition: all var(--transition-fast);
		border-radius: var(--radius-lg);
	}

	.nav-link:hover {
		color: var(--color-accent);
		background: var(--bg-hover);
	}

	.nav-link.active {
		color: var(--text-primary);
	}

	.active-indicator {
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 4px;
		height: 4px;
		background: linear-gradient(135deg, var(--color-accent), var(--color-secondary-accent));
		border-radius: var(--radius-full);
		animation: pulse 2s ease-in-out infinite;
	}

	@keyframes pulse {
		0%, 100% {
			opacity: 1;
			transform: translateX(-50%) scale(1);
		}
		50% {
			opacity: 0.7;
			transform: translateX(-50%) scale(1.2);
		}
	}

	.divider {
		width: 1px;
		height: 24px;
		background: var(--border-color);
		margin: 0 var(--spacing-sm);
	}

	.mobile-menu-button {
		display: flex;
		align-items: center;
		justify-content: center;
		background: none;
		border: none;
		color: var(--text-secondary);
		cursor: pointer;
		padding: var(--spacing-sm);
		border-radius: var(--radius-md);
		transition: all var(--transition-fast);
	}

	.mobile-menu-button:hover {
		color: var(--color-accent);
		background: var(--bg-hover);
	}

	.nav-mobile {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		background: var(--bg-glass);
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
		border-bottom: 1px solid var(--border-color);
		padding: var(--spacing-lg);
		animation: slideDown var(--transition-normal) ease-out;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
	}

	@keyframes slideDown {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.nav-link-mobile {
		display: block;
		padding: var(--spacing-md);
		color: var(--text-secondary);
		font-family: var(--font-display);
		font-size: 1.125rem;
		font-weight: 500;
		transition: all var(--transition-fast);
		border-radius: var(--radius-lg);
		margin-bottom: var(--spacing-xs);
	}

	.nav-link-mobile:hover {
		color: var(--color-accent);
		background: var(--bg-hover);
		transform: translateX(4px);
	}

	.nav-link-mobile.active {
		color: var(--text-primary);
		background: var(--bg-hover);
		border-left: 3px solid var(--color-accent);
	}

	.mobile-actions {
		margin-top: var(--spacing-lg);
		padding-top: var(--spacing-lg);
		border-top: 1px solid var(--border-color);
		display: flex;
		justify-content: center;
	}

	@media (min-width: 768px) {
		.nav-desktop {
			display: flex;
		}

		.mobile-menu-button {
			display: none;
		}

		.nav-mobile {
			display: none;
		}
	}
</style>
