import axios from 'axios'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'
import router from '@/router'

const request = axios.create({
  timeout: 5000
})

// request interceptor
request.interceptors.request.use(
  config => {
    // do something before request is sent
    const token = getToken()
    if (token) {
      config.headers['Authorization'] = 'JWT ' + token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
request.interceptors.response.use(
  response => {
    return response
  },
  error => {
    // let message = error.message
    // if (error.response.status === 401) {
    //   router.push({ path: '/login', query: { redirect: router.app.$route.fullPath }})
    //   message = 'login expired.'
    //   Message({
    //     message: message,
    //     type: 'error',
    //     duration: 5 * 1000
    //   })
    // }
    return Promise.reject(error)
  }
)

export default request
