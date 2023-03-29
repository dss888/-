import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // Navdata:[] //动态获取导航
  },
  getters: {
  },
  mutations: {
    //登陆成功以后，异步获取菜单数据，把数据存储到Vuex
    // getnavdata:(state,data)=>{
    //   state.Navdata = data
    // }
  },
  actions: {
  },
  modules: {
  }
})
