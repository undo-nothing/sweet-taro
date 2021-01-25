// import axios from 'axios'
import request from '@/utils/request'
import settings from '@/settings'

const base_url = settings.baseUrl

export function commonFetchListApi(url_path, params) {
  return request({
    url: base_url + url_path,
    method: 'get',
    params: params
  })
}

export function commonFetchOneApi(url_path, id) {
  return request({
    url: base_url + url_path + id + '/',
    method: 'get'
  })
}

export function commonCreateApi(url_path, data) {
  return request({
    url: base_url + url_path,
    method: 'post',
    data: data
  })
}

export function commonUpdateApi(url_path, data) {
  return request({
    url: base_url + url_path + data.id + '/',
    method: 'put',
    data: data
  })
}

export function commonDeleteApi(url_path) {
  return request({
    url: base_url + url_path,
    method: 'delete'
  })
}
