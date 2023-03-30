<template>
  <el-breadcrumb separator="/" >
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item v-for="item in info"  :key="item.path" >{{ item.title }}</el-breadcrumb-item>
</el-breadcrumb>
</template>

<script>
export default {
    data(){
        return{
            info:[] 
        }
    },
    watch:{
        $route:{
            handler:function(to,from){
                console.log(to,from);
                let arr = [];
                to.matched.forEach(item=>{
                    arr.push({
                        path:item.path,
                        title:item.meta.title
                    })
                })
                this.info = arr;
                // console.log(this.info);
            },
            immediate:true
        }
    }

}
</script>

<style>

</style>