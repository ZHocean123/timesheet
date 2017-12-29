<template>
  <div class="app-wrapper">
    <NavBar class="navbar-section" />
    <SideMenu class="menu-section" :style="{transform: showSideMenu? 'none' : 'translateX(-268px)'}" />
    <section class="main-section">
      <router-view class="content-view" :style="{'margin-left':showSideMenu?'268px':0}" />
    </section>
    <FooterBar class="footer-section" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import NavBar from './NavBar';
import SideMenu from './SideMenu';
import FooterBar from './FooterBar';

export default {
  name: 'layout',
  components: {
    NavBar,
    SideMenu,
    FooterBar,
  },
  computed: {
    ...mapGetters(['showSideMenu']),
  },
};
</script>

<style lang="less" scoped>
.app-wrapper {
  width: 100%;
  height: 100%;
}
.navbar-section {
  position: fixed;
  height: 60px;
  margin-bottom: -60px;
  width: 100%;
  z-index: 2;
}
.menu-section {
  position: fixed;
  width: 268px;
  height: 100%;
  padding-top: 60px;
  z-index: 1;
  float: left;
  transition-duration: 300ms;
}
.main-section {
  box-sizing: border-box;
  width: 100%;
  min-height: 100%;
  padding-top: 60px;
  padding-bottom: 60px;
  .content-view {
    padding: 10px;
    margin-left: 268px;
  }
}
.footer-section {
  height: 60px;
  margin-top: -60px;
  width: 100%;
  z-index: 0;
}
</style>
