<script setup lang="ts">
import Navbar from "./components/Navbar.vue";

import { useNotif } from "./store/notif";
const notif = useNotif();
</script>

<template>
  <Navbar />

  <!-- @todo Fix banner placement -->

  <!--
    Notification banner

    Use a fixed position and apply overlay style so that the notification will
    not take up space on the normal plane and push everything else down.
  -->
  <div
    v-if="notif.notif"
    style="
      max-width: 50em;

      position: fixed;
      top: 1rem;
      z-index: 100;
      width: 100%;
    "
  >
    <!-- Only apply the box shadow to the notification bar itself -->
    <div
      class="notification is-light"
      :class="{ [`is-${notif.notifColor}`]: true }"
      style="box-shadow: 0 0.3rem 1rem rgb(0 0 0 / 0.4)"
    >
      <button class="delete" @click="notif.clearNotif"></button>

      <!--
        Allow HTML content to be shown, this is treated as safe since notification
        content strings are hardcoded within the app itself.

        Word wrap CSS added to deal with unusually long slugs on small screens.
      -->
      <!-- eslint-disable-next-line vue/no-v-html -->
      <span style="word-wrap: break-word" v-html="notif.notifContent" />
    </div>
  </div>

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
