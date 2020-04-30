import localStore from 'src/modules/local-store'
import db from 'src/modules/database'
import * as records from '../types/records'

export default function (store) {
  store.subscribe((mutation) => {
    if (mutation.type === records.ADD_RECORD) {
      saveToStore(store, mutation.payload)
    }

    if (mutation.type === records.REMOVE_RECORD) {
      removeFromStore(store, mutation.payload)
    }
  })
}

function saveToStore (store, record) {
  const { user } = store.state.user

  if (user) {
    db.addUserRecords(user.uid, [record])
  } else {
    const { list } = store.state.records

    localStore.resetAllRecords(list)
  }
}

function removeFromStore (store, uid) {
  const { user } = store.state.user

  if (user) {
    db.removeUserRecords(user.uid, [uid])
  } else {
    const { list } = store.state.records

    localStore.resetAllRecords(list)
  }
}
