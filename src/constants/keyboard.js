import flatten from 'lodash/flatten'
import * as buttons from './buttons'
import { octave, octavesId } from './notes'
import { mapOctaveIdToNoteIdToChar } from './note-char'

export default getKeyboard()

function getKeyboard () {
  return flatten(octavesId.map(
    octaveId => {
      return getButtonsForOctave().map(
        (btn, i) => ({
          ...btn,
          octaveId,
          noteId: octave[i].id,
          text: mapOctaveIdToNoteIdToChar[octaveId][octave[i].id]
        })
      )
    }
  ))
}

function getButtonsForOctave () {
  return [
    getPureWhiteButton(),
    getPureBlackButton(),
    getPureWhiteButton(),
    getPureBlackButton(),
    getPureWhiteButton(),
    getPureWhiteButton(),
    getPureBlackButton(),
    getPureWhiteButton(),
    getPureBlackButton(),
    getPureWhiteButton(),
    getPureBlackButton(),
    getPureWhiteButton()
  ]
}

function getPureWhiteButton () {
  return {
    typeId: buttons.WHITE_ID,
    isPressed: false
  }
}

function getPureBlackButton () {
  return {
    typeId: buttons.BLACK_ID,
    isPressed: false
  }
}
