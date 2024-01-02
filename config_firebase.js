// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQhy4z74DWKRQXclm8D9kCRlxvLh0-Eds",
  authDomain: "test1-4430d.firebaseapp.com",
  projectId: "test1-4430d",
  storageBucket: "test1-4430d.appspot.com",
  messagingSenderId: "277301060334",
  appId: "1:277301060334:web:21c8ae73131cc3865909ff"
};

// Initialize Firebase
if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}
export {firebase};