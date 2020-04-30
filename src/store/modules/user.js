import * as types from 'src/store/types/user'

const state = {
  user: null
}

const getters = {}

const mutations = {
  [types.RESET] (state, user) {
    state.user = user
  },
  [types.SET] (state, user) {
    state.user = { ...state.user, user }
  },
  [types.REMOVE] (state) {
    state.user = null
  }
}

const actions = {
}

export default {
  state,
  getters,
  mutations,
  actions
}
