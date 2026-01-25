<script lang="ts">
	import { enhance } from '$app/forms';
	import { ArrowLeft, Save, AlertCircle, Trash2 } from 'lucide-svelte';

	let { data, form } = $props();
	let loading = $state(false);
	let showDeleteConfirm = $state(false);
</script>

<svelte:head>
	<title>Modifier - {data.post.POS_TITLE.fr} - Admin</title>
</svelte:head>

<div class="editor-page">
	<header class="editor-header">
		<a href="/admin/posts" class="back-link">
			<ArrowLeft size={18} />
			Retour aux articles
		</a>
		<div class="header-row">
			<h1>Modifier l'article</h1>
			<button
				type="button"
				class="btn-delete"
				onclick={() => showDeleteConfirm = true}
			>
				<Trash2 size={18} />
				Supprimer
			</button>
		</div>
	</header>

	{#if form?.error}
		<div class="error-message">
			<AlertCircle size={18} />
			<span>{form.error}</span>
		</div>
	{/if}

	<form
		method="POST"
		action="?/update"
		class="editor-form"
		use:enhance={() => {
			loading = true;
			return async ({ update }) => {
				await update();
				loading = false;
			};
		}}
	>
		<div class="form-main">
			<div class="form-group">
				<label for="title_fr">Titre (FR)</label>
				<input
					type="text"
					id="title_fr"
					name="title_fr"
					placeholder="Titre de l'article"
					required
					value={data.post.POS_TITLE.fr}
				/>
			</div>

			<div class="form-group">
				<label for="title_en">Title (EN)</label>
				<input
					type="text"
					id="title_en"
					name="title_en"
					placeholder="Article title"
					required
					value={data.post.POS_TITLE.en}
				/>
			</div>

			<div class="form-group">
				<label for="description_fr">Description (FR)</label>
				<textarea
					id="description_fr"
					name="description_fr"
					placeholder="Description courte pour les aperçus"
					rows="2"
					required
				>{data.post.POS_DESCRIPTION.fr}</textarea>
			</div>

			<div class="form-group">
				<label for="description_en">Description (EN)</label>
				<textarea
					id="description_en"
					name="description_en"
					placeholder="Short description for previews"
					rows="2"
					required
				>{data.post.POS_DESCRIPTION.en}</textarea>
			</div>

			<div class="form-group">
				<label for="content_fr">Contenu (FR) (Markdown)</label>
				<textarea
					id="content_fr"
					name="content_fr"
					placeholder="Écrivez votre article en Markdown..."
					rows="15"
					required
				>{data.post.POS_CONTENT.fr}</textarea>
			</div>

			<div class="form-group">
				<label for="content_en">Content (EN) (Markdown)</label>
				<textarea
					id="content_en"
					name="content_en"
					placeholder="Write your article in Markdown..."
					rows="15"
					required
				>{data.post.POS_CONTENT.en}</textarea>
			</div>
		</div>

		<aside class="form-sidebar">
			<div class="sidebar-section">
				<h3>Publication</h3>
				<label class="checkbox-label">
					<input type="checkbox" name="published" checked={data.post.POS_PUBLISHED} />
					<span>Article publié</span>
				</label>
				{#if data.post.POS_PUBLISHED_AT}
					<p class="meta-info">
						Publié le {new Date(data.post.POS_PUBLISHED_AT).toLocaleDateString('fr-FR')}
					</p>
				{/if}
			</div>

			{#if data.tags.length > 0}
				<div class="sidebar-section">
					<h3>Tags</h3>
					<div class="tags-list">
						{#each data.tags as tag}
							<label class="checkbox-label">
								<input
									type="checkbox"
									name="tags"
									value={tag.TAG_ID}
									checked={data.selectedTags.includes(tag.TAG_ID)}
								/>
								<span>{tag.TAG_NAME}</span>
							</label>
						{/each}
					</div>
				</div>
			{/if}

			<div class="sidebar-section meta-section">
				<h3>Informations</h3>
				<p class="meta-info">Créé le {new Date(data.post.POS_CREATED_AT).toLocaleDateString('fr-FR')}</p>
				{#if data.post.POS_UPDATED_AT}
					<p class="meta-info">Modifié le {new Date(data.post.POS_UPDATED_AT).toLocaleDateString('fr-FR')}</p>
				{/if}
			</div>

			<button type="submit" class="btn-primary" disabled={loading}>
				<Save size={18} />
				{#if loading}
					Enregistrement...
				{:else}
					Enregistrer
				{/if}
			</button>
		</aside>
	</form>
</div>

{#if showDeleteConfirm}
	<div class="modal-overlay" onclick={() => showDeleteConfirm = false}>
		<div class="modal" onclick={(e) => e.stopPropagation()}>
			<h2>Supprimer l'article ?</h2>
			<p>Cette action est irréversible. L'article "{data.post.POS_TITLE.fr}" sera définitivement supprimé.</p>
			<div class="modal-actions">
				<button type="button" class="btn-secondary" onclick={() => showDeleteConfirm = false}>
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
	.editor-page {
		max-width: 1400px;
		margin: 0 auto;
	}

	.editor-header {
		margin-bottom: var(--spacing-xl);
	}

	.back-link {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-xs);
		color: var(--text-tertiary);
		text-decoration: none;
		font-size: 0.875rem;
		margin-bottom: var(--spacing-sm);
		transition: color var(--transition-fast);
	}

	.back-link:hover {
		color: var(--color-primary-400);
	}

	.header-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.editor-header h1 {
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
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		padding: var(--spacing-sm) var(--spacing-md);
		background-color: rgba(239, 68, 68, 0.1);
		border: 1px solid rgba(239, 68, 68, 0.3);
		border-radius: var(--radius-md);
		color: #ef4444;
		font-size: 0.875rem;
		margin-bottom: var(--spacing-lg);
	}

	.editor-form {
		display: grid;
		grid-template-columns: 1fr 280px;
		gap: var(--spacing-xl);
	}

	@media (max-width: 900px) {
		.editor-form {
			grid-template-columns: 1fr;
		}
	}

	.form-main {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-lg);
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
	}

	.form-group label {
		color: var(--text-secondary);
		font-size: 0.875rem;
		font-weight: 500;
	}

	.label-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.preview-toggle {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-xs);
		padding: var(--spacing-xs) var(--spacing-sm);
		background: transparent;
		border: 1px solid var(--border-color);
		border-radius: var(--radius-sm);
		color: var(--text-tertiary);
		font-size: 0.75rem;
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.preview-toggle:hover {
		border-color: var(--color-primary-400);
		color: var(--color-primary-400);
	}

	.form-group input,
	.form-group textarea {
		padding: var(--spacing-sm) var(--spacing-md);
		background-color: var(--bg-secondary);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-md);
		color: var(--text-primary);
		font-size: 0.875rem;
		transition: border-color var(--transition-fast);
	}

	.form-group input:focus,
	.form-group textarea:focus {
		outline: none;
		border-color: var(--color-primary-400);
	}

	.form-group textarea {
		resize: vertical;
		min-height: 200px;
		font-family: 'Consolas', 'Monaco', monospace;
	}

	.preview-content {
		min-height: 200px;
		padding: var(--spacing-md);
		background-color: var(--bg-secondary);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-md);
	}

	.form-sidebar {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-lg);
	}

	.sidebar-section {
		background-color: var(--bg-secondary);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-lg);
		padding: var(--spacing-md);
	}

	.sidebar-section h3 {
		font-size: 0.875rem;
		color: var(--text-primary);
		margin-bottom: var(--spacing-sm);
	}

	.checkbox-label {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		cursor: pointer;
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.checkbox-label input[type="checkbox"] {
		width: 16px;
		height: 16px;
		accent-color: var(--color-primary-400);
	}

	.tags-list {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
	}

	.meta-section {
		background-color: transparent;
		border: none;
		padding: 0;
	}

	.meta-info {
		font-size: 0.75rem;
		color: var(--text-tertiary);
		margin: var(--spacing-xs) 0 0 0;
	}

	.btn-primary {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-sm);
		padding: var(--spacing-sm) var(--spacing-lg);
		background: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-700));
		color: white;
		border: none;
		border-radius: var(--radius-md);
		font-size: 0.875rem;
		font-weight: 600;
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.btn-primary:hover:not(:disabled) {
		transform: translateY(-1px);
		box-shadow: 0 4px 12px rgba(192, 158, 253, 0.4);
	}

	.btn-primary:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	/* Modal */
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

	.btn-secondary {
		padding: var(--spacing-sm) var(--spacing-md);
		background-color: var(--bg-elevated);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-md);
		color: var(--text-secondary);
		font-size: 0.875rem;
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.btn-secondary:hover {
		background-color: var(--bg-primary);
		color: var(--text-primary);
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
