<template>
  <div class="undone">
    <el-container>
      <el-header>
        <div class="addTodoArea">
          <el-row>
            <el-col :span="8" :xs="14">
              <el-input
                v-model="search"
                placeholder="请输入要查找的标题关键词"
              ></el-input>
            </el-col>
            <el-col :span="16" :xs="10">
              <el-button
                type="primary"
                round
                size="small"
                @click="dialogVisible = true"
                class="btnAdd"
              >
                添加TODO
              </el-button>
              <el-dialog
                title="添加TODO"
                :visible.sync="dialogVisible"
                width="40%"
                :before-close="handleClose"
              >
                <el-row>
                  <el-input
                    class="todoInput"
                    v-model="todoTitle"
                    placeholder="TODO标题"
                  ></el-input>
                </el-row>
                <el-row>
                  <el-input
                    class="todoInput"
                    v-model="todoDescription"
                    placeholder="TODO详细描述"
                    type="textarea"
                    :autosize="{ minRows: 1, maxRows: 4 }"
                  ></el-input>
                </el-row>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false" round>
                    取 消
                  </el-button>
                  <el-button
                    type="primary"
                    @click="dialogVisible = false"
                    round
                  >
                    确 定
                  </el-button>
                </span>
              </el-dialog>
            </el-col>
          </el-row>
        </div>
      </el-header>
      <el-divider></el-divider>
      <el-main>
        <div class="todoList">
          <el-col>
            <el-card
              class="box-card"
              v-for="(item, index) in todoList"
              :key="index"
            >
              <div slot="header" class="clearfix">
                <el-row>
                  <el-col :xs="12" :span="16">
                    <span>{{ item.title }}</span>
                  </el-col>
                  <el-col :xs="12" :span="8">
                    <el-button
                      icon="el-icon-check"
                      type="primary"
                      round
                      @click="finishButtonClick(item)"
                    ></el-button>
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
              <div class="discription">
                <h3>详细描述</h3>
                <p v-if="!item.description">无</p>
                <p v-else>{{ item.description }}</p>
              </div>
              <div class="deadline">
                <h3>截止时间</h3>
                <p>{{ item.deadline }}</p>
              </div>
            </el-card>
          </el-col>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.undone {
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
    .el-row {
      margin: 10px;
      .el-button {
        margin-top: 3px;
      }
    }
  }
  .el-divider {
    margin: 0px;
  }
}

.addTodoArea {
  .todoInput {
    margin: 5px;
  }
  .btnAdd {
    margin: 0px;
    float: right;
  }
  .dialog-footer {
    .el-button {
      padding: 12px;
      float: right;
      margin-top: -30px;
    }
  }
}

.todoList {
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
  .el-button {
    padding: 8px;
    margin-left: 5px;
    float: right;
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
}
</style>

<script>
export default {
  data () {
    return {
      search: '',
      dialogVisible: false,
      todoTitle: '',
      todoDescription: '',
      todoDeadline: ''
    }
  },
  methods: {
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
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
      // 然后用this.$store.commit('addTodoEntity', todoEntity)加到vuex里面
      const tmpList = this.$store.state.undoneRepository.todoList
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
