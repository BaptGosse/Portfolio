<script lang="ts">
	import { _ } from 'svelte-i18n';
	import SceneTitle from './SceneTitle.svelte';

	const email = 'contact@baptiste-gosselin.fr';
</script>

<section class="scene" id="contact" aria-labelledby="contact-title">
	<div class="wrap">
		<SceneTitle id="contact-title" title={$_('contact.title')} />

		<p class="invite">{$_('contact.text')}</p>

		<p class="email">
			<a href="mailto:{email}">{email}</a>
		</p>

		<p class="elsewhere">
			{$_('contact.elsewhere')}
			<a href="https://github.com/BaptGosse" rel="noopener noreferrer">GitHub</a>
			{$_('contact.and')}
			<a href="https://linkedin.com/in/baptgosse" rel="noopener noreferrer">LinkedIn</a>.
		</p>
	</div>
</section>

<style>
	.invite {
		max-width: var(--measure);
		font-size: var(--step-1);
		line-height: 1.55;
	}

	.email {
		margin-block: clamp(2rem, 5vw, 3rem);
	}

	.email a {
		color: var(--ink);
		font-family: var(--font-poster);
		font-weight: 800;
		font-size: clamp(1.9rem, 1rem + 4.2vw, 4.25rem);
		line-height: 1;
		overflow-wrap: anywhere;
		text-decoration-color: var(--mark);
		text-decoration-thickness: 0.12em;
		text-underline-offset: 0.16em;
	}

	.email a:hover {
		color: var(--link);
	}

	.elsewhere {
		color: var(--ink-soft);
	}
</style>
