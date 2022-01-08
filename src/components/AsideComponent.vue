<template>
  <el-menu
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    :default-active="activeMenu"
  >
    <h3 v-show="!isCollapse">菜单栏</h3>
    <h3 v-show="isCollapse">菜单</h3>
    <el-menu-item
      v-for="(item, itemIndex) in menus"
      :index="itemIndex.toString()"
      :key="itemIndex"
      @click="itemClick(item)"
    >
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
  </el-menu>
</template>

<style lang="scss" scoped>
.el-menu {
  h3 {
    color: #303133;
  }
  height: 100vh;
}

.el-menu-item {
  text-align: left;
}
</style>

<script>
export default {
  data () {
    return {
      menus: [
        {
          label: '未完成事项',
          name: 'undone',
          icon: 'notebook-2',
          path: '/undone'
        },
        {
          label: '已完成事项',
          name: 'done',
          icon: 'finished',
          path: '/done'
        },
        {
          label: '种树记录',
          name: 'record',
          icon: 'document',
          path: '/record'
        },
        {
          label: '个人中心',
          name: 'user',
          icon: 'user',
          path: '/user'
        },
        {
          label: '设置',
          name: 'setting',
          icon: 'setting',
          path: '/setting'
        }
      ]
    }
  },
  methods: {
    itemClick (item) {
      if (this.$route.name !== item.name) { this.$router.push({ name: item.name }) }
    }
  },
  computed: {
    isCollapse () {
      return this.$store.state.asideCollapse.isCollapse
    },
    activeMenu () {
      const route = this.$route
      return route.path
    }
  }
}
</script>
