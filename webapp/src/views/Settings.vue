<script setup lang="ts">
import { watch } from "vue";

import { useNotif } from "../store/notif";
import { useSettings } from "../store/settings";

const settingsStore = useSettings();
const showNotif = useNotif().showNotif;

// The settings state is writable through the UI directly,
// any changes to the settings state will trigger a notification.
watch(settingsStore.settings, () => showNotif("Settings updated!"));
</script>

<template>
  <div class="container mx-5">
    <div class="columns is-multiline is-vcentered">
      <div class="column">
        <p class="title">Settings</p>
      </div>

      <div class="column is-narrow">
        <button class="button is-light is-success" @click="$router.back">
          Back
        </button>
      </div>

      <div class="column is-full">
        <div class="box">
          <p class="subtitle">Others</p>

          <div class="mx-3 is-clickable is-unselectable">
            <label class="checkbox">
              <input
                v-model="settingsStore.settings.confirmBeforeReset"
                type="checkbox"
              />
              Show confirmation dialog before reset?
            </label>
          </div>

          <div class="mx-3">
            <hr />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
