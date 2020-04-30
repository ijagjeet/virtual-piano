import * as keyboardTypes from 'src/store/types/keyboard'
import { mapKeyCodeToNoteIdOctaveId } from 'src/constants/keycodes'
import { DIESE_SHIFT_ID } from 'src/constants/notes'

import store from 'src/store'

const SHIFT_KEYCODE = 16

document.addEventListener('keydown', keydown)
document.addEventListener('keyup', keyup)

let shiftPressed = false
let keyCodesPressed = new Set()
let keyCodePayload = new Map()

function keydown (e) {
  if (e.target.tagName.toLowerCase() === 'input') return

  let { keyCode } = e

  if (!keyCode) return

  if (keyCode === SHIFT_KEYCODE) {
    shiftPressed = true
    return
  }

  if (keyCodesPressed.has(keyCode)) {
    return
  }

  keyCodesPressed.add(keyCode)

  const note = mapKeyCodeToNoteIdOctaveId[keyCode]

  if (!note) return

  const copyNote = { ...note }

  if (shiftPressed) {
    copyNote.noteId = copyNote.noteId + DIESE_SHIFT_ID
  }

  const time = Date.now()
  const payload = {
    ...copyNote,
    time,
    id: 'key-ssesion:' + (Math.random() * time)
  }

  keyCodePayload.set(keyCode, payload)

  store.commit(keyboardTypes.KEYDOWN, payload)
}

function keyup (e) {
  const keyCode = e.keyCode

  if (!keyCode) return

  if (keyCode === SHIFT_KEYCODE) {
    shiftPressed = false
    return
  }

  keyCodesPressed.delete(keyCode)

  const note = mapKeyCodeToNoteIdOctaveId[keyCode]

  if (!note) return

  const payload = keyCodePayload.get(keyCode)

  if (!payload) return

  store.commit(keyboardTypes.KEYUP, { ...payload, time: Date.now() })
}
