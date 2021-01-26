<template>
  <div style="display: inline-block;">
    <el-dropdown
      :hide-on-click="false"
      trigger="click"
      @command="handleChoice"
    >
      <el-tooltip content="导出" placement="top">
        <el-button class="toolbar-button-icon" type="text" plain><svg-icon icon-class="export" /></el-button>
      </el-tooltip>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="csv">CSV导出</el-dropdown-item>
        <!-- <el-dropdown-item command="pdf">PDF导出</el-dropdown-item> -->
        <!-- <el-dropdown-item command="xls">Excel导出</el-dropdown-item> -->
        <el-dropdown-item command="txt">TXT导出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <el-dialog
      :title="formData.export_type + ' Export'"
      :visible.sync="exportFormVisible"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      width="200"
    >
      <el-form ref="formData" :model="formData" label-width="170px">
        <el-form-item>
          <el-radio v-model="formData.export_all" :label="false" border>Current Page</el-radio>
          <el-radio v-model="formData.export_all" :label="true" border>All Data</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="exportFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="handleSubmint">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ExportForm',
  props: {
  },
  data() {
    return {
      formData: {
        'export_type': '',
        'export_all': false
      },
      exportFormVisible: false
    }
  },
  computed: {
  },
  methods: {
    handleSubmint() {
      const form = Object.assign({}, this.formData)
      this.$emit('exportSubmit', form)
      this.exportFormVisible = false
    },
    handleChoice(export_type) {
      this.formData.export_type = export_type
      this.exportFormVisible = true
    }
  }
}
</script>

<style scoped>
</style>
