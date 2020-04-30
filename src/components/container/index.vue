<template>
  <div class="container">
    <router-view class="focus-record" name="focusRecord" />

    <MainMenu />

    <div class="piano-container">
      <PianoBlock />
    </div>

    <Recorder />
    <Records />

    <router-view class="auth" name="auth" />
  </div>
</template>

<script>
  import MainMenu from 'src/connects/menu'
  import FocusRecord from 'src/connects/focus-record'
  import PianoBlock from 'src/connects/piano-block'
  import Recorder from 'src/components/recorder/index.vue'
  import Records from 'src/connects/records'

  export default {
    name: 'container',
    components: { MainMenu, FocusRecord, PianoBlock, Recorder, Records }
  }
</script>

<style scoped>
  .container {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    padding: 10px;
  }

  .focus-record {
    position: absolute;
    z-index: 1;
    top: 20px;
    left: 30px;
    right: 30px;
  }

  .piano-container {
    width: 100%;
    height: 400px;
  }

  .row {
    margin: 10px;
  }

  .lower-piano {
    flex-grow: 1;
  }

  .auth {
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    padding: 20px;
  }
</style>
