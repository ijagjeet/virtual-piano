import { values } from 'lodash'
import * as userTypes from '../types/user'
import * as recordsTypes from '../types/records'
import localStore from 'src/modules/local-store'
import db from 'src/modules/database'

import { MessageBox } from 'element-ui'

export default function (store) {
  store.subscribe(async (mutation) => {
    if (mutation.type === userTypes.RESET) {
      if (store.state.user.user) {
        await moveRecordsToCloud(store)
      }

      await getRecordsFromStores(store)
    }
  })
}

async function moveRecordsToCloud (store) {
  const records = await localStore.getAllRecords()
  const { user } = store.state.user

  if (records && records.length > 0) {
    const [ cancel ] = await to(
      MessageBox.confirm('Move records to cloud?', 'Save records?', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'info'
      })
    )

    if (cancel) return

    localStore.resetAllRecords([])
    await db.addUserRecords(user.uid, records)
  }
}

async function getRecordsFromStores (store) {
  const { user } = store.state.user
  let err, records

  if (user) {
    [ err, records ] = await to(db.getAllUserRecords(user.uid))
  } else {
    [ err, records ] = await to(localStore.getAllRecords())
  }

  if (err) return console.error(err)

  store.commit(recordsTypes.RESET_RECORDS, values(records))
}
