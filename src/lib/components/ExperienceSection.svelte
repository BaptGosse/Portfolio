<script lang="ts">
	import { _, locale } from 'svelte-i18n';
	import { pick, formatList, formatPeriod, type Localized } from '$lib/utils/i18n-helpers';
	import SceneTitle from './SceneTitle.svelte';

	type ExperienceData = {
		company: Localized;
		role: Localized;
		startDate: Date;
		endDate: Date | null;
		description: Localized;
		technologies: Localized[];
		type: string;
	};

	let { experiences = [] }: { experiences: ExperienceData[] } = $props();

	const cues = $derived(
		experiences.map((exp) => ({
			company: pick(exp.company, $locale),
			role: pick(exp.role, $locale),
			period: formatPeriod(exp.startDate, exp.endDate, $locale, $_('experience.present')),
			current: !exp.endDate,
			description: pick(exp.description, $locale),
			cast: exp.technologies.length
				? formatList(
						exp.technologies.map((t) => pick(t, $locale)),
						$locale
					)
				: ''
		}))
	);
</script>

<section class="scene" aria-labelledby="conduite-title">
	<div class="wrap">
		<SceneTitle
			id="conduite-title"
			title={$_('experience.title')}
			label={$_('experience.label')}
			note={$_('experience.note')}
		/>

		<ol class="cue-sheet">
			{#each cues as cue, index}
				<li class="cue">
					<p class="number" aria-hidden="true">{index + 1}</p>
					<p class="period" class:current={cue.current}>{cue.period}</p>
					<div class="what">
						<h3>{cue.role} <span class="company">{cue.company}</span></h3>
						<p class="description">{cue.description}</p>
						{#if cue.cast}
							<p class="cast">{$_('experience.cast', { values: { list: cue.cast } })}</p>
						{/if}
					</div>
				</li>
			{/each}
		</ol>
	</div>
</section>

<style>
	/* A real cue sheet: one row per cue, ruled like the stage manager's table */
	.cue-sheet {
		list-style: none;
		border-top: 2px solid var(--ink);
	}

	.cue {
		display: grid;
		grid-template-columns: 3.5rem 10.5rem minmax(0, 1fr);
		gap: 0.25rem clamp(1rem, 3vw, 2rem);
		align-items: baseline;
		padding-block: 1.4rem;
		border-bottom: 1px solid var(--rule);
	}

	.number {
		font-family: var(--font-poster);
		font-weight: 900;
		font-size: var(--step-2);
		line-height: 1;
		color: var(--spot);
		font-variant-numeric: tabular-nums;
	}

	.period {
		font-style: italic;
		color: var(--ink-soft);
		font-size: 0.95rem;
	}

	/* Still running: the cue is live */
	.period.current {
		color: var(--mark);
	}

	.what {
		display: grid;
		gap: 0.35rem;
		max-width: 44rem;
	}

	h3 {
		font-size: var(--step-1);
		font-weight: 800;
		line-height: 1.1;
	}

	.company {
		font-family: var(--font-text);
		font-weight: 600;
		font-size: 0.72em;
		letter-spacing: 0;
		white-space: nowrap;
		color: var(--ink-soft);
	}

	.description {
		font-size: 0.98rem;
		line-height: 1.55;
	}

	.cast {
		font-style: italic;
		font-size: 0.92rem;
		color: var(--ink-soft);
	}

	@media (max-width: 40rem) {
		.cue {
			grid-template-columns: 2.5rem minmax(0, 1fr);
		}

		.period {
			grid-column: 2;
		}

		.what {
			grid-column: 2;
		}
	}
</style>
