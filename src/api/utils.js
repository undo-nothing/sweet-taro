import request from '@/utils/request'
import settings from '@/settings'

const api_base_url = settings.apiBaseUrl

export function commonDownloadApi(url_path, params) {
  return request({
    url: api_base_url + url_path,
    method: 'get',
    params: params,
    responseType: 'blob'
  })
}
