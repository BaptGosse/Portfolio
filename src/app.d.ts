// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { Locale } from '$lib/utils/locale';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user?: {
				id: string;
				email: string;
				name: string;
			};
			locale?: Locale;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
