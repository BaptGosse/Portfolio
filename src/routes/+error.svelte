<script lang="ts">
	import { page } from '$app/stores';
	import { Home, ArrowLeft, Terminal, Search, Map } from 'lucide-svelte';

	const errorMessages: Record<number, { title: string; message: string }> = {
		404: {
			title: '404 - Page Not Found',
			message: "This route doesn't exist in the cluster. The pod you're looking for has been evicted."
		},
		403: {
			title: '403 - Forbidden',
			message: 'Access denied. You need higher privileges to access this namespace.'
		},
		500: {
			title: '500 - Internal Server Error',
			message: 'The server crashed. Our incident response team has been notified.'
		}
	};

	const error = $page.error;
	const status = $page.status;
	const errorData = errorMessages[status] || {
		title: `${status} - Error`,
		message: 'Something went wrong. Please try again later.'
	};
</script>

<svelte:head>
	<title>{errorData.title} - Baptiste Gosselin</title>
</svelte:head>

<div class="error-page">
	<div class="error-container">
		<div class="error-terminal">
			<div class="terminal-header">
				<div class="terminal-dots">
					<span class="dot red"></span>
					<span class="dot yellow"></span>
					<span class="dot green"></span>
				</div>
				<div class="terminal-title">error@portfolio ~ $</div>
			</div>
			<div class="terminal-body">
				<div class="terminal-output">
					<span class="prompt">❯</span>
					<span class="command">kubectl get page {$page.url.pathname}</span>
				</div>
				<div class="terminal-output error">
					<span>Error from server (NotFound): pages "{$page.url.pathname}" not found</span>
				</div>
				<div class="terminal-output">
					<span class="prompt">❯</span>
					<span class="command">cat error.log</span>
				</div>
				<div class="terminal-output">
					<span class="error-code">[{status}]</span>
					<span class="error-text">{errorData.message}</span>
				</div>
			</div>
		</div>

		<div class="error-content">
			<div class="error-icon">
				<div class="status-code">{status}</div>
				<div class="glitch-text" data-text="{status}">{status}</div>
			</div>

			<h1>{errorData.title}</h1>
			<p class="error-description">{errorData.message}</p>

			{#if error?.message}
				<div class="error-details">
					<details>
						<summary>Technical Details</summary>
						<pre><code>{error.message}</code></pre>
					</details>
				</div>
			{/if}

			<div class="error-actions">
				<a href="/" class="btn-primary">
					<Home size={18} />
					Back to Home
				</a>
				<button onclick={() => history.back()} class="btn-secondary">
					<ArrowLeft size={18} />
					Go Back
				</button>
			</div>

			<div class="error-suggestions">
				<h3>
					<Search size={20} />
					You might be looking for:
				</h3>
				<div class="suggestions-grid">
					<a href="/" class="suggestion-card">
						<Home size={18} />
						<span>Home</span>
					</a>
					<a href="/projects" class="suggestion-card">
						<Terminal size={18} />
						<span>Projects</span>
					</a>
					<a href="/blog" class="suggestion-card">
						<Map size={18} />
						<span>Blog</span>
					</a>
				</div>
			</div>
		</div>
	</div>

	<div class="background-pattern">
		<div class="grid-line"></div>
		<div class="grid-line"></div>
		<div class="grid-line"></div>
		<div class="grid-line"></div>
	</div>
</div>

<style>
	.error-page {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-2xl);
		position: relative;
		overflow: hidden;
		background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
	}

	.background-pattern {
		position: absolute;
		inset: 0;
		opacity: 0.03;
		pointer-events: none;
	}

	.grid-line {
		position: absolute;
		background: var(--color-accent);
		animation: gridMove 20s linear infinite;
	}

	.grid-line:nth-child(1) {
		width: 2px;
		height: 100%;
		left: 25%;
		animation-delay: -5s;
	}

	.grid-line:nth-child(2) {
		width: 2px;
		height: 100%;
		left: 50%;
		animation-delay: -10s;
	}

	.grid-line:nth-child(3) {
		width: 100%;
		height: 2px;
		top: 33%;
		animation-delay: -15s;
	}

	.grid-line:nth-child(4) {
		width: 100%;
		height: 2px;
		top: 66%;
	}

	@keyframes gridMove {
		0% {
			opacity: 0.03;
		}
		50% {
			opacity: 0.06;
		}
		100% {
			opacity: 0.03;
		}
	}

	.error-container {
		max-width: 900px;
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-2xl);
		position: relative;
		z-index: 1;
	}

	.error-terminal {
		background: var(--bg-secondary);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-xl);
		overflow: hidden;
		box-shadow: var(--shadow-2xl);
	}

	.terminal-header {
		display: flex;
		align-items: center;
		gap: var(--spacing-md);
		padding: var(--spacing-md) var(--spacing-lg);
		background: var(--bg-tertiary);
		border-bottom: 1px solid var(--border-color);
	}

	.terminal-dots {
		display: flex;
		gap: var(--spacing-xs);
	}

	.dot {
		width: 12px;
		height: 12px;
		border-radius: 50%;
	}

	.dot.red {
		background: #ff5f56;
	}

	.dot.yellow {
		background: #ffbd2e;
	}

	.dot.green {
		background: #27c93f;
	}

	.terminal-title {
		font-family: var(--font-mono);
		font-size: 0.875rem;
		color: var(--text-tertiary);
	}

	.terminal-body {
		padding: var(--spacing-xl);
		font-family: var(--font-mono);
		font-size: 0.875rem;
		line-height: 1.8;
	}

	.terminal-output {
		margin-bottom: var(--spacing-sm);
		display: flex;
		gap: var(--spacing-sm);
		color: var(--text-secondary);
	}

	.terminal-output.error {
		color: #ff5f56;
	}

	.prompt {
		color: var(--color-accent);
		font-weight: 600;
	}

	.command {
		color: var(--text-primary);
	}

	.error-code {
		color: #ff5f56;
		font-weight: 700;
	}

	.error-text {
		color: var(--text-secondary);
	}

	.error-content {
		background: var(--bg-secondary);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-xl);
		padding: var(--spacing-3xl);
		text-align: center;
		box-shadow: var(--shadow-2xl);
	}

	.error-icon {
		position: relative;
		margin-bottom: var(--spacing-2xl);
	}

	.status-code {
		font-size: 8rem;
		font-weight: 900;
		background: linear-gradient(135deg, var(--color-accent), var(--color-secondary-accent));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		line-height: 1;
		margin-bottom: var(--spacing-lg);
	}

	.glitch-text {
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		font-size: 8rem;
		font-weight: 900;
		color: var(--color-accent);
		opacity: 0.3;
		animation: glitch 3s infinite;
		pointer-events: none;
	}

	@keyframes glitch {
		0% {
			transform: translateX(-50%) translateY(0);
			opacity: 0.3;
		}
		20% {
			transform: translateX(-48%) translateY(2px);
			opacity: 0.5;
		}
		40% {
			transform: translateX(-52%) translateY(-2px);
			opacity: 0.3;
		}
		60% {
			transform: translateX(-50%) translateY(1px);
			opacity: 0.4;
		}
		80% {
			transform: translateX(-51%) translateY(-1px);
			opacity: 0.3;
		}
		100% {
			transform: translateX(-50%) translateY(0);
			opacity: 0.3;
		}
	}

	h1 {
		font-size: 2rem;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: var(--spacing-md);
	}

	.error-description {
		font-size: 1.125rem;
		color: var(--text-secondary);
		margin-bottom: var(--spacing-2xl);
		max-width: 600px;
		margin-left: auto;
		margin-right: auto;
	}

	.error-details {
		margin-bottom: var(--spacing-2xl);
		text-align: left;
	}

	.error-details details {
		background: var(--bg-tertiary);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-lg);
		padding: var(--spacing-md);
	}

	.error-details summary {
		cursor: pointer;
		font-weight: 600;
		color: var(--text-primary);
		user-select: none;
	}

	.error-details summary:hover {
		color: var(--color-accent);
	}

	.error-details pre {
		margin-top: var(--spacing-md);
		padding: var(--spacing-md);
		background: var(--bg-elevated);
		border-radius: var(--radius-md);
		overflow-x: auto;
		font-family: var(--font-mono);
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.error-actions {
		display: flex;
		gap: var(--spacing-md);
		justify-content: center;
		margin-bottom: var(--spacing-3xl);
		flex-wrap: wrap;
	}

	.btn-primary,
	.btn-secondary {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-xs);
		padding: var(--spacing-md) var(--spacing-xl);
		border-radius: var(--radius-lg);
		font-weight: 600;
		text-decoration: none;
		transition: all var(--transition-fast);
		cursor: pointer;
		border: none;
		font-size: 1rem;
	}

	.btn-primary {
		background: linear-gradient(135deg, var(--color-accent), var(--color-secondary-accent));
		color: white;
	}

	.btn-primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 24px var(--color-accent-glow);
	}

	.btn-secondary {
		background: var(--bg-tertiary);
		color: var(--text-primary);
		border: 1px solid var(--border-color);
	}

	.btn-secondary:hover {
		background: var(--bg-elevated);
		border-color: var(--color-accent);
		color: var(--color-accent);
	}

	.error-suggestions {
		padding-top: var(--spacing-2xl);
		border-top: 1px solid var(--border-color);
	}

	.error-suggestions h3 {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-sm);
		font-size: 1rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: var(--spacing-lg);
	}

	.suggestions-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: var(--spacing-md);
		max-width: 500px;
		margin: 0 auto;
	}

	.suggestion-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-xs);
		padding: var(--spacing-lg);
		background: var(--bg-tertiary);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-lg);
		text-decoration: none;
		color: var(--text-secondary);
		transition: all var(--transition-fast);
	}

	.suggestion-card:hover {
		background: var(--bg-elevated);
		border-color: var(--color-accent);
		color: var(--color-accent);
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	.suggestion-card span {
		font-size: 0.875rem;
		font-weight: 500;
	}

	@media (max-width: 768px) {
		.error-page {
			padding: var(--spacing-lg);
		}

		.error-content {
			padding: var(--spacing-xl);
		}

		.status-code,
		.glitch-text {
			font-size: 5rem;
		}

		h1 {
			font-size: 1.5rem;
		}

		.error-description {
			font-size: 1rem;
		}

		.error-actions {
			flex-direction: column;
			width: 100%;
		}

		.btn-primary,
		.btn-secondary {
			width: 100%;
			justify-content: center;
		}

		.suggestions-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
