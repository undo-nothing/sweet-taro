<template>
  <el-dialog
    title="编辑"
    :visible.sync="formVisible"
    :close-on-click-modal="false"
    width="30%"
    @open="handelOpen"
  >
    <el-form ref="editForm" :model="editForm" label-width="auto" :rules="editFormRules">
      <el-form-item label="名称" prop="filename">
        <el-input v-model="editForm.filename" />
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="editForm.title" />
      </el-form-item>
      <el-form-item label="日期" prop="date">
        <el-date-picker
          v-model="editForm.date"
          type="date"
          value-format="yyyy-MM-dd"
        >
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input v-model="editForm.author" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click.native="formVisible = false">取消</el-button>
      <el-button type="primary" :loading="editLoading" @click.native="updateData">提交</el-button>
    </div>
  </el-dialog>
</template>

<script>
import editMixin from '@/mixin/edit_mixin'

export default {
  name: 'BingwapperEditPopup',
  mixins: [editMixin],
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
