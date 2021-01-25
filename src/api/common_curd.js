import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:8000'

export function commonFetchListApi(urlPath, params) {
  var url = urlPath
  if (!urlPath.startsWith('http')) {
    url = BASE_URL + urlPath
  }
  return axios({
    url: url,
    method: 'get',
    params: params
  })
}

export function commonRetrieveApi(urlPath) {
  var url = urlPath
  if (!urlPath.startsWith('http')) {
    url = BASE_URL + urlPath
  }
  return axios({
    url: url,
    method: 'get'
  })
}

export function commonCreateApi(urlPath, data) {
  var url = urlPath
  if (!urlPath.startsWith('http')) {
    url = BASE_URL + urlPath
  }
  return axios({
    url: url,
    method: 'post',
    data: data
  })
}

export function commonUpdateApi(urlPath, data) {
  var url = urlPath
  if (!urlPath.startsWith('http')) {
    url = BASE_URL + urlPath + data.id + '/'
  }
  return axios({
    url: url,
    method: 'put',
    data: data
  })
}

export function commonDeleteApi(urlPath) {
  var url = urlPath
  if (!urlPath.startsWith('http')) {
    url = BASE_URL + urlPath
  }
  return axios({
    url: url,
    method: 'delete'
  })
}
