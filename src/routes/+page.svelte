<script lang="ts">
	import HeroSection from '$lib/components/HeroSection.svelte';
	import StackSection from '$lib/components/StackSection.svelte';
	import SectionDivider from '$lib/components/SectionDivider.svelte';
	import ProjectsSection from '$lib/components/ProjectsSection.svelte';
	import OpportunitiesSection from '$lib/components/OpportunitiesSection.svelte';
	import ExperienceSection from '$lib/components/ExperienceSection.svelte';
	import ContactSection from '$lib/components/ContactSection.svelte';
</script>

<svelte:head>
	<title>Baptiste Gosselin - Étudiant Informatique, Infrastructure & Cloud-Native</title>
	<meta name="description" content="Étudiant en informatique spécialisé en infrastructure cloud-native, Kubernetes, DevOps et développement système. Dirigeant d'UnxWares." />
</svelte:head>

<HeroSection />

<StackSection />

<SectionDivider />

<ProjectsSection />

<SectionDivider />

<OpportunitiesSection />

<SectionDivider />

<ExperienceSection />

<SectionDivider />

<ContactSection />
