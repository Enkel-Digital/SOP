<script setup lang="ts">
import { useStore } from "../../store";
import { useSettings } from "../../store/settings";
import { useNotif } from "../../store/notif";
import Block from "./Block.vue";

import type { SopBlock } from "../../types/Blocks";

const props = defineProps<{ block: SopBlock }>();

/**
 * Reset function that wraps around the resetSOP method in block store
 */
function reset() {
  if (
    useSettings().settings.confirmBeforeReset &&
    !confirm("Reset SOP?\nThis will uncheck all checkboxes")
  )
    return;

  useStore()
    .resetSOP(props.block.id)
    .then(() => useNotif().showNotif("SOP resetted"));
}
</script>

<template>
  <div class="columns is-vcentered is-mobile">
    <div class="column">
      <p class="title">{{ block.properties.title }}</p>
    </div>

    <!-- @todo Only show the button to add if user created it or has enough permissions  -->
    <!-- @todo Might be a router link to bring it somewhere to edit? Or can we edit in place? -->
    <div class="column is-narrow">
      <button class="button is-light">Edit</button>
    </div>

    <div class="column is-narrow">
      <button class="button is-light is-danger" @click="reset">Reset</button>
    </div>
  </div>

  <div v-for="(childID, i) in block.children" :key="childID">
    <div class="columns is-vcentered is-mobile">
      <div class="column is-size-4 is-narrow">{{ i + 1 }}.</div>

      <div class="column">
        <Block :id="childID" />
      </div>
    </div>
  </div>

  <!-- @todo Only show the FAB button to add items if user created it or has enough permissions -->
</template>
