<!--
    This view component loads just a single SOP asynchronously
    and call the SOP block component to render it.

    The reason why SOP block component is not used as the view
    component directly, is because there can be nested SOPs,
    but only the root SOP needs to have the initial load first.
-->

<script setup lang="ts">
import { useStore } from "../store/index";

import SOPBlock from "../components/Block/SOP.vue";
import type { UUID } from "../types/Blocks";

// Destructuring this because it does not matter if this loses reactivity since sopID is not expected to change
// eslint-disable-next-line vue/no-setup-props-destructure
const { sopID } = defineProps<{ sopID: UUID }>();

// Load the block into store and get it back asynchronously
const SOP = await useStore().getSopBlock(sopID);
</script>

<template>
  <!-- @todo Move this class into SOP component? -->
  <div class="section mx-3 py-0">
    <SOPBlock :sop="SOP" />
  </div>
</template>
