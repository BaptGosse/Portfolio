<script lang="ts">
	import { enhance } from '$app/forms';
	import { ArrowLeft, Trash2, Star } from 'lucide-svelte';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let loading = $state(false);
	let activeTab = $state<'fr' | 'en'>('fr');
	let showDeleteConfirm = $state(false);
</script>

<svelte:head>
	<title>Modifier {data.project.PRJ_TITLE.fr} - Admin</title>
</svelte:head>

<div class="page">
	<header class="page-header">
		<div>
			<a href="/admin/projects" class="back-link">
				<ArrowLeft size={16} />
				Retour aux projets
			</a>
			<h1>Modifier le projet</h1>
		</div>
		<div class="header-actions">
			<form method="POST" action="?/toggleFeatured" use:enhance>
				<button type="submit" class="btn-icon" title="Toggle Featured">
					<Star size={18} fill={data.project.PRJ_FEATURED ? 'currentColor' : 'none'} />
				</button>
			</form>
			<button type="button" class="btn-danger-icon" onclick={() => (showDeleteConfirm = true)}>
				<Trash2 size={18} />
			</button>
		</div>
	</header>

	{#if form?.error}
		<div class="error-message">
			{form.error}
		</div>
	{/if}

	<form
		method="POST"
		action="?/update"
		use:enhance={() => {
			loading = true;
			return async ({ update }) => {
				await update();
				loading = false;
			};
		}}
	>
		<div class="form-section">
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

			<div class="form-group" class:hidden={activeTab !== 'fr'}>
				<label for="title_fr">Titre (FR)</label>
				<input
					type="text"
					id="title_fr"
					name="title_fr"
					value={data.project.PRJ_TITLE.fr}
					required
				/>
			</div>

			<div class="form-group" class:hidden={activeTab !== 'fr'}>
				<label for="description_fr">Description (FR)</label>
				<textarea id="description_fr" name="description_fr" rows="6" required
					>{data.project.PRJ_DESCRIPTION.fr}</textarea
				>
			</div>

			<div class="form-group" class:hidden={activeTab !== 'en'}>
				<label for="title_en">Title (EN)</label>
				<input
					type="text"
					id="title_en"
					name="title_en"
					value={data.project.PRJ_TITLE.en}
					required
				/>
			</div>

			<div class="form-group" class:hidden={activeTab !== 'en'}>
				<label for="description_en">Description (EN)</label>
				<textarea id="description_en" name="description_en" rows="6" required
					>{data.project.PRJ_DESCRIPTION.en}</textarea
				>
			</div>
		</div>

		<div class="form-section">
			<h2>Liens</h2>

			<div class="form-group">
				<label for="github">GitHub URL</label>
				<input type="url" id="github" name="github" value={data.project.PRJ_GITHUB || ''} />
			</div>

			<div class="form-group">
				<label for="link">Demo URL</label>
				<input type="url" id="link" name="link" value={data.project.PRJ_LINK || ''} />
			</div>

			<div class="form-group">
				<label for="image">Image URL</label>
				<input type="text" id="image" name="image" value={data.project.PRJ_IMAGE || ''} />
			</div>
		</div>

		<div class="form-section">
			<h2>Options</h2>

			<div class="form-group">
				<label class="checkbox-label">
					<input type="checkbox" name="featured" checked={data.project.PRJ_FEATURED} />
					<span>Projet phare (affiché sur la page d'accueil)</span>
				</label>
			</div>
		</div>

		<div class="form-section">
			<h2>Technologies</h2>

			<div class="technologies-grid">
				{#each data.technologies as tech}
					<label class="tech-checkbox">
						<input
							type="checkbox"
							name="technologies"
							value={tech.TEC_ID}
							checked={data.selectedTechs.includes(tech.TEC_ID)}
						/>
						<span>{tech.TEC_NAME.fr}</span>
					</label>
				{/each}
			</div>
		</div>

		<div class="form-actions">
			<a href="/admin/projects" class="btn-secondary">Annuler</a>
			<button type="submit" class="btn-primary" disabled={loading}>
				{loading ? 'Enregistrement...' : 'Enregistrer'}
			</button>
		</div>
	</form>
</div>

{#if showDeleteConfirm}
	<div class="modal-overlay" onclick={() => (showDeleteConfirm = false)}>
		<div class="modal" onclick={(e) => e.stopPropagation()}>
			<h3>Supprimer ce projet ?</h3>
			<p>Cette action est irréversible.</p>
			<div class="modal-actions">
				<button type="button" class="btn-secondary" onclick={() => (showDeleteConfirm = false)}>
					Annuler
				</button>
				<form method="POST" action="?/delete" use:enhance>
					<button type="submit" class="btn-danger">Supprimer</button>
				</form>
			</div>
		</div>
	</div>
{/if}

<style>
	.page {
		max-width: 800px;
		margin: 0 auto;
	}

	.page-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: var(--spacing-xl);
	}

	.back-link {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-xs);
		color: var(--text-tertiary);
		font-size: 0.875rem;
		text-decoration: none;
		margin-bottom: var(--spacing-sm);
		transition: color var(--transition-fast);
	}

	.back-link:hover {
		color: var(--text-primary);
	}

	.page-header h1 {
		font-size: 1.5rem;
		color: var(--text-primary);
	}

	.header-actions {
		display: flex;
		gap: var(--spacing-sm);
	}

	.btn-icon,
	.btn-danger-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		border-radius: var(--radius-md);
		border: 1px solid var(--border-color);
		background-color: var(--bg-secondary);
		color: var(--text-tertiary);
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.btn-icon:hover {
		background-color: var(--bg-elevated);
		color: var(--color-primary-400);
		border-color: var(--color-primary-400);
	}

	.btn-danger-icon:hover {
		background-color: rgba(239, 68, 68, 0.1);
		color: #ef4444;
		border-color: #ef4444;
	}

	.error-message {
		padding: var(--spacing-md);
		background-color: rgba(239, 68, 68, 0.1);
		border: 1px solid rgba(239, 68, 68, 0.3);
		border-radius: var(--radius-md);
		color: #ef4444;
		margin-bottom: var(--spacing-lg);
	}

	form {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xl);
	}

	.form-section {
		background-color: var(--bg-secondary);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-lg);
		padding: var(--spacing-lg);
	}

	.form-section h2 {
		font-size: 1rem;
		color: var(--text-primary);
		margin-bottom: var(--spacing-md);
	}

	.tabs {
		display: flex;
		gap: var(--spacing-xs);
		margin-bottom: var(--spacing-lg);
		border-bottom: 1px solid var(--border-color);
	}

	.tab {
		padding: var(--spacing-sm) var(--spacing-md);
		background: none;
		border: none;
		border-bottom: 2px solid transparent;
		color: var(--text-tertiary);
		font-size: 0.875rem;
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.tab:hover {
		color: var(--text-secondary);
	}

	.tab.active {
		color: var(--color-primary-400);
		border-bottom-color: var(--color-primary-400);
	}

	.form-group {
		margin-bottom: var(--spacing-md);
	}

	.form-group:last-child {
		margin-bottom: 0;
	}

	.form-group.hidden {
		display: none;
	}

	.form-group label {
		display: block;
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--text-secondary);
		margin-bottom: var(--spacing-xs);
	}

	.form-group input[type='text'],
	.form-group input[type='url'],
	.form-group textarea {
		width: 100%;
		padding: var(--spacing-sm) var(--spacing-md);
		background-color: var(--bg-elevated);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-md);
		color: var(--text-primary);
		font-size: 0.875rem;
		transition: all var(--transition-fast);
	}

	.form-group input:focus,
	.form-group textarea:focus {
		outline: none;
		border-color: var(--color-primary-400);
		box-shadow: 0 0 0 3px rgba(192, 158, 253, 0.1);
	}

	.form-group textarea {
		resize: vertical;
		font-family: inherit;
	}

	.checkbox-label {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		cursor: pointer;
	}

	.checkbox-label input[type='checkbox'] {
		width: 18px;
		height: 18px;
		cursor: pointer;
	}

	.technologies-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: var(--spacing-sm);
	}

	.tech-checkbox {
		display: flex;
		align-items: center;
		gap: var(--spacing-xs);
		padding: var(--spacing-sm);
		background-color: var(--bg-elevated);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-md);
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.tech-checkbox:hover {
		background-color: var(--bg-primary);
	}

	.tech-checkbox input[type='checkbox'] {
		cursor: pointer;
	}

	.form-actions {
		display: flex;
		gap: var(--spacing-md);
		justify-content: flex-end;
		padding-top: var(--spacing-lg);
		border-top: 1px solid var(--border-color);
	}

	.btn-primary,
	.btn-secondary {
		padding: var(--spacing-sm) var(--spacing-lg);
		border-radius: var(--radius-md);
		font-size: 0.875rem;
		font-weight: 600;
		text-decoration: none;
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.btn-primary {
		background: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-700));
		color: white;
		border: none;
	}

	.btn-primary:hover:not(:disabled) {
		transform: translateY(-1px);
		box-shadow: 0 4px 12px rgba(192, 158, 253, 0.4);
	}

	.btn-primary:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.btn-secondary {
		background-color: var(--bg-elevated);
		border: 1px solid var(--border-color);
		color: var(--text-secondary);
		display: inline-block;
	}

	.btn-secondary:hover {
		background-color: var(--bg-primary);
		color: var(--text-primary);
	}

	.modal-overlay {
		position: fixed;
		inset: 0;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
	}

	.modal {
		background-color: var(--bg-secondary);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-lg);
		padding: var(--spacing-xl);
		max-width: 400px;
		width: 90%;
	}

	.modal h3 {
		color: var(--text-primary);
		margin-bottom: var(--spacing-sm);
	}

	.modal p {
		color: var(--text-tertiary);
		margin-bottom: var(--spacing-lg);
	}

	.modal-actions {
		display: flex;
		gap: var(--spacing-md);
		justify-content: flex-end;
	}

	.btn-danger {
		padding: var(--spacing-sm) var(--spacing-lg);
		background-color: #ef4444;
		color: white;
		border: none;
		border-radius: var(--radius-md);
		font-size: 0.875rem;
		font-weight: 600;
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.btn-danger:hover {
		background-color: #dc2626;
	}
</style>
