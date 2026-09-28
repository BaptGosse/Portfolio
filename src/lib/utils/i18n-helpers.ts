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

/** Valeur dans la langue demandée, avec repli sur le français. */
export function pick<T>(field: Localized<T>, locale: string | null | undefined): T {
	return (locale === 'en' ? field.en : field.fr) || field.fr;
}

/** « Go, Docker et PostgreSQL » / « Go, Docker and PostgreSQL » */
export function formatList(items: string[], locale: string | null | undefined): string {
	return new Intl.ListFormat(locale || 'fr', { style: 'long', type: 'conjunction' }).format(items);
}

/** « sept. 2024 – aujourd'hui » */
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
