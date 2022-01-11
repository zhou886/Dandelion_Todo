<template>
  <div class="done">
    <el-container>
      <el-header>
        <el-col :xs="24" :span="8">
          <el-input
            v-model="search"
            placeholder="请输入要查找的标题关键词"
          ></el-input>
        </el-col>
      </el-header>
      <el-divider></el-divider>
      <el-main>
        <el-col>
          <el-card
            class="box-card"
            v-for="(item, index) in doneList"
            :key="index"
          >
            <div slot="header">
              <el-row>
                <el-col :xs="12" :span="16">
                  <span>{{ item.title }}</span>
                </el-col>
                <el-col :xs="12" :span="8">
                  <el-popconfirm
                    title="确定要删除这条TODO吗?"
                    confirm-button-text="确定"
                    cancel-button-text="取消"
                    @confirm="deleteButtonClick(item)"
                  >
                    <el-button
                      icon="el-icon-close"
                      type="danger"
                      round
                      slot="reference"
                    ></el-button>
                  </el-popconfirm>
                </el-col>
              </el-row>
            </div>
            <div class="discripion">
              <h3>详细描述</h3>
              <p v-if="!item.discription">无</p>
              <p v-else>{{ item.discription }}</p>
            </div>
            <div class="deadline">
              <h3>截止时间</h3>
              <p>{{ item.deadline }}</p>
            </div>
            <div class="completeAt">
              <h3>完成时间</h3>
              <p>{{ item.completeAt }}</p>
            </div>
          </el-card>
        </el-col>
      </el-main>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.done {
  height: 100%;
  .el-container,
  .el-main {
    height: 100%;
    overflow-y: auto;
    padding: 0px;
    margin: 0px;
  }
  .el-header {
    height: 50px;
    .el-input {
      margin-top: 10px;
      float: left;
    }
  }
  .el-divider {
    margin: 0px;
  }
}

.el-main {
  .box-card {
    .el-button {
      padding: 8px;
      float: right;
      margin-right: 10px;
    }
  }
}

/deep/ .el-card__header {
  padding: 15px;
}
/deep/ .el-card__body {
  padding: 15px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}
.box-card {
  margin: 20px;
  text-align: left;
}
span {
  font-size: 20px;
  font-weight: 900;
}
h3 {
  margin: 5px;
  margin-left: 0px;
  font-size: 18px;
}
p {
  font-size: 16px;
  margin: 8px;
  padding-left: 5px;
}
</style>

<script>
export default {
  data () {
    return {
      search: ''
    }
  },
  methods: {
    deleteButtonClick (item) {
      this.$store.commit('removeDoneEntity', item)
    }
  },
  computed: {
    doneList () {
      // 向拉取doneList的数据
      // 然后用this.$store.commit('addDoneEntity, doneEntity')加到vuex里面
      const tmpList = this.$store.state.doneRepository.doneList
      if (this.search) {
        return tmpList.filter((item) => {
          return item.title.includes(this.search)
        })
      } else {
        return tmpList
      }
    }
  }
}
</script>
