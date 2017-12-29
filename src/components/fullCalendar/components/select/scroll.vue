<template>
  <div class="scroll" @mousewheel="mousewheel" :style="{height:`${height}px`}">
    <div ref="scroll-content" class="scroll-content" :style="{top:`${contentOffset}px`}">
      <slot></slot>
    </div>
    <div v-show="showScrollBar" class="scroll-bar">
      <div ref="scroll-slider" class="scroll-slider" :style="{height:`${sliderHeight}px`,top:`${sliderOffset}px`}" @mousedown="sliderMouseDown"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'calendar-scroll',
  props: {
    maxHeight: {
      default: 300,
    },
  },
  data() {
    return {
      height: 0,
      contentOffset: 0,
      showScrollBar: false,
      sliderHeight: 0,
      sliderOffset: 0,
    };
  },
  methods: {
    mousewheel(event) {
      const contentHeight = this.$refs['scroll-content'].clientHeight;
      const offset = contentHeight - this.height;

      if (offset > 0) {
        const deltaY = event.deltaY;
        const newOffset = this.contentOffset - deltaY;
        this.contentOffset = Math.max(Math.min(newOffset, 0), -offset);
        this.sliderOffset =
          -(this.height - this.sliderHeight) * this.contentOffset / offset;
      }
    },
    sliderMouseDown(event) {
      // 记录鼠标位置
      this.mouseScreenY = event.screenY;

      // 添加监听事件
      document.addEventListener('mousemove', this.sliderMouseMove);
      document.addEventListener('mouseup', this.sliderMouseUp);
    },
    sliderMouseMove(event) {
      const mouseScreenY = event.screenY;
      const deltaY = mouseScreenY - this.mouseScreenY;
      this.mouseScreenY = mouseScreenY;

      this.sliderOffset = Math.min(
        Math.max(this.sliderOffset + deltaY, 0),
        this.height - this.sliderHeight,
      );
      const contentHeight = this.$refs['scroll-content'].clientHeight;
      this.contentOffset =
        -this.sliderOffset /
        (this.height - this.sliderHeight) *
        (contentHeight - this.height);
    },
    sliderMouseUp() {
      // 移除监听
      document.removeEventListener('mousemove', this.sliderMouseMove);
      document.removeEventListener('mouseup', this.sliderMouseUp);
    },
  },
  mounted() {
    const contentHeight = this.$refs['scroll-content'].clientHeight;
    this.height = Math.min(contentHeight, this.maxHeight);
    const offset = contentHeight - this.height;
    this.showScrollBar = offset > 0;
    this.sliderHeight = Math.max(this.height * this.height / contentHeight, 20);
  },
};
</script>

<style lang="less" scoped>
.scroll {
  .scroll-content {
    position: absolute;
    top: 0;
    left: 0;
    right: 8px;
  }
  .scroll-bar {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 8px;
    background-color: #f2f2f2;
    .scroll-slider {
      overflow: hidden;
      width: 7px;
      height: 14px;
      position: absolute;
      top: 0;
      right: 0;
      z-index: 10;
      display: none;
      background: #fff;
      margin-top: -1px;
      margin-left: -1px;
      border: 1px solid #e1e1e1;
      border-bottom: 1px solid #d4d4d4;
      cursor: default;

      display: block;
      height: 31px;
      top: 0px;
    }
  }
}
</style>
