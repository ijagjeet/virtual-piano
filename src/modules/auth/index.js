import fb from 'src/modules/firebase'

class AuthApi {
  createUserWithEmailAndPassword (email, password) {
    return fb.auth.createUserWithEmailAndPassword(email, password)
  }

  signInWithEmailAndPassword (email, password) {
    return fb.auth.signInWithEmailAndPassword(email, password)
  }

  onAuthStateChanged (cb) {
    fb.auth.onAuthStateChanged(cb)
  }

  signOut () {
    return fb.auth.signOut()
  }

  getCurrentUser () {
    return fb.auth.currentUser
  }
}

export default new AuthApi()

/* eslint-disable */
/*
var provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});
*/