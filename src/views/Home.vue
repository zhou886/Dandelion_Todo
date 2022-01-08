<template>
  <div class="home">
    <el-container>
      <el-aside :width="asideWidth"><aside-component></aside-component></el-aside>
      <el-container>
        <el-header><header-component></header-component></el-header>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
html,
body,
#app,
.el-container {
  height: 100%;
}

.el-header {
  height: 100%;
  background-color: whitesmoke;
}
</style>

<script>
import AsideComponent from '../components/AsideComponent.vue'
import HeaderComponent from '../components/HeaderComponent.vue'

export default {
  name: 'Home',
  components: {
    AsideComponent,
    HeaderComponent
  },
  computed: {
    asideWidth () {
      if (!this.$store.state.asideCollapse.isCollapse) { return '200px' } else { return '60px' }
    }
  }
}
</script>
