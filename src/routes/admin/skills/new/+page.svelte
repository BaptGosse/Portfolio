<script lang="ts">
	import { enhance } from '$app/forms';
	import { ArrowLeft } from 'lucide-svelte';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();
	let loading = $state(false);
</script>

<svelte:head>
	<title>Nouvelle compétence - Admin</title>
</svelte:head>

<div class="page">
	<header class="page-header">
		<a href="/admin/skills" class="back-link">
			<ArrowLeft size={16} />
			Retour aux compétences
		</a>
		<h1>Nouvelle compétence</h1>
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
			<h2>Informations (FR)</h2>
			<div class="form-group">
				<label for="name_fr">Nom (FR)</label>
				<input type="text" id="name_fr" name="name_fr" required placeholder="Ex: Kubernetes & k3s" />
			</div>

			<div class="form-group">
				<label for="context_fr">Contexte (FR)</label>
				<input
					type="text"
					id="context_fr"
					name="context_fr"
					required
					placeholder="Ex: Cluster homelab complet, déploiements production"
				/>
			</div>
		</div>

		<div class="form-section">
			<h2>Informations (EN)</h2>
			<div class="form-group">
				<label for="name_en">Name (EN)</label>
				<input type="text" id="name_en" name="name_en" required placeholder="Ex: Kubernetes & k3s" />
			</div>

			<div class="form-group">
				<label for="context_en">Context (EN)</label>
				<input
					type="text"
					id="context_en"
					name="context_en"
					required
					placeholder="Ex: Complete homelab cluster, production deployments"
				/>
			</div>
		</div>

		<div class="form-section">
			<h2>Catégorie</h2>
			<div class="form-group">
				<label for="category_id">Catégorie</label>
				<select id="category_id" name="category_id" required>
					<option value="">Sélectionner une catégorie</option>
					{#each data.categories as category}
						<option value={category.CAT_ID}>{category.CAT_NAME.fr}</option>
					{/each}
				</select>
			</div>

			<div class="form-group">
				<label for="order">Ordre d'affichage</label>
				<input type="text" id="order" name="order" value="0" placeholder="0" />
			</div>
		</div>

		<div class="form-actions">
			<a href="/admin/skills" class="btn-secondary">Annuler</a>
			<button type="submit" class="btn-primary" disabled={loading}>
				{loading ? 'Création...' : 'Créer la compétence'}
			</button>
		</div>
	</form>
</div>

<style>
	.page {
		max-width: 900px;
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

	.form-group {
		margin-bottom: var(--spacing-md);
	}

	.form-group:last-child {
		margin-bottom: 0;
	}

	.form-group label {
		display: block;
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--text-secondary);
		margin-bottom: var(--spacing-xs);
	}

	.form-group input,
	.form-group select {
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
	.form-group select:focus {
		outline: none;
		border-color: var(--color-primary-400);
		box-shadow: 0 0 0 3px rgba(192, 158, 253, 0.1);
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
