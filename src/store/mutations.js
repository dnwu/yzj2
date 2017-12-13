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
  [types.SET_ID](state,id){
    window.localStorage.setItem("id", id);
    state.id = id
  },
  [types.LOGOUT](state){
    localStorage.removeItem('token');
    localStorage.removeItem('usertype');
    localStorage.removeItem('id');
    state.token = null
    state.usertype = null
    state.id = null
  },
  [types.SET_USERTYPE](state,usertype){
    window.localStorage.setItem("usertype", usertype);
    state.usertype = usertype
  }
}
export default mutations
