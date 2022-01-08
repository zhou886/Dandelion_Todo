<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Net from '../network/index'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data: function () {
    return {
      testv: 'qwq'
    }
  },
  mounted: function () {
    const na = new Net('http://sgp.hareru.moe:8080')
    na.Login('4', '114514').then(data => {
      this.testv = data
    })
  }

}
</script>
