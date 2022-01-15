import Vue from 'vue'
import Network from './network'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI)

const network = new Network()

new Vue({
  router,
  store,
  network,
  render: h => h(App)
}).$mount('#app')
