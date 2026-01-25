<script lang="ts">
	import { Plus, Edit, Briefcase, GraduationCap } from 'lucide-svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	function formatDate(date: Date | null): string {
		if (!date) return 'Présent';
		return new Date(date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' });
	}
</script>

<svelte:head>
	<title>Expériences - Admin</title>
</svelte:head>

<div class="page">
	<header class="page-header">
		<div>
			<h1>Expériences</h1>
			<p class="subtitle">
				{data.experiences.length} expérience{data.experiences.length > 1 ? 's' : ''}
			</p>
		</div>
		<a href="/admin/experiences/new" class="btn-primary">
			<Plus size={18} />
			Nouvelle expérience
		</a>
	</header>

	{#if data.experiences.length > 0}
		<div class="experiences-list">
			{#each data.experiences as exp}
				<div class="experience-card">
					<div class="experience-icon">
						{#if exp.EXP_TYPE === 'education'}
							<GraduationCap size={20} />
						{:else}
							<Briefcase size={20} />
						{/if}
					</div>

					<div class="experience-content">
						<div class="experience-header">
							<div>
								<h3>{exp.EXP_ROLE.fr}</h3>
								<p class="company">{exp.EXP_COMPANY.fr}</p>
							</div>
							<span class="badge badge-{exp.EXP_TYPE}">
								{exp.EXP_TYPE === 'education' ? 'Formation' : 'Travail'}
							</span>
						</div>

						<p class="period">
							{formatDate(exp.EXP_START_DATE)} - {formatDate(exp.EXP_END_DATE)}
						</p>

						<p class="description">{exp.EXP_DESCRIPTION.fr.slice(0, 150)}...</p>
					</div>

					<div class="experience-actions">
						<a href="/admin/experiences/{exp.EXP_ID}" class="btn-icon" title="Modifier">
							<Edit size={16} />
						</a>
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<div class="empty-state">
			<p>Aucune expérience pour le moment.</p>
			<a href="/admin/experiences/new" class="btn-secondary">
				<Plus size={18} />
				Créer la première expérience
			</a>
		</div>
	{/if}
</div>

<style>
	.page {
		max-width: 1200px;
		margin: 0 auto;
	}

	.page-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: var(--spacing-xl);
	}

	.page-header h1 {
		font-size: 1.5rem;
		color: var(--text-primary);
		margin-bottom: var(--spacing-xs);
	}

	.subtitle {
		color: var(--text-tertiary);
		font-size: 0.875rem;
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
		text-decoration: none;
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.btn-primary:hover {
		transform: translateY(-1px);
		box-shadow: 0 4px 12px rgba(192, 158, 253, 0.4);
	}

	.experiences-list {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
	}

	.experience-card {
		display: flex;
		gap: var(--spacing-md);
		background-color: var(--bg-secondary);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-lg);
		padding: var(--spacing-lg);
		transition: all var(--transition-fast);
	}

	.experience-card:hover {
		border-color: var(--color-primary-400);
		box-shadow: 0 4px 12px rgba(192, 158, 253, 0.1);
	}

	.experience-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
		border-radius: var(--radius-md);
		background: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-700));
		color: white;
		flex-shrink: 0;
	}

	.experience-content {
		flex: 1;
	}

	.experience-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: var(--spacing-xs);
	}

	.experience-content h3 {
		font-size: 1.125rem;
		color: var(--text-primary);
		margin-bottom: var(--spacing-xs);
	}

	.company {
		color: var(--color-primary-400);
		font-size: 0.875rem;
		font-weight: 500;
	}

	.period {
		color: var(--text-tertiary);
		font-size: 0.875rem;
		margin-bottom: var(--spacing-sm);
	}

	.description {
		color: var(--text-secondary);
		font-size: 0.875rem;
		line-height: 1.6;
	}

	.badge {
		display: inline-flex;
		align-items: center;
		padding: var(--spacing-xs) 0.75rem;
		font-size: 0.75rem;
		font-weight: 500;
		border-radius: 9999px;
	}

	.badge-education {
		background-color: rgba(59, 130, 246, 0.1);
		color: #3b82f6;
	}

	.badge-work {
		background-color: rgba(16, 185, 129, 0.1);
		color: #10b981;
	}

	.experience-actions {
		display: flex;
		align-items: flex-start;
		position: relative;
		z-index: 10;
	}

	.btn-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border-radius: var(--radius-sm);
		color: var(--text-tertiary);
		transition: all var(--transition-fast);
		text-decoration: none;
		cursor: pointer;
	}

	.btn-icon:hover {
		background-color: var(--bg-elevated);
		color: var(--text-primary);
	}

	.empty-state {
		text-align: center;
		padding: var(--spacing-3xl) var(--spacing-md);
		background-color: var(--bg-secondary);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-lg);
	}

	.empty-state p {
		color: var(--text-secondary);
		margin-bottom: var(--spacing-lg);
	}

	.btn-secondary {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-xs);
		padding: var(--spacing-sm) var(--spacing-md);
		background-color: var(--bg-elevated);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-md);
		color: var(--text-secondary);
		font-size: 0.875rem;
		text-decoration: none;
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.btn-secondary:hover {
		background-color: var(--bg-primary);
		color: var(--text-primary);
	}
</style>
