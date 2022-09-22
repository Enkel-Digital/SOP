<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <Navbar />

  <!-- Center router view element horizontally -->
  <div class="container">
    <!--
      RouterView is a component that loads a component (usually dynamically) based on
      the current URL route. However since there are many async SFCs defined, they
      cannot be rendered directly with <RouterView />. Therefore `Suspense` is added
      at the top level to await and ensure all is loaded before anything is shown.

      RouterView component has a default slot, and the route Component is passed into
      the default slot. Instead of passing it to `component` directly, the rendering
      with `component` is nested in Suspense.

      Reference links:
      - https://router.vuejs.org/guide/advanced/lazy-loading.html
      - https://vuejs.org/guide/components/async.html
      - https://vuejs.org/guide/built-ins/suspense.html
    -->
    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <Suspense>
          <!-- Show the Component selected by the router dynamically using 'component' -->
          <component :is="Component"></component>

          <!-- Loading component -->
          <template #fallback>
            <!-- @todo Create an actual full screen loader component -->
            Loading...
          </template>
        </Suspense>
      </template>
    </RouterView>
  </div>
</template>

<style>
/* Unscoped styles that applies to the entire application */

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/*
  Color input pink if it is invalid --> e.g. when telephone number does not match the specified pattern
  Will only activate if the placeholder is not currently being shown, meaning will not show before user type anything
*/
input:not(:placeholder-shown):invalid {
  background-color: lightpink;
}
</style>
