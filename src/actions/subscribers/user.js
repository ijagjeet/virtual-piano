import * as typesUser from 'src/store/types/user'
import store from 'src/store'
import auth from 'src/modules/auth'
import * as normalizer from 'src/normalizer/user'

onAuthStateChanged()

function onAuthStateChanged () {
  auth.onAuthStateChanged(async user => {
    store.commit(typesUser.RESET, normalizer.firebase(user))
  })
}
