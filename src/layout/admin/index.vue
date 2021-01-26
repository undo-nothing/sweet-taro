<template>
  <div :class="classObj">
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <navbar />
      <app-main />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Sidebar, AppMain, Navbar } from './components'

export default {
  name: 'AdminLayout',
  components: {
    Sidebar,
    Navbar,
    AppMain
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened
      }
    }
  }
}
</script>
