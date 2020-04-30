import { notesId } from './notes'

export const colorsHexForWhiteButtons = [0x01E702, 0x016CFF, 0x8200ce, 0x410058, 0xd80001, 0xFF8701, 0x9DF300]
export const colorsHexForBlackButtons = [0x01FFB0, 0x2F00F7, 0x0, 0x670352, 0xE34202, 0xEFFF02]
export const mapColorHexToNoteId = notesId.reduce(
  (map, noteId) => {
    if (noteId % 1 === 0) {
      map[noteId] = colorsHexForWhiteButtons[noteId - 1]
    } else {
      map[noteId] = colorsHexForBlackButtons[noteId - 1.5]
    }

    return map
  },
  {}
)
