<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #2c3e50;
  overflow: hidden;
}

html,
body,
#app {
  margin: 0;
  padding: 0;
  height: 100%;
}

.el-popconfirm__action {
  .el-button {
    padding: 8px;
    border-radius: 20px;
  }
}
</style>
