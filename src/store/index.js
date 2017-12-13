import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
  strict: debug,
  plugins: debug
    ? [createLogger()]
    : []
})
//import Vue from 'vue'
//import Vuex from 'vuex'
//
//Vue.use(Vuex)
//export default new Vuex.Store({
//  state: {
//    totalPrice: 11
//  },
//  getters: {
//    getTotal (state) {
//      return state.totalPrice
//    }
//  },
//  mutations: {
//    increment (state, price) {
//      state.totalPrice += price
//    },
//    decrement (state, price) {
//      state.totalPrice -= price
//    }
//  },
//  actions: {
//    increase (context) {
//      context.commit('increment', 6)
//    }
//  }
//
//})