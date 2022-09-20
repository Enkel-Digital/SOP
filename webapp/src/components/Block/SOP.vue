<script setup lang="ts">
import CheckBox from "./CheckBox.vue";

import type { SopBlock } from "../../types/Blocks";

const props = defineProps<{ sop: SopBlock }>();

/**
 * @todo
 * Reset all the checked items (uncheck them)
 */
function reset() {
  //
}
</script>

<template>
  <div class="columns is-vcentered is-mobile">
    <div class="column">
      <p class="title">{{ sop.properties.title }}</p>
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

  <!-- Remove the type cast and actually test for this Block type -->
  <!-- How to async load this content? And pass it to a child component? -->
  <!-- Make this vibrate on click for mobile devices -->
  <!-- Load different types of Block components based on Block type to render the child blocks -->
  <!-- How do I lazily import the component? If i import all of them at the top... then this will be huge to load -->
  <div v-for="(childID, i) in sop.children" :key="childID">
    <div class="columns is-vcentered is-mobile">
      <div class="column is-size-4 is-narrow">{{ i + 1 }}.</div>

      <div class="column">
        <!-- <CheckBox :block="child" :index="i" /> -->
        <CheckBox :id="childID" :index="i" />
      </div>
    </div>
  </div>

  <!-- @todo Only show the FAB button to add items if user created it or has enough permissions -->
</template>
