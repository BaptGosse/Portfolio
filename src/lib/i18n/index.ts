import { register, init, getLocaleFromNavigator } from 'svelte-i18n';

const supportedLocales = ['fr', 'en'];

register('fr', () => import('./locales/fr.json'));
register('en', () => import('./locales/en.json'));

function getInitialLocale(): string {
	// Check localStorage first
	if (typeof window !== 'undefined') {
		const stored = localStorage.getItem('locale');
		if (stored && supportedLocales.includes(stored)) {
			return stored;
		}
	}

	// Check browser language
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
