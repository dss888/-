<template>
    <el-aside>
        <div>
            <i class="el-icon-user-solid"></i>
            <span class="biaoti">柒尾会员管理系统</span>
        </div>
        <el-menu :default-active="$route.fullPath" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
            background-color="#001529" text-color="gray" active-text-color="#fff" :router="true">

            <sidebaritem v-for="item in asyncrouter" :key="item.path" :item="item"></sidebaritem>
        </el-menu>
    </el-aside>
</template>

<script>
import Sidebaritem from "./Sidebaritem.vue";
import asyncrouter from '@/router/asyncrouter';

export default {
    data() {
        return {
            isCollapse: true,
            asyncrouter:asyncrouter
        };
    },
    components: { Sidebaritem },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key);
            console.log(keyPath);
        },
        handleClose(key, keyPath) {
            // console.log(key, keyPath);
        },
    },
    mounted() {
        console.log(this.$route);
    },
    computed: {

    },
};
</script>

<style lang="scss" scoped>
//一级列表靠左

.el-menu {
    text-align: left;
    // height: calc(100vh - 30px);
    width: 230px;
}

.el-aside {
    overflow-x: hidden;
    background-color: rgb(0, 21, 41);
    text-align: center;
    line-height: 60px;
    //    height: 100vh;
    width: 230px !important;
    height: 100%;
}

.el-icon-user-solid {
    background-color: #1890ff;
    width: 30px;
    height: 30px;
    line-height: 30px;
    color: #fff;
    border-radius: 100px;
}

.biaoti {
    color: #1890ff;
    font-size: 18px;
    margin-left: 10px;
}
</style>