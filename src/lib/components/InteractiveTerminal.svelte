<script lang="ts">
	import { onMount } from 'svelte';

	let input = $state('');
	let history = $state<Array<{ type: 'command' | 'output' | 'error'; content: string }>>([
		{ type: 'command', content: '$ kubectl get nodes' },
		{ type: 'output', content: 'NAME               STATUS   ROLES           AGE' },
		{ type: 'output', content: 'k3s-master-01      Ready    control-plane   420d' },
		{ type: 'output', content: 'k3s-worker-01      Ready    worker          418d' },
		{ type: 'output', content: 'k3s-worker-02      Ready    worker          418d' },
		{ type: 'output', content: '' },
		{ type: 'command', content: '$ whoami' },
		{ type: 'output', content: 'baptiste' },
		{ type: 'output', content: '' },
		{ type: 'output', content: 'Welcome! Type "help" to see available commands 👋' }
	]);
	let terminalRef: HTMLDivElement;
	let inputRef: HTMLInputElement;

	const commands: Record<string, () => string | string[]> = {
		help: () => [
			'Available commands:',
			'  help       - Show this help message',
			'  about      - Learn more about me',
			'  skills     - List my technical skills',
			'  projects   - View my projects',
			'  contact    - Get my contact information',
			'  whoami     - Display current user',
			'  date       - Show current date',
			'  echo       - Print a message',
			'  clear      - Clear the terminal',
			'  neofetch   - Display system information',
			'  fortune    - Get a random quote',
			'  matrix     - Enter the Matrix... (just kidding)',
			'  sudo       - With great power...',
			'  kubectl    - Check Kubernetes cluster status',
			'  docker     - List running containers',
			'  weather    - Check the weather',
			'  joke       - Tell me a joke',
			'  cat        - Display file contents',
			'  history    - Show command history',
		],
		about: () => [
			'Baptiste Gosselin',
			'',
			'Étudiant en informatique passionné par l\'infrastructure cloud-native.',
			'Spécialisé en Kubernetes, DevOps et développement système.',
			'',
			'📍 France',
			'🎓 Étudiant en Informatique',
			'💼 Dirigeant d\'UnxWares',
		],
		skills: () => [
			'Technical Stack:',
			'',
			'☸️  Cloud-Native: Kubernetes, k3s, ArgoCD, Helm',
			'🐳 Containers: Docker, Containerd',
			'🔧 Infrastructure: Proxmox, Debian, NGINX',
			'⚙️  DevOps: Jenkins, GitOps, CI/CD',
			'💻 Languages: Go, Rust, TypeScript, PHP',
			'📊 Monitoring: Prometheus, Grafana',
		],
		projects: () => [
			'Featured Projects:',
			'',
			'1. Cluster Kubernetes Homelab',
			'   → Complete cloud-native infrastructure on k3s',
			'',
			'2. Orchestrateur de Services en Go',
			'   → Custom orchestration system in Go',
			'',
			'3. Infrastructure Self-Hosted',
			'   → Full self-hosted stack with GitOps',
			'',
			'Visit /projects for more details!',
		],
		contact: () => [
			'Contact Information:',
			'',
			'📧 Email: contact@baptistegosselin.dev',
			'🐙 GitHub: github.com/baptgosse',
			'💼 LinkedIn: Baptiste Gosselin',
			'',
			'Feel free to reach out!',
		],
		whoami: () => 'baptiste',
		date: () => new Date().toLocaleString('fr-FR', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		}),
		pwd: () => '/home/baptiste/portfolio',
		ls: () => [
			'projects/',
			'skills/',
			'contact/',
			'about.md',
			'resume.pdf',
		],
		clear: () => {
			history = [];
			return '';
		},
		neofetch: () => [
			'     _____          baptiste@portfolio',
			'    /     \\         ------------------',
			'   | () () |        OS: Arch Linux btw',
			'    \\  ^  /         Host: Cloud-Native Infrastructure',
			'     |||||          Kernel: k3s-5.15.0',
			'     |||||          Uptime: 420 days',
			'                    Packages: ∞',
			'                    Shell: zsh',
			'                    Resolution: 1920x1080',
			'                    DE: SvelteKit',
			'                    Theme: Technical Elegance',
			'                    Icons: Lucide',
		],
		fortune: () => {
			const quotes = [
				'"Talk is cheap. Show me the code." - Linus Torvalds',
				'"Any fool can write code that a computer can understand. Good programmers write code that humans can understand." - Martin Fowler',
				'"First, solve the problem. Then, write the code." - John Johnson',
				'"Experience is the name everyone gives to their mistakes." - Oscar Wilde',
				'"In order to be irreplaceable, one must always be different." - Coco Chanel',
				'"The best way to predict the future is to invent it." - Alan Kay',
				'"Infrastructure is the foundation of everything." - Baptiste Gosselin (probably)',
			];
			return quotes[Math.floor(Math.random() * quotes.length)];
		},
		matrix: () => [
			'Wake up, Baptiste...',
			'The Matrix has you...',
			'Follow the white rabbit.',
			'',
			'(Just kidding, this is a portfolio website 😄)',
		],
		sudo: () => 'Nice try! 😏',
		exit: () => 'You cannot escape the terminal! Try "clear" instead.',
		kubectl: () => [
			'$ kubectl get nodes',
			'NAME               STATUS   ROLES           AGE',
			'k3s-master-01      Ready    control-plane   420d',
			'k3s-worker-01      Ready    worker          418d',
			'k3s-worker-02      Ready    worker          418d',
			'',
			'$ kubectl get pods -A',
			'NAMESPACE      NAME                                READY   STATUS',
			'kube-system    coredns-7db6d8ff4d-xxxxx           1/1     Running',
			'argocd         argocd-server-xxxxxxxxx-xxxxx      1/1     Running',
			'monitoring     prometheus-xxxxxxxxx-xxxxx         1/1     Running',
			'',
			'Cluster is healthy! ✅',
		],
		docker: () => [
			'CONTAINER ID   IMAGE                STATUS         PORTS',
			'a1b2c3d4e5f6   nginx:latest         Up 3 days      80->80',
			'b2c3d4e5f6a1   postgres:14          Up 5 days      5432->5432',
			'c3d4e5f6a1b2   redis:alpine         Up 2 weeks     6379->6379',
			'd4e5f6a1b2c3   grafana/grafana      Up 1 month     3000->3000',
			'',
			'4 containers running',
		],
		weather: () => {
			const weather = ['☀️ Sunny', '🌤️ Partly Cloudy', '☁️ Cloudy', '🌧️ Rainy', '⛈️ Stormy'];
			const temp = Math.floor(Math.random() * 20) + 10;
			return [
				`${weather[Math.floor(Math.random() * weather.length)]}`,
				`Temperature: ${temp}°C`,
				'',
				'Perfect weather for coding! 💻',
			];
		},
		joke: () => {
			const jokes = [
				'Why do programmers prefer dark mode?\nBecause light attracts bugs! 🐛',
				'How many programmers does it take to change a light bulb?\nNone, that\'s a hardware problem! 💡',
				'Why do Java developers wear glasses?\nBecause they can\'t C#! 👓',
				'What\'s a programmer\'s favorite hangout place?\nFoo Bar! 🍺',
				'Why did the developer go broke?\nBecause he used up all his cache! 💸',
				'A SQL query walks into a bar, walks up to two tables and asks...\n"Can I join you?" 🍻',
			];
			return jokes[Math.floor(Math.random() * jokes.length)];
		},
		cat: () => [
			'Usage: cat [filename]',
			'',
			'Available files:',
			'  cat about.md',
			'  cat resume.pdf',
			'',
			'Try: cat about.md',
		],
		history: () => {
			const cmds = history
				.filter(h => h.type === 'command')
				.map((h, i) => `  ${i + 1}  ${h.content.replace('$ ', '')}`)
				.slice(-10);
			return ['Command history:', '', ...cmds];
		},
	};

	function handleCommand(cmd: string) {
		const trimmedCmd = cmd.trim();
		if (!trimmedCmd) return;

		// Add command to history
		history.push({ type: 'command', content: `$ ${trimmedCmd}` });

		// Parse command
		const parts = trimmedCmd.split(' ');
		const command = parts[0].toLowerCase();
		const args = parts.slice(1);

		// Execute command
		if (command === 'echo') {
			const message = args.join(' ');
			history.push({ type: 'output', content: message || '' });
		} else if (command === 'cat') {
			const file = args[0];
			if (!file) {
				const result = commands.cat();
				const lines = Array.isArray(result) ? result : [result];
				lines.forEach(line => {
					history.push({ type: 'output', content: line });
				});
			} else if (file === 'about.md') {
				[
					'# Baptiste Gosselin',
					'',
					'Étudiant en informatique passionné par l\'infrastructure.',
					'',
					'## Expertise',
					'- Cloud-Native & Kubernetes',
					'- DevOps & GitOps',
					'- Infrastructure as Code',
					'- Développement système (Go, Rust)',
				].forEach(line => {
					history.push({ type: 'output', content: line });
				});
			} else if (file === 'resume.pdf') {
				[
					'📄 Resume - Baptiste Gosselin',
					'',
					'Unfortunately, you cannot read a PDF in the terminal! 😄',
					'Try: contact  (to get my contact information)',
				].forEach(line => {
					history.push({ type: 'output', content: line });
				});
			} else {
				history.push({ type: 'error', content: `cat: ${file}: No such file or directory` });
			}
		} else if (commands[command]) {
			const result = commands[command]();
			if (result) {
				const lines = Array.isArray(result) ? result : [result];
				lines.forEach(line => {
					history.push({ type: 'output', content: line });
				});
			}
		} else {
			history.push({
				type: 'error',
				content: `bash: ${command}: command not found`
			});
			history.push({
				type: 'output',
				content: 'Type "help" for available commands'
			});
		}

		// Scroll to bottom
		setTimeout(() => {
			if (terminalRef) {
				terminalRef.scrollTop = terminalRef.scrollHeight;
			}
		}, 0);
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			e.preventDefault();
			handleCommand(input);
			input = '';
		}
	}

	function focusInput() {
		inputRef?.focus();
	}

	onMount(() => {
		focusInput();
	});
</script>

<div class="terminal-window" onclick={focusInput} onkeydown={focusInput} role="button" tabindex="0">
	<div class="terminal-header">
		<div class="terminal-dots">
			<span class="dot red"></span>
			<span class="dot yellow"></span>
			<span class="dot green"></span>
		</div>
		<div class="terminal-title">baptiste@infrastructure ~ $</div>
	</div>
	<div class="terminal-body" bind:this={terminalRef}>
		{#each history as line}
			<div class="terminal-line {line.type}">
				{#if line.type === 'command'}
					<span class="prompt-symbol">❯</span>
				{/if}
				<span>{line.content}</span>
			</div>
		{/each}
		<div class="terminal-input-line">
			<span class="prompt-symbol">❯</span>
			<input
				bind:this={inputRef}
				bind:value={input}
				onkeydown={handleKeyDown}
				class="terminal-input"
				placeholder="Type 'help' for commands..."
				autocomplete="off"
				spellcheck="false"
			/>
			<span class="cursor-blink"></span>
		</div>
	</div>
</div>

<style>
	.terminal-window {
		background: var(--bg-secondary);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-xl);
		overflow: hidden;
		box-shadow: var(--shadow-xl);
		cursor: text;
		transition: all var(--transition-normal);
	}

	.terminal-window:hover {
		border-color: var(--border-color-hover);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
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
		transition: all var(--transition-fast);
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

	.terminal-window:hover .dot.red {
		box-shadow: 0 0 8px #ff5f56;
	}

	.terminal-window:hover .dot.yellow {
		box-shadow: 0 0 8px #ffbd2e;
	}

	.terminal-window:hover .dot.green {
		box-shadow: 0 0 8px #27c93f;
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
		line-height: 1.6;
		max-height: 580px;
		overflow-y: auto;
		overflow-x: hidden;
	}

	.terminal-body::-webkit-scrollbar {
		width: 8px;
	}

	.terminal-body::-webkit-scrollbar-track {
		background: var(--bg-tertiary);
	}

	.terminal-body::-webkit-scrollbar-thumb {
		background: var(--border-color);
		border-radius: var(--radius-full);
	}

	.terminal-body::-webkit-scrollbar-thumb:hover {
		background: var(--text-tertiary);
	}

	.terminal-line {
		margin-bottom: var(--spacing-xs);
		display: flex;
		gap: var(--spacing-sm);
		animation: fadeIn 0.2s ease-out;
		white-space: pre;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(2px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.terminal-line.command {
		color: var(--text-primary);
		font-weight: 500;
	}

	.terminal-line.command span,
	.terminal-line.output span,
	.terminal-line.error span {
		white-space: pre;
	}

	.terminal-line.output {
		color: var(--text-tertiary);
	}

	.terminal-line.error {
		color: #ff5f56;
	}

	.prompt-symbol {
		color: var(--color-accent);
		font-weight: 600;
		user-select: none;
	}

	.terminal-input-line {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		margin-top: var(--spacing-md);
	}

	.terminal-input {
		flex: 1;
		background: transparent;
		border: none;
		outline: none;
		color: var(--text-primary);
		font-family: var(--font-mono);
		font-size: 0.875rem;
		padding: 0;
	}

	.terminal-input::placeholder {
		color: var(--text-muted);
		opacity: 0.5;
	}

	.cursor-blink {
		display: inline-block;
		width: 8px;
		height: 16px;
		background: var(--color-accent);
		animation: blink 1s step-end infinite;
		margin-left: 2px;
	}

	@keyframes blink {
		0%, 50% {
			opacity: 1;
		}
		51%, 100% {
			opacity: 0;
		}
	}
</style>
