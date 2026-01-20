<div class="section-divider">
	<div class="divider-dot"></div>
	<div class="divider-gradient-line"></div>
	<div class="divider-dot"></div>
</div>

<style>
	.section-divider {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-lg);
		padding: var(--spacing-2xl) 0;
		max-width: 600px;
		margin: 0 auto;
		position: relative;
		z-index: 2;
	}

	.divider-dot {
		width: 8px;
		height: 8px;
		background: linear-gradient(135deg, var(--color-accent), var(--color-secondary-accent));
		border-radius: 50%;
		box-shadow:
			0 0 12px rgba(193, 159, 255, 0.6),
			0 0 24px rgba(193, 159, 255, 0.3);
		animation: dotPulse 3s ease-in-out infinite;
	}

	.divider-dot:nth-child(2) {
		animation-delay: 1.5s;
	}

	@keyframes dotPulse {
		0%, 100% {
			opacity: 0.4;
			transform: scale(1);
		}
		50% {
			opacity: 1;
			transform: scale(1.3);
		}
	}

	.divider-gradient-line {
		flex: 1;
		height: 1px;
		background: linear-gradient(
			90deg,
			transparent 0%,
			rgba(193, 159, 255, 0.15) 20%,
			rgba(193, 159, 255, 0.4) 50%,
			rgba(167, 139, 250, 0.15) 80%,
			transparent 100%
		);
		position: relative;
		overflow: hidden;
	}
</style>
