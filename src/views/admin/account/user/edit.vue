<template>
  <el-dialog
    title="编辑"
    :visible.sync="formVisible"
    :close-on-click-modal="false"
    width="30%"
    @open="handelOpen"
  >
    <el-form ref="editForm" :model="editForm" label-width="auto" :rules="editFormRules">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="editForm.username" />
      </el-form-item>
      <el-form-item label="is staff" prop="is_staff">
        <el-switch
          v-model="editForm.is_staff"
        />
      </el-form-item>
      <el-form-item label="is active" prop="is_active">
        <el-switch
          v-model="editForm.is_active"
        />
      </el-form-item>
      <el-form-item label="is superuser" prop="is_superuser">
        <el-switch
          v-model="editForm.is_superuser"
        />
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
  name: 'UserEditPopup',
  mixins: [editMixin],
  data() {
    return {
      apiUrlName: 'users'
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
