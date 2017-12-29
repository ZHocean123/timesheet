<template>
  <el-submenu v-if="menu.children" :key="menu.linkUrl" :index="menu.linkUrl">
    <template slot="title">
      <i class="menu-icon" :class="menu.linkIcon"></i>
      <span class="menu-title">{{menu.linkName}}</span>
    </template>
    <MenuItem v-for="subMenu in menu.children" :key="subMenu.linkUrl" :menu="subMenu" />
  </el-submenu>
  <el-menu-item v-else :index="menu.linkUrl">
    <template slot="title">
      <i class="menu-icon" :class="menu.linkIcon"></i>
      <span class="menu-title">{{menu.linkName}}</span>
    </template>
  </el-menu-item>
</template>

<script>
import MenuItem from './MenuItem';

export default {
  name: 'MenuItem',
  components: { MenuItem },
  props: {
    menu: {
      default: {},
      required: true,
    },
  },
};
</script>

<style lang="less" scoped>
.side-menu {
  background-color: #ffffff;
  box-shadow: 0 0 10px rgba(51, 51, 51, 0.38);
  .menu-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    overflow: auto;
    width: 100%;
    margin-top: 60px;
  }
}
</style>
