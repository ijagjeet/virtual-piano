import Vue from 'vue'
import Vuex from 'vuex'
import keyboard from './modules/keyboard'
import recorder from './modules/recorder'
import records from './modules/records'
import user from './modules/user'
import usersRecords from './modules/users-records'

import recordedPlugin from './plugins/recorder'
import recordsPlugin from './plugins/records'
import userPlugin from './plugins/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    keyboard,
    recorder,
    records,
    user,
    usersRecords
  },
  plugins: [
    recordedPlugin,
    recordsPlugin,
    userPlugin
  ]
})

export default window.store = store
