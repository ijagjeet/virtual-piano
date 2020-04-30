import fb from 'src/modules/firebase'
import { forEach, isEmpty } from 'lodash'

class DatabaseApi {
  set (path, value) {
    return fb.db.ref(path).set(value)
  }

  get (path) {
    return fb.db.ref(path).once('value').then(snapshot => snapshot.val())
  }

  update (updates) {
    if (isEmpty(updates)) return

    return fb.db.ref().update(updates)
  }

  remove (path) {
    return fb.db.ref(path).remove()
  }

  getUserRecords (userUid, recordsUids) {
    const all = []

    forEach(recordsUids, uid => {
      const path = getPath(['user-records', userUid, uid])
      const promise = this.get(path)

      all.push(promise)
    })

    return Promise.all(all)
  }

  getAllUserRecords (userUid) {
    const path = getPath(['user-records', userUid])

    return this.get(path)
  }

  addUserRecords (userUid, records) {
    const updates = {}

    forEach(records, record => {
      const path = getPath(['user-records', userUid, record.uid])

      updates[path] = record
    })

    this.update(updates)
  }

  resetAllUserRecords (userUid) {
    const path = getPath(['user-records', userUid])

    this.remove(path)
  }

  removeUserRecords (userUid, recordsUids) {
    const updates = {}

    forEach(recordsUids, uid => {
      const path = getPath(['user-records', userUid, uid])
      updates[path] = null
    })

    this.update(updates)
  }
}

function getPath (parts) {
  return parts.join('/')
}

export default new DatabaseApi()
