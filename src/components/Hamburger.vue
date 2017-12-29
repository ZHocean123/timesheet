<template>
  <div class="hamburger" :class="{open: open}">
    <div class="line-wrap">
      <div class="line top"></div>
      <div class="line center"></div>
      <div class="line bottom"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    open: {
      required: true,
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="less" scoped>
.hamburger {
  position: relative;
  cursor: pointer;
  width: 45px;
  height: 45px;
}
.hamburger:before {
  content: '';
  position: absolute;
  width: 45px;
  height: 45px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.22);
  transition: all;
  transition-duration: 300ms;
  backface-visibility: hidden;
  transform: scale(0);
  z-index: 0;
}
.line-wrap {
  width: 18px;
  height: 12px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  transition: all;
  transition-duration: 300ms;
  .line {
    background-color: #fff;
    width: 18px;
    height: 2px;
    transition: all;
    transition-duration: 300ms;
  }
  .center {
    margin: 3px 0;
  }
}
.hamburger.open {
  .line-wrap {
    transform: rotate(180deg);
  }
  .top {
    width: 12px;
    transform: translateX(8px) translateY(1px) rotate(45deg);
  }
  .bottom {
    width: 12px;
    transform: translateX(8px) translateY(-1px) rotate(-45deg);
  }
}
.hamburger.open:before {
  transform: scale(1);
}
</style>
