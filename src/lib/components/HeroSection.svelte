<script lang="ts">
	import { ArrowRight, Server, Cloud, Code2 } from 'lucide-svelte';
	import { _ } from 'svelte-i18n';
	import InteractiveTerminal from '$lib/components/InteractiveTerminal.svelte';
</script>

<section class="hero">
	<div class="hero-background">
		<div class="grid-pattern"></div>
		<div class="gradient-orb orb-1"></div>
		<div class="gradient-orb orb-2"></div>
	</div>

	<div class="prismatic-divider">
		<div class="divider-glow"></div>
		<div class="divider-line"></div>
		<div class="divider-particles">
			<span class="particle" style="left: 15%; animation-delay: 0s;"></span>
			<span class="particle" style="left: 35%; animation-delay: 0.8s;"></span>
			<span class="particle" style="left: 55%; animation-delay: 1.6s;"></span>
			<span class="particle" style="left: 75%; animation-delay: 2.4s;"></span>
			<span class="particle" style="left: 25%; animation-delay: 1.2s;"></span>
			<span class="particle" style="left: 65%; animation-delay: 2s;"></span>
		</div>
	</div>

	<div class="container hero-container">
		<div class="hero-content">
			<div class="hero-badge">
				<span class="badge-dot"></span>
				{$_('hero.badge')}
			</div>

			<h1 class="hero-title">
				{$_('hero.title')}
				<span class="gradient-text">{$_('hero.titleGradient')}</span>
			</h1>

			<p class="hero-description">
				{$_('hero.description')}
			</p>

			<div class="hero-actions">
				<a href="#projects" class="btn btn-primary hero-cta">
					<span>{$_('hero.cta')}</span>
					<ArrowRight size={18} />
				</a>
				<a href="#contact" class="btn btn-secondary">
					{$_('hero.contact')}
				</a>
			</div>

			<div class="hero-stats">
				<div class="stat">
					<div class="stat-icon">
						<Server size={24} />
					</div>
					<div class="stat-content">
						<div class="stat-value">5+</div>
						<div class="stat-label">{$_('hero.stats.projects')}</div>
					</div>
				</div>
				<div class="stat">
					<div class="stat-icon">
						<Cloud size={24} />
					</div>
					<div class="stat-content">
						<div class="stat-value">K8s</div>
						<div class="stat-label">{$_('hero.stats.cloudNative')}</div>
					</div>
				</div>
				<div class="stat">
					<div class="stat-icon">
						<Code2 size={24} />
					</div>
					<div class="stat-content">
						<div class="stat-value">Go/Rust</div>
						<div class="stat-label">{$_('hero.stats.programming')}</div>
					</div>
				</div>
			</div>
		</div>

		<div class="hero-visual">
			<InteractiveTerminal />
		</div>
	</div>
</section>

<style>
	.hero {
		position: relative;
		min-height: 800px;
		display: flex;
		align-items: center;
		overflow: visible;
		padding: var(--spacing-4xl) 0;
		z-index: 10;
	}

	.hero-background {
		position: absolute;
		inset: 0;
		z-index: 0;
		overflow: hidden;
	}

	.prismatic-divider {
		position: absolute;
		bottom: -1px;
		left: 0;
		right: 0;
		height: 120px;
		z-index: 5;
		pointer-events: none;
		overflow: hidden;
	}

	.divider-glow {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 100%;
		background:
			linear-gradient(to bottom,
				transparent 0%,
				rgba(193, 159, 255, 0.02) 30%,
				rgba(193, 159, 255, 0.04) 60%,
				rgba(193, 159, 255, 0.06) 85%,
				rgba(15, 20, 32, 0.2) 97%,
				rgba(15, 20, 32, 0.5) 99%,
				var(--bg-primary) 100%
			);
	}

	.divider-line {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 2px;
		background: linear-gradient(
			90deg,
			transparent 0%,
			rgba(193, 159, 255, 0.2) 10%,
			rgba(193, 159, 255, 0.6) 30%,
			#c19fff 50%,
			rgba(167, 139, 250, 0.6) 70%,
			rgba(167, 139, 250, 0.2) 90%,
			transparent 100%
		);
		box-shadow:
			0 0 20px rgba(193, 159, 255, 0.5),
			0 0 40px rgba(193, 159, 255, 0.3),
			0 0 60px rgba(193, 159, 255, 0.1);
		animation: prismaticPulse 4s ease-in-out infinite;
	}

	@keyframes prismaticPulse {
		0%, 100% {
			opacity: 0.6;
			transform: scaleX(1);
		}
		50% {
			opacity: 1;
			transform: scaleX(1.02);
		}
	}

	.divider-particles {
		position: absolute;
		bottom: -1px;
		left: 0;
		right: 0;
		height: 4px;
	}

	.particle {
		position: absolute;
		width: 4px;
		height: 4px;
		background: #c19fff;
		border-radius: 50%;
		box-shadow:
			0 0 10px rgba(193, 159, 255, 0.8),
			0 0 20px rgba(193, 159, 255, 0.4);
		animation: particleFloat 3s ease-in-out infinite;
		opacity: 0;
	}

	@keyframes particleFloat {
		0%, 100% {
			opacity: 0;
			transform: translateY(0) scale(0.5);
		}
		10% {
			opacity: 1;
			transform: translateY(-5px) scale(1);
		}
		90% {
			opacity: 1;
			transform: translateY(-25px) scale(1.2);
		}
		100% {
			opacity: 0;
			transform: translateY(-30px) scale(0.5);
		}
	}

	.grid-pattern {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(var(--border-color) 1px, transparent 1px),
			linear-gradient(90deg, var(--border-color) 1px, transparent 1px);
		background-size: 50px 50px;
		opacity: 0.3;
		mask-image: radial-gradient(ellipse 80% 50% at 50% 40%, black 40%, transparent 100%);
		-webkit-mask-image: radial-gradient(ellipse 80% 50% at 50% 40%, black 40%, transparent 100%);
	}

	.gradient-orb {
		position: absolute;
		border-radius: 50%;
		filter: blur(80px);
		opacity: 0.3;
		animation: float 20s ease-in-out infinite;
	}

	.orb-1 {
		width: 500px;
		height: 500px;
		top: -250px;
		right: -100px;
		background: linear-gradient(135deg, var(--color-accent), var(--color-secondary-accent));
	}

	.orb-2 {
		width: 400px;
		height: 400px;
		bottom: -200px;
		left: -100px;
		background: linear-gradient(135deg, var(--color-secondary-accent), var(--color-accent));
		animation-delay: -10s;
	}

	@keyframes float {
		0%, 100% {
			transform: translate(0, 0) scale(1);
		}
		33% {
			transform: translate(30px, -30px) scale(1.1);
		}
		66% {
			transform: translate(-20px, 20px) scale(0.9);
		}
	}

	.hero-container {
		position: relative;
		z-index: 1;
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--spacing-3xl);
		align-items: center;
	}

	.hero-content {
		animation: slideIn 0.8s ease-out;
	}

	@keyframes slideIn {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.hero-badge {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-sm);
		padding: var(--spacing-sm) var(--spacing-lg);
		background: var(--bg-tertiary);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-full);
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--text-secondary);
		margin-bottom: var(--spacing-xl);
		animation: fadeIn 0.8s ease-out 0.2s both;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.badge-dot {
		width: 8px;
		height: 8px;
		background: var(--color-accent);
		border-radius: 50%;
		animation: pulse-dot 2s ease-in-out infinite;
	}

	@keyframes pulse-dot {
		0%, 100% {
			opacity: 1;
			transform: scale(1);
		}
		50% {
			opacity: 0.5;
			transform: scale(1.2);
		}
	}

	.hero-title {
		font-size: clamp(2.5rem, 6vw, 4.5rem);
		font-weight: 800;
		line-height: 1.1;
		margin-bottom: var(--spacing-xl);
		animation: slideIn 0.8s ease-out 0.1s both;
	}

	.gradient-text {
		display: block;
		background: linear-gradient(135deg, var(--color-accent), var(--color-secondary-accent));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.gradient-text::selection {
		-webkit-text-fill-color: var(--text-primary);
		background: var(--color-accent);
	}

	.gradient-text::-moz-selection {
		-webkit-text-fill-color: var(--text-primary);
		background: var(--color-accent);
	}

	.hero-description {
		font-size: clamp(1.125rem, 2vw, 1.375rem);
		line-height: 1.7;
		color: var(--text-secondary);
		max-width: 100%;
		margin-bottom: var(--spacing-2xl);
		animation: slideIn 0.8s ease-out 0.2s both;
	}

	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-md);
		margin-bottom: var(--spacing-3xl);
		animation: slideIn 0.8s ease-out 0.3s both;
	}

	.hero-cta {
		background: linear-gradient(135deg, #a26df9, #b88dfc) !important;
		color: #ffffff !important;
		box-shadow: 0 4px 16px rgba(162, 109, 249, 0.3) !important;
		border: 1px solid rgba(162, 109, 249, 0.5) !important;
		display: inline-flex !important;
		align-items: center !important;
		padding: 14px 24px !important;
	}

	.hero-cta:hover {
		box-shadow: 0 8px 24px rgba(162, 109, 249, 0.5) !important;
		background: linear-gradient(135deg, #9456f8, #a26df9) !important;
		border-color: rgba(148, 86, 248, 0.6) !important;
	}

	.hero-cta span {
		display: block;
		line-height: 1;
		margin: 0;
		padding: 0;
	}

	.hero-cta :global(svg) {
		display: block !important;
		margin: 0 !important;
	}

	.hero-actions .btn-secondary {
		display: inline-flex !important;
		align-items: center !important;
		justify-content: center !important;
		padding: 14px 24px !important;
		line-height: 1 !important;
	}

	.hero-stats {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--spacing-md);
		animation: slideIn 0.8s ease-out 0.4s both;
	}

	.stat {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		padding: var(--spacing-md);
		background: var(--bg-secondary);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-xl);
		transition: all var(--transition-normal);
	}

	.stat:hover {
		border-color: var(--color-accent);
		transform: translateY(-2px);
	}

	.stat-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
		background: var(--bg-hover);
		border-radius: var(--radius-lg);
		color: var(--color-accent);
		flex-shrink: 0;
	}

	.stat-value {
		font-family: var(--font-display);
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--text-primary);
		line-height: 1;
		white-space: nowrap;
	}

	.stat-label {
		font-size: 0.875rem;
		color: var(--text-tertiary);
		margin-top: var(--spacing-xs);
	}

	.hero-visual {
		display: none;
		animation: slideIn 0.8s ease-out 0.5s both;
	}

	@media (min-width: 768px) {
		.hero-container {
			grid-template-columns: 1.4fr 0.6fr;
			align-items: start;
		}

		.hero-visual {
			display: block;
			margin-top: var(--spacing-5xl);
		}
	}

	@media (max-width: 768px) {
		.hero {
			min-height: auto;
			padding: var(--spacing-3xl) 0;
		}

		.hero-stats {
			grid-template-columns: repeat(3, 1fr);
			gap: var(--spacing-sm);
		}

		.stat {
			flex-direction: column;
			padding: var(--spacing-md);
		}

		.stat-icon {
			width: 40px;
			height: 40px;
		}

		.stat-value {
			font-size: 1.25rem;
		}

		.stat-label {
			font-size: 0.75rem;
			text-align: center;
		}
	}
</style>
