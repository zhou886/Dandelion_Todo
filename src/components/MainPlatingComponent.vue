<template>
  <div class="plating">
    <el-card body-style="float: middle;">
      <el-row>
        <el-col :span="24">
          <el-progress
            type="circle"
            :style="'margin-top: ' + progressMarginTop"
            :percentage="progressPercentage"
            :status="progressStatus"
            :width="progressWidth"
            :stroke-width="progressStrokenWidth"
          ></el-progress>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <h3>{{ this.countdown }}</h3>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-time-select
            :style="
              'width: ' +
              timeselectWidth +
              '; margin-top: 20px; margin-bottom: 10px;'
            "
            :editable="false"
            size="small"
            align="center"
            v-model="value"
            :picker-options="option"
            placeholder="选择时间"
          ></el-time-select>
        </el-col>
      </el-row>
      <el-row>
        <el-button type="primary" round @click="startPlating()">
          开始计时
        </el-button>
      </el-row>
      <el-row>
        <el-button type="info" round @click="stopPlating()">暂停计时</el-button>
      </el-row>
      <el-row>
        <el-button type="danger" round @click="abortPlating()">
          终止计时
        </el-button>
      </el-row>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.plating {
  height: 99%;
  overflow-y: auto;
  overflow-x: hidden;
}

.el-progress {
  margin-bottom: 20px;
  margin-top: 0px;
  float: middle;
}

.el-button {
  margin-top: 20px;
  padding: 12px;
}

.el-card {
  height: 99%;
  overflow-y: auto;
  margin: 2px;
}
</style>

<script>
export default {
  data () {
    return {
      value: '',
      totalTime: 0,
      currentTime: 0,
      Timer: '',
      progressStatus: null,
      option: {
        start: '00:05',
        step: '00:05',
        end: '03:00'
      }
    }
  },
  computed: {
    progressMarginTop () {
      const w = document.body.clientWidth
      const h = document.body.clientHeight
      if ((1.0 * h) / w < 1) {
        return '2%'
      } else {
        return '10%'
      }
    },
    progressPercentage () {
      if (!this.totalTime) {
        return 0
      } else if (!this.currentTime) {
        return 0
      } else {
        const percentage = Math.floor(
          (100.0 * this.currentTime) / this.totalTime
        )
        return percentage
      }
    },
    progressWidth () {
      const tmp = document.body.clientWidth
      if (tmp <= 500) {
        return 150
      } else {
        return 250
      }
    },
    progressStrokenWidth () {
      return this.progressWidth / 10
    },
    timeselectWidth () {
      const tmp = document.body.clientWidth
      if (tmp <= 800) {
        return '50%'
      } else {
        return '20%'
      }
    },
    countdown () {
      const remainingTime = this.totalTime - this.currentTime
      const second = remainingTime % 60
      const minute = Math.floor(remainingTime / 60) % 60
      const hour = Math.floor(remainingTime / 3600)
      let countdown = '0' + hour + ':'
      if (minute < 10) {
        countdown += '0' + minute + ':'
      } else {
        countdown += minute + ':'
      }
      if (second < 10) {
        countdown += '0' + second
      } else {
        countdown += second
      }
      return countdown
    }
  },
  methods: {
    startPlating () {
      if (!this.value) {
        this.$message({
          message: '请先选择时间',
          iconClass: 'el-icon-warning-outline',
          duration: 1500,
          center: true
        })
      } else if (this.progressStatus === 'warning') {
        this.Timer = setInterval(() => {
          this.currentTime += 1
        }, 1000)
        this.progressStatus = null
      } else if (this.currentTime === 0) {
        this.totalTime =
          (parseInt(this.value[1]) * 60 +
            parseInt(this.value[3]) * 10 +
            parseInt(this.value[4])) *
          60
        this.currentTime = 0
        this.Timer = setInterval(() => {
          this.currentTime += 1
        }, 1000)
        this.progressStatus = null
      }
    },
    stopPlating () {
      clearInterval(this.Timer)
      this.progressStatus = 'warning'
    },
    abortPlating () {
      clearInterval(this.Timer)
      this.progressStatus = 'exception'
      this.Timer = null
    }
  },
  watch: {
    progressPercentage: {
      handler: function (val) {
        if (val === 100) {
          clearInterval(this.Timer)
          this.Timer = null
          this.progressStatus = 'success'
        }
      }
    }
  },
  created () {
    const totTime = this.$store.state.timerInfo.totalTime
    if (totTime > 0) {
      this.totalTime = totTime
      this.value = this.$store.state.timerInfo.value
      this.currentTime = this.$store.state.timerInfo.currentTime
      this.progressStatus = this.$store.state.timerInfo.progressStatus
    }
  },
  beforeDestroy () {
    this.$store.commit('setValue', this.value)
    this.$store.commit('setTotalTime', this.totalTime)
    this.$store.commit('setCurrentTime', this.currentTime)
    this.$store.commit('setProgressStatus', 'warning')
  }
}
</script>
