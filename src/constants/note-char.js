import { mapValues } from 'lodash'
import { pureNotesId, dieseNotesId } from './notes'

const whiteButtons = [
  ['1', '2', '3', '4', '5', '6', '7'],
  ['8', '9', '0', 'q', 'w', 'e', 'r'],
  ['t', 'y', 'u', 'i', 'o', 'p', 'a'],
  ['s', 'd', 'f', 'g', 'h', 'j', 'k'],
  ['l', 'z', 'x', 'c', 'v', 'b', 'n'],
  ['m']
]

const blackButtons = [
  ['!', '@', '$', '%', '^'],
  ['*', '(', 'Q', 'W', 'E'],
  ['T', 'Y', 'I', 'O', 'P'],
  ['S', 'D', 'G', 'H', 'J'],
  ['L', 'Z', 'C', 'V', 'B'],
  ['M']
]

export const mapWhiteOctaveIdToNoteIdToChar = whiteButtons.reduce((octaves, chars, i) => {
  octaves[i + 1] = createMapNoteIdToChars(chars, pureNotesId)

  return octaves
}, {})

export const mapBlackOctaveIdToNoteIdToChar = blackButtons.reduce((octaves, chars, i) => {
  octaves[i + 1] = createMapNoteIdToChars(chars, dieseNotesId)

  return octaves
}, {})

export const mapOctaveIdToNoteIdToChar = mapValues(
  mapWhiteOctaveIdToNoteIdToChar,
  (octave, key) => {
    return {
      ...octave,
      ...mapBlackOctaveIdToNoteIdToChar[key]
    }
  }
)

function createMapNoteIdToChars (chars, notesId) {
  return chars.reduce((map, char, i) => {
    map[notesId[i]] = char

    return map
  }, {})
}
