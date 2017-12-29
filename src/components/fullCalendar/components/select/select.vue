<template>
  <div class="calendar-select">
    <div class="value-box" @click.prevent="showMenu = !showMenu">
      <div class="value">{{value}}</div>
      <div class="dropdown-icon"></div>
    </div>
    <Scroll class="dropdown-menu" :style="{
      visibility: showMenu?'visible':'hidden'}">
      <slot></slot>
    </Scroll>
  </div>
</template>

<script>
import Scroll from './scroll';

export default {
  components: {
    Scroll,
  },
  name: 'calendar-select',
  props: {
    value: {
      required: true,
    },
    'value-key': {
      default: null,
    },
  },
  data() {
    return {
      options: [],
      optionsCount: 0,
      selectedIndex: -1,
      showMenu: false,
      hoverIndex: -1,
    };
  },
  provide() {
    return {
      select: this,
    };
  },
  watch: {
    showMenu(val) {
      if (val === true) {
        // document.addEventListener('mousedown', this.onMouseDown);
      } else {
        document.removeEventListener('mousedown', this.onMouseDown);
      }
    },
    hoverIndex(val) {
      if (val > -1) {
        this.hoverOption = this.options[val] || {};
      }
      this.options.forEach(option => {
        option.hover = this.hoverOption === option;
      });
    },
  },
  methods: {
    onMouseDown(event) {
      console.log(event);
      if (event.target) this.showMenu = false;
    },
    handleOptionSelect(option) {
      this.$emit('input', option.value);
    },
    onOptionDestroy(index) {
      if (index > -1) {
        this.optionsCount--;
        this.options.splice(index, 1);
      }
    },
  },
  mounted() {
    // this.menuHeight = Math.min(this.$refs['scroll-content'].clientHeight, 50);
    // const contentHeight = this.$refs['scroll-content'].clientHeight;
    // const scrollHeight = this.menuHeight;
    // const offset = contentHeight - scrollHeight;
    // this.showScrollBar = offset > 0;
    // this.sliderHeight = Math.max(
    //   scrollHeight * scrollHeight / contentHeight,
    //   20,
    // );
  },
};
</script>

<style lang="less" scoped>
.calendar-select {
  position: relative;
  border: 1px solid #999;
  border-bottom-color: #d8d8d8;
  border-right-color: #d8d8d8;
  .value-box {
    position: relative;
    height: 24px;
    line-height: 24px;
    user-select: none;
    .value {
      padding-right: 25px;
    }
    .dropdown-icon {
      position: absolute;
      top: 0;
      right: 0;
      width: 25px;
      height: 100%;
      border-left: 1px solid #d9d9d9;
      text-align: center;
      zoom: 1;
      background: url('./down-arrow.png');
      background-repeat: no-repeat;
      background-position: center;
    }
  }
  .dropdown-menu {
    z-index: 9999;
    position: absolute;
    left: 0;
    top: 100%;
    width: 100%;
    overflow: hidden;
    border: 1px solid #bbb;
    background: #fff;
    visibility: hidden;
    .scroll-content {
      position: absolute;
      top: 0;
      left: 0;
      right: 8px;
    }
  }
}
</style>
