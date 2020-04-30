import * as types from 'src/store/types/recorder'

const state = {
  record: false,
  track: []
}

const getters = {}

const mutations = {
  [types.START_RECORD] (state) {
    state.record = true
  },
  [types.STOP_RECORD] (state) {
    state.record = false
  },
  [types.CLEAR_TRACK] (state) {
    state.track = []
  },
  [types.PUSH_TO_TRACK] (state, button) {
    state.track.push(button)
  }
}

export default {
  state,
  getters,
  mutations
}
