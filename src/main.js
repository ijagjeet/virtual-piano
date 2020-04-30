import './styles/index.css'
import './styles/mdi.css'

import './workaround'

import Vue from 'vue'
import './element-ui'

import App from './App'

import router from './router'
import store from './store'

import 'src/actions/subscribers/user'
import 'src/actions/listeners/keypress.js'
import 'src/actions/store-watch/keypress.js'
import 'src/modules/firebase'

window.app = new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
