<template>
  <flex-app-container>

    <div class="filter-container" />

    <div class="table-container" style="height=&quot;calc(100% - 31px)&quot;">
      <div class="table-toolbar">
        <div class="table-toolbar-left">
          <el-button v-if="addPermission" @click="handleAdd">新增</el-button>
          <el-button v-if="deletePermission" @click="batchDelete">删除</el-button>
          <el-dropdown>
            <el-button type="primary">
              更多菜单<i class="el-icon-arrow-down el-icon--right" />
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>功能一</el-dropdown-item>
              <el-dropdown-item>功能二</el-dropdown-item>
              <el-dropdown-item>功能三</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

        </div>

        <div class="table-toolbar-right">
          <list-field-show :list-fields="tableFields" @change="tableKey = tableKey + 1" />
          <export-form @exportSubmit="exportData" />
        </div>
      </div>

      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="dataList"
        height="calc(100% - 31px)"
        header-cell-class-name="table-header-cell-mini"
        cell-class-name="table-cell-mini"
        size="mini"
        border
        fit
        @selection-change="handleSelsChange"
      >
        <el-table-column type="selection" width="35" />
        <el-table-column v-for="field in showFields" :key="field.prop" :prop="field.prop" :label="field.label" :show-overflow-tooltip="true" :min-width="field.minWidth" :fixed="field.fixed">
          <template slot-scope="scope">
            <!-- &amp 为 %  -->
            <div v-if="field.edit &amp;&amp; editPermission">
              <span class="link-type" @click="handleEdit(scope.$index, scope.row)">{{ scope.row[field.prop] }}</span>
            </div>
            <div v-else>
              <span>{{ scope.row[field.prop] }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column v-if="editPermission || deletePermission" label="" align="center" width="120" fixed="right">
          <template slot-scope="scope">
            <el-button-group>
              <el-button v-if="editPermission" type="text" plain icon="el-icon-edit" class="cell-toolbar-button" style="color: #67c23a" @click="handleEdit(scope.$index, scope.row)" />
              <el-button v-if="deletePermission" type="text" plain icon="el-icon-delete" class="cell-toolbar-button" style="color: #f56c6c" @click="handleDel(scope.$index, scope.row)" />
              <el-button v-if="deletePermission" type="text" plain icon="el-icon-picture-outline" class="cell-toolbar-button" style="color: #f56c6c" @click="handleView(scope.$index, scope.row)" />
              <el-button v-if="deletePermission" type="text" plain icon="el-icon-download" class="cell-toolbar-button" style="color: #f56c6c" @click="handleDownload(scope.$index, scope.row)" />
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>

    </div>
    <table-pagination :total="total" :page.sync="page" :limit.sync="limit" @pagination="fetchList" />

    <bingwapper-add-popup :visible.sync="addFormVisible" @success="fetchList" />
    <bingwapper-edit-popup :visible.sync="editFormVisible" :data-id="selectRowId" @success="fetchList" />

  </flex-app-container>
</template>

<script>
import tableMixin from '@/mixin/table_mixin'
import BingwapperAddPopup from './add'
import BingwapperEditPopup from './edit'
import { downloadFile } from '@/api/utils'

export default {
  components: { BingwapperAddPopup, BingwapperEditPopup },
  mixins: [tableMixin],
  data() {
    return {
      tableKey: 1,
      uniqueName: 'bingwapper',
      apiUrlName: 'bingwappers',

      listPermission: true,
      addPermission: true,
      editPermission: true,
      deletePermission: true,

      tableFields: [
        {
          prop: 'filename',
          label: '名称',
          minWidth: '70',
          edit: true,
          show: true
        },
        {
          prop: 'title',
          label: '标题',
          minWidth: '140',
          show: true
        },
        {
          prop: 'description',
          label: '描述',
          minWidth: '140',
          show: false
        },
        {
          prop: 'date',
          label: '日期',
          minWidth: '28',
          show: true
        },
        {
          prop: 'author',
          label: '作者',
          minWidth: '70',
          show: true
        }
      ]
    }
  },
  computed: {
  },
  methods: {
    handleView: function(index, row) {
      const date = row.date
      window.open('/bingwapper/' + date, '_blank')
    },
    handleDownload: function(index, row) {
      const url = '/media/' + 'bingwapper/' + row.filename + '.jpg'
      downloadFile(url)
    },
  }
}
</script>
<style>
</style>
