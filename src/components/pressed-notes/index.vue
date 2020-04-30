<template>
  <div class="pressed-buttons">
    <div
      v-for="(button, index) in pressedButtons"
      class="note-item"
      :key="index"
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
import * as notes from 'src/constants/notes'

export default {
  name: 'pressed-notes',
  computed: {
    pressedButtons () {
      return this.$store.getters.pressedButtons
        .sort((a, b) => a.time - b.time)
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
.keyboard {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
}

.buttons {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 150px;
}

.pressed-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60px;
  font-size: 24px;
}

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
