<script lang="ts">
	import { Sparkles } from 'lucide-svelte';
	import { _, locale } from 'svelte-i18n';

	type SkillGroup = {
		category: { fr: string; en: string };
		items: { name: { fr: string; en: string }; context: { fr: string; en: string } }[];
	};

	let { skills = [] }: { skills: SkillGroup[] } = $props();

	const formattedSkills = $derived(skills.map(group => ({
		category: group.category[$locale as 'fr' | 'en'] || group.category.fr,
		items: group.items.map(item => ({
			name: item.name[$locale as 'fr' | 'en'] || item.name.fr,
			context: item.context[$locale as 'fr' | 'en'] || item.context.fr
		}))
	})));
</script>

<section class="section stack-section">
	<div class="container">
		<div class="section-header-enhanced">
			<div class="section-icon">
				<Sparkles size={32} />
			</div>
			<h2 class="section-title-enhanced">{$_('stack.title')}</h2>
			<p class="section-subtitle-enhanced">
				{$_('stack.subtitle')}
			</p>
		</div>

		<div class="stack-grid-enhanced">
			{#each formattedSkills as skillGroup, index}
				<div class="stack-card-enhanced" style="animation-delay: {index * 100}ms">
					<div class="stack-card-glow"></div>
					<div class="stack-card-header">
						<h3 class="stack-card-title-enhanced">{skillGroup.category}</h3>
						<div class="stack-card-badge">{skillGroup.items.length}</div>
					</div>
					<div class="stack-items-enhanced">
						{#each skillGroup.items as skill}
							<div class="skill-item-enhanced">
								<div class="skill-marker"></div>
								<div class="skill-content">
									<h4 class="skill-name">{skill.name}</h4>
									<p class="skill-context">{skill.context}</p>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.section {
		position: relative;
		padding: var(--spacing-3xl) 0;
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
		0%, 100% {
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

	.stack-section {
		background: transparent;
		position: relative;
		z-index: 1;
	}

	.stack-grid-enhanced {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: var(--spacing-xl);
		position: relative;
	}

	.stack-card-enhanced {
		position: relative;
		background: var(--bg-secondary);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-2xl);
		padding: var(--spacing-xl);
		transition: all var(--transition-normal);
		animation: fadeInUp 0.6s ease-out both;
		overflow: hidden;
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

	.stack-card-glow {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 3px;
		background: linear-gradient(90deg, var(--color-accent), var(--color-secondary-accent));
		opacity: 0;
		transition: opacity var(--transition-normal);
	}

	.stack-card-enhanced:hover {
		border-color: var(--color-accent);
		transform: translateY(-8px);
		box-shadow: 0 20px 60px rgba(193, 159, 255, 0.2);
	}

	.stack-card-enhanced:hover .stack-card-glow {
		opacity: 1;
	}

	.stack-card-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--spacing-xl);
	}

	.stack-card-title-enhanced {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--text-primary);
	}

	.stack-card-badge {
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 32px;
		height: 32px;
		padding: 0 var(--spacing-sm);
		background: var(--bg-hover);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-full);
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--color-accent);
	}

	.stack-items-enhanced {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-lg);
	}

	.skill-item-enhanced {
		display: flex;
		gap: var(--spacing-md);
		padding: var(--spacing-md);
		background: var(--bg-tertiary);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-lg);
		transition: all var(--transition-normal);
	}

	.skill-item-enhanced:hover {
		border-color: var(--color-accent);
		background: var(--bg-hover);
		transform: translateX(8px);
	}

	.skill-marker {
		width: 4px;
		height: 4px;
		background: var(--color-accent);
		border-radius: 50%;
		margin-top: 8px;
		flex-shrink: 0;
		box-shadow: 0 0 12px var(--color-accent-glow);
	}

	.skill-content {
		flex: 1;
	}

	.skill-name {
		font-family: var(--font-display);
		font-size: 1rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: var(--spacing-xs);
	}

	.skill-context {
		font-size: 0.875rem;
		color: var(--text-tertiary);
		line-height: 1.6;
		margin: 0;
	}

	@media (max-width: 768px) {
		.stack-grid-enhanced {
			grid-template-columns: 1fr;
		}
	}
</style>
