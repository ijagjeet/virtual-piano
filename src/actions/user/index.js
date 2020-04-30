import * as typesUser from 'src/store/types/user'
import store from 'src/store'
import auth from 'src/modules/auth'

export async function signup (email, password) {
  let [ err ] = await to(auth.createUserWithEmailAndPassword(email, password))

  if (err) return Promise.reject(err)
}

export async function signin (email, password) {
  let [ err ] = await to(auth.signInWithEmailAndPassword(email, password))

  if (err) return Promise.reject(err)
}

export async function signout () {
  auth.signOut()
  store.commit(typesUser.REMOVE)
}
