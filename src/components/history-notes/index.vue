<template>
  <div class="history">
    <div
      v-for="(button, index) in historyPressedButtons"
      class="note-item"
      :key="button.nodeId + button.octaveId"
    >
      <div
        class="note-name"
        v-text="getNoteName(button)"
      />
      <div
        class="key-name"
        v-text="button.key"
      />
    </div>
  </div>
</template>

<script>
import { difference } from 'lodash'
import { concat, take, pipe } from 'lodash/fp'
import * as notes from 'src/constants/notes'

const HISTORY_LENGTH = 20

export default {
  name: 'history-notes',
  data: () => ({ historyPressedButtons: [] }),
  computed: {
    pressedButtons () {
      return this.$store.getters.pressedButtons
        .sort((a, b) => a.time - b.time)
    }
  },
  watch: {
    pressedButtons: function (newV, oldV) {
      const diff = difference(oldV, newV)

      if (!diff.length) return

      this.historyPressedButtons = pipe(
        concat(diff),
        take(HISTORY_LENGTH)
      )(this.historyPressedButtons)
    }
  },
  methods: {
    getNoteName ({ noteId }) {
      return notes.map[noteId]
    }
  }
}
</script>

<style scoped>
.history {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30px;
  font-size: 12px;
}

.note-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 2em;
}

</style>
