<template>
  <div :class="{'hidden':hidden}" class="table-pagination-container">
    <el-button type="text" icon="el-icon-refresh-right" class="pagination-refresh" @click="handleSizeChange" />
    <el-pagination
      :background="background"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { scrollTo } from '@/utils/scroll-to'

export default {
  name: 'TablePagination',
  props: {
    total: {
      required: true,
      type: Number
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 20
    },
    pageSizes: {
      type: Array,
      default() {
        return [1, 20, 30, 50, 100, 200]
      }
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    background: {
      type: Boolean,
      default: false
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    currentPage: {
      get() {
        return this.page
      },
      set(val) {
        this.$emit('update:page', val)
      }
    },
    pageSize: {
      get() {
        return this.limit
      },
      set(val) {
        this.$emit('update:limit', val)
      }
    }
  },
  created() {
    if (this.limit) {
      if (this.pageSizes.indexOf(this.limit) === -1) {
        this.pageSizes.push(this.limit)
        this.pageSizes.sort(function(a, b) { return a - b })
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('pagination', { page: this.currentPage, limit: val })
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    },
    handleCurrentChange(val) {
      this.$emit('pagination', { page: val, limit: this.pageSize })
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    }
  }
}
</script>

<style scoped>
.pagination-refresh {
  float: left;
  padding: 3px 3px;
  margin: 3px 10px 3px 0px;
  font-size: 21px;
  color: #333;
  border: 0px;
}
.pagination-refresh:hover {
  color: #009688;
  background-color: #FFFFFF;
}
.pagination-container {
  background: #fff;
  padding: 0px 0px;
  padding-right: 20px;
}
</style>
