import * as keyboard from '../types/keyboard'
import * as record from '../types/recorder'

export default function (store) {
  store.subscribe((mutation) => {
    const { recorder } = store.state

    if (recorder.record && (mutation.type === keyboard.KEYDOWN || mutation.type === keyboard.KEYUP)) {
      pushToTrack(store, mutation)
    }
  })
}

function pushToTrack (store, mutation) {
  store.commit(record.PUSH_TO_TRACK, mutation)
}
