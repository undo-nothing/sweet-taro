import { commonFetchList } from '@/utils/common_curd'
import { urlJoinParams, handleUrlParams, changeOrdering } from '@/utils'

export const dataShowMixin = {
  data() {
    return {
      // 数据显示
      list: null,
      listLoading: true,

      // 必要属性
      filters: {},
      orderingField: '',
      orderingValue: 0,
      total: 0,
      page: 1,
      limit: 12,
      pageSizes: [12, 24, 36, 48]
    }
  },
  created() {
    this.init()
    handleUrlParams(this)
    this.fetchList()
  },
  methods: {
    // 获取
    fetchList() {
      const urlPath = this.apiPath
      commonFetchList(this, urlPath, this.filters)
    },
    handleOrderClick(field) {
      changeOrdering(this, field)
      var newUrl = urlJoinParams(this.$route.path, this.filters)
      this.$router.push({ path: newUrl })
    },
    handleFilterClick(kwargs) {
      for (var k in kwargs) {
        this.filters[k] = kwargs[k].toString()
      }
      var newUrl = urlJoinParams(this.$route.path, this.filters)
      this.$router.push({ path: newUrl })
    },
    handlePageChange(params) {
      this.filters['page'] = params['page']
      this.filters['limit'] = params['limit']
      var newUrl = urlJoinParams(this.$route.path, this.filters)
      this.$router.push({ path: newUrl })
    }
  },
  watch: {
    $route() {
      handleUrlParams(this)
      this.fetchList()
    }
  }
}
