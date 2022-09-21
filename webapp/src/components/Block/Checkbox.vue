<script setup lang="ts">
import { useStore } from "../../store/index";

import type { Checkbox_UUID } from "../../types/Blocks";

const props = defineProps<{ id: Checkbox_UUID }>();

// Load the block into store and get it back asynchronously
const block = await useStore().getCheckboxBlock(props.id);
</script>

<template>
  <div
    class="is-unselectable is-clickable"
    @click="block.properties.checked = !block.properties.checked"
  >
    <div
      class="box mb-4"
      :class="{ 'has-background-light': block.properties.checked }"
    >
      <div class="columns is-vcentered">
        <div class="column">
          <p
            class="is-size-5 is-inline"
            :style="{
              'text-decoration': block.properties.checked
                ? 'line-through'
                : 'none',
            }"
          >
            {{ block.properties.title }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
