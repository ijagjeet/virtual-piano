import * as fb from 'firebase'

const config = {
  apiKey: 'AIzaSyDJGNIBP0Q2NAtcqHfy9nsDSxUzH-2W2EM',
  authDomain: 'piano-hero-f728f.firebaseapp.com',
  databaseURL: 'https://piano-hero-f728f.firebaseio.com',
  projectId: 'piano-hero-f728f',
  storageBucket: '',
  messagingSenderId: '1078381583307'
}

class Firebase {
  constructor () {
    this.fb = fb.initializeApp(config)
    this.auth = this.fb.auth()
    this.db = this.fb.database()
  }
}

export default window.firebase = new Firebase()

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