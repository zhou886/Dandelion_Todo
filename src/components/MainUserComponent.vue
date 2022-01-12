<template>
  <div class="user">
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <el-row>
              <el-col :span="6" :xs="12">
                <el-image :src="userAvator" fit="fill"></el-image>
              </el-col>
              <el-col :span="16" :xs="12">
                <el-button plain round class="btnChangeAvator">更改头像</el-button>
              </el-col>
            </el-row>
          </div>
          <div class="clearfix" v-for="(item, index) in userInfo" :key="index">
            <el-row>
              <el-col :span="6" :xs="12">
                <div class="grid-content">{{ item.label }}</div>
              </el-col>
              <el-col :span="16" :xs="12">
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
          <span>暗杀者名单</span>
          <el-popover placement="right" width="160" v-model="visible">
            <p style="margin-top: 3px">请输入您要暗杀的用户ID</p>
            <el-input
              placeholder="请输入用户ID"
              v-model="input"
              clearable
            ></el-input>
            <br />
            <div style="text-align: right; margin: 0; margin-top: 10px">
              <el-button size="mini" type="text" @click="visible = false">
                取消
              </el-button>
              <el-button type="primary" size="mini" @click="visible = false">
                确定
              </el-button>
            </div>
            <el-button
              style="float: right; padding: 5px; margin-right: 83px"
              slot="reference"
              plain
              round
              icon="el-icon-plus"
            ></el-button>
          </el-popover>
        </div>
        <div class="clearfix">
          <el-table :data="watchList" stripe height="200">
            <el-table-column
              prop="nickname"
              label="昵称"
              width="120"
            ></el-table-column>
            <el-table-column
              prop="userId"
              label="用户ID"
              width="120"
            ></el-table-column>
            <el-table-column label="操作" width="120">
              <template slot-scope="scope">
                <el-popover
                  placement="right"
                  width="160"
                  v-model="scope.row.visible"
                >
                  <p style="margin-top: 5px">
                    您确定要从暗杀者名单中删除ID为{{
                      scope.row.userId
                    }}的用户吗?
                  </p>
                  <div style="text-align: right; margin: 0">
                    <el-button
                      size="mini"
                      type="text"
                      @click="scope.row.visible = false"
                    >
                      取消
                    </el-button>
                    <el-button
                      type="primary"
                      size="mini"
                      @click="confirmDeleteUser(scope.row.userId, scope.$index)"
                    >
                      确定
                    </el-button>
                  </div>
                  <el-button
                    slot="reference"
                    type="danger"
                    round
                    icon="el-icon-minus"
                    class="minus-button"
                  ></el-button>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
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
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      watchList: [
        {
          nickname: 'hyp',
          userId: 110,
          visible: false
        },
        {
          nickname: 'zyx',
          userId: 120,
          visible: false
        }
      ]
    }
  },
  computed: {},
  methods: {
    setVisibleFalse () {
      this.visible = false
    },
    confirmDeleteUser (id, index) {
      // 给服务器发消息删掉对应的id
      this.watchList.splice(index, 1)
    }
  }
}
</script>
