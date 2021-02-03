import dayjs from 'dayjs'

export function strfdate(date, format) {
  if (!format) {
    format = 'YYYY-MM-DD'
  }
  return dayjs(date).format(format)
}

export function strpdate(date) {
  return dayjs(date)
}

export function randomDate(start, end) {
  // start：开始日期，end结束日期
  var ret_date = dayjs(start)
  var max = parseInt((end - start) / (1000 * 60 * 60 * 24))
  var randomNumber = Math.floor(Math.random() * (max + 1))
  return ret_date.add(randomNumber, 'day')
}
