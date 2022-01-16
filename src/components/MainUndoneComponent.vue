<template>
  <div class="undone">
    <el-container>
      <el-header>
        <div class="addTodoArea">
          <el-row type="flex" justify="end" align="middle">
            <el-col :span="8" :xs="8">
              <el-input
                v-model="search"
                :placeholder="elInputPlaceholder"
                prefix-icon="el-icon-search"
                clearable
              ></el-input>
            </el-col>
            <el-col :span="16" :xs="16" class="colAlignRight">
              <el-dropdown style="float: right" @command="handleCommand">
                <el-button
                  icon="el-icon-sort"
                  type="primary"
                  round
                  class="btnSort"
                ></el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-for="item in sortOption"
                    :key="item.value"
                    :command="item.value"
                  >
                    {{ item.label }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-button
                type="primary"
                round
                @click="dialogVisible = true"
                class="btnAdd"
              >
                添加TODO
              </el-button>
              <el-dialog
                title="添加TODO"
                :visible.sync="dialogVisible"
                :width="dialogWidth"
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
                  ></el-input>
                </el-row>
                <el-row>
                  <el-date-picker
                    v-model="todoDeadline"
                    type="datetime"
                    placeholder="请选择截止时间"
                    align="center"
                    style="width: 100%; margin-left: 5px"
                  ></el-date-picker>
                </el-row>
                <span slot="footer" class="dialog-footer">
                  <el-button
                    @click="dialogVisible = false"
                    round
                    class="btnAddTodoDialog"
                  >
                    取 消
                  </el-button>
                  <el-button
                    type="primary"
                    @click="
                      createTodoEntity(todoTitle, todoDescription, todoDeadline)
                    "
                    round
                    class="btnAddTodoDialog"
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
              <div class="description">
                <h3>详细描述</h3>
                <p v-if="!item.description">无</p>
                <p v-else>{{ item.description }}</p>
              </div>
              <div class="deadline">
                <h3>截止时间</h3>
                <p>{{ dateFormat(item.deadline) }}</p>
              </div>
            </el-card>
          </el-col>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.btnSort,
.btnAdd {
  float: right;
  padding: 10px;
  margin-right: 5px;
}

.btnAddTodoDialog {
  margin: 10px;
  margin-top: -100%;
}

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
import Network from '../network/index'
import { TodoEntity } from '../model/index'
export default {
  data () {
    return {
      search: null,
      dialogVisible: false,
      todoTitle: null,
      todoDescription: null,
      todoDeadline: null,
      sortSelect: null,
      sortOption: [
        {
          value: 1,
          label: '按标题排序'
        },
        {
          value: 2,
          label: '按创建时间排序'
        },
        {
          value: 3,
          label: '按截止时间排序'
        }
      ]
    }
  },
  methods: {
    handleClose (done) {
      done()
    },
    createTodoEntity (todoTitle, todoDescription, todoDeadline) {
      // 新建TODO

      // 判空
      if (!todoTitle) {
        this.$message({
          message: 'TODO标题不能为空!',
          iconClass: 'el-icon-warning-outline',
          duration: 1500,
          center: true
        })
        return
      }
      if (!todoDeadline) {
        this.$message({
          message: 'TODO截止时间不能为空!',
          iconClass: 'el-icon-warning-outline',
          duration: 1500,
          center: true
        })
        return
      }

      // 构造新的todoEntity
      const currentTime = new Date()
      const todoEntity = new TodoEntity({
        title: todoTitle,
        description: todoDescription,
        deadline: todoDeadline,
        createAt: currentTime,
        parentId: 0,
        importance: 0,
        loaclId: 0,
        creatorId: this.$store.state.userInfo.userInfo.id
      })

      console.log(todoEntity)
      const nt = Network.getInstance()
      nt.CreateTODO(todoEntity, this.$store.state.userInfo.userInfo.id)
        .then((feedbackTodoEntity) => {
          // 服务器返回创建TODO成功，本地同步更新
          todoEntity.todoId = feedbackTodoEntity.todoId
          this.$store.commit('addUndoneEntity', todoEntity)
        })
        .catch((error) => {
          // 服务器返回创建TODO失败，弹窗告知错误
          console.log(error)
          this.$message({
            message: error,
            iconClass: 'el-icon-warning-outline',
            duration: 1500,
            center: true
          })
        })
      this.todoTitle = null
      this.todoDescription = null
      this.todoDeadline = null
      this.dialogVisible = false
    },
    finishButtonClick (todoEntity) {
      // 完成TODO
      console.log('finish', todoEntity)
      todoEntity.completeTodo()
      todoEntity.localId = 0

      const nt = Network.getInstance()
      nt.UpdateTODO(
        todoEntity,
        todoEntity.todoId,
        this.$store.state.userInfo.userInfo.id
      )
        .then(() => {
          // 服务器返回完成TODO成功，本地同步更新
          this.$store.commit('addDoneEntity', todoEntity)
          this.$store.commit('removeUndoneEntity', todoEntity)
        })
        .catch((error) => {
          // 服务器返回完成TODO失败，弹窗告知错误
          console.log(error)
        })
    },
    deleteButtonClick (todoEntity) {
      const nt = Network.getInstance()
      nt.DeleteTODO(todoEntity.todoId, this.$store.state.userInfo.userInfo.id)
        .then(() => {
          // 服务器返回删除TODO成功，本地同步更新
          this.$store.commit('removeUndoneEntity', todoEntity)
        })
        .catch((error) => {
          // 服务器返回删除TODO失败，弹窗告知错误
          console.log(error)
          this.$message({
            message: error,
            iconClass: 'el-icon-warning-outline',
            duration: 1500,
            center: true
          })
        })
    },
    handleCommand (command) {
      this.sortSelect = command
      console.log(this.sortSelect)
    },
    dateFormat (date) {
      return date.GetTime().toLocaleString()
    }
  },
  computed: {
    todoList () {
      // 已经在登录界面中获取了todoList
      const tmpList = this.$store.state.undoneRepository.todoList
      console.log(tmpList)

      // 创建排序用的函数原型
      function compareTitle (x, y) {
        if (x.title < y.title) {
          return -1
        } else {
          return 1
        }
      }
      function compareCreateAt (x, y) {
        if (x.createAt.GetTime() < y.createAt.GetTime()) {
          return -1
        } else {
          return 1
        }
      }
      function compareDeadline (x, y) {
        if (x.deadline.GetTime() < y.deadline.GetTime()) {
          return -1
        } else {
          return 1
        }
      }

      // 根据选择的不同类型的排序方式进行排序
      if (this.sortSelect) {
        switch (this.sortSelect) {
          case 1:
            tmpList.sort(compareTitle)
            break
          case 2:
            tmpList.sort(compareCreateAt)
            break
          case 3:
            tmpList.sort(compareDeadline)
            break
        }
      }

      // 根据输入的搜索title的关键词对tmpList进行选择
      if (this.search) {
        return tmpList.filter((item) => {
          return item.title.includes(this.search)
        })
      } else {
        return tmpList
      }
    },
    dialogWidth () {
      const tmp = document.body.clientWidth
      if (tmp < 800) {
        return '100%'
      } else if (tmp < 1024) {
        return '75%'
      } else {
        return '50%'
      }
    },
    elInputPlaceholder () {
      const tmp = document.body.clientWidth
      if (tmp < 800) {
        return ''
      } else {
        return '请输入要查找的标题关键词'
      }
    }
  }
}
</script>
