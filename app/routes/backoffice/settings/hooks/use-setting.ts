import { useSettingsStore } from '../stores/use-settings-store';

/**
 * Reactively subscribe to a single setting value.
 * @param key The setting key (e.g., 'maintenance_mode')
 * @param defaultValue Fallback value if setting not found
 * @returns The current value (reactively updated)
 */
export function useSetting(key: string, defaultValue: any = null) {
    return useSettingsStore((state) => {
        const setting = state.settings.find((s) => s.key === key);
        return setting?.value ?? defaultValue;
    });
}