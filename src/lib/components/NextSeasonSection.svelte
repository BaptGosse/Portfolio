<script lang="ts">
	import { _, json } from 'svelte-i18n';
	import SceneTitle from './SceneTitle.svelte';

	type Direction = { title: string; text: string };

	const directions = $derived(($json('next.items') as Direction[] | undefined) ?? []);
</script>

<section class="scene season inverse" aria-labelledby="saison-title">
	<div class="wrap">
		<SceneTitle id="saison-title" title={$_('next.title')} label={$_('next.label')} note={$_('next.note')} />

		<ul class="bill">
			{#each directions as direction}
				<li>
					<h3>{direction.title}</h3>
					<p>{direction.text}</p>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.season {
		margin-top: var(--scene-space);
		padding-bottom: var(--scene-space);
	}

	.bill {
		display: grid;
		gap: clamp(2.5rem, 6vw, 4rem);
		list-style: none;
	}

	li {
		display: grid;
		grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
		gap: 1rem clamp(1.5rem, 4vw, 3.5rem);
		align-items: baseline;
	}

	h3 {
		font-size: var(--step-3);
		font-weight: 900;
		line-height: 0.9;
	}

	/* Each direction sits on a strip of red tape */
	h3::after {
		content: '';
		display: block;
		width: 3.5rem;
		height: 0.3rem;
		margin-top: 0.9rem;
		background: var(--mark);
		transform: rotate(-2deg);
	}

	p {
		max-width: var(--measure);
		color: var(--ink-soft);
	}

	@media (max-width: 48rem) {
		li {
			grid-template-columns: 1fr;
		}
	}
</style>
