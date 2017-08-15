import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import { routes } from './routes'
import { storeDef } from './store/store'

import App from './App.vue'

Vue.use(Vuetify)
Vue.use(VueRouter)
Vue.use(Vuex)

const router = new VueRouter({
  routes,
  mode: 'history'
})

const store = new Vuex.Store(storeDef)

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
