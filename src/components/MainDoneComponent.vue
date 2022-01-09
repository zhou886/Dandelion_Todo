<template>
  <div class="done">
    <el-table stripe height="200" :data="doneList">
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
    }
  },
  methods: {
  },
  computed: {
    doneList () {
      // 向拉取doneList的数据
      // 然后用this.$store.commit('addDoneEntity, doneEntity')加到vuex里面
      return this.$store.state.doneRepository.doneList
    }
  }
}
</script>
