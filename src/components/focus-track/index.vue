<template>
  <div v-if="record" class="focus-track">
    <div class="buttons">
      <el-button
        v-if="!playing"
        type="text"
        size="small"
        class="button success"
        @click="play"
      >
        <div class="inner">
          <i class="icon mdi md-18">play_arrow</i>
          <span>play</span>
        </div>
      </el-button>
      <el-button
        v-if="!playing"
        type="text"
        size="small"
        class="button success"
        @click="loop"
      >
        <div class="inner">
          <i class="icon mdi md-18">loop</i>
          <span>loop</span>
        </div>
      </el-button>
      <el-button
        v-if="playing"
        type="text"
        size="small"
        class="button warning"
        @click="pause"
      >
        <div class="inner">
          <i class="icon mdi md-18">pause</i>
          <span>pause</span>
        </div>
      </el-button>
      <el-button
        v-if="playing"
        type="text"
        size="small"
        class="button warning"
        @click="stop"
      >
        <div class="inner">
          <i class="icon mdi md-18">stop</i>
          <span>stop</span>
        </div>
      </el-button>
    </div>
    <div class="right">
      <span class="title" v-text="record.title" />
      <i class="close mdi md-14" @click="close">close</i>
    </div>
    <canvas ref="timeline" class="timeline" />
  </div>
</template>

<script>
  import * as typesRecords from 'src/store/types/records'

  import { last } from 'lodash'
  import Timeline from 'src/graphic/simple-timeline'
  import TrackPlayer from 'src/modules/track-player'

  export default {
    name: 'focus-record',
    props: {
      record: {
        required: true
      },
      close: {
        required: true,
        type: Function
      }
    },
    data: () => ({
      playing: false,
      isBroken: false
    }),
    watch: {
      record (record) {
        this.init()
      }
    },
    created () {
      this.el = null
      this.player = null

      this.init()
    },
    destroyed () {
      if (this.player) {
        this.player.pause()
      }
    },
    methods: {
      init () {
        const { record } = this

        if (!record) return

        this.$nextTick(() => {
          if (record && record.track.length > 0) {
            this.el = this.$refs.timeline

            this.initTimeline()
            this.initPlayer()
          }
        })
      },
      initTimeline () {
        const action = last(this.record.track)
        const duration = action && action.payload ? action.payload.time : null

        if (!duration) {
          this.isBroken = true
          return
        }

        this.timeline = new Timeline({ container: this.el, duration })
      },
      initPlayer () {
        this.player = new TrackPlayer({
          track: [ ...this.record.track ],
          onPlay: () => {
            this.timeline.start()
            this.playing = true
          },
          onLoop: () => {
            this.timeline.start()
            this.playing = true
          },
          onPause: () => {
            this.timeline.stop()
            this.playing = false
          },
          onStop: () => {
            this.timeline.stop()
            this.timeline.goToStart()
            this.playing = false
          },
          onStart: () => {
            this.playing = true
            this.timeline.goToStart()
            this.timeline.start()
          },
          onEnd: () => {
            this.timeline.goToEnd()
            this.timeline.stop()
            this.playing = false
          }
        })
      },
      check () {
        if (this.isBroken) {
          this.$alert('Something went wrong :(', 'Error', {
            type: 'error',
            confirmButtonText: 'Close'
          })
        }

        return !this.isBroken
      },
      play () {
        if (!this.check()) return
        this.player.play()
      },
      loop: function () {
        if (!this.check()) return
        this.player.loop()
      },
      pause () {
        this.player.pause()
      },
      stop () {
        this.player.stop()
      }
    }
  }
</script>

<style scoped>
  .focus-track {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }

  .right {
    display: flex;
    align-items: center;
    margin-right: 5px;
  }

  .title {
    color: white;
    margin-right: 10px;
  }

  .close {
    cursor: pointer;
    color: white;
    opacity: .5;
    transition: opacity .15s;
  }

  .close:hover {
    opacity: 1;
  }

  .timeline {
    position: relative;
    width: 100%;
    margin-top: 10px;
    height: 3px;
    overflow: hidden;
    border-right: 3px;
    background-color: rgba(255,255,255, .5);
    opacity: .7;
  }

  .buttons {
    display: flex;
  }

  .button {
    width: 60px;
  }

  .button.success {
    color: var(--color-success);
  }

  .button.warning {
    color: var(--color-warning);
  }

  .inner {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .icon {
    margin-right: 5px;
  }

  .button + .button {
    margin-left: 10px;
  }
</style>
