<template>
  <div class="done">
    <el-container>
      <el-header>
        <el-row type="flex" align="middle" justify="end">
          <el-col :xs="16" :span="16">
            <el-input
              v-model="search"
              prefix-icon="el-icon-search"
              placeholder="请输入要查找的标题关键词"
              clearable
            ></el-input>
          </el-col>
          <el-col :xs="8" :span="8">
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
          </el-col>
        </el-row>
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
              <p v-if="!item.description">无</p>
              <p v-else>{{ item.description }}</p>
            </div>
            <div class="deadline">
              <h3>截止时间</h3>
              <p>{{ dateFormat(item.deadline) }}</p>
            </div>
            <div class="completeAt">
              <h3>完成时间</h3>
              <p>{{ dateFormat(item.completeAt) }}</p>
            </div>
          </el-card>
        </el-col>
      </el-main>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.btnSort {
  float: right;
  padding: 10px;
  margin-right: 5px;
}

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
import NetWork from '../network/index'

export default {
  data () {
    return {
      search: '',
      sortSelect: '',
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
        },
        {
          value: 4,
          label: '按完成时间排序'
        }
      ]
    }
  },
  methods: {
    deleteButtonClick (item) {
      // 删除已完成的TODO
      const nt = NetWork.getInstance()
      nt.DeleteTODO(item.todoId, this.$store.state.userInfo.userInfo.id)
        .then(() => {
          // 服务器返回删除TODO成功，更新本地数据
          this.$store.commit('removeDoneEntity', item)
        })
        .catch((e) => {
          // 服务器返回删除TODO失败，弹窗告知错误
          console.log(e)
          this.$message({
            message: e,
            iconClass: 'el-icon-warning-outline',
            duration: 1500,
            center: true
          })
        })
    },
    handleCommand (command) {
      this.sortSelect = command
    },
    dateFormat (date) {
      return date.GetTime().toLocaleString()
    }
  },
  computed: {
    doneList () {
      // 从Vuex中获取已完成TODO列表
      const tmpList = this.$store.state.doneRepository.doneList
      console.log(tmpList)
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
      function compareCompleteAt (x, y) {
        if (x.completeAt.GetTime() < y.completeAt.GetTime()) {
          return -1
        } else {
          return 1
        }
      }

      // 如果有要求排序就排序
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
          case 4:
            tmpList.sort(compareCompleteAt)
            break
        }
      }

      // 如果有要求搜索就搜索
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
