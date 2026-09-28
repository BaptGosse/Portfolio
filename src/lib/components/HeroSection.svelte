<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Signature from './Signature.svelte';
</script>

<section class="affiche" aria-labelledby="hero-title">
	<div class="wrap stage">
		<p class="didascalie opening">({$_('hero.stageDirection')})</p>

		<h1 id="hero-title" class="title">
			<span class="spot" aria-hidden="true"></span>
			<Signature class="sig" />
			<span class="lit" aria-hidden="true"><Signature /></span>
			<span class="visually-hidden">Baptiste Gosselin</span>
		</h1>

		<figure class="headshot">
			<span class="gaffer" aria-hidden="true"></span>
			<div class="print">
				<img src="/images/favicon.jpg" alt={$_('hero.photoAlt')} width="460" height="460" />
			</div>
			<figcaption>{$_('hero.photoCaption')}</figcaption>
		</figure>

		<div class="speech">
			<p class="character">
				<span class="name">{$_('hero.character')}</span>,
				<em>{$_('hero.characterDirection')}</em>.
			</p>
			<p class="line">{$_('hero.line')}</p>
			<p class="didascalie status">({$_('hero.status')})</p>

			<div class="actions">
				<a href="#repertoire" class="cta">{$_('hero.cta')}</a>
				<a href="/documents/CV.pdf" class="ticket" download>
					<span>{$_('hero.cvMain')}</span>
					<span>{$_('hero.cvStub')}</span>
				</a>
			</div>
		</div>
	</div>
</section>

<style>
	.affiche {
		padding-top: clamp(1.5rem, 4vw, 3rem);
		overflow: hidden;
	}

	.stage {
		display: grid;
		grid-template-columns: repeat(12, minmax(0, 1fr));
		column-gap: clamp(1rem, 2.5vw, 2rem);
		align-items: start;
	}

	.opening {
		grid-column: 1 / span 7;
		grid-row: 1;
		font-size: var(--step--1);
	}

	/* The poster: the signature under the follow spot */
	.title {
		position: relative;
		grid-column: 1 / span 8;
		grid-row: 2;
		margin-block: clamp(2.5rem, 5vw, 4rem) clamp(3.5rem, 6vw, 5rem);
		color: var(--ink);
		isolation: isolate;
		/* Spotlight geometry, shared by the disc and the clipped signature */
		--spot-rx: 54%;
		--spot-ry: 68%;
		--spot-cx: 49%;
		--spot-cy: 53%;
	}

	.title :global(.sig) {
		position: relative;
		width: 100%;
		animation: allumage 1.3s 0.6s both;
	}

	/*
	 * The follow spot: a hard-edged amber disc. The lit part of the signature
	 * turns dark, letters that leave the circle stay light.
	 * On load the name sits in the dark, then the light cue reveals it.
	 */
	.spot {
		position: absolute;
		inset: -15% -3% -21% -5%;
		border-radius: 50%;
		background: var(--spot);
		animation: top-lumiere 1.3s 0.6s both;
	}

	.lit {
		position: absolute;
		inset: 0;
		color: var(--sig-ink);
		clip-path: ellipse(var(--spot-rx) var(--spot-ry) at var(--spot-cx) var(--spot-cy));
		animation: top-lumiere 1.3s 0.6s both;
	}

	@keyframes allumage {
		from {
			opacity: 0.12;
		}
	}

	@keyframes top-lumiere {
		0% {
			opacity: 0;
		}
		30% {
			opacity: 0.9;
		}
		42% {
			opacity: 0.35;
		}
		58% {
			opacity: 1;
		}
		66% {
			opacity: 0.7;
		}
		100% {
			opacity: 1;
		}
	}

	/* The headshot, gaffer-taped */
	.headshot {
		position: relative;
		z-index: 1;
		grid-column: 10 / span 3;
		grid-row: 2 / span 2;
		margin-top: clamp(1rem, 4vw, 3rem);
		transform: rotate(2.5deg);
	}

	.print {
		position: relative;
		padding: 0.55rem;
		background: var(--print);
		box-shadow: 0 18px 30px -18px rgba(0, 0, 0, 0.6);
	}

	.print img {
		width: 100%;
		height: auto;
		aspect-ratio: 1;
		object-fit: cover;
		filter: grayscale(1) contrast(1.08);
	}

	.gaffer {
		z-index: 1;
		top: -0.8rem;
		left: 50%;
		translate: -50% 0;
		rotate: -5deg;
	}

	figcaption {
		margin-top: 0.8rem;
		font-style: italic;
		font-size: var(--step--1);
		line-height: 1.4;
		color: var(--ink-soft);
	}

	/* The line, set like a play script */
	.speech {
		grid-column: 1 / span 8;
		grid-row: 3;
		max-width: 38rem;
	}

	.character {
		margin-bottom: 0.6rem;
		color: var(--ink-soft);
	}

	.name {
		font-family: var(--font-poster);
		font-weight: 800;
		font-size: 1.3rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--ink);
	}

	.line {
		font-size: var(--step-1);
		line-height: 1.55;
	}

	.status {
		margin-top: 1.4rem;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 1.25rem 2rem;
		margin-top: 2.25rem;
	}

	.cta {
		color: var(--ink);
		font-family: var(--font-poster);
		font-weight: 800;
		font-size: 1.5rem;
		text-decoration: underline;
		text-decoration-color: var(--mark);
		text-decoration-thickness: 0.2em;
		text-underline-offset: 0.2em;
	}

	.cta:hover {
		color: var(--link);
	}

	@media (max-width: 52rem) {
		.opening {
			grid-column: 1 / -1;
		}

		.title {
			grid-column: 1 / -1;
		}

		.headshot {
			grid-column: 7 / -1;
			grid-row: 3;
			margin-top: 0;
			margin-bottom: 2rem;
		}

		.speech {
			grid-column: 1 / -1;
			grid-row: 4;
		}
	}
</style>
