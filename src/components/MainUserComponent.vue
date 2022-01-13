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
              </el-col>
            </el-row>
          </div>
          <div class="clearfix" v-for="(item, index) in userInfo" :key="index">
            <el-row>
              <el-col :span="12">
                <div class="grid-content">{{ item.label }}</div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content">{{ item.content }}</div>
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
                <el-input
                  placeholder="请输入用户昵称"
                  v-model="input"
                  clearable
                ></el-input>
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
                    @click="visible = false"
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
            <el-card>
              <div slot="header">
                <el-row>
                  <el-col :span="12">
                    <img :src="getUserAvator(item.userId)" />
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
      input: '',
      visible: false,
      userInfo: [
        {
          label: '昵称',
          content: 'hhm'
        },
        {
          label: '用户ID',
          content: 114514
        },
        {
          label: '角色',
          content: '普通用户'
        }
      ],
      userAvator:
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    }
  },
  computed: {
    watchList () {
      // 向服务器发送获得watchList请求，把返回得到的watchList
      // 用this.$store.commit('getWatchList', currentWatchList)加到vuex中
      console.log(this.$store.state.watchList.watchList)
      return this.$store.state.watchList.watchList
    }
  },
  methods: {
    getUserAvator (userId) {},
    confirmDeleteUser (user) {
      // 给服务器发消息删掉对应的id
      this.$store.commit('removeWatched', user)
    }
  }
}
</script>
