<script lang="ts">
	import { Github, Linkedin, Mail, ArrowUp } from 'lucide-svelte';
	import { _ } from 'svelte-i18n';

	const currentYear = new Date().getFullYear();

	const socialLinks = [
		{ name: 'GitHub', href: 'https://github.com/BaptGosse', icon: Github },
		{ name: 'LinkedIn', href: 'https://linkedin.com/in/baptgosse', icon: Linkedin },
		{ name: 'Email', href: 'mailto:contact@baptiste-gosselin.fr', icon: Mail }
	];

	const navLinks = $derived([
		{ label: $_('nav.home'), href: '/' },
		{ label: $_('nav.projects'), href: '/projects' },
		{ label: $_('nav.blog'), href: '/blog' },
		{ label: $_('footer.credits'), href: '/credits' }
	]);

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<footer class="footer">
	<div class="container">
		<div class="footer-content">
			<!-- Brand Section -->
			<div class="footer-brand">
				<div class="brand-logo">
					<img src="/images/favicon.jpg" alt="Baptiste Gosselin" class="logo-image" />
					<span class="logo-text">Baptiste Gosselin</span>
				</div>
				<p class="brand-description">
					{$_('footer.description')}
				</p>
				<div class="social-links">
					{#each socialLinks as link}
						<a
							href={link.href}
							target="_blank"
							rel="noopener noreferrer"
							class="social-link"
							aria-label={link.name}
						>
							<svelte:component this={link.icon} size={20} />
						</a>
					{/each}
				</div>
			</div>

			<!-- Navigation Links -->
			<div class="footer-nav">
				<h4 class="footer-nav-title">{$_('footer.navigation')}</h4>
				<ul class="footer-nav-list">
					{#each navLinks as link}
						<li>
							<a href={link.href}>{link.label}</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Contact Section -->
			<div class="footer-contact">
				<h4 class="footer-contact-title">{$_('footer.contactTitle')}</h4>
				<div class="contact-info">
					<a href="mailto:contact@baptiste-gosselin.fr" class="contact-item">
						<Mail size={16} />
						contact@baptiste-gosselin.fr
					</a>
				</div>
				<button onclick={scrollToTop} class="back-to-top" aria-label={$_('footer.backToTop')}>
					<ArrowUp size={20} />
				</button>
			</div>
			<div class="footer-credits">
				<p class="copyright">
					{$_('footer.copyright', { values: { year: currentYear } })}
				</p>
			</div>
		</div>

		<!-- Footer Bottom -->
		<div class="footer-bottom">
			<div class="signature-container">
				<img src="/images/signature.png" alt="Signature Baptiste Gosselin" class="signature" />
			</div>
		</div>
	</div>
</footer>

<style>
	.footer {
		background: var(--bg-secondary);
		border-top: 1px solid var(--border-color);
		padding: var(--spacing-4xl) 0 var(--spacing-2xl);
		margin-top: 0;
		position: relative;
	}

	.footer::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 1px;
		background: linear-gradient(90deg, transparent, var(--color-accent), transparent);
		opacity: 0.5;
	}

	.footer-content {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--spacing-3xl);
		margin-bottom: var(--spacing-3xl);
	}

	/* Brand Section */
	.footer-brand {
		max-width: 400px;
	}

	.brand-logo {
		margin-bottom: var(--spacing-lg);
		display: flex;
		align-items: center;
		gap: var(--spacing-md);
	}

	.logo-image {
		width: 60px;
		height: 60px;
		border-radius: 50%;
		object-fit: cover;
		border: 3px solid var(--color-accent);
		transition: all var(--transition-normal);
	}

	.logo-image:hover {
		transform: scale(1.1) rotate(5deg);
		box-shadow: 0 0 24px var(--color-accent-glow);
	}

	.logo-text {
		font-family: var(--font-display);
		font-size: 2rem;
		font-weight: 800;
		background: linear-gradient(135deg, var(--color-accent), var(--color-secondary-accent));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		letter-spacing: -0.02em;
	}

	.brand-description {
		color: var(--text-tertiary);
		line-height: 1.6;
		margin-bottom: var(--spacing-lg);
		font-size: 0.9375rem;
	}

	.social-links {
		display: flex;
		gap: var(--spacing-sm);
	}

	.social-link {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		background: var(--bg-tertiary);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-lg);
		color: var(--text-tertiary);
		transition: all var(--transition-normal);
	}

	.social-link:hover {
		background: var(--bg-hover);
		border-color: var(--color-accent);
		color: var(--color-accent);
		transform: translateY(-2px);
	}

	/* Navigation Section */
	.footer-nav-title,
	.footer-contact-title {
		font-family: var(--font-display);
		font-size: 1rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: var(--spacing-lg);
	}

	.footer-nav-list {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
	}

	.footer-nav-list a {
		color: var(--text-tertiary);
		font-size: 0.9375rem;
		transition: all var(--transition-fast);
		display: inline-block;
	}

	.footer-nav-list a:hover {
		color: var(--color-accent);
		transform: translateX(4px);
	}

	/* Contact Section */
	.contact-info {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
		margin-bottom: var(--spacing-lg);
	}

	.contact-item {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-sm);
		color: var(--text-tertiary);
		font-size: 0.9375rem;
		transition: color var(--transition-fast);
	}

	.contact-item:hover {
		color: var(--color-accent);
	}

	.back-to-top {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
		background: var(--bg-tertiary);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-lg);
		color: var(--text-secondary);
		cursor: pointer;
		transition: all var(--transition-normal);
	}

	.back-to-top:hover {
		background: var(--bg-hover);
		border-color: var(--color-accent);
		color: var(--color-accent);
		transform: translateY(-4px);
	}

	/* Footer Bottom */
	.footer-bottom {
		padding-top: var(--spacing-2xl);
		border-top: 1px solid var(--border-color);
	}

	.signature-container {
		display: flex;
		justify-content: center;
		margin-bottom: var(--spacing-xl);
	}

	.signature {
		width: 200px;
		height: auto;
		/* Blanc en mode dark (pas de filtre de couleur) */
		filter: none;
		opacity: 0.9;
		transition: all var(--transition-normal);
	}

	.signature:hover {
		opacity: 1;
		filter: drop-shadow(0 4px 12px rgba(255, 255, 255, 0.3));
		transform: scale(1.05);
	}

	/* Signature violet #946cf7 en mode light */
	:global([data-theme="light"]) .signature {
		filter: brightness(0) saturate(100%) invert(46%) sepia(96%) saturate(4289%) hue-rotate(246deg) brightness(100%) contrast(95%);
	}

	:global([data-theme="light"]) .signature:hover {
		filter: brightness(0) saturate(100%) invert(46%) sepia(96%) saturate(4289%) hue-rotate(246deg) brightness(100%) contrast(95%) drop-shadow(0 4px 12px var(--color-accent-glow));
	}

	.footer-credits {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-sm);
		text-align: center;
	}

	.copyright {
		font-size: 0.875rem;
		color: var(--text-muted);
		margin: 0;
	}

	/* Responsive */
	@media (min-width: 640px) {
		.footer-credits {
			flex-direction: row;
			justify-content: space-between;
		}
	}

	@media (min-width: 768px) {
		.footer-content {
			grid-template-columns: 2fr 1fr 1fr;
		}
	}

	@media (max-width: 767px) {
		.footer {
			padding: var(--spacing-3xl) 0 var(--spacing-xl);
			margin-top: var(--spacing-4xl);
		}
	}
</style>
