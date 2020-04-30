import Vue from 'vue'

export default new Vue({
  methods: {
    on (e, cb) { return this.$on(e, cb) },
    emit (e, data) { return this.$emit(e, data) }
  }
})
