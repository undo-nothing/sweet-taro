const dataList = {
  'count': '@integer(100, 1000)',
  'data|20': [{
    'id': '@id',
    'filename': '@string("number", 1, 3)',
    'title': '@ctitle',
    'description': '@cword(20, 40)',
    'date': '@date',
    'location': '@cword(3, 5)',
    'keyword': '@cword(5, 8)',
    'author': '@cname'
  }]
}

export default {
  'get|/v1.0/bingwapper/': dataList,
  'post|/v1.0/bingwapper/': {},
  'put|/v1.0/bingwapper/': {},
  'delete|/v1.0/bingwapper/': {}
}
