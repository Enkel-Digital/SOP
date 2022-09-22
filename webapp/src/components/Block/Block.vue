<!--
  Render dispatch function.
-->

<script setup lang="ts">
import type { BlockID } from "../../types/Blocks";

import { useStore } from "../../store/index";

import SOPBlock from "./SOP.vue";
import CheckboxBlock from "./Checkbox.vue";

// Destructuring this because it does not matter if this loses
// reactivity since blockID is not expected to change.
// eslint-disable-next-line vue/no-setup-props-destructure
const { blockID } = defineProps<{ blockID: BlockID }>();

// The return value is just used to determine the type during runtime
// to dynamically dispatch the different Block UI components.
const block = await useStore().getBlock(blockID);
</script>

<template>
  <template v-if="block.type === 'SOP'">
    <div class="section mx-3 py-0">
      <SOPBlock :sop="block" />
    </div>
  </template>

  <template v-else-if="block.type === 'checkbox'">
    <CheckboxBlock :id="blockID" />
  </template>
</template>
