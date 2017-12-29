<template>
  <section class="navbar">
    <Hamburger class="menu-btn" @click.native="onBtnMenu" :open="showSideMenu">menu</Hamburger>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import Hamburger from '../../components/Hamburger';

export default {
  name: 'navbar',
  components: {
    Hamburger,
  },
  computed: {
    ...mapGetters(['showSideMenu']),
  },
  methods: {
    onBtnMenu() {
      this.$store.dispatch('toggleShowSideMenu');
    },
  },
};
</script>

<style lang="less" scoped>
.navbar {
  background-color: #2bc3e8;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3);
  .menu-btn {
    margin-top: 7px;
    margin-left: 10px;
  }
}
</style>
