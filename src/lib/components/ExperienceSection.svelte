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
		<SceneTitle id="conduite-title" title={$_('experience.title')} note={$_('experience.note')} />

		<ol class="cues">
			{#each cues as cue, index}
				<li class="cue">
					<p class="number">
						<span class="top">{$_('experience.cueWord')}</span>
						<span class="n">{index + 1}</span>
					</p>
					<div class="body">
						<p class="period">{cue.period}</p>
						<h3>{cue.role}</h3>
						<p class="company">{cue.company}</p>
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
	.cues {
		display: grid;
		gap: clamp(2.75rem, 6vw, 4rem);
		list-style: none;
	}

	.cue {
		display: grid;
		grid-template-columns: clamp(4rem, 10vw, 7rem) minmax(0, 1fr);
		gap: clamp(1rem, 3vw, 2.5rem);
		align-items: start;
	}

	.number {
		display: grid;
		justify-items: end;
		line-height: 1;
		color: var(--spot);
	}

	:global([data-theme='light']) .number {
		color: var(--link);
	}

	.top {
		font-style: italic;
		font-size: var(--step--1);
		color: var(--ink-soft);
	}

	.n {
		font-family: var(--font-poster);
		font-weight: 900;
		font-size: var(--step-4);
		line-height: 0.85;
		font-variant-numeric: tabular-nums;
	}

	.body {
		display: grid;
		gap: 0.4rem;
		max-width: var(--measure);
		padding-top: 0.35rem;
	}

	.period {
		font-style: italic;
		color: var(--ink-soft);
	}

	h3 {
		font-size: var(--step-2);
	}

	.company {
		font-weight: 600;
	}

	.description {
		margin-top: 0.4rem;
	}

	.cast {
		font-style: italic;
		color: var(--ink-soft);
	}
</style>
