import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database'
import { getAuth } from 'firebase/auth'
import "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDprYYIIfoj2WVyP5Vuce5jop7tiDvA-IU",
  authDomain: "vue-project-a5d32.firebaseapp.com",
  databaseURL: "https://vue-project-a5d32-default-rtdb.firebaseio.com",
  projectId: "vue-project-a5d32",
  storageBucket: "vue-project-a5d32.appspot.com",
  messagingSenderId: "251185096506",
  appId: "1:251185096506:web:8b93d84f3e2296f2e11203",
  measurementId: "G-5REM0TTLZV"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const auth = getAuth();

export { app, auth, database }