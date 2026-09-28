<script lang="ts">
	import { _ } from 'svelte-i18n';
	import SceneTitle from '$lib/components/SceneTitle.svelte';
	import ProjectEntry from '$lib/components/ProjectEntry.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	type Project = (typeof data.projects)[number];

	let selectedFilter = $state('all');

	function getProjectCategory(project: Project) {
		if (project.technologies.some((t) => ['Kubernetes', 'k3s', 'Helm'].includes(t))) {
			return 'cloud-native';
		} else if (project.technologies.some((t) => ['Proxmox', 'Debian', 'NGINX'].includes(t))) {
			return 'infrastructure';
		}
		return 'development';
	}

	const categories = $derived(
		[
			{ id: 'all', label: $_('projectsPage.filters.all') },
			{ id: 'infrastructure', label: $_('projectsPage.filters.infrastructure') },
			{ id: 'cloud-native', label: $_('projectsPage.filters.cloudNative') },
			{ id: 'development', label: $_('projectsPage.filters.development') }
		].map((category) => ({
			...category,
			count:
				category.id === 'all'
					? data.projects.length
					: data.projects.filter((p) => getProjectCategory(p) === category.id).length
		}))
	);

	const filteredProjects = $derived(
		selectedFilter === 'all'
			? data.projects
			: data.projects.filter((p) => getProjectCategory(p) === selectedFilter)
	);
</script>

<svelte:head>
	<title>{$_('projectsPage.metaTitle')}</title>
	<meta name="description" content={$_('projectsPage.metaDescription')} />
</svelte:head>

<section class="scene page" aria-labelledby="projects-title">
	<div class="wrap">
		<SceneTitle as="h1" id="projects-title" title={$_('projectsPage.title')} label={$_('projectsPage.label')} note={$_('projectsPage.note')} />

		<div class="filters" role="group" aria-label={$_('projectsPage.filtersLabel')}>
			{#each categories as category}
				<button
					class="filter"
					aria-pressed={selectedFilter === category.id}
					onclick={() => (selectedFilter = category.id)}
				>
					{category.label}
					<span class="count">({category.count})</span>
				</button>
			{/each}
		</div>

		{#if filteredProjects.length}
			<div class="bill">
				{#each filteredProjects as project (project.id)}
					<ProjectEntry
						level="h2"
						title={project.title}
						description={project.description}
						technologies={project.technologies}
						github={project.github}
						link={project.demo}
					/>
				{/each}
			</div>
		{:else}
			<div class="empty">
				<p>{$_('projectsPage.empty.title')}</p>
				<button class="filter" onclick={() => (selectedFilter = 'all')}>
					{$_('projectsPage.empty.action')}
				</button>
			</div>
		{/if}
	</div>
</section>

<style>
	.page {
		padding-top: clamp(2.5rem, 7vw, 5rem);
	}

	.filters {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem 1.75rem;
		margin-bottom: clamp(3rem, 7vw, 4.5rem);
	}

	.filter {
		position: relative;
		padding: 0.35rem 0;
		background: none;
		border: 0;
		color: var(--ink-soft);
		font-family: var(--font-poster);
		font-weight: 800;
		font-size: 1.35rem;
		cursor: pointer;
	}

	.filter:hover {
		color: var(--link);
	}

	.filter[aria-pressed='true'] {
		color: var(--ink);
	}

	/* The active filter stands on its mark */
	.filter[aria-pressed='true']::after {
		content: '';
		position: absolute;
		left: -0.2rem;
		right: -0.3rem;
		bottom: 0;
		height: 0.28rem;
		background: var(--mark);
		transform: rotate(-2deg);
	}

	.count {
		font-family: var(--font-text);
		font-weight: 400;
		font-style: italic;
		font-size: 0.95rem;
		color: var(--ink-soft);
	}

	.bill {
		display: grid;
		gap: clamp(2.5rem, 5vw, 3.75rem);
	}

	.empty {
		display: grid;
		justify-items: start;
		gap: 0.75rem;
		font-size: var(--step-1);
	}
</style>
