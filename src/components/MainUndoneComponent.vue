<template>
  <div class="done">
    <el-table stripe height="200" :data="todoList">
      <el-table-column prop="title" label="标题" width="180"></el-table-column>
      <el-table-column
        prop="description"
        label="详细描述"
        width="180"
      ></el-table-column>
      <el-table-column label="截止时间" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.deadline }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            class="elbutton"
            icon="el-icon-check"
            type="primary"
            round
            @click="finishButtonClick(scope.row)"
          ></el-button>
          <el-button
            class="elbutton"
            icon="el-icon-close"
            type="danger"
            round
            @click="deleteButtonClick(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style lang="scss" scoped>
.done {
  .el-table {
    display: flow-root;
  }
}

.elbutton {
  padding: 5px 5px;
}
</style>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    finishButtonClick (todoEntity) {
      // TODO完成，向服务器发送完成时间
      const d = new Date()
      const year = d.getFullYear().toString()
      const month = (d.getMonth() + 1).toString()
      const day = d.getDate().toString()
      const hour = d.getHours().toString()
      var minite = ''
      if (d.getMinutes() < 10) {
        minite = '0' + d.getMinutes().toString()
      } else {
        minite = d.getMinutes().toString()
      }
      const time = year + '-' + month + '-' + day + '-' + hour + '-' + minite
      todoEntity.completeAt = time
      this.$store.commit('addDoneEntity', todoEntity)
      this.$store.commit('removeTodoEntity', todoEntity)
    },
    deleteButtonClick (todoEntity) {
      this.$store.commit('removeTodoEntity', todoEntity)
    }
  },
  computed: {
    todoList () {
      // 向拉取TODOList的数据
      // 然后用this.$store.commit('addTodoEntity, todoEntity')加到vuex里面
      return this.$store.state.undoneRepository.todoList
    }
  }
}
</script>
