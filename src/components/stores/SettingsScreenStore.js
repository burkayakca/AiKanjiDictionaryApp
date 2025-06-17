import { create } from "zustand";


const settingsScreenStore =  create ((set) => ({
    settingsScreenOpen: false,
    toggleSettingsScreen: () =>
        set((state) => ({
            settingsScreenOpen: !state.settingsScreenOpen,
        })),
}))

export default settingsScreenStore;