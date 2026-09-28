<script lang="ts">
	import { _, locale } from 'svelte-i18n';
	import { pick, formatList, type Localized } from '$lib/utils/i18n-helpers';
	import SceneTitle from './SceneTitle.svelte';

	type Passion = {
		title: Localized;
		description: Localized;
		icon: string;
		softSkills: { name: Localized; description: Localized; icon: string }[];
	};

	let { passions = [] }: { passions: Passion[] } = $props();

	const items = $derived(
		passions.map((passion) => ({
			title: pick(passion.title, $locale),
			description: pick(passion.description, $locale),
			learned: passion.softSkills.length
				? formatList(
						passion.softSkills.map((skill) => pick(skill.name, $locale).toLocaleLowerCase($locale ?? 'fr')),
						$locale
					)
				: ''
		}))
	);
</script>

<section class="scene foyer" aria-labelledby="entracte-title">
	<div class="wrap">
		<SceneTitle id="entracte-title" title={$_('passions.title')} label={$_('passions.label')} note={$_('passions.note')} />

		<div class="pastimes">
			{#each items as item}
				<article>
					<h3>{item.title}</h3>
					<p>{item.description}</p>
					{#if item.learned}
						<p class="learned">{$_('passions.learned', { values: { list: item.learned } })}</p>
					{/if}
				</article>
			{/each}
		</div>
	</div>
</section>

<style>
	/* The foyer: we leave the house during intermission */
	.foyer {
		margin-top: var(--scene-space);
		padding-bottom: var(--scene-space);
		background: var(--paper-deep);
	}

	.pastimes {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 17rem), 1fr));
		gap: clamp(2.5rem, 5vw, 4rem);
	}

	article {
		display: grid;
		gap: 0.8rem;
		align-content: start;
	}

	h3 {
		font-size: var(--step-2);
	}

	.learned {
		font-style: italic;
		color: var(--ink-soft);
	}
</style>
