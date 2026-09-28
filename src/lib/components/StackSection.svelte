<script lang="ts">
	import { _, locale } from 'svelte-i18n';
	import { pick, type Localized } from '$lib/utils/i18n-helpers';
	import SceneTitle from './SceneTitle.svelte';

	type SkillGroup = {
		category: Localized;
		items: { name: Localized; context: Localized }[];
	};

	let { skills = [] }: { skills: SkillGroup[] } = $props();

	const groups = $derived(
		skills.map((group) => ({
			category: pick(group.category, $locale),
			items: group.items.map((item) => ({
				name: pick(item.name, $locale),
				context: pick(item.context, $locale)
			}))
		}))
	);
</script>

<section class="scene" aria-labelledby="fiche-title">
	<div class="wrap">
		<SceneTitle id="fiche-title" title={$_('stack.title')} label={$_('stack.label')} note={$_('stack.note')} />

		<div class="rider">
			{#each groups as group}
				<section class="block">
					<h3>{group.category}</h3>
					<dl>
						{#each group.items as item}
							<div>
								<dt>{item.name}</dt>
								<dd>{item.context}</dd>
							</div>
						{/each}
					</dl>
				</section>
			{/each}
		</div>
	</div>
</section>

<style>
	.rider {
		columns: 3 17rem;
		column-gap: clamp(2rem, 5vw, 4rem);
	}

	.block {
		break-inside: avoid;
		margin-bottom: clamp(2.5rem, 5vw, 3.5rem);
	}

	h3 {
		margin-bottom: 1.1rem;
		font-size: var(--step-2);
	}

	dl {
		display: grid;
		gap: 0.9rem;
	}

	dt {
		font-weight: 600;
		line-height: 1.35;
	}

	dd {
		color: var(--ink-soft);
		font-size: 0.95em;
		line-height: 1.5;
	}
</style>
