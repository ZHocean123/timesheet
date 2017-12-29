<template>
  <section class="side-menu">
    <div class="menu-wrapper">
      <el-menu default-active="" router>
        <MenuItem v-for="menu in menuInfo" :key="menu.linkUrl" :menu="menu" />
      </el-menu>
    </div>
  </section>
</template>

<script>
import MenuItem from '../../components/MenuItem';

export default {
  name: 'SideMenu',
  components: { MenuItem },
  data() {
    return {
      menuInfo: [
        {
          linkName: '预约信息管理',
          linkUrl: '/apply-list',
          linkIcon: 'md md-my-library-books',
          // children: [
          //   {
          //     linkName: '预约信息管理',
          //     linkUrl: '/apply-list',
          //     linkIcon: 'md md-my-library-books',
          //   },
          //   {
          //     linkName: '预约时间设置',
          //     linkUrl: '/window-setting',
          //     linkIcon: 'md md-schedule',
          //     children: [
          //       {
          //         linkName: '预约信息管理',
          //         linkUrl: '/apply-list',
          //         linkIcon: 'md md-my-library-books',
          //       },
          //       {
          //         linkName: '预约时间设置',
          //         linkUrl: '/window-setting',
          //         linkIcon: 'md md-schedule',
          //       },
          //       {
          //         linkName: '科室账号管理',
          //         linkUrl: '/department-setting',
          //         linkIcon: 'md md-desktop-windows',
          //       },
          //     ],
          //   },
          //   {
          //     linkName: '科室账号管理',
          //     linkUrl: '/department-setting',
          //     linkIcon: 'md md-desktop-windows',
          //   },
          // ],
        },
        {
          linkName: '预约时间设置',
          linkUrl: '/window-setting',
          linkIcon: 'md md-schedule',
        },
        {
          linkName: '科室账号管理',
          linkUrl: '/department-setting',
          linkIcon: 'md md-desktop-windows',
        },
      ],
    };
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
