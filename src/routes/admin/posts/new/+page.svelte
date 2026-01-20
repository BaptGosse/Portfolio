<script lang="ts">
	import { enhance } from '$app/forms';
	import { ArrowLeft, Save, Eye, EyeOff, AlertCircle } from 'lucide-svelte';

	let { data, form } = $props();
	let loading = $state(false);
	let preview = $state(false);
	let content = $state(form?.content ?? '');
</script>

<svelte:head>
	<title>Nouvel article - Admin</title>
</svelte:head>

<div class="editor-page">
	<header class="editor-header">
		<a href="/admin/posts" class="back-link">
			<ArrowLeft size={18} />
			Retour aux articles
		</a>
		<h1>Nouvel article</h1>
	</header>

	{#if form?.error}
		<div class="error-message">
			<AlertCircle size={18} />
			<span>{form.error}</span>
		</div>
	{/if}

	<form
		method="POST"
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
				<label for="title">Titre</label>
				<input
					type="text"
					id="title"
					name="title"
					placeholder="Titre de l'article"
					required
					value={form?.title ?? ''}
				/>
			</div>

			<div class="form-group">
				<label for="description">Description</label>
				<textarea
					id="description"
					name="description"
					placeholder="Description courte pour les aperçus"
					rows="2"
					required
				>{form?.description ?? ''}</textarea>
			</div>

			<div class="form-group">
				<div class="label-row">
					<label for="content">Contenu (Markdown)</label>
					<button type="button" class="preview-toggle" onclick={() => preview = !preview}>
						{#if preview}
							<EyeOff size={16} />
							Éditer
						{:else}
							<Eye size={16} />
							Prévisualiser
						{/if}
					</button>
				</div>
				{#if preview}
					<div class="preview-content prose">
						{@html content}
					</div>
				{:else}
					<textarea
						id="content"
						name="content"
						placeholder="Écrivez votre article en Markdown..."
						rows="20"
						required
						bind:value={content}
					></textarea>
				{/if}
			</div>
		</div>

		<aside class="form-sidebar">
			<div class="sidebar-section">
				<h3>Publication</h3>
				<label class="checkbox-label">
					<input type="checkbox" name="published" />
					<span>Publier immédiatement</span>
				</label>
			</div>

			{#if data.tags.length > 0}
				<div class="sidebar-section">
					<h3>Tags</h3>
					<div class="tags-list">
						{#each data.tags as tag}
							<label class="checkbox-label">
								<input type="checkbox" name="tags" value={tag.TAG_ID} />
								<span>{tag.TAG_NAME}</span>
							</label>
						{/each}
					</div>
				</div>
			{/if}

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

	.editor-header h1 {
		font-size: 1.5rem;
		color: var(--text-primary);
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
</style>
