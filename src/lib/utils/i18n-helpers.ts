export function formatDateRange(start: Date, end: Date | null, locale: string): string {
	const formatter = new Intl.DateTimeFormat(locale, {
		year: 'numeric',
		month: 'long'
	});

	const startStr = formatter.format(start);
	const endStr = end ? formatter.format(end) : locale === 'fr' ? 'Présent' : 'Present';

	return `${startStr} - ${endStr}`;
}

export function getLocalizedField<T>(field: { fr: T; en: T }, locale: string): T {
	return locale === 'en' ? field.en : field.fr;
}
