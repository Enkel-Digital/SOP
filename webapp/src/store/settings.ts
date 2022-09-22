import { defineStore } from "pinia";

import { oof } from "simpler-fetch";

interface State {
  settings: {
    confirmBeforeReset: boolean;
  };
}

/**
 * Settings store for all user settings
 */
export const useSettings = defineStore(
  // The first argument is a unique id of the store across your application
  "settings",

  {
    // arrow function recommended for full type inference
    state: (): State => ({
      // All settings are nested in a settings object so it can be easily
      // watched. Instead of watching the whole store object which includes
      // other properties like the methods and all, this groups all settings
      // value together making it easier to just watch the settings value.
      settings: {
        confirmBeforeReset: true,
      },
    }),

    actions: {
      /**
       * Sync settings with backend
       */
      async sync() {
        // @todo Watch for change in settings. Then write to API on change
      },
    },

    // https://www.npmjs.com/package/pinia-plugin-persistedstate
    // Persists this store's state in localStorage to reuse across sessions
    // Note that this is not efficient for large to extremely large state trees,
    // as on every state change, the entire tree is serialized and saved.
    persist: true,
  }
);
