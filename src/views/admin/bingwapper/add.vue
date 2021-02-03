<template>
  <el-dialog
    title="新增"
    :visible.sync="formVisible"
    :close-on-click-modal="false"
    width="30%"
    @open="handelOpen"
  >
    <el-form ref="addForm" :model="addForm" label-width="auto" :rules="addFormRules">
      <el-form-item label="名称" prop="filename">
        <el-input v-model="addForm.filename" />
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="addForm.title" />
      </el-form-item>
      <el-form-item label="日期" prop="date">
        <el-date-picker
          v-model="addForm.date"
          type="date"
          value-format="yyyy-MM-dd"
        >
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input v-model="addForm.author" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click.native="formVisible = false">取消</el-button>
      <el-button type="primary" :loading="addLoading" @click.native="createData">提交</el-button>
    </div>
  </el-dialog>
</template>

<script>
import addMixin from '@/mixin/add_mixin'

export default {
  name: 'BingwapperAddPopup',
  mixins: [addMixin],
  data() {
    return {
      apiUrlName: 'bingwappers'
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style scoped>
</style>
