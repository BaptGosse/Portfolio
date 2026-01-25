import * as LucideIcons from 'lucide-svelte';
import type { Icon } from 'lucide-svelte';

// Create a dynamic icon map from all Lucide icons
// Filter out non-icon exports (like 'Icon' type, 'createIcons', etc.)
const iconMap: Record<string, Icon> = {};

// List of known non-icon exports to exclude
const excludedExports = ['Icon', 'createIcons', 'icons'];

// Build the icon map dynamically
for (const [key, value] of Object.entries(LucideIcons)) {
	// Skip excluded exports and non-component values
	if (!excludedExports.includes(key) && typeof value === 'function') {
		iconMap[key] = value as Icon;
	}
}

/**
 * Get a Lucide icon component from an icon name.
 * If the icon name doesn't exist in the map, returns a default icon.
 * @param iconName - Name of the icon (e.g., "Heart", "MessageSquare", "Target")
 * @returns Lucide icon component
 */
export function getIcon(iconName: string): Icon {
	// Handle special case for Gamepad (exported as GamepadIcon)
	if (iconName === 'Gamepad') {
		return iconMap['GamepadIcon'] || iconMap['Heart'];
	}

	return iconMap[iconName] || iconMap['Heart'] || (() => null); // Default to Heart if not found
}

/**
 * Check if an icon name is a valid Lucide icon.
 * @param iconName - Name to check
 * @returns true if it's a valid Lucide icon name
 */
export function isLucideIcon(iconName: string): boolean {
	// Handle special case for Gamepad
	if (iconName === 'Gamepad') {
		return 'GamepadIcon' in iconMap;
	}
	return iconName in iconMap;
}

/**
 * Get all available icon names.
 * @returns Array of available icon names
 */
export function getAvailableIcons(): string[] {
	const icons = Object.keys(iconMap).sort();
	// Replace GamepadIcon with Gamepad in the list
	return icons.map(name => name === 'GamepadIcon' ? 'Gamepad' : name);
}
