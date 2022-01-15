<template>
  <div class="login">
    <el-row type="flex" align="middle" justify="center">
      <el-col :span="24">
        <el-card style="width: 400px; float: middle">
          <div slot="header">
            <h2>欢迎使用DanDelion TODO</h2>
          </div>
          <div>
            <el-row type="flex" justify="center" align="middle">
              <el-col :span="8">
                <span>用户ID</span>
              </el-col>
              <el-col :span="16">
                <el-input
                  prefix-icon="el-icon-user"
                  placeholder="请输入用户ID"
                  v-model="userId"
                ></el-input>
              </el-col>
            </el-row>
            <el-row type="flex" justify="center" align="middle">
              <el-col :span="8">
                <span>密码</span>
              </el-col>
              <el-col :span="16">
                <el-input
                  prefix-icon="el-icon-key"
                  v-model="userPassword"
                  placeholder="请输入密码"
                  show-password
                ></el-input>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-button type="primary" round @click="btnLoginClick()">
                  登录
                </el-button>
              </el-col>
              <el-col :span="12">
                <el-button
                  type="primary"
                  round
                  @click="registerDialogVisible = true"
                >
                  注册
                </el-button>

                <el-dialog
                  title="用户注册"
                  :visible.sync="registerDialogVisible"
                  :width="registerDialogWidth"
                >
                  <el-row type="flex" justify="center" align="middle">
                    <el-col :span="8">
                      <span>昵称</span>
                    </el-col>
                    <el-col :span="16">
                      <el-input
                        prefix-icon="el-icon-user"
                        placeholder="请输入昵称"
                        v-model="registerNickname"
                      ></el-input>
                    </el-col>
                  </el-row>
                  <el-row type="flex" justify="center" align="middle">
                    <el-col :span="8">
                      <span>密码</span>
                    </el-col>
                    <el-col :span="16">
                      <el-input
                        prefix-icon="el-icon-key"
                        placeholder="请输入密码"
                        v-model="registerPassword"
                        show-password
                      ></el-input>
                    </el-col>
                  </el-row>
                  <el-row type="flex" justify="center" align="middle">
                    <el-col :span="8">
                      <span>确认密码</span>
                    </el-col>
                    <el-col :span="16">
                      <el-input
                        prefix-icon="el-icon-key"
                        placeholder="请再次输入密码"
                        v-model="registerConfirmedPassword"
                        show-password
                      ></el-input>
                    </el-col>
                  </el-row>
                  <el-row type="flex" justify="center" align="middle">
                    <el-col :span="12">
                      <el-button
                        type="text"
                        round
                        @click="registerDialogVisible = false"
                      >
                        取消
                      </el-button>
                    </el-col>
                    <el-col :span="12">
                      <el-button
                        type="primary"
                        round
                        @click="btnRegisterClick()"
                      >
                        确定
                      </el-button>
                    </el-col>
                  </el-row>
                </el-dialog>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.login {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-card {
  margin: 50px;
  float: middle;
}

.el-row {
  margin-top: 10px;
}

span {
  margin-bottom: -10px;
}

.el-button {
  margin-top: 10px;
}
</style>

<script>
import Network from '../network/index'
export default {
  data () {
    return {
      registerDialogVisible: false,
      userId: null,
      userPassword: null,
      registerNickname: null,
      registerPassword: null,
      registerConfirmedPassword: null
    }
  },
  methods: {
    btnLoginClick () {
      console.log(this.$store)
      console.log(this.$router)
      if (!this.userId) {
        this.$message({
          message: '用户ID不能为空',
          iconClass: 'el-icon-warning-outline',
          duration: 1500,
          center: true
        })
      } else if (!this.userPassword) {
        this.$message({
          message: '用户密码不能为空',
          iconClass: 'el-icon-warning-outline',
          duration: 1500,
          center: true
        })
      } else {
        const nt = new Network('http://sgp.hareru.moe:8080')
        nt.Login(this.userId, this.userPassword)
          .then(() => {
            // 如果登录成功

            // 获取用户信息并保存在Vuex中
            nt.QueryDetailInfo(this.userId)
              .then((userEntity) => {
                this.$store.commit('setId', userEntity.userId)
                this.$store.commit('setNickname', userEntity.nickname)
                this.$store.commit('setRole', userEntity.role)
              })
              .catch((error) => {
                console.log(error)
                this.$message({
                  message: '获取用户信息失败',
                  iconClass: 'el-icon-warning-outline',
                  duration: 1500,
                  center: true
                })
              })

            // 获取用户TodoList并分类放在Vuex中
            nt.GetTodoList(this.userId)
              .then((todoList) => {
                this.$store.commit('setTodoCount', todoList.length)
                for (var i = 0; i < todoList.length; i++) {
                  if (todoList[i].completeAt === 0) {
                    this.$store.commit('addUndoneEntity', todoList[i])
                  } else {
                    this.$store.commit('addDoneEntity', todoList[i])
                  }
                }
              })
              .catch((error) => {
                console.log(error)
                this.$message({
                  message: '获取用户TodoList失败',
                  iconClass: 'el-icon-warning-outline',
                  duration: 1500,
                  center: true
                })
              })

            // 跳转到MainUndoneComponent
            this.$router.push({ name: 'undone' })
          })
          .catch((error) => {
            // 如果登录失败
            this.$message({
              message: error,
              iconClass: 'el-icon-warning-outline',
              duration: 1500,
              center: true
            })
            this.userId = null
            this.userPassword = null
          })
      }
    },
    btnRegisterClick () {
      if (!this.registerNickname) {
        this.$message({
          message: '用户昵称不能为空',
          iconClass: 'el-icon-warning-outline',
          duration: 1500,
          center: true
        })
      } else if (!this.registerPassword) {
        this.$message({
          message: '密码不能为空',
          iconClass: 'el-icon-warning-outline',
          duration: 1500,
          center: true
        })
      } else if (!this.registerConfirmedPassword) {
        this.$message({
          message: '确认密码不能为空',
          iconClass: 'el-icon-warning-outline',
          duration: 1500,
          center: true
        })
      } else {
        if (this.registerPassword !== this.registerConfirmedPassword) {
          this.$message({
            message: '两次输入的密码不同',
            iconClass: 'el-icon-warning-outline',
            duration: 1500,
            center: true
          })
        } else {
          // 向服务器发送昵称和密码的注册信息，返回用户Id
          const nt = new Network('http://sgp.hareru.moe:8080')
          nt.Register(this.registerNickname, this.registerPassword)
            .then((userEntity) => {
              // 注册成功，返回用户ID
              const id = userEntity.userId // 暂时保存用户ID
              this.$message({
                message: '注册成功，您的用户ID是' + id,
                iconClass: 'el-icon-warning-outline',
                duration: 1500,
                center: true
              })
              this.userId = id
              this.registerDialogVisible = false
            })
            .catch((error) => {
              // 注册失败
              this.$message({
                message: error,
                iconClass: 'el-icon-warning-outline',
                duration: 1500,
                center: true
              })
            })
        }
      }
    },
    btnRegisterCancel () {
      this.registerDialogVisible = false
      this.registerNickname = null
      this.registerPassword = null
      this.registerConfirmedPassword = null
    }
  },
  computed: {
    registerDialogWidth () {
      const tmp = document.body.clientWidth
      if (tmp < 500) {
        return '80%'
      } else {
        return '400px'
      }
    }
  }
}
</script>
