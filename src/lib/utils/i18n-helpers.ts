export type Localized<T = string> = { fr: T; en: T };

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

/** Value in the requested language, falling back to French. */
export function pick<T>(field: Localized<T>, locale: string | null | undefined): T {
	return (locale === 'en' ? field.en : field.fr) || field.fr;
}

/** e.g. "Go, Docker and PostgreSQL" */
export function formatList(items: string[], locale: string | null | undefined): string {
	return new Intl.ListFormat(locale || 'fr', { style: 'long', type: 'conjunction' }).format(items);
}

/** e.g. "Sep 2024 – today" */
export function formatPeriod(
	start: Date | string,
	end: Date | string | null,
	locale: string | null | undefined,
	presentLabel: string
): string {
	const formatter = new Intl.DateTimeFormat(locale || 'fr', { year: 'numeric', month: 'short' });
	const startStr = formatter.format(new Date(start));
	const endStr = end ? formatter.format(new Date(end)) : presentLabel;
	return `${startStr} – ${endStr}`;
}
