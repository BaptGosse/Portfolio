<script lang="ts">
	import { enhance } from '$app/forms';
	import { Plus, Trash2, Tag, AlertCircle, Check } from 'lucide-svelte';

	let { data, form } = $props();
	let newTagName = $state('');
	let loading = $state(false);
</script>

<svelte:head>
	<title>Tags - Admin</title>
</svelte:head>

<div class="tags-page">
	<header class="page-header">
		<div>
			<h1>Tags</h1>
			<p>Gérez les tags de vos articles</p>
		</div>
	</header>

	{#if form?.error}
		<div class="message error">
			<AlertCircle size={18} />
			<span>{form.error}</span>
		</div>
	{/if}

	{#if form?.success}
		<div class="message success">
			<Check size={18} />
			<span>Opération effectuée avec succès</span>
		</div>
	{/if}

	<div class="tags-content">
		<div class="create-tag-card">
			<h2>Créer un tag</h2>
			<form
				method="POST"
				action="?/create"
				class="create-form"
				use:enhance={() => {
					loading = true;
					return async ({ update }) => {
						await update();
						loading = false;
						newTagName = '';
					};
				}}
			>
				<input
					type="text"
					name="name"
					placeholder="Nom du tag"
					bind:value={newTagName}
					required
				/>
				<button type="submit" class="btn-primary" disabled={loading || !newTagName}>
					<Plus size={18} />
					Créer
				</button>
			</form>
		</div>

		{#if data.tags.length === 0}
			<div class="empty-state">
				<Tag size={48} />
				<p>Aucun tag pour le moment</p>
				<span>Créez votre premier tag ci-dessus</span>
			</div>
		{:else}
			<div class="tags-list">
				<h2>Tags existants ({data.tags.length})</h2>
				<div class="tags-grid">
					{#each data.tags as tag}
						<div class="tag-card">
							<div class="tag-info">
								<span class="tag-name">{tag.name}</span>
								<span class="tag-meta">
									{tag.postsCount} article{tag.postsCount !== 1 ? 's' : ''}
								</span>
							</div>
							<form method="POST" action="?/delete">
								<input type="hidden" name="id" value={tag.id} />
								<button
									type="submit"
									class="delete-btn"
									title="Supprimer"
									disabled={tag.postsCount > 0}
								>
									<Trash2 size={16} />
								</button>
							</form>
						</div>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.tags-page {
		max-width: 800px;
		margin: 0 auto;
	}

	.page-header {
		margin-bottom: var(--spacing-xl);
	}

	.page-header h1 {
		font-size: 1.5rem;
		color: var(--text-primary);
		margin-bottom: var(--spacing-xs);
	}

	.page-header p {
		color: var(--text-tertiary);
		margin: 0;
	}

	.message {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		padding: var(--spacing-sm) var(--spacing-md);
		border-radius: var(--radius-md);
		font-size: 0.875rem;
		margin-bottom: var(--spacing-lg);
	}

	.message.error {
		background-color: rgba(239, 68, 68, 0.1);
		border: 1px solid rgba(239, 68, 68, 0.3);
		color: #ef4444;
	}

	.message.success {
		background-color: rgba(16, 185, 129, 0.1);
		border: 1px solid rgba(16, 185, 129, 0.3);
		color: #10b981;
	}

	.tags-content {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xl);
	}

	.create-tag-card {
		background-color: var(--bg-secondary);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-lg);
		padding: var(--spacing-lg);
	}

	.create-tag-card h2 {
		font-size: 1rem;
		color: var(--text-primary);
		margin-bottom: var(--spacing-md);
	}

	.create-form {
		display: flex;
		gap: var(--spacing-sm);
	}

	.create-form input {
		flex: 1;
		padding: var(--spacing-sm) var(--spacing-md);
		background-color: var(--bg-elevated);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-md);
		color: var(--text-primary);
		font-size: 0.875rem;
		transition: border-color var(--transition-fast);
	}

	.create-form input:focus {
		outline: none;
		border-color: var(--color-primary-400);
	}

	.btn-primary {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-xs);
		padding: var(--spacing-sm) var(--spacing-md);
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
		opacity: 0.5;
		cursor: not-allowed;
	}

	.empty-state {
		text-align: center;
		padding: var(--spacing-3xl);
		background-color: var(--bg-secondary);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-lg);
		color: var(--text-tertiary);
	}

	.empty-state :global(svg) {
		margin-bottom: var(--spacing-md);
		opacity: 0.5;
	}

	.empty-state p {
		font-size: 1rem;
		margin-bottom: var(--spacing-xs);
	}

	.empty-state span {
		font-size: 0.875rem;
	}

	.tags-list h2 {
		font-size: 1rem;
		color: var(--text-primary);
		margin-bottom: var(--spacing-md);
	}

	.tags-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: var(--spacing-md);
	}

	.tag-card {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--spacing-md);
		background-color: var(--bg-secondary);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-md);
		transition: border-color var(--transition-fast);
	}

	.tag-card:hover {
		border-color: var(--color-primary-400);
	}

	.tag-info {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.tag-name {
		color: var(--text-primary);
		font-weight: 500;
	}

	.tag-meta {
		font-size: 0.75rem;
		color: var(--text-tertiary);
	}

	.delete-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border: none;
		border-radius: var(--radius-md);
		background-color: transparent;
		color: var(--text-tertiary);
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.delete-btn:hover:not(:disabled) {
		background-color: rgba(239, 68, 68, 0.1);
		color: #ef4444;
	}

	.delete-btn:disabled {
		opacity: 0.3;
		cursor: not-allowed;
	}
</style>
