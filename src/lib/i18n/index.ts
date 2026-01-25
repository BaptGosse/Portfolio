import { register, init, getLocaleFromNavigator } from 'svelte-i18n';

const supportedLocales = ['fr', 'en'];

register('fr', () => import('./locales/fr.json'));
register('en', () => import('./locales/en.json'));

function getCookie(name: string): string | null {
	if (typeof document === 'undefined') return null;
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
	return null;
}

function getInitialLocale(): string {
	// Priority 1: Check cookie (set by server)
	if (typeof window !== 'undefined') {
		const cookieLocale = getCookie('locale');
		if (cookieLocale && supportedLocales.includes(cookieLocale)) {
			// Also sync to localStorage
			localStorage.setItem('locale', cookieLocale);
			return cookieLocale;
		}
	}

	// Priority 2: Check localStorage
	if (typeof window !== 'undefined') {
		const stored = localStorage.getItem('locale');
		if (stored && supportedLocales.includes(stored)) {
			return stored;
		}
	}

	// Priority 3: Check browser language
	const browserLocale = getLocaleFromNavigator();
	if (browserLocale) {
		const lang = browserLocale.split('-')[0]; // 'en-US' -> 'en'
		if (supportedLocales.includes(lang)) {
			return lang;
		}
	}

	// Default to French
	return 'fr';
}

init({
	fallbackLocale: 'fr',
	initialLocale: getInitialLocale()
});
