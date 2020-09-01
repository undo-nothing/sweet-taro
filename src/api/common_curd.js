import axios from 'axios'

let BASE_URL = 'http://127.0.0.1:8000'

export function commonFetchListApi(url_path, params) {
  return axios({
    url: BASE_URL + url_path,
    method: 'get',
    params: params
  })
}

export function commonRetrieveApi(url_path) {
  return axios({
    url: BASE_URL + url_path,
    method: 'get',
  })
}

export function commonCreateApi(url_path, data) {
  return axios({
    url: BASE_URL + url_path,
    method: 'post',
    data: data
  })
}

export function commonUpdateApi(url_path, data) {
  return axios({
    url: BASE_URL + url_path + data.id + '/',
    method: 'put',
    data: data
  })
}

export function commonDeleteApi(url_path) {
  return axios({
    url: BASE_URL + url_path,
    method: 'delete'
  })
}