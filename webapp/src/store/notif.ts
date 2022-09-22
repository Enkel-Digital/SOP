import { defineStore } from "pinia";

interface State {
  notif: boolean;
  notifContent: string;
  notifColor: "primary" | "warning" | "danger";
  autoCloseTimeout?: number;
}

/**
 * Pinia store to group all in app notification banner logic
 */
export const useNotif = defineStore(
  // The first argument is a unique id of the store across your application
  "notif",

  {
    // arrow function recommended for full type inference
    state: (): State => ({
      notif: false,
      notifContent: "",
      notifColor: "primary",
      autoCloseTimeout: undefined,
    }),

    actions: {
      /**
       * Removes any existing timeouts. To call this before adding a
       * new timeout or just removing it.
       */
      clearTimeoutIfAny() {
        // If there is already an auto close timeout set, remove it,
        // So that the auto close will not close a newly requested banner
        if (this.autoCloseTimeout) {
          clearTimeout(this.autoCloseTimeout);
          this.autoCloseTimeout = undefined;
        }
      },

      /**
       * Show notification banner and display given content
       */
      showNotif(
        notifContent: string,
        { color = "primary", timeout = 3000 } = {}
      ) {
        this.clearTimeoutIfAny();

        this.notif = true;
        this.notifContent = notifContent;

        if (color !== "primary" && color !== "warning" && color !== "danger")
          throw new Error(
            "Internal Error: Invalid notification color received"
          );

        this.notifColor = color;

        // Auto close notif banner after timeout
        this.autoCloseTimeout = setTimeout(() => (this.notif = false), timeout);
      },

      /**
       * Clear the current notification banner shown
       */
      clearNotif() {
        this.clearTimeoutIfAny();
        this.notif = false;
      },
    },
  }
);
