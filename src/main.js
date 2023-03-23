// FILE: main.js

import { createApp } from 'vue'
import { Quasar, AppVisibility } from 'quasar'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import VueCreditCardValidation from 'vue-credit-card-validation';

import '@/css/index.scss'
import 'quasar/src/css/index.sass'
import App from './App.vue'

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const myApp = createApp(App)

myApp.use(Quasar, {
  plugins: {
    AppVisibility
  },
})
myApp.use(VueCreditCardValidation);
myApp.use(pinia)
myApp.use(router)
myApp.mount('#app')
