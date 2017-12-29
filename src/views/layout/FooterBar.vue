<template>
  <section class="footer-bar">
    <div class="footer-content">Copyright © 2016</div>
  </section>
</template>

<script>
export default {
  name: 'FooterBar',
};
</script>

<style lang="less" scoped>
.footer-bar {
  text-align: center;
  padding-left: 268px;
  display: table;
  .footer-content {
    display: table-cell;
    height: 100%;
    vertical-align: middle;
  }
}
</style>
