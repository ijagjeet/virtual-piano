import * as types from 'store/types/musical-texts'

const state = {
  active: ''
}

const getters = {}

const mutations = {
  [types.SET_ACTIVE] (state, fileName) {
    state.active = fileName
  }
}

export default {
  state,
  getters,
  mutations
}
