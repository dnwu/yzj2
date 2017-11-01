import * as types from './mutation-type'

const mutations = {
  [types.SET_USERNAME](state,username) {
    state.username = username
  }
}
export default mutations
