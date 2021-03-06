// import request from '@/utils/request'
import axios from 'axios'
import request from '@/utils/request'
import settings from '@/settings'

const api_base_url = settings.apiBaseUrl

export function login(data) {
  return axios({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return axios({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return axios({
    url: '/user/logout',
    method: 'post'
  })
}

export function getJwtToken(data) {
  return request({
    url: api_base_url + '/jwt-api-token-auth/',
    method: 'post',
    data
  })
}

export function getPermissionTree() {
  return request({
    url: api_base_url + '/permissions/tree/',
    method: 'get'
  })
}
