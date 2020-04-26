import axios from 'axios'
import { Message } from 'element-ui'
import router from '@/router'
import store from '@/store';

// 创建axios实例

const baseURL = `${window.location.protocol}//${window.location.host}`

const service = axios.create({
  baseURL,
  timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  if(store.state.token){
    config.headers['MY-ACCESS-TOKEN'] = store.state.token
  }
  return config
}, err => {
  return Promise.reject(err)
})

// response拦截器
service.interceptors.response.use(res => {
  if(res.data.code != 0){
    Message({
      message: res.data.msg,
      type: 'error'
    });
  }
  if(res.data.code == 4) {
    store.dispatch('LoginOut').then(()=> {
      router.push({
        name: 'login'
      })
    })
  }
  return res;
}, err => {
  Message({
    message: '服务器繁忙，请稍后重试',
    type: 'error'
  });
  return Promise.reject(err)
})

export default service