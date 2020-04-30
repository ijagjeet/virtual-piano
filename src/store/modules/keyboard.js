import keyboard from 'src/constants/keyboard'
import * as types from 'src/store/types/keyboard'

import { find } from 'lodash'
import events from 'src/modules/event-bus'

const state = {
  buttons: [ ...keyboard ],
  pressedButtons: []
}

const getters = {
  pressedButtons (state) {
    return state.buttons.filter(b => b.isPressed)
  }
}

const mutations = {
  [types.KEYDOWN] (state, payload) {
    const { octaveId, noteId, time } = payload
    const button = find(
      state.buttons,
      button => button.octaveId === octaveId && button.noteId === noteId
    )

    if (button) {
      Object.assign(button, { isPressed: ++button.isPressed, time })
      events.emit(types.KEYDOWN, payload)
    }
  },
  [types.KEYUP] (state, payload) {
    const { octaveId, noteId } = payload
    const button = find(
      state.buttons,
      button => button.octaveId === octaveId && button.noteId === noteId
    )

    if (button) {
      button.isPressed = button.isPressed > 0 ? --button.isPressed : 0
      events.emit(types.KEYUP, payload)
    }
  },
  [types.KEYUP_ALL] () {
    this.pressedButtons = []
  }
}

export default {
  state,
  getters,
  mutations
}
