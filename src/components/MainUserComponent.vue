<template>
  <div class="user">
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <el-row>
              <el-col :span="12">
                <el-image :src="userAvator" fit="fill"></el-image>
              </el-col>
              <el-col :span="12">
                <el-button plain round class="btnChangeAvator">
                  更改头像
                </el-button>
                <el-button plain round class="btnChangePassword">
                  更改密码
                </el-button>
                <el-button plain round class="btnChangeNickname">
                  更改昵称
                </el-button>
              </el-col>
            </el-row>
          </div>
          <div class="clearfix">
            <el-row>
              <el-col :span="12">
                <span>昵称</span>
              </el-col>
              <el-col :span="12">
                <span>{{ userInfo.nickname }}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <span>用户ID</span>
              </el-col>
              <el-col :span="12">
                <span>{{ userInfo.id }}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <span>角色</span>
              </el-col>
              <el-col :span="12">
                <span>{{ userInfo.role }}</span>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-row type="flex" align="middle">
            <el-col :span="12">
              <span>观察者名单</span>
            </el-col>
            <el-col :span="12">
              <el-popover placement="right" width="200" v-model="visible">
                <p style="margin-top: 3px">请输入您要观察的用户昵称</p>
                <el-select
                  v-model="input"
                  filterable
                  remote
                  reserve-keyword
                  placeholder="请选择用户"
                  :remote-method="remoteMethod"
                  :loading="loading"
                >
                  <el-option
                    v-for="(item, index) in options"
                    :key="index"
                    :label="item.id"
                    :value="item.nickname"
                  ></el-option>
                </el-select>
                <div style="text-align: right; margin: 0; margin-top: 10px">
                  <el-button
                    size="mini"
                    type="text"
                    @click="visible = false"
                    round
                  >
                    取消
                  </el-button>
                  <el-button
                    type="primary"
                    size="mini"
                    round
                    @click="btnAddWatchClick()"
                  >
                    确定
                  </el-button>
                </div>
                <el-button
                  slot="reference"
                  type="primary"
                  round
                  class="btnAddWatch"
                  style="margin-right: 22px"
                  icon="el-icon-plus"
                ></el-button>
              </el-popover>
            </el-col>
          </el-row>
        </div>
        <div class="clearfix">
          <el-row v-for="(item, index) in watchList" :key="index">
            <el-card shadow="hover">
              <div slot="header">
                <el-row>
                  <el-col :span="12">
                    <el-image :src="getUserAvator(item.userId)" />
                  </el-col>
                  <el-col :span="12">
                    <el-popconfirm
                      title="确定要删除该名用户吗?"
                      confirm-button-text="确定"
                      cancel-button-text="取消"
                      @confirm="confirmDeleteUser(item)"
                    >
                      <el-button
                        icon="el-icon-minus"
                        type="danger"
                        round
                        class="btnDeleteWatch"
                        slot="reference"
                      ></el-button>
                    </el-popconfirm>
                  </el-col>
                </el-row>
              </div>
              <div class="clearfix">
                <el-row>
                  <el-col :span="12">
                    <span>昵称</span>
                  </el-col>
                  <el-col :span="12">
                    <span>{{ item.nickname }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <span>用户ID</span>
                  </el-col>
                  <el-col :span="12">
                    <span>{{ item.userId }}</span>
                  </el-col>
                </el-row>
              </div>
            </el-card>
          </el-row>
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.btnAddWatch,
.btnDeleteWatch {
  float: right;
}

.el-button {
  padding: 8px;
  margin: 0;
}

.user {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

.text {
  font-size: 14px;
}

.el-select {
  margin-top: 5px;
}

.btnChangeAvator {
  padding: 10px;
  margin: 0px;
  margin-top: 30px;
  margin-left: -10px;
}

.el-image {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  align-self: center;
}

.item {
  margin-bottom: 18px;
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
  width: 100%;
  text-align: left;
}

.front-span {
  margin-right: 20px;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
}

.minus-button {
  padding: 5px 5px;
}

.el-card {
  margin: 2px;
}
</style>

<script>
export default {
  data () {
    return {
      input: [],
      loading: false,
      options: [],
      visible: false
    }
  },
  computed: {
    watchList () {
      // 向服务器发送获得watchList请求，把返回得到的watchList
      // 用this.$store.commit('getWatchList', currentWatchList)加到vuex中
      return this.$store.state.watchList.watchList
    },
    userAvator () {
      // 向服务器发送获取头像的请求，再返回url或者图片
      // 用户id是this.userInfo.id
      return ''
    },
    userInfo () {
      return this.$store.state.userInfo.userInfo
    }
  },
  methods: {
    getUserAvator (id) {
      // 向服务器发送获取头像的请求，再返回url或者图片
      // 用户id是id
      return ''
    },
    confirmDeleteUser (user) {
      // 给服务器发消息删掉对应的id
      this.$store.commit('removeWatched', user)
    },
    remoteMethod (query) {
      if (query !== '') {
        this.loading = true
        // 向服务器发送请求，获取所有昵称中带有关键词query的用户
        // 把用户ID、头像?拉取到this.options
        setTimeout(() => {
          this.loading = false
          // 举个例子
          this.options = [
            {
              id: 123,
              nickname: 'hhh'
            }
          ]
        }, 500)
      } else {
        this.options = []
      }
    },
    btnAddWatchClick () {
      this.visible = false
      // 向服务器发送请求
    }
  }
}
</script>
