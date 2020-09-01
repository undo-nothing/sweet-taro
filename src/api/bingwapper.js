import axios from 'axios'

let BASE_URL = 'http://127.0.0.1:8000'

export function getWapperList(params) {
  return axios({
    url: BASE_URL + '/v1.0/bingwappers/',
    method: 'get',
    params: params
  })
}

export function getWapperInfo(id) {
  return axios({
    url: BASE_URL + '/v1.0/bingwappers/' + id + '/',
    method: 'get'
  })
}