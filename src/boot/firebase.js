// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from 'firebase/app'

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import 'firebase/analytics'

// Add the Firebase products that you want to use
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyBDjD6pnsBd5uih6So23Fh3TfAy2JCHnv0',
  authDomain: 'shopping-list-e43e1.firebaseapp.com',
  databaseURL: 'https://shopping-list-e43e1.firebaseio.com',
  projectId: 'shopping-list-e43e1',
  storageBucket: 'shopping-list-e43e1.appspot.com',
  messagingSenderId: '131084044292',
  appId: '1:131084044292:web:1e811bf66b35fe34700d51',
  measurementId: 'G-7DCB77VBFK'
}
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)
firebase.analytics()

const firebaseAuth = firebaseApp.auth()

export { firebaseAuth }
