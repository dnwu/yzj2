/**
 * http配置
 */
import axios from 'axios'
import store from '@/store'
import * as types from '@/store/mutation-type'
import router from '@/router'

// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.baseURL = 'http://120.79.38.80';

// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (store.state.token) {
            config.headers.Authorization = `token ${store.state.token}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
      // console.log(response.data.code);
      // 登录失效
      if(response.data.code == 10001){
        store.commit('SET_USERTYPE','')
        store.commit('SET_TOKEN','')
        store.commit('SET_USERNAME','')
        store.commit('SET_ID','')
        router.push('/login')
      }
      return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 401 清除token信息并跳转到登录页面
                    store.commit(types.LOGOUT);
                    router.replace({
                        path: 'login',
                        query: {redirect: router.currentRoute.fullPath}
                    })
            }
        }
        // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
        return Promise.reject(error.response.data)
    });

export default axios;
