<script lang="ts">
	import { _, locale } from 'svelte-i18n';
	import { pick, type Localized } from '$lib/utils/i18n-helpers';
	import SceneTitle from './SceneTitle.svelte';
	import ProjectEntry from './ProjectEntry.svelte';

	type ProjectData = {
		id: string;
		title: Localized;
		description: Localized;
		technologies: Localized[];
		github: string | null;
		link: string | null;
		featured: boolean;
	};

	let { projects = [], total = 0 }: { projects: ProjectData[]; total?: number } = $props();

	// The home page shows a short bill, the full repertoire lives on /projects
	const HOME_LIMIT = 4;

	const pieces = $derived(
		projects
			.filter((p) => p.featured)
			.slice(0, HOME_LIMIT)
			.map((p) => ({
				id: p.id,
				title: pick(p.title, $locale),
				description: pick(p.description, $locale),
				technologies: p.technologies.map((t) => pick(t, $locale)),
				github: p.github,
				link: p.link
			}))
	);
</script>

<section class="scene" id="repertoire" aria-labelledby="repertoire-title">
	<div class="wrap">
		<SceneTitle id="repertoire-title" title={$_('projects.title')} label={$_('projects.label')} note={$_('projects.note')} />

		{#if pieces.length}
			<div class="bill">
				{#each pieces as piece (piece.id)}
					<ProjectEntry {...piece} />
				{/each}
			</div>
		{:else}
			<p class="didascalie">{$_('projects.empty')}</p>
		{/if}

		<p class="more">
			<a href="/projects">{$_('projects.all', { values: { count: total } })}</a>
		</p>
	</div>
</section>

<style>
	.bill {
		display: grid;
		gap: clamp(2.5rem, 5vw, 3.75rem);
	}

	.more {
		margin-top: clamp(3rem, 7vw, 4.5rem);
	}

	.more a {
		color: var(--ink);
		font-family: var(--font-poster);
		font-weight: 800;
		font-size: 1.5rem;
		text-decoration-color: var(--mark);
		text-decoration-thickness: 0.2em;
		text-underline-offset: 0.2em;
	}

	.more a:hover {
		color: var(--link);
	}
</style>
