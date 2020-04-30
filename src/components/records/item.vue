<template>
  <el-card
    class="record"
    :body-style="{ padding: '15px', position: 'relative' }"
  >
    <div slot="header" class="header">
      <span class="title" v-text="record.title" />
      <i class="mdi md-18 share" @click="share">share</i>
      <input class="link" ref="linkInput" v-model="sharedLink" />
    </div>
    <canvas ref="timeline" class="timeline" />
    <div class="buttons">
      <el-button
        v-if="!playing"
        type="success"
        class="button"
        @click="play"
      >
        <div class="inner">
          <i class="icon mdi md-18">play_arrow</i>
          <span>play</span>
        </div>
      </el-button>
      <el-button
        v-if="!playing"
        type="success"
        class="button"
        @click="loop"
      >
        <div class="inner">
          <i class="icon mdi md-18">loop</i>
          <span>loop</span>
        </div>
      </el-button>
      <el-button
        v-if="playing"
        type="warning"
        class="button"
        @click="pause"
      >
        <div class="inner">
          <i class="icon mdi md-18">pause</i>
          <span>pause</span>
        </div>
      </el-button>
      <el-button
        v-if="playing"
        type="warning"
        class="button"
        @click="stop"
      >
        <div class="inner">
          <i class="icon mdi md-18">stop</i>
          <span>stop</span>
        </div>
      </el-button>
    </div>
    <div class="footer">
      <el-button type="danger" size="small" class="button" @click="remove">
        <div class="inner">
          <i class="icon mdi md-18">delete</i>
          <span>delete</span>
        </div>
      </el-button>
    </div>
  </el-card>
</template>

<script>
  import * as typesRecords from 'src/store/types/records'

  import { last } from 'lodash'
  import Timeline from 'src/graphic/simple-timeline'
  import TrackPlayer from 'src/modules/track-player'

  export default {
    name: 'record',
    props: {
      record: {
        required: true,
        type: Object
      },
      getSharedLink: {
        required: true,
        type: Function
      },
      shareRecord: {
        required: true,
        type: Function
      }
    },
    data: () => ({
      playing: false,
      isBroken: false
    }),
    computed: {
      sharedLink () {
        return this.getSharedLink(this.record.uid)
      }
    },
    mounted () {
      this.initTimeline()
    },
    destroyed () {
      this.timeline = null
    },
    methods: {
      share () {
        this.shareRecord(this.$refs.linkInput)
      },
      initTimeline () {
        const action = last(this.record.track)
        const duration = action && action.payload ? action.payload.time : null

        if (!duration) {
          this.isBroken = true
          return
        }

        this.timeline = new Timeline({ container: this.$refs.timeline, duration })
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
        if (!this.player) {
          this.player = this.initPlayer()
        }

        this.player.play()
      },
      loop () {
        if (!this.check()) return
        if (!this.player) {
          this.player = this.initPlayer()
        }

        this.player.loop()
      },
      pause () {
        this.player.pause()
      },
      stop () {
        if (this.player) {
          this.player.stop()
        }
      },
      remove () {
        this.stop()
        this.$store.commit(typesRecords.REMOVE_RECORD, this.record.uid)
      },
      initPlayer () {
         return new TrackPlayer({
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
       }
    }
  }
</script>

<style scoped>
  .record {
    position: relative;
    display: flex;
    flex-direction: column;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .link {
    position: absolute;
    top: -99999px;
  }

  .share {
    cursor: pointer;
  }

  .timeline {
    position: absolute;
    top: -1px;
    width: calc(100% - 30px);
    height: 2px;
    overflow: hidden;
    border-right: 3px;
  }

  .buttons {
    display: flex;
  }

  .button {
    width: 100px;
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

  .footer {
    margin-top: 10px;
  }
</style>
