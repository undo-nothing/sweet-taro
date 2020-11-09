export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}


export function jsonToQueryString(json) {
  return '' +
    Object.keys(json).map(function(key) {
      return encodeURIComponent(key) + '=' +
        encodeURIComponent(json[key]);
    }).join('&');
}


export function queryStringToJson(string) {
  var obj = {},
    pairs = string.split('&'),
    d = decodeURIComponent,
    name,
    value;
  for (var i in pairs) {
    var pair = pairs[i].split('=');
    name = d(pair[0]);
    value = d(pair[1]);
    obj[name] = value;
  }
  return obj;
}


export function urlJoinParams(url, params) {
  var paramList = []
  for (var key in params) {
    if (params[key] !== '') {
      paramList.push(encodeURIComponent(key) + '=' +
        encodeURIComponent(params[key]));
    }
  }
  return url.split('#', 1)[0] + '#' + paramList.join('&');
}

export function handleUrlParams(vue_this) {
  var queryString = vue_this.$route.fullPath.split('#', 2)
  if (queryString.length === 2) {
    queryString = queryString[1]
    vue_this.filters = queryStringToJson(queryString)
  } else {
    vue_this.filters = {}
  }
  var rets = splitOrdering(vue_this.filters)
  vue_this.orderingField = rets[0]
  vue_this.orderingValue = rets[1]
}


export function changeOrdering(vue_this, field) {
  if (vue_this.orderingField === field) {
    if (vue_this.orderingValue === -1) {
      vue_this.orderingValue = 0;
    } else if (vue_this.orderingValue === 1) {
      vue_this.orderingValue = -1;
    } else {
      vue_this.orderingValue = 1;
    }
  } else {
    vue_this.orderingField = field;
    vue_this.orderingValue = 1;
  }

  if (vue_this.orderingValue === -1) {
    vue_this.filters['ordering'] = '-' + vue_this.orderingField;
  } else if (vue_this.orderingValue === 1) {
    vue_this.filters['ordering'] = vue_this.orderingField;
  } else {
    delete vue_this.filters['ordering'];
  }
}

export function splitOrdering(filters) {
  var orderingField = ''
  var orderingValue = 0
  if ('ordering' in filters) {
    if (filters.ordering === '') {
      orderingValue = 0
      orderingField = ''
    } else if (filters.ordering[0] === '-') {
      orderingField = filters.ordering.slice(1)
      orderingValue = -1
    } else if (filters.ordering[0] === '+') {
      orderingField = filters.ordering.slice(1)
      orderingValue = 1
    } else {
      orderingField = filters.ordering
      orderingValue = 1
    }
  }
  return [orderingField, orderingValue]
}