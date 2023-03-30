import store from "@/store/index.js"
import Vue from 'vue'
import VueRouter from 'vue-router'
//引入路由
import asyncrouter from './asyncrouter'


Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import('@/views/login/admin.vue'),
    meta: {
        title: '登录页面',
    }

},
 //首页
 {
  path: '/',
  redirect: '/home',
  meta: {
    title: '首页',
  },
},
 
 
  
...asyncrouter,

  {
    path: '/404',
    component: () => import('@/views/error/error.vue')
  },
  {
    path: '*',
    component: () => import('@/views/error/error.vue')
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const createRouter = () => new VueRouter({
  routes
})


//全局前置守卫
router.beforeEach((to, from, next) => {
  document.title = to.meta.title

  if (localStorage.getItem('token')) {
    //如果有token就往下执行
    next()
  } else {
    //  如果访问的是当前登陆页面，且没有token，继续往下执行(防止死循环一直跳登录页)
    if (to.fullPath == '/login') {
      next()
    } else {
      //如果没有token就跳到登录页
      next('/login')
    }
  }

})
export default router
