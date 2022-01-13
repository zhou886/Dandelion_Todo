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
.home,
.el-container {
  height: 100%;
  overflow: hidden;
}

.el-header {
  position: relative;
  height: 60px;
  background-color: whitesmoke;
  overflow: hidden;
}

.el-aside {
  overflow: hidden;
  position: relative;
  left: 0;
  top: 0;
}
.el-main {
  overflow: hidden;
  position: relative;
  padding: 5px;
  margin: 0px;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100%;
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
