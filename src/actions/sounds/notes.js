import { SOUNDS_NOTES } from 'src/constants/paths'
import { octavesId, notesId } from 'src/constants/notes'
import sm from 'src/modules/sound-manager'

const FILE_EXTENSHION = 'mp3'

var sounds = {}
sm.onready(initAllSounds)

export function playNote (octaveId, noteId) {
  const key = createKey(octaveId, noteId)
  const sound = sounds[key]

  sound.play && sound.play()
}

function createKey (octaveId, noteId) {
  return `${octaveId}-${noteId}`
}

function initAllSounds () {
  octavesId.forEach(octaveId =>
    notesId.forEach(noteId =>
      initSound(octaveId, noteId)
    )
  )
}

function initSound (octaveId, noteId) {
  const key = createKey(octaveId, noteId)
  const fileName = `${octaveId}${noteId}`

  sounds[key] = sm.createSound({
    id: fileName,
    url: `${SOUNDS_NOTES}/${fileName}.${FILE_EXTENSHION}`,
    autoLoad: true
  })
}
