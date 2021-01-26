<template>
  <el-dialog
    title="新增"
    :visible.sync="formVisible"
    :close-on-click-modal="false"
    width="30%"
    @open="handelOpen"
  >
    <el-form ref="addForm" :model="addForm" label-width="auto" :rules="addFormRules">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="addForm.username" />
      </el-form-item>
      <el-form-item label="is staff" prop="is_staff">
        <el-switch
          v-model="addForm.is_staff"
        />
      </el-form-item>
      <el-form-item label="is active" prop="is_active">
        <el-switch
          v-model="addForm.is_active"
        />
      </el-form-item>
      <el-form-item label="is superuser" prop="is_superuser">
        <el-switch
          v-model="addForm.is_superuser"
        />
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
  name: 'UserAddPopup',
  mixins: [addMixin],
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
