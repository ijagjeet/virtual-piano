<template>
  <div
    ref="graph"
    class='graph'
  />
</template>

<script>
  import { forEach } from 'lodash'
  import events from 'src/modules/event-bus'

  import PianoBlock from 'src/graphic/piano-block'

  export default {
    name: 'piano-keyboard-block',
    props: {
      buttons: {
        required: true,
        type: Array
      },
      onKeyup: {
        required: true,
        type: Function
      },
      onKeydown: {
        required: true,
        type: Function
      }
    },
    watch: {
      buttons: {
        handler (buttons) {
          this.piano.keyboard.updateButtons(buttons)
        },
        deep: true
      }
    },
    mounted () {
      this.piano = new PianoBlock({
        container: this.$refs.graph,
        buttons: this.buttons
      })

      this.onKeydown(button => {
        this.piano.trackRoad.addRoad(button)
        this.piano.trackRoad.growRoad(button.id)
      })

      this.onKeyup(button => {
        this.piano.trackRoad.moveRoad(button.id)
      })
    }
  }
</script>

<style scoped>
  .graph {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .graph::before {
    content: '';
    position: absolute;
    z-index: -1;
    top: calc(-50% - 130px);
    left: -50%;
    width: 200%;
    height: 150%;
    background-color: black;
  }
</style>
