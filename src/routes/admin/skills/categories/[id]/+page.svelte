<script lang="ts">
	import { enhance } from '$app/forms';
	import { ArrowLeft, Trash2 } from 'lucide-svelte';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();
	let loading = $state(false);
	let showDeleteConfirm = $state(false);
</script>

<svelte:head>
	<title>Modifier catégorie - Admin</title>
</svelte:head>

<div class="page">
	<header class="page-header">
		<a href="/admin/skills" class="back-link">
			<ArrowLeft size={16} />
			Retour aux compétences
		</a>
		<div class="header-row">
			<h1>Modifier la catégorie</h1>
			<button type="button" class="btn-delete" onclick={() => (showDeleteConfirm = true)}>
				<Trash2 size={18} />
				Supprimer
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
			<div class="form-group">
				<label for="name_fr">Nom (FR)</label>
				<input type="text" id="name_fr" name="name_fr" required value={data.category.CAT_NAME.fr} />
			</div>

			<div class="form-group">
				<label for="name_en">Name (EN)</label>
				<input type="text" id="name_en" name="name_en" required value={data.category.CAT_NAME.en} />
			</div>

			<div class="form-group">
				<label for="order">Ordre d'affichage</label>
				<input type="text" id="order" name="order" value={data.category.CAT_ORDER} />
			</div>
		</div>

		<div class="form-actions">
			<a href="/admin/skills" class="btn-secondary">Annuler</a>
			<button type="submit" class="btn-primary" disabled={loading}>
				{loading ? 'Enregistrement...' : 'Enregistrer'}
			</button>
		</div>
	</form>
</div>

{#if showDeleteConfirm}
	<div class="modal-overlay" onclick={() => (showDeleteConfirm = false)}>
		<div class="modal" onclick={(e) => e.stopPropagation()}>
			<h2>Supprimer la catégorie ?</h2>
			<p>Cette action est irréversible. Assurez-vous qu'aucune compétence n'est associée à cette catégorie.</p>
			<div class="modal-actions">
				<button type="button" class="btn-secondary" onclick={() => (showDeleteConfirm = false)}>
					Annuler
				</button>
				<form action="?/delete" method="POST">
					<button type="submit" class="btn-danger">
						<Trash2 size={16} />
						Supprimer
					</button>
				</form>
			</div>
		</div>
	</div>
{/if}

<style>
	.page {
		max-width: 600px;
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

	.header-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.page-header h1 {
		font-size: 1.5rem;
		color: var(--text-primary);
	}

	.btn-delete {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-xs);
		padding: var(--spacing-sm) var(--spacing-md);
		background-color: transparent;
		border: 1px solid rgba(239, 68, 68, 0.5);
		border-radius: var(--radius-md);
		color: #ef4444;
		font-size: 0.875rem;
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.btn-delete:hover {
		background-color: rgba(239, 68, 68, 0.1);
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

	.form-group input {
		width: 100%;
		padding: var(--spacing-sm) var(--spacing-md);
		background-color: var(--bg-elevated);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-md);
		color: var(--text-primary);
		font-size: 0.875rem;
		transition: all var(--transition-fast);
	}

	.form-group input:focus {
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

	.modal-overlay {
		position: fixed;
		inset: 0;
		background-color: rgba(0, 0, 0, 0.7);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
		padding: var(--spacing-md);
	}

	.modal {
		background-color: var(--bg-secondary);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-xl);
		padding: var(--spacing-xl);
		max-width: 400px;
		width: 100%;
	}

	.modal h2 {
		font-size: 1.25rem;
		color: var(--text-primary);
		margin-bottom: var(--spacing-sm);
	}

	.modal p {
		color: var(--text-secondary);
		font-size: 0.875rem;
		margin-bottom: var(--spacing-lg);
	}

	.modal-actions {
		display: flex;
		gap: var(--spacing-sm);
		justify-content: flex-end;
	}

	.btn-danger {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-xs);
		padding: var(--spacing-sm) var(--spacing-md);
		background-color: #ef4444;
		border: none;
		border-radius: var(--radius-md);
		color: white;
		font-size: 0.875rem;
		font-weight: 500;
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.btn-danger:hover {
		background-color: #dc2626;
	}
</style>
