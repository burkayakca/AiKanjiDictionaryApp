import { create } from "zustand";


const Store = create((set) => ({
    settingsScreenOpen: false,
    language: 'en',

    toggleLanguage: () =>
        set((state) => ({
            language: state.language === 'en' ? 'tr' : 'en',
    })),

    toggleSettingsScreen: () =>
        set((state) => ({
            settingsScreenOpen: !state.settingsScreenOpen,
        })),
}))

export default Store;