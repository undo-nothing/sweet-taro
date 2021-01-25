import request from '@/utils/request'
import settings from '@/settings'

const base_url = settings.baseUrl

export function commonDownloadApi(url_path, params) {
  return request({
    url: base_url + url_path,
    method: 'get',
    params: params,
    responseType: 'blob'
  })
}
