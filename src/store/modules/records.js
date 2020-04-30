import { findIndex, isNumber } from 'lodash'
import * as types from 'src/store/types/records'

const state = {
  list: [
    // {
    //   id: number,
    //   title: string,
    //   track: Array
    // }
  ]
}

const getters = {}

const mutations = {
  [types.RESET_RECORDS] (state, records) {
    state.list = records || []
  },
  [types.ADD_RECORD] (state, record) {
    state.list.push(record)
  },
  [types.REMOVE_RECORD] (state, uid) {
    const i = findIndex(state.list, record => record.uid === uid)

    if (isNumber(i)) {
      state.list.splice(i, 1)
    }
  }
}

const actions = {
  [types.ADD_RECORD] ({ commit }, record) {
    const startTime = record.track[0].payload.time
    const recordTime = Date.now()
    const uid = `${record.title}-${recordTime}`

    record.track.forEach(action => {
      action.payload.time -= startTime
    })

    commit(types.ADD_RECORD, { ...record, uid, recordTime })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
