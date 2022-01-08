import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/undone',
        name: 'undone',
        component: () => import('../components/MainUndoneComponent.vue')
      },
      {
        path: '/done',
        name: 'done',
        component: () => import('../components/MainDoneComponent.vue')
      },
      {
        path: '/record',
        name: 'record',
        component: () => import('../components/MainRecordComponent.vue')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('../components/MainUserComponent.vue')
      },
      {
        path: '/setting',
        name: 'setting',
        component: () => import('../components/MainSettingComponent.vue')
      },
      {
        path: '/plating',
        name: 'plating',
        component: () => import('../components/MainPlatingComponent.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
