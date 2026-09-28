<script lang="ts">
	import { page } from '$app/stores';
	import { _ } from 'svelte-i18n';
	import Servante from '$lib/components/Servante.svelte';

	const status = $derived($page.status);
	const key = $derived(status === 404 ? 'notFound' : status >= 500 ? 'server' : 'other');
</script>

<svelte:head>
	<title>{status} - Baptiste Gosselin</title>
</svelte:head>

<section class="scene empty-stage">
	<div class="wrap layout">
		<div class="light">
			<Servante lit size={220} />
		</div>

		<div class="text">
			<p class="status">{status}</p>
			<h1>{$_(`error.${key}.title`)}</h1>
			<p class="message">{$_(`error.${key}.text`)}</p>

			<p class="actions">
				<a href="/">{$_('error.home')}</a>
				<a href="/projects">{$_('error.projects')}</a>
			</p>

			{#if $page.error?.message && status !== 404}
				<details>
					<summary>{$_('error.details')}</summary>
					<pre>{$page.error.message}</pre>
				</details>
			{/if}
		</div>
	</div>
</section>

<style>
	.empty-stage {
		padding-top: clamp(2.5rem, 7vw, 5rem);
	}

	.layout {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr);
		gap: clamp(2rem, 6vw, 5rem);
		align-items: center;
	}

	/* The ghost light casts a small pool on the stage */
	.light {
		position: relative;
		padding: 2rem 2.5rem 0;
		color: var(--ink);
	}

	.light::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		bottom: -1rem;
		height: 2.5rem;
		border-radius: 50%;
		background: var(--bulb);
		opacity: 0.16;
	}

	.text {
		display: grid;
		gap: 1rem;
		max-width: var(--measure);
	}

	.status {
		font-family: var(--font-poster);
		font-weight: 900;
		font-size: var(--step-3);
		line-height: 1;
		color: var(--mark);
	}

	h1 {
		font-size: var(--step-4);
		font-weight: 900;
		line-height: 0.9;
	}

	.message {
		font-size: var(--step-1);
		line-height: 1.55;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem 2rem;
		margin-top: 1rem;
		font-family: var(--font-poster);
		font-weight: 800;
		font-size: 1.5rem;
	}

	.actions a {
		color: var(--ink);
		text-decoration-color: var(--mark);
		text-decoration-thickness: 0.2em;
		text-underline-offset: 0.2em;
	}

	.actions a:hover {
		color: var(--link);
	}

	details {
		margin-top: 1.5rem;
		color: var(--ink-soft);
	}

	summary {
		cursor: pointer;
	}

	pre {
		margin-top: 0.75rem;
		padding: 1rem;
		overflow-x: auto;
		background: var(--paper-deep);
		font-family: var(--font-code);
		font-size: 0.85rem;
		white-space: pre-wrap;
	}

	@media (max-width: 40rem) {
		.layout {
			grid-template-columns: 1fr;
		}

		.light {
			justify-self: start;
			padding: 0 1rem;
		}

		.light :global(svg) {
			width: 5rem;
			height: auto;
		}
	}
</style>
