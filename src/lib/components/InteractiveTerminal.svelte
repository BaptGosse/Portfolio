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
		{ type: 'output', content: 'Welcome! Type "help" to see available commands.' }
	]);
	let terminalRef: HTMLDivElement;
	let inputRef: HTMLInputElement;

	const getCommands = {
		help: () => [
			'Available commands:',
			'  help       - Show this help message',
			'  about      - About me',
			'  skills     - List my technical skills',
			'  projects   - View my projects',
			'  contact    - Contact information',
			'  whoami     - Display current user',
			'  date       - Show current date',
			'  echo       - Print a message',
			'  clear      - Clear terminal screen',
			'  neofetch   - Display system information',
			'  fortune    - Get a random quote',
			'  matrix     - Enter the Matrix',
			'  sudo       - Try sudo access',
			'  kubectl    - Check Kubernetes cluster',
			'  docker     - List running containers',
			'  weather    - Check the weather',
			'  joke       - Hear a programming joke',
			'  cat        - Read a file',
			'  history    - Show command history',
		],
		about: () => [
			'Baptiste Gosselin - DevOps & Cloud Native Engineer',
			'',
			'Passionate about infrastructure automation, cloud technologies,',
			'and building reliable, scalable systems.',
			'',
			'📍 Location: France',
			'🎓 Education: Computer Science & Infrastructure Engineering',
			'💼 Role: DevOps Engineer specializing in Kubernetes and Cloud Native',
		],
		skills: () => [
			'Technical Skills:',
			'',
			'☸️  Cloud Native: Kubernetes, Docker, Helm, ArgoCD',
			'🐳 Containers: Docker, Podman, Container Orchestration',
			'🏗️  Infrastructure: Terraform, Ansible, GitOps',
			'⚙️  DevOps: CI/CD, GitHub Actions, GitLab CI, Jenkins',
			'💻 Languages: Go, Python, TypeScript, Bash',
			'📊 Monitoring: Prometheus, Grafana, ELK Stack',
		],
		projects: () => [
			'Featured Projects:',
			'',
			'1. Kubernetes Homelab Cluster',
			'   Production-grade K3s cluster with GitOps, monitoring, and automated backups',
			'',
			'2. Infrastructure Orchestrator',
			'   Go-based automation tool for managing multi-cloud infrastructure',
			'',
			'3. CI/CD Pipeline Framework',
			'   Reusable pipeline templates and best practices for modern applications',
			'',
			'Visit /projects to see more details and source code!',
		],
		contact: () => [
			'Contact Information:',
			'',
			'📧 Email: baptiste.gosselin@example.com',
			'🐙 GitHub: github.com/baptistegosselin',
			'💼 LinkedIn: linkedin.com/in/baptistegosselin',
			'',
			'Feel free to reach out for collaborations or opportunities!',
		],
		whoami: () => 'baptiste',
		date: () => new Date().toLocaleString('en-US', {
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
			'   | () () |        OS: Portfolio Linux',
			'    \\  ^  /         Host: Cloud Native Workstation',
			'     |||||          Kernel: 6.x-devops',
			'     |||||          Uptime: Always Available',
			'                    Packages: 999+ (npm)',
			'                    Shell: bash 5.1.16',
			'                    Resolution: Responsive',
			'                    DE: SvelteKit',
			'                    Theme: Dark (cyberpunk)',
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
			'Wake up, Neo...',
			'The Matrix has you...',
			'Follow the white rabbit. 🐰',
			'',
			'Just kidding! But seriously, check out my projects! 😄',
		],
		sudo: () => 'Nice try! But this is a portfolio, not a production server 😉',
		exit: () => 'Why would you want to leave? There\'s so much to explore!',
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
			'✅ All systems operational! Cluster is healthy.',
		],
		docker: () => [
			'CONTAINER ID   IMAGE                STATUS         PORTS',
			'a1b2c3d4e5f6   nginx:latest         Up 3 days      80->80',
			'b2c3d4e5f6a1   postgres:14          Up 5 days      5432->5432',
			'c3d4e5f6a1b2   redis:alpine         Up 2 weeks     6379->6379',
			'd4e5f6a1b2c3   grafana/grafana      Up 1 month     3000->3000',
			'',
			'Total: 4 containers running',
		],
		weather: () => {
			const weather = [
				'☀️  Sunny',
				'⛅ Partly Cloudy',
				'☁️  Cloudy',
				'🌧️  Rainy',
				'⛈️  Stormy'
			];
			const temp = Math.floor(Math.random() * 20) + 10;
			return [
				`${weather[Math.floor(Math.random() * weather.length)]}`,
				`Temperature: ${temp}°C`,
				'',
				'Perfect weather for coding! ☕',
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
			'Usage: cat <file>',
			'',
			'Available files:',
			'  about.md    - About me',
			'  resume.pdf  - My resume',
			'',
			'Try: cat about.md',
		],
		history: () => {
			const cmds = history
				.filter(h => h.type === 'command')
				.map((h, i) => `  ${i + 1}  ${h.content.replace('$ ', '')}`)
				.slice(-10);
			return ['Command History:', '', ...cmds];
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
				const result = getCommands.cat();
				const lines = Array.isArray(result) ? result : [result];
				lines.forEach(line => {
					history.push({ type: 'output', content: line });
				});
			} else if (file === 'about.md') {
				[
					'# About Baptiste Gosselin',
					'',
					'DevOps Engineer passionate about cloud infrastructure and automation.',
					'',
					'Core Expertise:',
					'• Kubernetes orchestration and cluster management',
					'• Infrastructure as Code with Terraform & Ansible',
					'• CI/CD pipelines and GitOps workflows',
					'• Cloud-native application development',
				].forEach(line => {
					history.push({ type: 'output', content: line });
				});
			} else if (file === 'resume.pdf') {
				[
					'📄 Resume',
					'',
					'Error: Cannot display binary file in terminal',
					'Tip: Visit /contact to download my resume',
				].forEach(line => {
					history.push({ type: 'output', content: line });
				});
			} else {
				history.push({ type: 'error', content: `cat: ${file}: No such file or directory` });
			}
		} else if (getCommands[command]) {
			const result = getCommands[command]();
			if (result) {
				const lines = Array.isArray(result) ? result : [result];
				lines.forEach(line => {
					history.push({ type: 'output', content: line });
				});
			}
		} else {
			history.push({
				type: 'error',
				content: `Command not found: ${command}`
			});
			history.push({
				type: 'output',
				content: 'Type "help" to see available commands.'
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
				placeholder="Type a command..."
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
