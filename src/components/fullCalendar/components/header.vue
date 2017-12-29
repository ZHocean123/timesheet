<template>
  <div class="full-calendar-header">
    <div class="header-left">
      <slot name="header-left">
      </slot>
    </div>
    <div class="header-center">
      <CSelect v-model="year" class="year-select">
        <CSelectOption v-for="i in 60" :key="i" :value="i+1990" :label="`${i+1990}年`"></CSelectOption>
      </CSelect>
      <div class="month-wrapper">
        <div class="month-table">
          <div class="prev-btn" @click="goPrev"></div>
          <CSelect v-model="month" class="month-select">
            <CSelectOption v-for="i in 12" :key="i" :value="i" :label="`${i}月`"></CSelectOption>
          </CSelect>
          <div class="next-btn" @click="goNext"></div>
        </div>
      </div>
    </div>
    <div class="header-right">
      <slot name="header-right">
      </slot>
    </div>
  </div>
</template>
<script>
import dateFunc from './dateFunc';
import CSelect from './select/select';
import CSelectOption from './select/option';

export default {
  components: {
    CSelect,
    CSelectOption,
  },
  created() {
    this.dispatchEvent();
  },
  props: {
    currentDate: {},
    titleFormat: {},
    firstDay: {},
    monthNames: {},
  },
  data() {
    return {
      title: '',
      leftArrow: '<',
      rightArrow: '>',
      headDate: new Date(),
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
    };
  },
  watch: {
    currentDate(val) {
      if (!val) return;
      this.headDate = val;
      this.year = this.headDate.getFullYear();
      this.month = this.headDate.getMonth() + 1;
      // console.log('currentDate', val);
      // this.headDate = JSON.parse(JSON.stringify(val))
    },
    year(val) {
      this.headDate = new Date(this.headDate.setYear(val));
      this.dispatchEvent();
    },
    month(val) {
      this.headDate = new Date(this.headDate.setMonth(val - 1));
      this.dispatchEvent();
    },
  },
  methods: {
    goPrev() {
      this.headDate = this.changeMonth(this.headDate, -1);
      this.dispatchEvent();
    },
    goNext() {
      this.headDate = this.changeMonth(this.headDate, 1);
      this.dispatchEvent();
    },
    changeMonth(date, num) {
      const dt = new Date(date);
      dt.setDate(1);
      return new Date(dt.setMonth(dt.getMonth() + num));
    },
    dispatchEvent() {
      this.$emit('update:currentDate', this.headDate);
    },
  },
};
</script>
<style lang="scss">
.full-calendar-header {
  display: flex;
  align-items: center;
  .header-left,
  .header-right {
    flex: 1;
  }
  .header-center {
    flex: 3;
    text-align: center;
    .title {
      margin: 0 10px;
    }
    .prev-month,
    .next-month {
      cursor: pointer;
    }
  }
}
.calendar-year-box {
  width: 80px;
  margin-right: 7px;
  float: left;
}
.year-select,
.month-wrapper {
  display: inline-block;
  vertical-align: middle;
}

.month-wrapper {
  .month-table {
    display: table;
    .month-select,
    .prev-btn,
    .next-btn {
      display: table-cell;
      vertical-align: middle;
    }
    .month-select {
      border: 1px solid #d8d8d8;
      border-top-color: #999;
    }
    .prev-btn {
      width: 24px;
      height: 24px;
      border: 1px solid #999;
      border-right: 0px;
      border-bottom-color: #d8d8d8;
      background: #fafafa;
      background: url('./left-arrow.png');
      background-repeat: no-repeat;
      background-position: center;
    }
    .next-btn {
      padding: 0;
      width: 24px;
      height: 24px;
      border: 1px solid #999;
      border-left: 0px;
      border-bottom-color: #d8d8d8;
      background: #fafafa;
      background: url('./right-arrow.png');
      background-repeat: no-repeat;
      background-position: center;
    }
  }
}
.year-select {
  width: 300px;
  margin-right: 7px;
}
.month-select {
  width: 250px;
  border: 1px solid #d8d8d8;
  border-top-color: #999;
}
</style>
