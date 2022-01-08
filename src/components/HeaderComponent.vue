<template>
  <header>
    <div class="left-header">
      <el-button
        type="primary"
        icon="el-icon-menu"
        plain
        circle
        size="small"
        @click="collapseMenu()"
      ></el-button>
      <span>主页</span>
    </div>

    <div class="right-header">
      <el-dropdown size="small">
        <el-button icon="el-icon-user" size="small" circle></el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <span @click="goToMainUser()">个人中心</span>
          </el-dropdown-item>
          <el-dropdown-item>
            <span @click="userExit()">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
}

.left-header {
  .el-button {
    margin-right: 20px;
  }
}
</style>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    collapseMenu () {
      this.$store.commit('collapseMenu')
    },
    goToMainUser () {
      if (this.$route.name !== 'user') { this.$router.push({ name: 'user' }) }
    },
    userExit () {}
  }
}
</script>
