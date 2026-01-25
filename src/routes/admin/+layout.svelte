<script lang="ts">
	import { page } from '$app/stores';
	import { LayoutGrid, FileText, LogOut, Home, Tag, Briefcase, Sparkles, Wrench, Heart } from 'lucide-svelte';

	let { children, data } = $props();

	const navItems = [
		{ href: '/admin', label: 'Dashboard', icon: LayoutGrid },
		{ href: '/admin/posts', label: 'Articles', icon: FileText },
		{ href: '/admin/projects', label: 'Projets', icon: Briefcase },
		{ href: '/admin/experiences', label: 'Expériences', icon: Briefcase },
		{ href: '/admin/skills', label: 'Compétences', icon: Sparkles },
		{ href: '/admin/passions', label: 'Passions', icon: Heart },
		{ href: '/admin/technologies', label: 'Technologies', icon: Wrench },
		{ href: '/admin/tags', label: 'Tags', icon: Tag }
	];
</script>

{#if $page.url.pathname === '/admin/login'}
	{@render children()}
{:else}
	<div class="admin-layout">
		<aside class="admin-sidebar">
			<div class="sidebar-header">
				<a href="/" class="logo">
					<Home size={20} />
					<span>Portfolio</span>
				</a>
			</div>

			<nav class="sidebar-nav">
				{#each navItems as item}
					<a
						href={item.href}
						class="nav-item"
						class:active={$page.url.pathname === item.href ||
							(item.href !== '/admin' && $page.url.pathname.startsWith(item.href))}
					>
						<svelte:component this={item.icon} size={20} />
						<span>{item.label}</span>
					</a>
				{/each}
			</nav>

			<div class="sidebar-footer">
				<div class="user-info">
					<span class="user-name">{data.user?.name}</span>
					<span class="user-email">{data.user?.email}</span>
				</div>
				<form action="/admin/logout" method="POST">
					<button type="submit" class="logout-btn">
						<LogOut size={18} />
						<span>Déconnexion</span>
					</button>
				</form>
			</div>
		</aside>

		<main class="admin-main">
			{@render children()}
		</main>
	</div>
{/if}

<style>
	.admin-layout {
		display: flex;
		min-height: 100vh;
		background-color: var(--bg-primary);
	}

	.admin-sidebar {
		width: 260px;
		background-color: var(--bg-secondary);
		border-right: 1px solid var(--border-color);
		display: flex;
		flex-direction: column;
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
	}

	.sidebar-header {
		padding: var(--spacing-lg);
		border-bottom: 1px solid var(--border-color);
	}

	.logo {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		color: var(--color-primary-400);
		font-weight: 600;
		font-size: 1.125rem;
		text-decoration: none;
	}

	.sidebar-nav {
		flex: 1;
		padding: var(--spacing-md);
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
	}

	.nav-item {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		padding: var(--spacing-sm) var(--spacing-md);
		border-radius: var(--radius-md);
		color: var(--text-secondary);
		text-decoration: none;
		transition: all var(--transition-fast);
	}

	.nav-item:hover {
		background-color: var(--bg-elevated);
		color: var(--text-primary);
	}

	.nav-item.active {
		background-color: var(--color-primary-600);
		color: white;
	}

	.sidebar-footer {
		padding: var(--spacing-md);
		border-top: 1px solid var(--border-color);
	}

	.user-info {
		display: flex;
		flex-direction: column;
		margin-bottom: var(--spacing-sm);
	}

	.user-name {
		font-weight: 600;
		color: var(--text-primary);
		font-size: 0.875rem;
	}

	.user-email {
		color: var(--text-tertiary);
		font-size: 0.75rem;
	}

	.logout-btn {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		width: 100%;
		padding: var(--spacing-sm) var(--spacing-md);
		border: none;
		border-radius: var(--radius-md);
		background-color: transparent;
		color: var(--text-secondary);
		cursor: pointer;
		transition: all var(--transition-fast);
		font-size: 0.875rem;
	}

	.logout-btn:hover {
		background-color: rgba(239, 68, 68, 0.1);
		color: #ef4444;
	}

	.admin-main {
		flex: 1;
		margin-left: 260px;
		padding: var(--spacing-xl);
	}
</style>
