<script lang="ts">
	import { page } from '$app/stores';
	import { _ } from 'svelte-i18n';
	import Signature from './Signature.svelte';
	import ThemeToggle from './ThemeToggle.svelte';
	import LanguageSwitcher from './LanguageSwitcher.svelte';

	const navItems = $derived([
		{ href: '/projects', label: $_('nav.projects') },
		{ href: '/blog', label: $_('nav.blog') }
	]);

	const isCurrent = (href: string) =>
		$page.url.pathname === href || $page.url.pathname.startsWith(`${href}/`);
</script>

<header class="site-header" id="top">
	<a class="skip" href="#main">{$_('nav.skip')}</a>
	<div class="wrap bar">
		<a href="/" class="home" aria-label={$_('nav.homeLabel')}>
			<Signature />
		</a>

		<nav aria-label={$_('nav.mainLabel')}>
			<ul>
				{#each navItems as item}
					<li>
						<a href={item.href} aria-current={isCurrent(item.href) ? 'page' : undefined}>
							{item.label}
						</a>
					</li>
				{/each}
				<li>
					<a href="/documents/CV.pdf">{$_('nav.cv')}</a>
				</li>
				<li>
					<a href="/#contact">{$_('nav.contact')}</a>
				</li>
			</ul>
		</nav>

		<div class="tools">
			<LanguageSwitcher />
			<ThemeToggle />
		</div>
	</div>
</header>

<style>
	/* Stays in reach on desktop, with a thin rule to separate it from the page */
	.site-header {
		position: sticky;
		top: 0;
		z-index: 10;
		background: var(--paper);
		box-shadow: 0 1px 0 var(--rule);
	}

	.skip {
		position: absolute;
		left: var(--gutter);
		top: -4rem;
		padding: 0.5rem 1rem;
		background: var(--ticket);
		color: var(--ticket-ink);
		font-weight: 600;
	}

	.skip:focus {
		top: 0.75rem;
	}

	.bar {
		display: flex;
		align-items: center;
		gap: clamp(0.75rem, 3vw, 2.5rem);
		padding-block: 0.9rem;
	}

	.home {
		display: block;
		width: clamp(5.5rem, 10vw, 7.5rem);
		color: var(--ink);
		transition: transform 200ms ease;
	}

	.home:hover {
		transform: rotate(-2deg);
	}

	nav {
		margin-left: auto;
	}

	ul {
		display: flex;
		gap: clamp(0.9rem, 3vw, 2rem);
		list-style: none;
	}

	nav a {
		position: relative;
		display: block;
		padding-block: 0.4rem;
		color: var(--ink);
		font-family: var(--font-poster);
		font-weight: 800;
		font-size: clamp(1.1rem, 0.95rem + 0.5vw, 1.35rem);
		letter-spacing: 0.02em;
		text-decoration: none;
	}

	nav a:hover {
		color: var(--link);
	}

	/* Current page: standing on its mark */
	nav a[aria-current='page']::after {
		content: '';
		position: absolute;
		left: -0.2rem;
		right: -0.3rem;
		bottom: -0.05rem;
		height: 0.28rem;
		background: var(--mark);
		transform: rotate(-2deg);
	}

	.tools {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		margin-right: -0.5rem;
	}

	@media (max-width: 48rem) {
		.site-header {
			position: relative;
		}
	}

	@media (max-width: 30rem) {
		.bar {
			display: grid;
			grid-template-columns: auto 1fr auto;
			grid-template-areas:
				'home . tools'
				'nav nav nav';
			row-gap: 0.5rem;
		}

		.home {
			grid-area: home;
		}

		nav {
			grid-area: nav;
			margin-left: 0;
		}

		.tools {
			grid-area: tools;
		}
	}
</style>
