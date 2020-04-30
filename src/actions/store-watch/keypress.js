import store from 'src/store'
import difference from 'lodash/difference'
import { playNote } from 'src/actions/sounds/notes'

store.watch(
  state => state.keyboard.buttons,
  changeState,
  { deep: true }
)

function changeState (buttons) {
  const newPressedButtons = findNewPressedButtons(buttons)

  if (newPressedButtons.length) {
    newPressedButtons.forEach(({ octaveId, noteId }) => playNote(octaveId, noteId))
  }
}

let _wasPressedEarly = []
function findNewPressedButtons (buttons) {
  const pressedButtons = buttons.filter(btn => btn.isPressed)
  const newButtons = difference(pressedButtons, _wasPressedEarly)

  _wasPressedEarly = pressedButtons

  return newButtons
}
