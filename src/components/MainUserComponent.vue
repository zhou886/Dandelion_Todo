<template>
  <div class="user">
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <el-row type="flex" justify="center">
              <el-col :span="12">
                <h2>用户信息</h2>
              </el-col>
              <el-col :span="12">
                <el-image :src="userAvatar" fit="fill"></el-image>
              </el-col>
            </el-row>
          </div>
          <div class="clearfix">
            <el-row>
              <el-col :span="12">
                <h3>用户ID</h3>
                <span>{{ userInfo.id }}</span>
              </el-col>
              <el-col :span="12">
                <el-button
                  plain
                  round
                  class="btnChangeAvatar"
                  @click="dialogChangeAvatarVisible = true"
                >
                  更改头像
                </el-button>
                <el-dialog
                  title="更改头像"
                  :visible.sync="dialogChangeAvatarVisible"
                  :width="dialogWidth"
                >
                  <p>请选择您的头像</p>
                  <input type="file" accept="image/*" @change="avatarInputChanged($event)"/>
                  <br>
                  <el-image :src="imageUrl" fit="fill" id="newAvatar"></el-image>
                  <span slot="footer" class="dialog-footer">
                    <el-button
                      round
                      @click="dialogChangeAvatarVisible = false"
                      class="dialogBtn"
                    >
                      取 消
                    </el-button>
                    <el-button
                      type="primary"
                      round
                      @click="btnChangeAvatarClick()"
                      class="dialogBtn"
                    >
                      确 定
                    </el-button>
                  </span>
                </el-dialog>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <h3>昵称</h3>
                <span>{{ userInfo.nickname }}</span>
              </el-col>
              <el-col :span="12">
                <el-button
                  plain
                  round
                  class="btnChangeNickname"
                  @click="dialogChangeNicknameVisible = true"
                >
                  更改昵称
                </el-button>
                <el-dialog
                  title="更改昵称"
                  :visible.sync="dialogChangeNicknameVisible"
                  :width="dialogWidth"
                >
                  <p>请输入您要更改的昵称</p>
                  <el-input
                    v-model="newNickname"
                    placeholder="请输入您想要的昵称"
                  ></el-input>
                  <span slot="footer" class="dialog-footer">
                    <el-button
                      round
                      @click="dialogChangeNicknameVisible = false"
                      class="dialogBtn"
                    >
                      取 消
                    </el-button>
                    <el-button
                      type="primary"
                      round
                      @click="btnChangeNicknameClick()"
                      class="dialogBtn"
                    >
                      确 定
                    </el-button>
                  </span>
                </el-dialog>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <h3>角色</h3>
                <span v-for="(item, index) in userInfo.role" :key="index">
                  {{ item.authority }}
                </span>
              </el-col>
              <el-col :span="12">
                <el-button
                  plain
                  round
                  class="btnChangePassword"
                  @click="dialogChangePasswordVisible = true"
                >
                  更改密码
                </el-button>
                <el-dialog
                  title="更改密码"
                  :visible.sync="dialogChangePasswordVisible"
                  :width="dialogWidth"
                >
                  <el-input
                    placeholder="请输入原密码"
                    v-model="oldPassword"
                    show-password
                  ></el-input>
                  <el-input
                    placeholder="请输入新密码"
                    v-model="newPassword"
                    show-password
                  ></el-input>
                  <el-input
                    placeholder="请再次输入新密码"
                    v-model="newConfirmedPassword"
                    show-password
                  ></el-input>
                  <span slot="footer" class="dialog-footer">
                    <el-button
                      round
                      @click="dialogChangePasswordVisible = false"
                      class="dialogBtn"
                    >
                      取 消
                    </el-button>
                    <el-button
                      type="primary"
                      round
                      @click="btnChangePasswordClick()"
                      class="dialogBtn"
                    >
                      确 定
                    </el-button>
                  </span>
                </el-dialog>
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
              <h2>观察者名单</h2>
            </el-col>
            <el-col :span="12">
              <el-popover
                placement="right"
                width="200"
                v-model="popoverAddWatchVisible"
              >
                <p style="margin-top: 3px">请输入您要观察的用户昵称</p>
                <el-select
                  v-model="selectUser"
                  multiple
                  filterable
                  remote
                  reserve-keyword
                  placeholder="请选择用户"
                  :remote-method="remoteMethod"
                  :loading="loading"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.userId"
                    :label="'用户ID:' + item.userId"
                    :value="item.userId"
                  ></el-option>
                </el-select>
                <div style="text-align: right; margin: 0; margin-top: 10px">
                  <el-button
                    size="mini"
                    type="text"
                    @click="popoverAddWatchVisible = false"
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
                    <el-image :src="'data:image/jpeg;base64,'+item.avatar" />
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
                  <el-col :span="24">
                    <h3>昵称</h3>
                    <span>{{ item.nickname }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <h3>用户ID</h3>
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
.el-input {
  margin-top: 5px;
  margin-bottom: 5px;
}

.el-button.dialogBtn {
  margin: 10px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.btnAddWatch,
.btnDeleteWatch {
  float: right;
  margin-top: 50px;
}

span {
  margin-left: 20px;
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

.btnChangeAvatar,
.btnChangePassword,
.btnChangeNickname {
  padding: 10px;
  margin-top: 20px;
}

.el-image {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  margin: 20px;
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
import NetWork from '../network/index'

export default {
  data () {
    return {
      selectUser: [],
      options: [],
      loading: false,
      popoverAddWatchVisible: false,
      dialogChangePasswordVisible: false,
      dialogChangeAvatarVisible: false,
      dialogChangeNicknameVisible: false,
      selectNickname: '',
      newNickname: '',
      oldPassword: '',
      newPassword: '',
      newConfirmedPassword: '',
      imageUrl: '',
      imageBase64: '',
      imageByte: ''
    }
  },
  computed: {
    dialogWidth () {
      const tmp = document.body.clientWidth
      if (tmp <= 500) {
        return '100%'
      } else if (tmp <= 100) {
        return '75%'
      } else {
        return '50%'
      }
    },
    watchList () {
      return this.$store.state.watchList.watchList
    },
    userAvatar () {
      console.log(this.$store.state.userInfo.Avatar)
      return this.$store.state.userInfo.Avatar
    },
    userInfo () {
      return this.$store.state.userInfo.userInfo
    }
  },
  methods: {
    confirmDeleteUser (user) {
      // 给服务器发消息删掉对应的id
      const nt = NetWork.getInstance()
      nt.DeleteWatchList([user.userId], this.$store.state.userInfo.userInfo.id)
        .then(() => {
          this.$store.commit('removeWatched', user)
        })
        .catch(e => {
          console.log(e)
          this.$message({
            message: e,
            iconClass: 'el-icon-warning-outline',
            duration: 1500,
            center: true
          })
        })
    },
    remoteMethod (query) {
      if (query !== '') {
        this.loading = true
        // 向服务器发送请求，获取所有昵称中带有关键词query的用户
        // 把用户ID、头像?拉取到this.options
        this.options = []
        const nt = NetWork.getInstance()
        nt.SearchByNickname(query)
          .then((userArray) => {
            this.loading = false
            this.selectNickname = query
            this.options = userArray
          })
          .catch((e) => {
            console.log(e)
            this.$message({
              message: e,
              iconClass: 'el-icon-warning-outline',
              duration: 1500,
              center: true
            })
          })
      } else {
        this.options = []
      }
    },
    btnAddWatchClick () {
      // 向服务器发送请求
      if (!this.selectUser) {
        this.$message({
          message: '请先选择至少一位用户',
          iconClass: 'el-icon-warning-outline',
          duration: 1500,
          center: true
        })
      } else {
        const nt = NetWork.getInstance()
        nt.AddWatchList(this.selectUser, this.$store.state.userInfo.userInfo.id)
          .then(() => {
            this.popoverAddWatchVisible = false
            for (var i = 0; i < this.selectUser.length; i++) {
              this.$store.commit('addWatched', { nickname: this.selectNickname, userId: this.selectUser[i] })
            }
            this.selectUser = []
          })
          .catch(e => {
            console.log(e)
            this.$message({
              message: e,
              iconClass: 'el-icon-warning-outline',
              duration: 1500,
              center: true
            })
          })
      }
    },
    btnChangeNicknameClick () {
      // 更改昵称
      if (!this.newNickname) {
        this.$message({
          message: '请先输入昵称',
          iconClass: 'el-icon-warning-outline',
          duration: 1500,
          center: true
        })
        return
      }
      const nt = NetWork.getInstance()
      nt.UpdateDetailInfo(
        { nickname: this.newNickname },
        this.$store.state.userInfo.userInfo.id
      )
        .then(() => {
          this.$store.commit('setNickname', this.newNickname)
          this.newNickname = ''
          this.dialogChangeNicknameVisible = false
        })
        .catch((e) => {
          console.log(e)
          this.$message({
            message: e,
            iconClass: 'el-icon-warning-outline',
            duration: 1500,
            center: true
          })
          this.dialogChangeNicknameVisible = false
        })
    },
    btnChangePasswordClick () {
      // 更改密码
      if (!this.oldPassword) {
        this.$message({
          message: '请先输入原密码',
          iconClass: 'el-icon-warning-outline',
          duration: 1500,
          center: true
        })
        return
      }
      if (!this.newPassword) {
        this.$message({
          message: '请先输入新密码',
          iconClass: 'el-icon-warning-outline',
          duration: 1500,
          center: true
        })
        return
      }
      if (!this.newConfirmedPassword) {
        this.$message({
          message: '请再次输入新密码',
          iconClass: 'el-icon-warning-outline',
          duration: 1500,
          center: true
        })
      }
      if (this.oldPassword !== this.$store.state.userInfo.userInfo.password) {
        this.$message({
          message: '原密码错误',
          iconClass: 'el-icon-warning-outline',
          duration: 1500,
          center: true
        })
        return
      }
      if (this.newPassword !== this.newConfirmedPassword) {
        this.$message({
          message: '两次输入的新密码不同，请检查',
          iconClass: 'el-icon-warning-outline',
          duration: 1500,
          center: true
        })
        return
      }
      const nt = NetWork.getInstance()
      nt.UpdateDetailInfo(
        { password: this.newPassword },
        this.$store.state.userInfo.userInfo.id
      )
        .then(() => {
          this.newPassword = ''
          this.newConfirmedPassword = ''
          this.$message({
            message: '修改密码成功',
            iconClass: 'el-icon-warning-outline',
            duration: 1500,
            center: true
          })
          this.dialogChangePasswordVisible = false
        })
        .catch((e) => {
          console.log(e)
          this.$message({
            message: e,
            iconClass: 'el-icon-warning-outline',
            duration: 1500,
            center: true
          })
        })
    },
    btnChangeAvatarClick () {
      const nt = NetWork.getInstance()
      nt.UpdateAvatar(this.imageBase64, this.$store.state.userInfo.userInfo.id)
        .then(() => {
          this.dialogChangeAvatarVisible = false
          this.$store.commit('setAvatar', this.imageBase64)
        })
        .catch(e => {
          console.log(e)
        })
    },
    avatarInputChanged (event) {
      const src = window.URL.createObjectURL(event.target.files[0])
      this.imageUrl = src

      var reader = new FileReader()
      reader.onload = (event) => {
        this.imageBase64 = event.target.result
        const arr = this.imageBase64.split(',')
        const mime = arr[0].match(/:(.*?);/)[1]
        const bstr = atob(arr[1])
        let n = bstr.length
        const u8arr = new Uint8Array(n)
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n)
        }
        this.imageByte = new Blob([u8arr], { type: mime })
        this.imageByte = bstr
      }
      reader.readAsDataURL(event.target.files[0])
    }
  }
}
</script>
