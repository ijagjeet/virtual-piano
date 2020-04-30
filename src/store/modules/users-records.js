import * as types from 'src/store/types/users-records'
import Vue from 'vue'

const state = {}

const getters = {}

const mutations = {
  [types.ADD] (state, { userUid, recordUid, record }) {
    if (!state[userUid]) {
      Vue.set(state, userUid, {})
    }

    Vue.set(state[userUid], recordUid, record)
  },
  [types.REMOVE] (state, { userUid, recordUid }) {
    if (!state[userUid]) return

    state[userUid][recordUid] = null
  }
}

const actions = {}

export default {
  state,
  getters,
  mutations,
  actions
}
