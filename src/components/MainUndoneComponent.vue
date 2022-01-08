<template>
  <div class="done">
    <el-card></el-card>
    <el-table stripe height="200" :data="todoEntity">
      <el-table-column prop="title" label="标题" width="180"></el-table-column>
      <el-table-column
        prop="description"
        label="详细描述"
        width="180"
      ></el-table-column>
      <el-table-column  label="截止时间" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.deadline }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <el-button class="elbutton" icon="el-icon-check" type="primary" round @click="checkButtonClick()"></el-button>
        <el-button class="elbutton" icon="el-icon-close" type="danger"  round @click="closeButtonClick()"></el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<style lang="scss" scoped>
.done{
  .el-table{
    display:flow-root;
  }
}

.elbutton {
  padding: 5px 5px;
}
</style>

<script>
export default {
  data () {
    return {
      todoEntity: [
        {
          createAt: '2022-01-06-12-40',
          deadline: '2022-01-10-23-30',
          title: '人工智能基础大作业',
          description: '写一个BIT robot'
        }
      ]
    }
  },
  methods: {
    checkButtonClick () {
      // TODO完成，向服务器发送完成时间
    },
    closeButtonClick () {

    }
  }
}
</script>
