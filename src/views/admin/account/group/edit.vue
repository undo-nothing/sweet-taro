<template>
  <el-dialog
    title="编辑"
    :visible.sync="formVisible"
    :close-on-click-modal="false"
    width="30%"
    @open="handelOpen"
  >
    <el-form ref="editForm" :model="editForm" label-width="80px" :rules="editFormRules">
      <el-form-item label="组名称" prop="name">
        <el-input v-model="editForm.name" />
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
  name: 'GroupEditPopup',
  mixins: [editMixin],
  data() {
    return {
      apiUrlName: 'groups'
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
