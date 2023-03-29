<template>
  <div>
    <!-- 一级页面和二级页面混合的时候采用 -->


    <!-- <el-submenu v-if="item.children" :index="item.path">
      <template slot="title">
        <i :class="item.icon"></i>
        <span>{{ item.title }}</span>
      </template>
      <el-menu-item-group >
        <el-menu-item v-for="list in item.children" :key="list.path" :index="item.path + '/' + list.path">{{ list.title }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>

    <el-menu-item v-else :index="item.path + item.path" :key="item.path">
      <i :class="item.icon"></i>
      <span slot="title">{{ item.title }}</span>
    </el-menu-item> -->

    <el-submenu :index="item.path">
      <template slot="title">
        <i :class="item.meta.icon"></i>
        <span slot="title">{{item.meta.title}}</span>
      </template>
      <el-menu-item-group >
        <el-menu-item v-for="list in item.children" :key="list.path" :index="item.path + '/' + list.path">{{list.meta.title}}</el-menu-item>
      </el-menu-item-group>
    </el-submenu> 

  </div>
</template>

<script>
export default {
  props: {
    item: Object,
  },

};
</script>

<style lang="scss" scoped>
//二级列表缩进
.el-menu-item {
  text-indent: 20px;

}

.el-menu-item-group .is-active {
  background-color: #1890ff !important;
}
</style>