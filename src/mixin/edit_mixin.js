import { commonUpdateApi, commonFetchOneApi } from '@/api/curd'

var editMixin = {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    dataId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      editLoading: false,
      editFormRules: {},
      editForm: {}
    }
  },
  methods: {
    handelOpen: function() {
      const url_path = this.apiUrlName + '/'
      commonFetchOneApi(url_path, this.dataId).then(response => {
        this.editForm = Object.assign({}, response.data)
        this.editLoading = false
      })
    },
    updateData: function() {
      const url_path = this.apiUrlName + '/'
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.editLoading = true
          const post_data = Object.assign({}, this.editForm)
          commonUpdateApi(url_path, post_data).then(() => {
            this.editLoading = false
            this.$message({
              message: '成功',
              type: 'success'
            })
            this.formVisible = false
            this.$emit('success')
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

export default editMixin
