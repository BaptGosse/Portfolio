<script lang="ts">
	import { enhance } from '$app/forms';
	import { Mail, Lock, AlertCircle } from 'lucide-svelte';

	let { form } = $props();
	let loading = $state(false);
</script>

<svelte:head>
	<title>Connexion - Admin</title>
</svelte:head>

<div class="login-container">
	<div class="login-card">
		<div class="login-header">
			<h1>Connexion Admin</h1>
			<p>Connectez-vous pour accéder au panneau d'administration</p>
		</div>

		{#if form?.error}
			<div class="error-message">
				<AlertCircle size={18} />
				<span>{form.error}</span>
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
			<div class="form-group">
				<label for="email">Email</label>
				<div class="input-wrapper">
					<Mail size={18} />
					<input
						type="email"
						id="email"
						name="email"
						placeholder="admin@example.com"
						required
						value={form?.email ?? ''}
					/>
				</div>
			</div>

			<div class="form-group">
				<label for="password">Mot de passe</label>
				<div class="input-wrapper">
					<Lock size={18} />
					<input
						type="password"
						id="password"
						name="password"
						placeholder="Votre mot de passe"
						required
					/>
				</div>
			</div>

			<button type="submit" class="submit-btn" disabled={loading}>
				{#if loading}
					Connexion en cours...
				{:else}
					Se connecter
				{/if}
			</button>
		</form>

		<div class="login-footer">
			<a href="/">Retour au site</a>
		</div>
	</div>
</div>

<style>
	.login-container {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-md);
		background: linear-gradient(135deg, var(--bg-primary), var(--bg-secondary));
	}

	.login-card {
		width: 100%;
		max-width: 400px;
		background-color: var(--bg-secondary);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-xl);
		padding: var(--spacing-xl);
	}

	.login-header {
		text-align: center;
		margin-bottom: var(--spacing-xl);
	}

	.login-header h1 {
		font-size: 1.5rem;
		color: var(--text-primary);
		margin-bottom: var(--spacing-xs);
	}

	.login-header p {
		color: var(--text-tertiary);
		font-size: 0.875rem;
		margin: 0;
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

	.form-group {
		margin-bottom: var(--spacing-lg);
	}

	.form-group label {
		display: block;
		margin-bottom: var(--spacing-xs);
		color: var(--text-secondary);
		font-size: 0.875rem;
		font-weight: 500;
	}

	.input-wrapper {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		padding: var(--spacing-sm) var(--spacing-md);
		background-color: var(--bg-elevated);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-md);
		transition: border-color var(--transition-fast);
	}

	.input-wrapper:focus-within {
		border-color: var(--color-primary-400);
	}

	.input-wrapper :global(svg) {
		color: var(--text-tertiary);
		flex-shrink: 0;
	}

	.input-wrapper input {
		flex: 1;
		border: none;
		background: transparent;
		color: var(--text-primary);
		font-size: 0.875rem;
		outline: none;
	}

	.input-wrapper input::placeholder {
		color: var(--text-tertiary);
	}

	.submit-btn {
		width: 100%;
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

	.submit-btn:hover:not(:disabled) {
		transform: translateY(-1px);
		box-shadow: 0 4px 12px rgba(192, 158, 253, 0.4);
	}

	.submit-btn:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.login-footer {
		margin-top: var(--spacing-lg);
		text-align: center;
	}

	.login-footer a {
		color: var(--text-tertiary);
		font-size: 0.875rem;
		text-decoration: none;
		transition: color var(--transition-fast);
	}

	.login-footer a:hover {
		color: var(--color-primary-400);
	}
</style>
