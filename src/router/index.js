import store from "@/store/index.js"
import Vue from 'vue'
import VueRouter from 'vue-router'
//引入路由
import asyncrouter from './asyncrouter'
// import mainRouter from './mainRouter'

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
// ...mainRouter,
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
//解决当前页面重复点击报错信息
// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location){
//   return originalPush.call(this,location).catch(err=>err)
// }
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
//解决重新登录时，路由重复定义的报错
const createRouter = () => new VueRouter({
  routes
})

// const router = createRouter()

// //在重新登录时，重置路由对象
// function resetRouter() {
//   const newRouter = createRouter()
//   router.matcher = newRouter.matcher // the relevant part
// }
// //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

// export function asyncroutes(){
//   resetRouter()  // 重置路由
//   let navdata = store.state.Navdata;
//   console.log(navdata);
//   navdata.forEach(item=>{
//     let routeItem = {};

//       //二级路由
//       routeItem={
//         path: item.path,
//         name: item.name,
//         title: item.title,
//         component:()=>import('@/views/home/home'),
//         redirect:item.path + '/' + item.children[0].path,
//         meta:{
//           title:item.title,
//           icon:item.icon
//         },
//         children:[]
//       }
//       item.children.forEach(route=>{
//         routeItem.children.push({
//           path:item.path,
//           meta:{
//             title:route.title
//           },
//           component:()=>import('@/views'+route.url)
//         })
//       })
  
//     router.addRoute(routeItem);
//   })
// }




//全局前置守卫
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  // console.log(to);
  // if (to.fullPath == '/login') {
  //   next()
  // } else {
  //   //如果没有token就跳到登录页
  //   if (localStorage.getItem('token')) {
  //     //如果有token就往下执行
  //     let navdata = store.state.Navdata
  //     if(navdata.length === 0){
  //       navdata = JSON.parse(localStorage.getItem('navdata'))
  //       store.commit('getnavdata',navdata)
  //       asyncroutes(navdata)
  //       next({...to,replace:true})
  //     }else{
  //       next()
  //     }
  //   } else {
  //     next('/login')

  //   }
  // }
  // //获取token
  // // console.log(token);
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
