import request from '@/utils/request'

export function commonDownloadApi(url_path, params) {
  return request({
    url: url_path,
    method: 'get',
    params: params,
    responseType: 'blob'
  })
}

export function downloadFile(url, params) {
  return request({
    url: url,
    method: 'get',
    params: params,
    responseType: 'blob'
  }).then(res => {
    const downloadElement = document.createElement('a')
    const href = window.URL.createObjectURL(res.data)
    const contentDisposition = res.headers['content-disposition']
    const patt = new RegExp('filename=([^;]+\\.[^\\.;]+);*')
    const result = patt.exec(contentDisposition)
    const filename = decodeURI(result[1]).replace(/^(\s|\")+|(\s|\")+$/g, '')

    downloadElement.style.display = 'none'
    downloadElement.href = href
    downloadElement.download = filename
    document.body.appendChild(downloadElement)
    downloadElement.click() // 点击下载
    document.body.removeChild(downloadElement) // 下载完成移除元素
    window.URL.revokeObjectURL(href) // 释放掉blob对象
  })
}
