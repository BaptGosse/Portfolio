<script lang="ts">
	let { children } = $props();

	// Les métadonnées seront injectées par mdsvex
</script>

<article class="container mx-auto px-4 py-12 max-w-4xl">
	<div class="prose prose-invert prose-lg">
		{@render children()}
	</div>

	<div class="mt-12 pt-8 border-t border-gray-800">
		<a
			href="/blog"
			class="text-primary-400 hover:text-primary-300 font-medium flex items-center gap-2"
		>
			<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
			</svg>
			Retour au blog
		</a>
	</div>
</article>
