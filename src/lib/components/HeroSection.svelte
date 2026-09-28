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
		padding-top: clamp(2rem, 6vw, 4.5rem);
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

	/* L'affiche : la signature sous la poursuite */
	.title {
		position: relative;
		grid-column: 1 / span 9;
		grid-row: 2;
		margin-block: clamp(3rem, 7vw, 5.5rem) clamp(4rem, 8vw, 6rem);
		color: var(--ink);
		isolation: isolate;
		/* Géométrie de la poursuite, partagée par le disque et la découpe */
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
	 * La poursuite : un disque ambre à bord net. La partie éclairée de la
	 * signature passe en sombre, les lettres qui sortent du rond restent claires.
	 * Au chargement, le nom est dans le noir, puis le top lumière le révèle.
	 */
	.spot {
		position: absolute;
		inset: -15% -3% -21% -5%;
		border-radius: 50%;
		background: radial-gradient(
			ellipse closest-side,
			color-mix(in srgb, var(--spot), #fff 28%) 0%,
			var(--spot) 72%
		);
		opacity: var(--spot-strength);
		animation: top-lumiere 1.3s 0.6s both;
	}

	.lit {
		position: absolute;
		inset: 0;
		color: var(--sig-ink);
		clip-path: ellipse(var(--spot-rx) var(--spot-ry) at var(--spot-cx) var(--spot-cy));
		opacity: var(--spot-strength);
		animation: top-lumiere 1.3s 0.6s both;
	}

	@keyframes allumage {
		from {
			opacity: 0.12;
		}
	}

	/* Salle allumée : pas de poursuite, pas de top */
	:global([data-theme='light']) .title :global(.sig) {
		animation: none;
	}

	@keyframes top-lumiere {
		0% {
			opacity: 0;
		}
		30% {
			opacity: calc(var(--spot-strength) * 0.9);
		}
		42% {
			opacity: calc(var(--spot-strength) * 0.35);
		}
		58% {
			opacity: var(--spot-strength);
		}
		66% {
			opacity: calc(var(--spot-strength) * 0.7);
		}
		100% {
			opacity: var(--spot-strength);
		}
	}

	/* Le portrait, scotché au gaffer */
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
		background: var(--notice);
		box-shadow: 0 18px 30px -18px rgba(0, 0, 0, 0.6);
	}

	.print img {
		width: 100%;
		height: auto;
		aspect-ratio: 1;
		object-fit: cover;
		filter: grayscale(1) contrast(1.08);
	}

	/* Le portrait prend la teinte du plateau */
	.print::after {
		content: '';
		position: absolute;
		inset: 0.55rem;
		background: var(--photo-wash);
		mix-blend-mode: color;
		opacity: 0.7;
		pointer-events: none;
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

	/* La réplique, mise en page comme un texte de théâtre */
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
