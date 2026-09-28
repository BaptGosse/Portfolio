<script lang="ts">
	import { _, locale } from 'svelte-i18n';

	const year = new Date().getFullYear();
</script>

<footer class="site-footer">
	<div class="valance" aria-hidden="true"></div>
	<div class="wrap inner">
		<p class="curtain">{$_('footer.curtain')}</p>

		<div class="colophon">
			<p>{$_('footer.copyright', { values: { year } })}</p>
			<ul>
				<li>
					<a href="https://github.com/BaptGosse/Portfolio" rel="noopener noreferrer">
						{$_('footer.source')}
					</a>
				</li>
				<li><a href="/credits">{$_('footer.backstage')}</a></li>
				<li><a href="/rss.xml?lang={$locale === 'en' ? 'en' : 'fr'}">{$_('footer.rss')}</a></li>
			</ul>
			<a class="to-top" href="#top">{$_('footer.top')}</a>
		</div>
	</div>
</footer>

<style>
	.site-footer {
		position: relative;
		margin-top: var(--scene-space);
		background: var(--paper-deep);
	}

	/* The valance: the scalloped top of the curtain */
	.valance {
		position: absolute;
		left: 0;
		right: 0;
		top: -1.1rem;
		height: 1.2rem;
		background: var(--paper-deep);
		-webkit-mask: radial-gradient(circle at 50% 100%, #000 1.15rem, transparent 1.2rem) 0 0 / 2.4rem 100%;
		mask: radial-gradient(circle at 50% 100%, #000 1.15rem, transparent 1.2rem) 0 0 / 2.4rem 100%;
	}

	.inner {
		display: grid;
		gap: 2rem;
		padding-block: clamp(3.5rem, 8vw, 6rem) 2.5rem;
	}

	.curtain {
		font-family: var(--font-poster);
		font-weight: 900;
		font-size: var(--step-4);
		line-height: 0.9;
	}

	.colophon {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 0.5rem 2rem;
		color: var(--ink-soft);
		font-size: var(--step--1);
	}

	ul {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem 1.5rem;
		list-style: none;
	}

	a {
		color: var(--ink-soft);
	}

	a:hover {
		color: var(--link);
	}

	.to-top {
		margin-left: auto;
		font-style: italic;
	}

	@media (max-width: 40rem) {
		.to-top {
			margin-left: 0;
		}
	}
</style>
