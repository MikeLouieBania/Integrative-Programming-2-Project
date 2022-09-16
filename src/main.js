import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

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

initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

loadFonts()

createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app')
