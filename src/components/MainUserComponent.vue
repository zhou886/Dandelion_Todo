<template>
  <div class="user">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>用户信息</span>
      </div>
      <div class="clearfix" v-for="(item, index) in userInfo" :key="index">
        <el-row :gutter="90">
          <el-col :span="10">
            <div class="grid-content bg-purple">{{ item.label }}</div>
          </el-col>
          <el-col :span="10">
            <div class="grid-content bg-purple">{{ item.content }}</div>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <br />
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>暗杀者名单</span>
        <el-button
          style="float: right; padding: 5px"
          plain
          round
          icon="el-icon-plus"
        ></el-button>
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
              <el-popover placement="top" width="160" trigger="click">
                <p>您确定要从暗杀者名单中删除ID为{{scope.row.userId}}的用户吗?</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text">
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
                  @click="deleteUser(scope)"
                ></el-button>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.user {
  text-align: left;
}

.text {
  font-size: 14px;
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
  width: 400px;
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
      watchList: [
        {
          nickname: 'hyp',
          userId: 110
        },
        {
          nickname: 'zyx',
          userId: 120
        }
      ]
    }
  },
  computed: {},
  methods: {
    setVisibleFalse () {
      this.visible = false
    },
    deleteUser (scope) {
      this.visible = true
      console.log(scope)
    },
    confirmDeleteUser (id, index) {
      // 给服务器发消息删掉对应的id
      this.watchList.splice(index, 1)
    }
  }
}
</script>
