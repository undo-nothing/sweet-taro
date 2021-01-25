export function formatDate(date, format) {
  if (!date) return
  if (!format) format = 'yyyy-MM-dd'
  switch (typeof date) {
    case 'string':
      date = new Date(date.replace(/-/, '/'))
      break
    case 'number':
      date = new Date(date)
      break
  }
  if (!(date instanceof Date)) return
  var dict = {
    'yyyy': date.getFullYear(),
    'M': date.getMonth() + 1,
    'd': date.getDate(),
    'H': date.getHours(),
    'm': date.getMinutes(),
    's': date.getSeconds(),
    'MM': ('' + (date.getMonth() + 101)).substr(1),
    'dd': ('' + (date.getDate() + 100)).substr(1),
    'HH': ('' + (date.getHours() + 100)).substr(1),
    'mm': ('' + (date.getMinutes() + 100)).substr(1),
    'ss': ('' + (date.getSeconds() + 100)).substr(1)
  }
  return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function() {
    return dict[arguments[0]]
  })
}

export function randomDate(start, end) {
  // start：开始日期，end结束日期
  var retDate = new Date(start.valueOf())
  const max = parseInt((end - start) / (1000 * 60 * 60 * 24))
  const randomNumber = Math.floor(Math.random() * (max + 1))
  retDate.setDate(start.getDate() + randomNumber)
  return retDate
}
