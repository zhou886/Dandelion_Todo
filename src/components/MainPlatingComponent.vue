<template>
  <div class="plating">
    <el-time-select v-model="value" :picker-options="option" placeholder="选择时间">

    </el-time-select>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: '',
      option: {
        start: '00:00',
        step: '00:05',
        end: '03:00'
      }
    }
  }
}
</script>
