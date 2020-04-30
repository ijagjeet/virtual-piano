import localforage from 'localforage'

const localStore = localforage.createInstance({
  driver: localforage.LOCALSTORAGE,
  name: 'piano-hero',
  version: '1.0.0'
})

class LocalStoreApi {
  get (key) {
    return localStore.getItem(key)
  }

  set (key, value) {
    return localStore.setItem(key, value)
  }

  resetAllRecords (records) {
    return this.set('records', records)
  }

  getAllRecords () {
    return this.get('records')
  }
}

export default new LocalStoreApi()
