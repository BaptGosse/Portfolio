<script lang="ts">
	import { _ } from 'svelte-i18n';
	import HeroSection from '$lib/components/HeroSection.svelte';
	import ProjectsSection from '$lib/components/ProjectsSection.svelte';
	import StackSection from '$lib/components/StackSection.svelte';
	import PassionsSection from '$lib/components/PassionsSection.svelte';
	import ExperienceSection from '$lib/components/ExperienceSection.svelte';
	import OpportunitiesSection from '$lib/components/OpportunitiesSection.svelte';
	import ContactSection from '$lib/components/ContactSection.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{$_('meta.title')}</title>
	<meta name="description" content={$_('meta.description')} />
</svelte:head>

<HeroSection />
<ProjectsSection projects={data.projects} />
<StackSection skills={data.skills} />
<PassionsSection passions={data.passions} />
<ExperienceSection experiences={data.experiences} />
<OpportunitiesSection />
<ContactSection />
