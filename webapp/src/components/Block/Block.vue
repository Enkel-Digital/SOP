<!--
  Render dispatch function.

  For every new block, all the info we have at the start is just the
  `BlockID`, and this component cannot determine what is the Block type
  with just the ID alone, which means that in the different block's UI
  component, it would not know what child component to load and use for
  a given child block.

  Therefore in those components that have nested children, it will use
  this render dispatch UI component to load the block from blockStore,
  then based on the loaded block's `type` property, dispatch / render
  different block's UI component conditionally using v-if!
-->

<script setup lang="ts">
import type { BlockID } from "../../types/Blocks";

import { useStore } from "../../store/index";

import SOPBlock from "./SOP.vue";
import CheckboxBlock from "./Checkbox.vue";

// Destructuring this because it does not matter if this loses
// reactivity since id is not expected to change.
// eslint-disable-next-line vue/no-setup-props-destructure
const { id } = defineProps<{ id: BlockID }>();

// The return value is just used to determine the type during runtime
// to dynamically dispatch the different Block UI components.
const block = await useStore().getBlock(id);
</script>

<template>
  <!-- Dynamically select the appropriate component to render the Block -->

  <template v-if="block.type === 'SOP'">
    <div class="section mx-3 py-0">
      <SOPBlock :block="block" />
    </div>
  </template>

  <template v-else-if="block.type === 'checkbox'">
    <CheckboxBlock :block="block" />
  </template>
</template>
