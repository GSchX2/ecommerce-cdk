<template>
  <header>
    <HeaderPage />
  </header>
  <main>
    <RouterView />
  </main>
</template>

<script>
import { RouterView } from 'vue-router'
import HeaderPage from "./components/HeaderPage.vue";

export default {
  name: "App",
  components: {
    HeaderPage,
  },
};
</script>

<style scoped>
</style>
