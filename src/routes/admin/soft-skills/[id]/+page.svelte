<script lang="ts">
	import { ArrowLeft, Sparkles, Info, Trash2 } from 'lucide-svelte';
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let activeTab: 'fr' | 'en' = $state('fr');
	let showDeleteConfirm = $state(false);
</script>

<div class="page">
	<header class="page-header">
		<a href="/admin/soft-skills" class="back-button">
			<ArrowLeft size={20} />
			Retour
		</a>
		<div class="header-title">
			<Sparkles size={32} />
			<h1>Éditer la soft skill</h1>
		</div>
	</header>

	<div class="form-container">
		<form method="POST" action="?/update" use:enhance class="skill-form">
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
						value={data.softSkill.SSK_NAME.fr}
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
					>{data.softSkill.SSK_DESCRIPTION.fr}</textarea>
				</div>
			{:else}
				<div class="form-group">
					<label for="name_en">Name (English) *</label>
					<input
						type="text"
						id="name_en"
						name="name_en"
						required
						value={data.softSkill.SSK_NAME.en}
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
					>{data.softSkill.SSK_DESCRIPTION.en}</textarea>
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
					value={data.softSkill.SSK_ICON}
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
				<input
					type="text"
					id="order"
					name="order"
					value={data.softSkill.SSK_ORDER}
					placeholder="0, 1, 2..."
				/>
			</div>

			<div class="form-actions">
				<button
					type="button"
					class="btn-danger"
					onclick={() => (showDeleteConfirm = true)}
				>
					<Trash2 size={20} />
					Supprimer
				</button>
				<div class="actions-right">
					<a href="/admin/soft-skills" class="btn-secondary">Annuler</a>
					<button type="submit" class="btn-primary">
						<Sparkles size={20} />
						Enregistrer
					</button>
				</div>
			</div>
		</form>
	</div>
</div>

{#if showDeleteConfirm}
	<div class="modal-overlay" onclick={() => (showDeleteConfirm = false)}>
		<div class="modal" onclick={(e) => e.stopPropagation()}>
			<h2>Confirmer la suppression</h2>
			<p>
				Êtes-vous sûr de vouloir supprimer cette soft skill ? Cette action est irréversible
				et supprimera également tous les liens avec les passions.
			</p>
			<div class="modal-actions">
				<button class="btn-secondary" onclick={() => (showDeleteConfirm = false)}>
					Annuler
				</button>
				<form method="POST" action="?/delete" use:enhance>
					<button type="submit" class="btn-danger">
						<Trash2 size={20} />
						Supprimer définitivement
					</button>
				</form>
			</div>
		</div>
	</div>
{/if}

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
		justify-content: space-between;
		align-items: center;
		margin-top: var(--spacing-2xl);
		padding-top: var(--spacing-xl);
		border-top: 1px solid var(--border-color);
	}

	.actions-right {
		display: flex;
		gap: var(--spacing-md);
	}

	.btn-primary,
	.btn-secondary,
	.btn-danger {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-xs);
		padding: var(--spacing-sm) var(--spacing-xl);
		border-radius: var(--radius-lg);
		font-weight: 500;
		text-decoration: none;
		transition: all var(--transition-fast);
		cursor: pointer;
		border: none;
	}

	.btn-primary {
		background: linear-gradient(135deg, var(--color-accent), var(--color-secondary-accent));
		color: white;
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

	.btn-danger {
		background: rgba(239, 68, 68, 0.1);
		color: #ef4444;
		border: 1px solid rgba(239, 68, 68, 0.3);
	}

	.btn-danger:hover {
		background: #ef4444;
		color: white;
		border-color: #ef4444;
	}

	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.7);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
	}

	.modal {
		background: var(--bg-secondary);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-xl);
		padding: var(--spacing-2xl);
		max-width: 500px;
		width: 90%;
	}

	.modal h2 {
		margin: 0 0 var(--spacing-md);
		color: var(--text-primary);
	}

	.modal p {
		color: var(--text-secondary);
		margin-bottom: var(--spacing-xl);
	}

	.modal-actions {
		display: flex;
		justify-content: flex-end;
		gap: var(--spacing-md);
	}

	@media (max-width: 768px) {
		.page {
			padding: var(--spacing-lg);
		}

		.form-actions {
			flex-direction: column;
			gap: var(--spacing-md);
		}

		.actions-right {
			width: 100%;
			justify-content: stretch;
		}
	}
</style>
