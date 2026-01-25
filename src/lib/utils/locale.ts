export type Locale = 'fr' | 'en';

export function getLocale(localeString: string | undefined): Locale {
	if (localeString === 'en') return 'en';
	return 'fr';
}
