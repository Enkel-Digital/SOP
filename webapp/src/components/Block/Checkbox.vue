<script setup lang="ts">
import type { CheckboxBlock } from "../../types/Blocks";

defineProps<{ block: CheckboxBlock }>();
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
