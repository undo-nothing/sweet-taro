<template>
  <div class="sort-item" :class="['sort-item', sortClass]">
    <span><slot /></span>
    <span class="caret-wrapper">
      <i class="sort-caret descending" />
      <i class="sort-caret ascending" />
    </span>
  </div>
</template>

<script>
export default {
  name: 'SortItem',
  props: {
    field: {
      required: true,
      type: String
    },
    orderingValue: {
      required: true,
      type: Number
    },
    orderingField: {
      required: true,
      type: String
    }
  },
  computed: {
    sortClass: function() {
      if (this.orderingField === this.field) {
        if (this.orderingValue === 1) {
          return 'ascending'
        } else if (this.orderingValue === -1) {
          return 'descending'
        }
      }
      return ''
    }
  },
  created() {
  },
  methods: {
  }
}

</script>

<style lang="scss" scoped>
.sort-item {
  margin-right: 20px;
  float: left;
  cursor: pointer;

  .caret-wrapper {
    display: inline-flex;
    height: 34px;
    width: 24px;
    vertical-align: middle;
    cursor: pointer;
    position: relative;

    .sort-caret {
        border: 5px solid transparent;
        position: absolute;
        left: 7px;
    }

    .ascending {
      border-bottom-color: #c0c4cc;
      top: 5px;
    }
    .descending {
        border-top-color: #c0c4cc;
        bottom: 7px;
    }
  }
}
.ascending .sort-caret.ascending {
  border-bottom-color: #409eff;
}
.descending .sort-caret.descending {
  border-top-color: #409eff;
}
</style>
