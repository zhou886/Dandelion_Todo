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
      <el-table-column  label="完成时间" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.completeAt }}</span>
        </template>
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
</style>

<script>
export default {
  data () {
    return {
      todoEntity: [
        {
          createAt: '2022-01-06-12-40',
          completeAt: '2022-01-09-21-40',
          deadline: '2022-01-10-23-30',
          title: '人工智能基础大作业',
          description: '写一个BIT robot'
        }
      ]
    }
  },
  methods: {
    checkButtonClick () {

    },
    closeButtonClick () {

    }
  }
}
</script>
