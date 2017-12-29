<template>
  <div class="calendar-select-option" @click.stop="handleSelect" :class="{'selected':itemSelected,'hover':hover}" @mouseenter="hoverItem">
    <slot>
      <div>{{label}}</div>
    </slot>
  </div>
</template>

<script>
import getValueByPath from './utils';

export default {
  name: 'calendar-select-option',
  inject: ['select'],
  props: {
    value: {
      required: true,
    },
    label: {
      default: this.value,
    },
    valueKey: {
      type: String,
      default: 'value',
    },
  },
  data() {
    return {
      showMenu: false,
      hover: false,
    };
  },
  computed: {
    isObject() {
      return (
        Object.prototype.toString.call(this.value).toLowerCase() ===
        '[object object]'
      );
    },
    itemSelected() {
      return this.isEqual(this.value, this.select.value);
    },
  },
  methods: {
    isEqual(a, b) {
      if (!this.isObject) {
        return a === b;
      }
      const valueKey = this.select.valueKey;
      return getValueByPath(a, valueKey) === getValueByPath(b, valueKey);
    },
    handleSelect() {
      this.select.handleOptionSelect(this);
    },
    hoverItem() {
      this.select.hoverIndex = this.select.options.indexOf(this);
    },
  },
  created() {
    this.select.options.push(this);
    this.select.optionsCount += 1;
  },
  beforeDestroy() {
    this.select.onOptionDestroy(this.select.options.indexOf(this));
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.calendar-select-option {
  cursor: pointer;
  padding: 3px;
  &.hover {
    background-color: #f5f7fa;
  }
  &.selected {
    background-color: #f5f7fa;
    color: red;
  }
}
</style>
