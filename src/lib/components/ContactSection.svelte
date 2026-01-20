<script lang="ts">
	import { Mail, Github, Linkedin, ArrowRight } from 'lucide-svelte';
	import { _ } from 'svelte-i18n';
</script>

<section class="section contact-section-enhanced" id="contact">
	<div class="container">
		<div class="contact-content-enhanced">
			<div class="contact-header-enhanced">
				<h2 class="contact-title-enhanced">
					{$_('contact.title')}
				</h2>
				<p class="contact-subtitle-enhanced">
					{@html $_('contact.subtitle')}
				</p>
			</div>

			<div class="contact-cards">
				<a href="mailto:contact@baptiste-gosselin.fr" class="contact-card-enhanced">
					<div class="contact-card-icon">
						<Mail size={24} />
					</div>
					<div class="contact-card-content">
						<h3>{$_('contact.email')}</h3>
						<p>contact@baptiste-gosselin.fr</p>
					</div>
					<ArrowRight size={20} class="contact-card-arrow" />
				</a>

				<a href="https://github.com/BaptGosse" class="contact-card-enhanced" target="_blank" rel="noopener noreferrer">
					<div class="contact-card-icon">
						<Github size={24} />
					</div>
					<div class="contact-card-content">
						<h3>{$_('contact.github')}</h3>
						<p>@BaptGosse</p>
					</div>
					<ArrowRight size={20} class="contact-card-arrow" />
				</a>

				<a href="https://linkedin.com/in/baptgosse" class="contact-card-enhanced" target="_blank" rel="noopener noreferrer">
					<div class="contact-card-icon">
						<Linkedin size={24} />
					</div>
					<div class="contact-card-content">
						<h3>{$_('contact.linkedin')}</h3>
						<p>Baptiste Gosselin</p>
					</div>
					<ArrowRight size={20} class="contact-card-arrow" />
				</a>
			</div>
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

	.contact-section-enhanced {
		padding: var(--spacing-5xl) 0;
		position: relative;
	}

	.contact-content-enhanced {
		position: relative;
		z-index: 1;
		text-align: center;
	}

	.contact-header-enhanced {
		margin-bottom: var(--spacing-4xl);
	}

	.contact-title-enhanced {
		font-size: clamp(2.5rem, 5vw, 4rem);
		font-weight: 800;
		background: linear-gradient(135deg, var(--text-primary), var(--color-accent));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin-bottom: var(--spacing-lg);
	}

	.contact-subtitle-enhanced {
		font-size: clamp(1.125rem, 2vw, 1.375rem);
		color: var(--text-tertiary);
		line-height: 1.7;
		max-width: 700px;
		margin: 0 auto;
	}

	.contact-cards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: var(--spacing-xl);
		max-width: 1000px;
		margin: 0 auto;
	}

	.contact-card-enhanced {
		position: relative;
		display: flex;
		align-items: center;
		gap: var(--spacing-lg);
		padding: var(--spacing-xl);
		background: var(--bg-secondary);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-2xl);
		transition: all var(--transition-normal);
		text-align: left;
		overflow: hidden;
	}

	.contact-card-enhanced:hover {
		border-color: var(--color-accent);
		transform: translateY(-8px);
		box-shadow: 0 24px 64px rgba(193, 159, 255, 0.25);
	}

	.contact-card-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 64px;
		height: 64px;
		background: var(--bg-hover);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-xl);
		color: var(--color-accent);
		flex-shrink: 0;
		position: relative;
		z-index: 1;
		transition: all var(--transition-normal);
	}

	.contact-card-enhanced:hover .contact-card-icon {
		background: linear-gradient(135deg, var(--color-accent), var(--color-secondary-accent));
		color: var(--bg-primary);
		transform: scale(1.1) rotate(5deg);
	}

	.contact-card-content {
		flex: 1;
		position: relative;
		z-index: 1;
	}

	.contact-card-content h3 {
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: var(--spacing-xs);
	}

	.contact-card-content p {
		font-size: 0.9375rem;
		color: var(--text-tertiary);
		margin: 0;
	}

	.contact-card-arrow {
		color: var(--text-tertiary);
		flex-shrink: 0;
		transition: all var(--transition-normal);
		position: relative;
		z-index: 1;
	}

	.contact-card-enhanced:hover .contact-card-arrow {
		color: var(--color-accent);
		transform: translateX(4px);
	}
</style>
