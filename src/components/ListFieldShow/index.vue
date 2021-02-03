<template>
  <el-dropdown :hide-on-click="false" trigger="click">
    <el-tooltip content="列" placement="top">
      <el-button class="toolbar-button-icon" type="text" plain><svg-icon icon-class="list" /></el-button>
    </el-tooltip>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-for="field in listFields" :key="field.label">
        <el-checkbox v-model="field.show" @change="handleChange">{{ field.label }}</el-checkbox>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  name: 'ListFieldShow',
  props: {
    listFields: {
      type: Array,
      required: true
    }
  },
  computed: {
  },
  methods: {
    handleChange(val) {
      this.$emit('change')
    }
  }
}
</script>

<style scoped>
</style>
