<template>
  <div class="app">
    <vue-container />
  </div>
</template>

<script>
  import VueContainer from 'src/components/container/index.vue'

  export default {
    name: 'app',
    components: { VueContainer }
  }
</script>

<style scoped>
  .app {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    margin: 0;
    padding: 0;
  }
</style>
