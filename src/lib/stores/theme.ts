import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Theme = 'light' | 'dark';

// The theme is applied before render by the inline script in app.html
function readTheme(): Theme {
	if (!browser) return 'light';
	return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

function hasStoredChoice(): boolean {
	try {
		const stored = localStorage.getItem('theme');
		return stored === 'light' || stored === 'dark';
	} catch {
		return false;
	}
}

function createThemeStore() {
	const { subscribe, set } = writable<Theme>(readTheme());
	let listening = false;

	function apply(next: Theme) {
		document.documentElement.dataset.theme = next;
		set(next);
	}

	return {
		subscribe,
		toggle: () => {
			if (!browser) return;
			const next: Theme = readTheme() === 'dark' ? 'light' : 'dark';
			try {
				localStorage.setItem('theme', next);
			} catch {
				// Storage unavailable (private browsing): the theme only lasts for this page
			}
			apply(next);
		},
		init: () => {
			if (!browser) return;
			set(readTheme());

			// Follow the OS setting until the visitor picks a theme
			if (listening) return;
			listening = true;
			window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
				if (!hasStoredChoice()) apply(event.matches ? 'dark' : 'light');
			});
		}
	};
}

export const theme = createThemeStore();
