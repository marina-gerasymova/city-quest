import Vue from 'vue';
import router from './router';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD3LSsh8N9u2hzjrccwCchVVjPyvnJe0Ag",
  authDomain: "city-quest-3eab4.firebaseapp.com",
  databaseURL: "https://city-quest-3eab4-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "city-quest-3eab4",
  storageBucket: "city-quest-3eab4.appspot.com",
  messagingSenderId: "808915159407",
  appId: "1:808915159407:web:ca51080a9a2129f2a7009a",
  measurementId: "G-T3SKGDYVDZ"
};

const firebaseApp = initializeApp(firebaseConfig);
console.log(firebaseApp);

import "./style/main.scss";
import store from './store'

Vue.config.productionTip = false

let app;

getAuth().onAuthStateChanged(() => {
  if(!app) {
    app = new Vue({
      router,
      vuetify,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
