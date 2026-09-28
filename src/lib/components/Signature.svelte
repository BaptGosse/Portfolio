<script lang="ts">
	// The graffiti signature as a mask: it takes the surrounding text color.
	let { label = '', class: className = '' }: { label?: string; class?: string } = $props();
</script>

{#if label}
	<span class="signature {className}" role="img" aria-label={label}></span>
{:else}
	<span class="signature {className}" aria-hidden="true"></span>
{/if}

<style>
	.signature {
		display: block;
		aspect-ratio: 1400 / 617;
		background-color: currentColor;
		-webkit-mask: url('/images/signature-mask.png') center / contain no-repeat;
		mask: url('/images/signature-mask.png') center / contain no-repeat;
	}
</style>
