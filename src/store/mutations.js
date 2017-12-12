import * as types from './mutation-type'

const mutations = {
  [types.SET_USERNAME](state,username) {
    window.localStorage.setItem("username", username);
    state.username = username
  },
  [types.SET_TOKEN](state,token){
    window.localStorage.setItem("token", token);
    state.token = token
  },
  [types.LOGOUT](state){
    localStorage.removeItem('token');
    state.token = null
  }
}
export default mutations
