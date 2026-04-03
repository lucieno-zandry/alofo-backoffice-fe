import { create } from "zustand";
import { persist } from "zustand/middleware";

export type PreferenceStore = {
    language: string;
    theme: string;
    setPreferences: (
        preferences: Partial<Pick<PreferenceStore, "language" | "theme">>
    ) => void;
};

const usePreferenceStore = create<PreferenceStore>()(
    persist(
        (set) => ({
            language: "en",
            theme: "system",
            setPreferences: (preferences) => {
                set((state) => ({ ...state, ...preferences }));
            },
        }),
        {
            name: "preferences",
        }
    )
);

export default usePreferenceStore;
