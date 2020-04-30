<template>
  <div class="recorder">
    <el-button
      v-if="!recording"
      @click="startRecord"
      size="large"
    >
      <div class="inner">
        <i class="mdi record-icon">fiber_manual_record</i>
        Record
      </div>
    </el-button>
    <el-button
      v-if="recording"
      @click="stopRecord"
      size="large"
    >
      <div class="inner">
        <i class="mdi stop-icon">stop</i>
        Stop
      </div>
    </el-button>
    <el-button
      v-if="!recording && track.length"
      @click="saveTrack"
      size="large"
    >
      <div class="inner">
        <i class="mdi save-icon">save</i>
        Save
      </div>
    </el-button>
  </div>
</template>

<script>
  import * as recorderTypes from 'src/store/types/recorder'
  import * as recordsTypes from 'src/store/types/records'

  export default {
    name: 'recorder',
    data: () => ({
      recording: false
    }),
    computed: {
      track () {
        return this.$store.state.recorder.track
      }
    },
    methods: {
      startRecord () {
        const { commit } = this.$store

        commit(recorderTypes.CLEAR_TRACK)
        commit(recorderTypes.START_RECORD)

        this.recording = true
      },
      stopRecord () {
        this.recording = false
        this.timeRecord = 0
        this.intervalIncreasing && clearInterval(this.intervalIncreasing)

        const { commit } = this.$store

        commit(recorderTypes.STOP_RECORD)
      },
      async saveTrack () {
        const { dispatch } = this.$store
        const [ err, response ] = await to(this.$prompt('Record title', 'Save record', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          inputPattern: /^.+$/,
          inputErrorMessage: 'Min 1 character.'
        }))
        const title = response.value

        if (err || !title) return

        title && dispatch(recordsTypes.ADD_RECORD, { title, track: this.track })
      },
      withText (time) {
        return `${time} sec`
      }
    }
  }
</script>

<style scoped>
  .recorder {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
  }

  .inner {
    display: flex;
    align-items: center;
    line-height: 0;
  }

  .mdi {
    margin-right: 5px;
  }

  .record-icon {
    color: #ff6d6d;
  }

  .stop-icon,
  .save-icon {
    color: #1f2d3d;
  }
</style>
