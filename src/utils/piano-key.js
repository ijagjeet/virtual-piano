import { pureNotesId, octavesId } from 'src/constants/notes'
import { mapColorHexToNoteId } from 'src/constants/note-color'

const numberButtonsInOctave = pureNotesId.length
const numberAllButtons = numberButtonsInOctave * octavesId.length

export function getPositionByCenter (button, width) {
  const buttonWidth = getWhiteButtonWidth(width)
  const left = getPosition(button, buttonWidth)
  const halfPianoWidth = Math.floor(getWidthPiano(width) / 2)

  return left - halfPianoWidth + buttonWidth / 2
}

export function getPosition (button, width) {
  return ((button.noteId - 1) + (button.octaveId - 1) * numberButtonsInOctave) * parseInt(width)
}

export function getWhiteButtonWidth (containerWidth) {
  return Math.round(containerWidth / 36)
}

export function getBlackButtonWidth (containerWidth) {
  return Math.round(containerWidth / 66)
}

export function getWidthPiano (containerWidth) {
  return getWhiteButtonWidth(containerWidth) * numberAllButtons
}

export function getButtonTypeId (button) {
  return button.noteId % 1 === 0
    ? 1
    : 2
}

export function getColorForNote (noteId) {
  return mapColorHexToNoteId[noteId]
}
