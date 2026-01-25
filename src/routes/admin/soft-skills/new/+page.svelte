<script lang="ts">
	import { ArrowLeft, Sparkles, Info } from 'lucide-svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let activeTab: 'fr' | 'en' = $state('fr');
</script>

<div class="page">
	<header class="page-header">
		<a href="/admin/soft-skills" class="back-button">
			<ArrowLeft size={20} />
			Retour
		</a>
		<div class="header-title">
			<Sparkles size={32} />
			<h1>Nouvelle Soft Skill</h1>
		</div>
	</header>

	<div class="form-container">
		<form method="POST" class="skill-form">
			<div class="tabs">
				<button
					type="button"
					class="tab"
					class:active={activeTab === 'fr'}
					onclick={() => (activeTab = 'fr')}
				>
					🇫🇷 Français
				</button>
				<button
					type="button"
					class="tab"
					class:active={activeTab === 'en'}
					onclick={() => (activeTab = 'en')}
				>
					🇬🇧 English
				</button>
			</div>

			{#if activeTab === 'fr'}
				<div class="form-group">
					<label for="name_fr">Nom (Français) *</label>
					<input
						type="text"
						id="name_fr"
						name="name_fr"
						required
						placeholder="Ex: Communication"
					/>
				</div>

				<div class="form-group">
					<label for="description_fr">Description (Français) *</label>
					<textarea
						id="description_fr"
						name="description_fr"
						required
						rows={4}
						placeholder="Décrivez la compétence et comment elle est développée..."
					></textarea>
				</div>
			{:else}
				<div class="form-group">
					<label for="name_en">Name (English) *</label>
					<input
						type="text"
						id="name_en"
						name="name_en"
						required
						placeholder="Ex: Communication"
					/>
				</div>

				<div class="form-group">
					<label for="description_en">Description (English) *</label>
					<textarea
						id="description_en"
						name="description_en"
						required
						rows={4}
						placeholder="Describe the skill and how it is developed..."
					></textarea>
				</div>
			{/if}

			<div class="form-divider"></div>

			<div class="form-group">
				<label for="icon">Icône Lucide *</label>
				<input
					type="text"
					id="icon"
					name="icon"
					required
					placeholder="Ex: MessageSquare, Lightbulb, Users"
				/>
				<div class="form-hint">
					<Info size={14} />
					<span
						>Nom de l'icône Lucide (voir <a
							href="https://lucide.dev/icons"
							target="_blank">lucide.dev</a
						>)</span
					>
				</div>
			</div>

			<div class="form-group">
				<label for="order">Ordre d'affichage</label>
				<input type="text" id="order" name="order" value="0" placeholder="0, 1, 2..." />
			</div>

			<div class="form-actions">
				<a href="/admin/soft-skills" class="btn-secondary">Annuler</a>
				<button type="submit" class="btn-primary">
					<Sparkles size={20} />
					Créer la soft skill
				</button>
			</div>
		</form>
	</div>
</div>

<style>
	.page {
		max-width: 800px;
		margin: 0 auto;
		padding: var(--spacing-2xl);
	}

	.page-header {
		margin-bottom: var(--spacing-3xl);
	}

	.back-button {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-xs);
		color: var(--text-secondary);
		text-decoration: none;
		margin-bottom: var(--spacing-lg);
		transition: color var(--transition-fast);
	}

	.back-button:hover {
		color: var(--text-primary);
	}

	.header-title {
		display: flex;
		align-items: center;
		gap: var(--spacing-md);
		color: var(--color-accent);
	}

	.header-title h1 {
		font-size: 2rem;
		font-weight: 700;
		margin: 0;
		color: var(--text-primary);
	}

	.form-container {
		background: var(--bg-secondary);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-xl);
		padding: var(--spacing-2xl);
	}

	.tabs {
		display: flex;
		gap: var(--spacing-sm);
		margin-bottom: var(--spacing-2xl);
		border-bottom: 2px solid var(--border-color);
	}

	.tab {
		padding: var(--spacing-sm) var(--spacing-lg);
		background: none;
		border: none;
		border-bottom: 2px solid transparent;
		color: var(--text-secondary);
		font-weight: 500;
		cursor: pointer;
		transition: all var(--transition-fast);
		margin-bottom: -2px;
	}

	.tab:hover {
		color: var(--text-primary);
	}

	.tab.active {
		color: var(--color-accent);
		border-bottom-color: var(--color-accent);
	}

	.form-group {
		margin-bottom: var(--spacing-xl);
	}

	.form-group label {
		display: block;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: var(--spacing-sm);
	}

	.form-group input[type='text'],
	.form-group textarea {
		width: 100%;
		padding: var(--spacing-md);
		background: var(--bg-elevated);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-lg);
		color: var(--text-primary);
		font-family: inherit;
		font-size: 1rem;
		transition: border-color var(--transition-fast);
	}

	.form-group input[type='text']:focus,
	.form-group textarea:focus {
		outline: none;
		border-color: var(--color-accent);
	}

	.form-group textarea {
		resize: vertical;
		min-height: 100px;
	}

	.form-hint {
		display: flex;
		align-items: center;
		gap: var(--spacing-xs);
		margin-top: var(--spacing-xs);
		font-size: 0.875rem;
		color: var(--text-tertiary);
	}

	.form-hint a {
		color: var(--color-accent);
		text-decoration: underline;
	}

	.form-divider {
		height: 1px;
		background: var(--border-color);
		margin: var(--spacing-2xl) 0;
	}

	.form-actions {
		display: flex;
		justify-content: flex-end;
		gap: var(--spacing-md);
		margin-top: var(--spacing-2xl);
		padding-top: var(--spacing-xl);
		border-top: 1px solid var(--border-color);
	}

	.btn-primary,
	.btn-secondary {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-xs);
		padding: var(--spacing-sm) var(--spacing-xl);
		border-radius: var(--radius-lg);
		font-weight: 500;
		text-decoration: none;
		transition: all var(--transition-fast);
		cursor: pointer;
	}

	.btn-primary {
		background: linear-gradient(135deg, var(--color-accent), var(--color-secondary-accent));
		color: white;
		border: none;
	}

	.btn-primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 16px var(--color-accent-glow);
	}

	.btn-secondary {
		background: var(--bg-elevated);
		color: var(--text-primary);
		border: 1px solid var(--border-color);
	}

	.btn-secondary:hover {
		border-color: var(--color-accent);
		color: var(--color-accent);
	}

	@media (max-width: 768px) {
		.page {
			padding: var(--spacing-lg);
		}
	}
</style>
