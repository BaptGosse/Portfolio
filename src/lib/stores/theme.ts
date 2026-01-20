import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Theme = 'light' | 'dark';

function createThemeStore() {
	const storedTheme = browser ? localStorage.getItem('theme') as Theme : null;
	const initialTheme = storedTheme || 'dark';

	const { subscribe, set } = writable<Theme>(initialTheme);

	return {
		subscribe,
		toggle: () => {
			if (!browser) return;

			const currentTheme = localStorage.getItem('theme') as Theme || 'dark';
			const newTheme: Theme = currentTheme === 'dark' ? 'light' : 'dark';

			localStorage.setItem('theme', newTheme);
			document.documentElement.setAttribute('data-theme', newTheme);
			set(newTheme);
		},
		init: () => {
			if (!browser) return;

			const theme = localStorage.getItem('theme') as Theme || 'dark';
			document.documentElement.setAttribute('data-theme', theme);
			set(theme);
		}
	};
}

export const theme = createThemeStore();
