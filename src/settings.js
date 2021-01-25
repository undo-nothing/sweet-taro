var baseUrl = process.env.VUE_APP_API_HOST
if (process.env.VUE_APP_API_PORT) {
  baseUrl = baseUrl + ':' + process.env.VUE_APP_API_PORT
}
var mediaBaseUrl = baseUrl + '/media/'

module.exports = {
  title: 'SweetTaro',
  baseUrl,
  mediaBaseUrl
}
