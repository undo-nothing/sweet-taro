import { commonCreateApi } from '@/api/curd'

var addMixin = {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      addFormRules: {},
      addForm: {},
      addLoading: false,

      apiUrlName: 'areas'
    }
  },
  methods: {
    handelOpen: function() {
      this.addForm = Object.assign({}, {})
    },
    createData: function() {
      const url_path = this.apiUrlName + '/'
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.addLoading = true
          const datas = Object.assign({}, this.addForm)
          commonCreateApi(url_path, datas).then(() => {
            this.addLoading = false
            this.$message({
              message: '成功',
              type: 'success'
            })
            this.formVisible = false
            this.$emit('success')
          })
            .catch((error) => {
              const res = error.response
              this.addLoading = false
              this.$message({
                message: res.data,
                type: 'error'
              })
            })
        }
      })
    }
  },
  computed: {
    formVisible: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  }
}

export default addMixin
