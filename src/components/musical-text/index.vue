<template>
  <div class="musical-text" v-text='text' />
</template>

<script>
import { loadText } from 'src/actions/musical-texts'

export default {
  name: 'musical-text',
  data: () => ({ text: '' }),
  computed: {
    name () { return this.$route.params.name }
  },
  watch: {
    name (v) {
      this.setNewText(v)
    }
  },
  mounted () {
    this.setNewText(this.name)
  },
  methods: {
    async setNewText (v) {
      this.text = v ? await loadText(v) : ''
    }
  }
}
</script>

<style scoped>
.musical-text {
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
  white-space: pre;
}
</style>
