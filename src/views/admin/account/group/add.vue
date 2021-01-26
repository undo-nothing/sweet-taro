<template>
  <el-dialog
    title="新增"
    :visible.sync="formVisible"
    :close-on-click-modal="false"
    width="30%"
    @open="handelOpen"
  >
    <el-form ref="addForm" :model="addForm" label-width="80px" :rules="addFormRules">
      <el-form-item label="组名称" prop="name">
        <el-input v-model="addForm.name" />
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
  name: 'GroupAddPopup',
  mixins: [addMixin],
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
