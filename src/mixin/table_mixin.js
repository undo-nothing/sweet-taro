import TablePagination from '@/components/TablePagination'
import FlexAppContainer from '@/components/FlexAppContainer'
import ListFieldShow from '@/components/ListFieldShow'
import ExportForm from '@/components/ExportForm'
import { commonFetchListApi, commonCreateApi, commonUpdateApi, commonDeleteApi } from '@/api/curd'
import { commonDownloadApi } from '@/api/utils'

var tableMixin = {
  components: { ListFieldShow, ExportForm, TablePagination, FlexAppContainer },
  data() {
    return {
      // 数据显示
      dataList: null,
      listLoading: false,
      total: 0,
      page: 1,
      limit: 20,
      filters: {},

      selectRowId: 0,

      editFormVisible: false,
      addFormVisible: false
    }
  },
  created() {
    this.init()
    this.initLimit()
    this.fetchList()
    this.afterCreated()
  },
  methods: {
    init: function() {
    },
    afterCreated: function() {
    },
    initLimit: function() {
      var rowHeight = 26
      if (document.documentElement.clientWidth >= 1900) {
        rowHeight = 27
      }
      this.limit = parseInt((document.documentElement.clientHeight - 190) / rowHeight)
    },
    handleSelsChange: function(sels) {
      this.sels = sels
    },
    handleFilter() {
      this.page = 1
      this.fetchList()
    },
    handleAdd: function() {
      this.addFormVisible = true
    },
    handleEdit: function(index, row) {
      this.selectRowId = row.id
      this.editFormVisible = true
    },
    handleDel: function(index, row) {
      const url_path = this.apiUrlName + '/' + row.id + '/'
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        commonDeleteApi(url_path).then((res) => {
          this.listLoading = false
          this.$message({
            message: '成功',
            type: 'success'
          })
          this.fetchList()
        })
          .catch((error) => {
            const res = error.response
            this.listLoading = false
            this.$message({
              message: res.data.detail,
              type: 'error'
            })
            this.fetchList()
          })
      })
    },
    // 获取数据
    fetchList() {
      const url_path = this.apiUrlName + '/'
      const params = {}
      for (var key in this.filters) {
        if (this.filters[key] !== '') {
          params[key] = this.filters[key]
        }
      }
      params.page = this.page
      params.limit = this.limit

      if (!this.listPermission) {
        return
      }

      this.listLoading = true
      commonFetchListApi(url_path, params).then(response => {
        this.dataList = response.data.data
        this.total = response.data.count
        this.sels = []
        this.listLoading = false
      })
    },
    // 批量删除
    batchDelete: function() {
      const url_path = this.apiUrlName + '/batch_delete/'
      const action_name = '删除'
      const ids = this.sels.map(item => item.id).toString()
      if (ids === '') {
        this.$message({
          message: '未选中数据',
          type: 'warning'
        })
        return
      }
      this.$confirm('确认 ' + action_name + ' 选中记录吗？', '提示', {
        type: 'warning'
      }).then(() => {
        this.$message({
          message: '成功',
          type: 'success'
        })
        this.fetchList()
      }).catch(() => {})
    },
    // 导出
    exportData(from) {
      const url_path = this.apiUrlName + '/export/'
      const params = {}
      for (const key in this.filters) {
        if (this.filters[key] !== '') {
          params[key] = this.filters[key]
        }
      }

      for (const key in from) {
        if (from[key] !== '') {
          params[key] = from[key]
        }
      }

      const export_headers = []
      for (const index in this.tableFields) {
        if (this.tableFields[index].show === true) {
          export_headers.push(this.tableFields[index].prop)
        }
      }
      if (export_headers.length) {
        params['export_headers'] = export_headers.join(',')
      }

      if (from['export_all'] === false) {
        params.page = this.page
        params.limit = this.limit
      }

      console.log(url_path, params)
      commonDownloadApi(url_path, params).then(res => {
        const downloadElement = document.createElement('a')
        const href = window.URL.createObjectURL(res.data)
        const contentDisposition = res.headers['content-disposition']
        const patt = new RegExp('filename=([^;]+\\.[^\\.;]+);*')
        const result = patt.exec(contentDisposition)
        const filename = decodeURI(result[1])

        downloadElement.style.display = 'none'
        downloadElement.href = href
        downloadElement.download = filename
        document.body.appendChild(downloadElement)
        downloadElement.click() // 点击下载
        document.body.removeChild(downloadElement) // 下载完成移除元素
        window.URL.revokeObjectURL(href) // 释放掉blob对象
      })
    }
  },
  computed: {
    showFields: function() {
      return this.tableFields.filter(item => item.show)
    }
  }
}

export default tableMixin
