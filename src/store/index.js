import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import action from './action'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

const Store = new Vuex.Store({
  state,
  action,
  getters,
  mutations
})

export default Store
