// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbkAKMPAGADyVJR33f-8aXAVFRbQbT0Tk",
  authDomain: "vue-project-92e14.firebaseapp.com",
  databaseURL: "https://vue-project-92e14-default-rtdb.firebaseio.com",
  projectId: "vue-project-92e14",
  storageBucket: "vue-project-92e14.appspot.com",
  messagingSenderId: "404801681332",
  appId: "1:404801681332:web:9ceab0fba99f3b890b64e1",
  measurementId: "G-N4LYXX709N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);