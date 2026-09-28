<script lang="ts">
	// The ghost light: the bulb left on over an empty stage.
	let { lit = true, size = 32 }: { lit?: boolean; size?: number } = $props();
</script>

<svg
	class="servante"
	class:lit
	viewBox="0 0 40 64"
	width={size * 0.625}
	height={size}
	aria-hidden="true"
	focusable="false"
>
	<circle class="halo" cx="20" cy="13" r="12.5" />
	<circle class="bulb" cx="20" cy="13" r="5.2" />
	<path d="M20 4.5c5.6.2 8.6 4 8.5 8.8-.1 4.6-3.3 7.9-8.4 8" />
	<path d="M20 4.5c-5.4.3-8.7 4.1-8.6 8.7.1 4.8 3.4 8 8.5 8.1" />
	<path d="M20 4.4c-2 2.6-2.3 13.6.1 16.9" />
	<path d="M20 4.4c2.1 2.8 2.2 13.8 0 16.9" />
	<path d="M12.3 13.2c5 .9 10.6.9 15.5-.1" />
	<path d="M17 21.4h6l-.4 3.4h-5.2z" />
	<path d="M20 25c.3 8.5-.2 17.6.1 26" />
	<path d="M20.1 50.5 9 62.2M20.1 50.5 31.4 62M20.1 50.5l.3 11.8" />
</svg>

<style>
	.servante {
		display: block;
		overflow: visible;
		fill: none;
		stroke: currentColor;
		stroke-width: 1.8;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	.halo {
		stroke: none;
		fill: var(--amber);
		opacity: 0;
		transition: opacity 300ms ease;
	}

	.bulb {
		stroke-width: 1.2;
		transition: fill 300ms ease;
	}

	.lit .halo {
		opacity: 0.22;
	}

	.lit .bulb {
		fill: var(--amber);
		stroke: var(--amber);
	}
</style>
