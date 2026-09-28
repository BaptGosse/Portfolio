<script lang="ts">
	import { _, json, locale } from 'svelte-i18n';
	import { formatList } from '$lib/utils/i18n-helpers';
	import SceneTitle from './SceneTitle.svelte';

	type Notice = { kicker: string; title: string; when: string; text: string; topics: string[] };

	const notices = $derived(($json('opportunities.notices') as Notice[] | undefined) ?? []);
</script>

<section class="scene" aria-labelledby="compagnie-title">
	<div class="wrap">
		<SceneTitle id="compagnie-title" title={$_('opportunities.title')} note={$_('opportunities.note')} />

		<div class="callboard">
			{#each notices as notice}
				<article class="notice">
					<span class="pin" aria-hidden="true"></span>
					<p class="kicker">{notice.kicker}</p>
					<h3>{notice.title}</h3>
					<p class="when">{notice.when}</p>
					<p>{notice.text}</p>
					{#if notice.topics?.length}
						<p class="topics">
							{$_('opportunities.topicsLabel')}
							{formatList(notice.topics, $locale)}.
						</p>
					{/if}
				</article>
			{/each}
		</div>

		<div class="actions">
			<a href="/documents/CV.pdf" class="ticket" download>
				<span>{$_('opportunities.cv')}</span>
				<span>{$_('hero.cvStub')}</span>
			</a>
			<a href="#contact" class="write">{$_('opportunities.write')}</a>
		</div>
	</div>
</section>

<style>
	.callboard {
		display: flex;
		flex-wrap: wrap;
		gap: clamp(2rem, 5vw, 3.5rem);
		padding-top: 0.5rem;
	}

	.notice {
		position: relative;
		flex: 1 1 20rem;
		max-width: 31rem;
		display: grid;
		gap: 0.75rem;
		align-content: start;
		padding: 2.25rem clamp(1.5rem, 4vw, 2.25rem) 2rem;
		background: var(--notice);
		color: var(--notice-ink);
		box-shadow: 0 22px 34px -22px rgba(0, 0, 0, 0.7);
		transform: rotate(-1.2deg);
	}

	.notice:nth-child(2n) {
		transform: rotate(0.9deg) translateY(1.5rem);
	}

	/* La punaise du tableau de service */
	.pin {
		position: absolute;
		top: 0.7rem;
		left: 50%;
		width: 0.85rem;
		height: 0.85rem;
		margin-left: -0.425rem;
		border-radius: 50%;
		background: var(--mark);
		box-shadow:
			inset -2px -2px 0 rgba(0, 0, 0, 0.25),
			1px 3px 3px rgba(0, 0, 0, 0.35);
	}

	.kicker,
	.when {
		font-style: italic;
		color: color-mix(in srgb, var(--notice-ink) 72%, transparent);
	}

	h3 {
		font-size: var(--step-3);
		color: var(--notice-ink);
	}

	.topics {
		font-style: italic;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 1.25rem 2rem;
		margin-top: clamp(3.5rem, 8vw, 5rem);
	}

	.write {
		color: var(--ink);
		font-family: var(--font-poster);
		font-weight: 800;
		font-size: 1.5rem;
		text-decoration-color: var(--mark);
		text-decoration-thickness: 0.2em;
		text-underline-offset: 0.2em;
	}

	.write:hover {
		color: var(--link);
	}
</style>
