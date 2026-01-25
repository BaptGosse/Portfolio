<script lang="ts">
	import { enhance } from '$app/forms';
	import { ArrowLeft } from 'lucide-svelte';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let loading = $state(false);
	let activeTab = $state<'fr' | 'en'>('fr');
</script>

<svelte:head>
	<title>Nouveau projet - Admin</title>
</svelte:head>

<div class="page">
	<header class="page-header">
		<div>
			<a href="/admin/projects" class="back-link">
				<ArrowLeft size={16} />
				Retour aux projets
			</a>
			<h1>Nouveau projet</h1>
		</div>
	</header>

	{#if form?.error}
		<div class="error-message">
			{form.error}
		</div>
	{/if}

	<form
		method="POST"
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
					value={form?.titleFr ?? ''}
					required
					placeholder="Ex: Cluster Kubernetes Homelab"
				/>
			</div>

			<div class="form-group" class:hidden={activeTab !== 'fr'}>
				<label for="description_fr">Description (FR)</label>
				<textarea
					id="description_fr"
					name="description_fr"
					rows="6"
					required
					placeholder="Description détaillée du projet..."
				>{form?.descFr ?? ''}</textarea>
			</div>

			<div class="form-group" class:hidden={activeTab !== 'en'}>
				<label for="title_en">Title (EN)</label>
				<input
					type="text"
					id="title_en"
					name="title_en"
					value={form?.titleEn ?? ''}
					required
					placeholder="Ex: Kubernetes Homelab Cluster"
				/>
			</div>

			<div class="form-group" class:hidden={activeTab !== 'en'}>
				<label for="description_en">Description (EN)</label>
				<textarea
					id="description_en"
					name="description_en"
					rows="6"
					required
					placeholder="Detailed project description..."
				>{form?.descEn ?? ''}</textarea>
			</div>
		</div>

		<div class="form-section">
			<h2>Liens</h2>

			<div class="form-group">
				<label for="github">GitHub URL</label>
				<input type="url" id="github" name="github" placeholder="https://github.com/..." />
			</div>

			<div class="form-group">
				<label for="link">Demo URL</label>
				<input type="url" id="link" name="link" placeholder="https://..." />
			</div>

			<div class="form-group">
				<label for="image">Image URL</label>
				<input type="text" id="image" name="image" placeholder="/images/projects/..." />
			</div>
		</div>

		<div class="form-section">
			<h2>Options</h2>

			<div class="form-group">
				<label class="checkbox-label">
					<input type="checkbox" name="featured" />
					<span>Projet phare (affiché sur la page d'accueil)</span>
				</label>
			</div>
		</div>

		<div class="form-section">
			<h2>Technologies</h2>
			<p class="help-text">Sélectionnez les technologies utilisées dans ce projet</p>

			<div class="technologies-grid">
				{#each data.technologies as tech}
					<label class="tech-checkbox">
						<input type="checkbox" name="technologies" value={tech.TEC_ID} />
						<span>{tech.TEC_NAME.fr}</span>
					</label>
				{/each}
			</div>
		</div>

		<div class="form-actions">
			<a href="/admin/projects" class="btn-secondary">Annuler</a>
			<button type="submit" class="btn-primary" disabled={loading}>
				{loading ? 'Création...' : 'Créer le projet'}
			</button>
		</div>
	</form>
</div>

<style>
	.page {
		max-width: 800px;
		margin: 0 auto;
	}

	.page-header {
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

	.help-text {
		color: var(--text-tertiary);
		font-size: 0.875rem;
		margin-bottom: var(--spacing-md);
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
</style>
