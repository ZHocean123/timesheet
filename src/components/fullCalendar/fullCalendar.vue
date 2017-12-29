<template>
  <div class="comp-full-calendar">
    <!-- header pick month -->
    <fc-header :current-date.sync="currentDate" :title-format="titleFormat" :first-day="firstDay" :month-names="monthNames" @change="emitChangeMonth">

      <div slot="header-left">
        <slot name="fc-header-left">
        </slot>
      </div>

      <div slot="header-right">
        <slot name="fc-header-right">
        </slot>
      </div>
    </fc-header>
    <el-select v-model="year" placeholder="" class="year-select" @change="onChangeYear">
      <el-option v-for="i in 60" :key="i" :value="i+1990" :label="`${i+1990}年`"></el-option>
    </el-select>
    <el-button type="" @click="onBtnPre" class="month-pre">{{'>'}}</el-button>
    <el-select v-model="month" placeholder="" class="month-select" @change="onChangeMonth">
      <el-option v-for="i in 12" :key="i" :value="i" :label="`${i}月`"></el-option>
    </el-select>
    <el-button type="" @click="onBtnNext" class="month-next">{{'>'}}</el-button>
    <el-button type="" @click="onBtnToday">返回今天</el-button>
    <div class="tip">
      ※点击日历空白处，即可分配受理窗口；只能分配或修改当天以后的日期。
      <br> ※受理时间为上午8:40 - 11:00和下午13:00 - 16:20，20分钟/人。
    </div>

    <!-- body display date day and events -->
    <fc-body :current-date="currentDate" :events="events" :holidays="monthHolidaysMap" :month-names="monthNames" :week-names="weekNames" :first-day="firstDay" @eventclick="emitEventClick" @dayclick="emitDayClick" @moreclick="emitMoreClick">
      <div slot="body-card">
        <slot name="fc-body-card">
        </slot>
      </div>
    </fc-body>
  </div>
</template>
<script>
import langSets from './dataMap/langSets';
import fcBody from './components/body';
import fcHeader from './components/header';
import { format, lastMonthDate, nextMonthDate } from '../../utils/date-format';
import { getHolidays } from '../../api/common';

export default {
  components: {
    /* eslint-disable global-require */
    'fc-body': fcBody,
    'fc-header': fcHeader,
  },
  props: {
    events: {
      // events will be displayed on calendar
      type: Array,
      default: () => [],
    },
    lang: {
      type: String,
      default: 'en',
    },
    firstDay: {
      /* eslint-disable no-bitwise */
      type: Number | String,
      validator(val) {
        const res = parseInt(val, 10);
        return res >= 0 && res <= 6;
      },
      default: 0,
    },
    titleFormat: {
      type: String,
      default() {
        return langSets[this.lang].titleFormat;
      },
    },
    monthNames: {
      type: Array,
      default() {
        return langSets[this.lang].monthNames;
      },
    },
    weekNames: {
      type: Array,
      default() {
        const arr = langSets[this.lang].weekNames;
        return arr.slice(this.firstDay).concat(arr.slice(0, this.firstDay));
      },
    },
    date: {
      type: Date,
      default: () => new Date(),
    },
  },
  data() {
    return {
      currentDate: this.date,
      monthHolidaysMap: {},
      year: this.date.getFullYear(),
      month: this.date.getMonth() + 1,
    };
  },
  computed: {
    currentMonth() {
      return format(this.currentDate, 'yyyy-MM');
    },
    lastMonth() {
      return format(lastMonthDate(this.currentDate), 'yyyy-MM');
    },
    nextMonth() {
      return format(nextMonthDate(this.currentDate), 'yyyy-MM');
    },
  },
  watch: {
    date(val) {
      this.currentDate = val;
    },
    currentDate(val) {
      this.year = val.getFullYear();
      this.month = val.getMonth() + 1;
      this.loadHolidays();
    },
  },
  methods: {
    loadHolidays() {
      this.getMonthHolidays(this.lastMonth);
      this.getMonthHolidays(this.currentMonth);
      this.getMonthHolidays(this.nextMonth);
    },
    getMonthHolidays(month) {
      if (this.monthHolidaysMap[month]) {
        return;
      }
      getHolidays(month)
        .then(data => {
          const holidays = data
            .filter(item => !item.needWork)
            .map(item => item.date);
          if (holidays.length > 0) {
            // 触发子组件的修改监听
            const dic = {};
            dic[month] = holidays;
            this.monthHolidaysMap = {
              ...this.monthHolidaysMap,
              ...dic,
            };
          }
        })
        .catch(error => console.error(error));
    },
    onBtnPre() {
      if (this.month === 1) {
        this.year -= 1;
        this.month = 12;
      } else {
        this.month -= 1;
      }
      this.currentDate = new Date(
        this.year,
        this.month - 1,
        this.currentDate.getDate(),
      );
      this.loadHolidays();
    },
    onBtnToday() {
      this.currentDate = new Date();
      this.year = this.currentDate.getFullYear();
      this.month = this.currentDate.getMonth() + 1;
      this.loadHolidays();
    },
    onChangeYear(val) {
      this.currentDate = new Date(
        val,
        this.month - 1,
        this.currentDate.getDate(),
      );
      this.loadHolidays();
    },
    onChangeMonth(val) {
      this.currentDate = new Date(
        this.year,
        val - 1,
        this.currentDate.getDate(),
      );
      this.loadHolidays();
    },
    onBtnNext() {
      if (this.month === 12) {
        this.year += 1;
        this.month = 1;
      } else {
        this.month += 1;
      }
      this.currentDate = new Date(
        this.year,
        this.month - 1,
        this.currentDate.getDate(),
      );
      this.loadHolidays();
    },
    emitChangeMonth(start, end, currentStart, current) {
      console.log('currentDate 2', this.currentDate);
      this.currentDate = current;
      console.log('currentDate 3', this.currentDate);
      this.$emit('changeMonth', start, end, currentStart);
    },
    emitEventClick(event, jsEvent, pos) {
      this.$emit('eventClick', event, jsEvent, pos);
    },
    emitDayClick(day, jsEvent) {
      this.$emit('dayClick', day, jsEvent);
    },
    emitMoreClick(day, events, jsEvent) {
      this.$emit('moreClick', day, event, jsEvent);
    },
  },
  mounted() {
    this.loadHolidays();
  },
};
</script>
<style lang="scss">
.comp-full-calendar {
  // font-family: "elvetica neue", tahoma, "hiragino sans gb";
  padding: 20px;
  background: #fff;
  max-width: 960px;
  margin: 0 auto;
  ul,
  p {
    margin: 0;
    padding: 0;
    font-size: 14px;
  }
  .year-select {
    width: 95px;
  }
  .month-pre {
    display: inline-block;
  }
  .month-select {
    display: inline-block;
    width: 75px;
    margin: 0;
  }
  .month-next {
    display: inline-block;
  }
  .tip {
    font-size: 13px;
    display: inline-block;
    padding: 5px 10px;
    vertical-align: middle;
  }
}
</style>
