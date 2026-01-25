<script lang="ts">
	import { Heart } from 'lucide-svelte';
	import { _, locale } from 'svelte-i18n';
	import * as LucideIcons from 'lucide-svelte';

	type Passion = {
		title: { fr: string; en: string };
		description: { fr: string; en: string };
		icon: string;
		softSkills: {
			name: { fr: string; en: string };
			description: { fr: string; en: string };
			icon: string;
		}[];
	};

	let { passions = [] }: { passions: Passion[] } = $props();

	function getIcon(iconName: string) {
		return (LucideIcons as any)[iconName] || Heart;
	}

	const formattedPassions = $derived(passions.map(passion => ({
		title: passion.title[$locale as 'fr' | 'en'] || passion.title.fr,
		description: passion.description[$locale as 'fr' | 'en'] || passion.description.fr,
		icon: passion.icon,
		softSkills: passion.softSkills.map(skill => ({
			name: skill.name[$locale as 'fr' | 'en'] || skill.name.fr,
			description: skill.description[$locale as 'fr' | 'en'] || skill.description.fr,
			icon: skill.icon
		}))
	})));
</script>

<section class="section passions-section">
	<div class="container">
		<div class="section-header-enhanced">
			<div class="section-icon">
				<Heart size={32} />
			</div>
			<h2 class="section-title-enhanced">{$_('passions.title')}</h2>
			<p class="section-subtitle-enhanced">
				{$_('passions.subtitle')}
			</p>
		</div>

		<div class="passions-grid">
			{#each formattedPassions as passion, index}
				{@const Icon = getIcon(passion.icon)}
				<div class="passion-card" style="animation-delay: {index * 150}ms">
					<div class="passion-glow"></div>

					<div class="passion-header">
						<div class="passion-icon">
							<Icon size={28} />
						</div>
						<h3 class="passion-title">{passion.title}</h3>
					</div>

					<p class="passion-description">{passion.description}</p>

					{#if passion.softSkills.length > 0}
						<div class="soft-skills-section">
							<h4 class="soft-skills-title">{$_('passions.skills_developed')}</h4>
							<div class="soft-skills-list">
								{#each passion.softSkills as skill}
									{@const SkillIcon = getIcon(skill.icon)}
									<div class="soft-skill-item">
										<div class="skill-icon">
											<SkillIcon size={18} />
										</div>
										<div class="skill-info">
											<span class="skill-name">{skill.name}</span>
											<span class="skill-description">{skill.description}</span>
										</div>
									</div>
								{/each}
							</div>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.section {
		position: relative;
		padding: var(--spacing-3xl) 0;
		overflow: hidden;
	}

	.section .container {
		position: relative;
		z-index: 1;
	}

	.section-header-enhanced {
		text-align: center;
		margin-bottom: var(--spacing-4xl);
		position: relative;
	}

	.section-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 64px;
		height: 64px;
		background: linear-gradient(135deg, var(--color-accent), var(--color-secondary-accent));
		border-radius: var(--radius-2xl);
		color: var(--bg-primary);
		margin-bottom: var(--spacing-lg);
		box-shadow: 0 8px 32px var(--color-accent-glow);
		animation: iconFloat 3s ease-in-out infinite;
	}

	@keyframes iconFloat {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-10px);
		}
	}

	.section-title-enhanced {
		font-size: clamp(2.5rem, 5vw, 3.5rem);
		font-weight: 800;
		margin-bottom: var(--spacing-md);
		background: linear-gradient(135deg, var(--text-primary), var(--color-accent));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.section-subtitle-enhanced {
		font-size: clamp(1rem, 2vw, 1.25rem);
		color: var(--text-tertiary);
		max-width: 600px;
		margin: 0 auto;
	}

	.passions-section {
		background: transparent;
	}

	.passions-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--spacing-2xl);
		max-width: 1200px;
		margin: 0 auto;
	}

	.passion-card {
		position: relative;
		background: var(--bg-secondary);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-2xl);
		padding: var(--spacing-2xl);
		transition: all var(--transition-normal);
		overflow: hidden;
		animation: fadeInUp 0.6s ease-out both;
	}

	.passion-card:nth-child(3) {
		grid-column: span 2;
	}

	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.passion-glow {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 100%;
		background: radial-gradient(
			circle at top right,
			var(--color-accent-glow) 0%,
			transparent 60%
		);
		opacity: 0;
		transition: opacity var(--transition-normal);
	}

	.passion-card:hover {
		border-color: var(--color-accent);
		transform: translateY(-8px);
		box-shadow: 0 20px 60px rgba(193, 159, 255, 0.2);
	}

	.passion-card:hover .passion-glow {
		opacity: 1;
	}

	.passion-header {
		display: flex;
		align-items: center;
		gap: var(--spacing-md);
		margin-bottom: var(--spacing-lg);
		position: relative;
		z-index: 1;
	}

	.passion-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 56px;
		height: 56px;
		background: linear-gradient(135deg, var(--color-accent), var(--color-secondary-accent));
		border-radius: var(--radius-xl);
		color: var(--bg-primary);
		flex-shrink: 0;
		box-shadow: 0 4px 16px var(--color-accent-glow);
	}

	.passion-title {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--text-primary);
		position: relative;
		z-index: 1;
	}

	.passion-description {
		color: var(--text-secondary);
		line-height: 1.7;
		margin-bottom: var(--spacing-xl);
		position: relative;
		z-index: 1;
	}

	.soft-skills-section {
		position: relative;
		z-index: 1;
		margin-top: var(--spacing-2xl);
		padding-top: var(--spacing-xl);
		border-top: 1px solid var(--border-color);
	}

	.soft-skills-title {
		font-size: 0.9375rem;
		font-weight: 600;
		color: var(--text-secondary);
		margin-bottom: var(--spacing-lg);
	}

	.soft-skills-list {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: var(--spacing-lg);
	}

	.soft-skill-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: var(--spacing-sm);
		padding: var(--spacing-lg);
		background: var(--bg-secondary);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-xl);
		transition: all var(--transition-normal);
	}

	.soft-skill-item:hover {
		border-color: var(--color-accent);
		transform: translateY(-4px);
		box-shadow: 0 8px 24px rgba(193, 159, 255, 0.15);
	}

	.skill-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
		background: linear-gradient(135deg, var(--color-accent-glow) 0%, rgba(193, 159, 255, 0.1) 100%);
		border: 1px solid rgba(193, 159, 255, 0.2);
		border-radius: var(--radius-lg);
		color: var(--color-accent);
		flex-shrink: 0;
		transition: all var(--transition-fast);
	}

	.soft-skill-item:hover .skill-icon {
		background: linear-gradient(135deg, var(--color-accent), var(--color-secondary-accent));
		color: var(--bg-primary);
		border-color: transparent;
		transform: scale(1.1);
		box-shadow: 0 4px 16px var(--color-accent-glow);
	}

	.skill-info {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
	}

	.skill-name {
		font-size: 1rem;
		font-weight: 600;
		color: var(--text-primary);
		line-height: 1.4;
	}

	.skill-description {
		font-size: 0.875rem;
		color: var(--text-tertiary);
		line-height: 1.6;
	}

	@media (max-width: 968px) {
		.passions-grid {
			grid-template-columns: 1fr;
		}

		.passion-card:nth-child(3) {
			grid-column: span 1;
			display: block;
		}

		.soft-skills-list {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 768px) {
		.passion-card {
			padding: var(--spacing-xl);
		}

		.passion-title {
			font-size: 1.25rem;
		}
	}
</style>
