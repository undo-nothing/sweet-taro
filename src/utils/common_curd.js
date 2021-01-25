import { commonFetchListApi, commonFetchOneApi, commonCreateApi, commonUpdateApi, commonDeleteApi } from '@/api/curd'

export function commonFetchList(vue_this, url, params) {
  const filter_params = {}
  for (var key in params) {
    if (params[key] !== '') {
      filter_params[key] = params[key]
    }
  }
  if (filter_params.page === undefined) {
    filter_params.page = vue_this.page
  }
  if (filter_params.limit === undefined) {
    filter_params.limit = vue_this.limit
  }
  commonFetchListApi(url, filter_params).then(response => {
    vue_this.list = response.data.data
    vue_this.total = response.data.count
    vue_this.listLoading = false
    vue_this.sels = []
  })
}

export function commonGetOne(vue_this, url, params) {
  const filter_params = {}
  for (var key in params) {
    if (params[key] !== '') {
      filter_params[key] = params[key]
    }
  }
  if (filter_params.page === undefined) {
    filter_params.page = vue_this.page
  }
  if (filter_params.limit === undefined) {
    filter_params.limit = vue_this.limit
  }
  commonFetchListApi(url, filter_params).then(response => {
    if (response.data.count) {
      vue_this.detail = response.data.data[0]
    } else {
      vue_this.detail = {}
    }
    vue_this.listLoading = false
  })
}

export function commonGetDeatil(vue_this, url) {
  vue_this.loading = true
  commonFetchOneApi(url).then(response => {
    vue_this.detail = response.data
    vue_this.loading = false
  })
}

export function commonCreate(vue_this, url) {
  console.log(vue_this)
  vue_this.$refs.addForm.validate((valid) => {
    if (valid) {
      vue_this.addLoading = true
      const datas = Object.assign({}, vue_this.addForm)
      console.log(datas)
      datas['company'] = 2
      commonCreateApi(url, datas).then(() => {
        vue_this.addLoading = false
        vue_this.$message({
          message: '成功',
          type: 'success'
        })
        vue_this.addFormVisible = false
        vue_this.fetchList()
      })
    }
  })
}

export function commonUpdate(vue_this, url) {
  vue_this.$refs.editForm.validate((valid) => {
    if (valid) {
      vue_this.editLoading = true
      const post_data = Object.assign({}, vue_this.editForm)
      commonUpdateApi(url, post_data).then(() => {
        vue_this.editLoading = false
        vue_this.$message({
          message: '成功',
          type: 'success'
        })
        vue_this.editFormVisible = false
        vue_this.fetchList()
      })
    }
  })
}

export function commonDelete(vue_this, url) {
  vue_this.$confirm('确认删除该记录吗?', '提示', {
    type: 'warning'
  }).then(() => {
    vue_this.listLoading = true
    commonDeleteApi(url).then((res) => {
      console.log(res.data)
      vue_this.listLoading = false
      vue_this.$message({
        message: '成功',
        type: 'success'
      })
      vue_this.fetchList()
    })
      .catch((error) => {
        const res = error.response
        vue_this.listLoading = false
        vue_this.$message({
          message: res.data.detail,
          type: 'error'
        })
        vue_this.fetchList()
      })
  })
}

export function commonBatchAction(vue_this, url, action_name) {
  var ids = vue_this.sels.map(item => item.id).toString()
  console.log(url, action_name, ids)
  if (ids === '') {
    vue_this.$message({
      message: '未选中数据',
      type: 'warning'
    })
    return
  }
  vue_this.$confirm('确认 ' + action_name + ' 选中记录吗？', '提示', {
    type: 'warning'
  }).then(() => {
    vue_this.listLoading = false
    vue_this.$message({
      message: '成功',
      type: 'success'
    })
    vue_this.fetchList()
  }).catch(() => {})
}
