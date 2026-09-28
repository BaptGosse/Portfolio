import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Theme = 'light' | 'dark';

// The theme is applied before render by the inline script in app.html
function readTheme(): Theme {
	if (!browser) return 'dark';
	return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

function createThemeStore() {
	const { subscribe, set } = writable<Theme>(readTheme());

	return {
		subscribe,
		toggle: () => {
			if (!browser) return;
			const next: Theme = readTheme() === 'dark' ? 'light' : 'dark';
			document.documentElement.dataset.theme = next;
			try {
				localStorage.setItem('theme', next);
			} catch {
				// Storage unavailable (private browsing): the theme only lasts for this page
			}
			set(next);
		},
		init: () => {
			if (!browser) return;
			set(readTheme());
		}
	};
}

export const theme = createThemeStore();
