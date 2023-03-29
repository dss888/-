<template>
    <el-row>
        <!-- <el-col :span="12">
            <div class="grid-content bg-purple">&nbsp;</div>
        </el-col> -->
        <el-col :span="24">
            <div class="grid-content bg-purple-light">
                <i class="el-icon-bell">
                    <el-badge :value="3" class="item">
                    </el-badge>
                </i>
                <el-dropdown trigger="click" @command="exit()">
                    <span class="el-dropdown-link">
                        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                        柒尾<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown" >
                        <el-dropdown-item icon="el-icon-plus" command="a">个人中心</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-circle-plus" command="b">退出系统</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </el-col>
    </el-row>
</template>

<script>
export default {
    methods:{
        exit(command){
            localStorage.clear();
            location.reload()
        }
    }
}
</script>

<style lang="scss" scoped>

.bg-purple-light {
    text-align: right;
    // display: flex;
    margin-right: 70px;
    min-width: 800px;



}

.el-menu-demo {
    display: inline;
}

.el-icon-bell {
    position: relative;
    font-size: 27px;
    margin-right: 80px;
}

.item {
    position: absolute;
    bottom: 3px;
    left: 12px;

}
.el-dropdown-link{
    cursor: pointer;

    // position: relative;
    .el-avatar{
        position: absolute;
        top:5px;
        right: 50px;
    }
}
</style>