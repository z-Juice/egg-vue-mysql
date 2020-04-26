import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import plugins from './plugins'
import app from './modules/app'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user
  },
  getters,
  plugins
})

export default store
