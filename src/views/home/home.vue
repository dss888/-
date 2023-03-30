<template>
   <div class="home">
      <el-container>
         <Sidebar></Sidebar>
         <el-container>
            <el-header>
               <HomeHeader></HomeHeader>
            </el-header>
            <el-main>
               <router-view></router-view>
            </el-main>

         </el-container>
      </el-container>

   </div>
</template>

<script>
import Sidebar from './Sidebar.vue'
import HomeHeader from './HomeHeader.vue';
export default {
   components: { Sidebar, HomeHeader },
   methods: {
      handleSizeChange(val) {
         console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
         console.log(`当前页: ${val}`);
      }
   },
   data() {
      return {

         currentPage3: 1,

      };
   }
};
</script>

<style lang="scss" scoped>
body,
html,
#app,
.home,
.el-container {
   height: 100vh;
   overflow: auto;

}



.el-header,
.el-footer {
   background-color: rgb(255, 255, 255);
   color: #333;
   text-align: center;
   line-height: 60px;
}

.el-main {
   background-color: rgb(240, 242, 245);
   color: #333;
   min-width: 1100px;
  

}
</style>