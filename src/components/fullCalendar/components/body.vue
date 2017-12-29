<template>
  <div class="full-calendar-body">
    <div class="weeks">
      <strong class="week" v-for="week in sortedWeekNames" :key="week">{{week}}</strong>
    </div>
    <div class="dates" ref="dates">
      <div class="dates-bg">
        <div class="week-row" v-for="(week, index) in currentDates" :key="index">
          <div class="day-cell" v-for="day in week" :key="day.monthDay" :class="{'today' : day.isToday,
              'not-cur-month' : !day.isCurMonth, 'holiday' : day.isHoliday}">
            <span v-show="day.isTuneHoliday" class="holiday-tag">休</span>
            <span v-show="day.isTurnWorkingDay" class="workday-tag">班</span>
            <p class="day-number">{{day.monthDay}}</p>
          </div>
        </div>
      </div>

      <!-- absolute so we can make dynamic td -->
      <div class="dates-events">
        <div class="events-week" v-for="(week, index) in currentDates" :key="index">
          <div class="events-day" v-for="(day, dayIndex) in week" :key="day.monthDay" track-by="$index" :class="{'today' : day.isToday,
              'not-cur-month' : !day.isCurMonth}" @click.stop="dayClick(day.date, $event)">
            <p class="day-number">{{day.monthDay}}</p>
            <div class="event-box">
              <p class="event-item" v-for="event in day.events" :key="event.cellIndex" v-show="event.cellIndex <= eventLimit" :class="[classNames(event.cssClass), {
                  'is-start'   : isStart(event.start, day.date),
                  'is-end'     : isEnd(event.end,day.date),
                  'is-opacity' : !event.isShow
                  }]" @click="eventClick(event,$event)">
                {{isBegin(event, day.date, dayIndex)}}
              </p>
              <p v-if="day.events.length > eventLimit" class="more-link" @click.stop="selectThisDay(day, $event)">
                + {{day.events[day.events.length -1].cellIndex - eventLimit}} more
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- full events when click show more -->
      <div class="more-events" v-show="showMore" :style="{left: morePos.left + 'px', top: morePos.top + 'px'}">
        <div class="more-header">
          <span class="title">{{moreTitle(selectDay.date)}}</span>
          <span class="close" @click.stop="showMore = false">x</span>
        </div>
        <div class="more-body">
          <ul class="body-list">
            <li v-for="event in selectDay.events" :key="event" v-show="event.isShow" class="body-item" @click="eventClick(event,$event)">
              {{event.title}}
            </li>
          </ul>
        </div>
      </div>

      <slot name="body-card">

      </slot>

    </div>
  </div>
</template>
<script>
import dateFunc from './dateFunc';

export default {
  props: {
    currentDate: {},
    events: {},
    weekNames: {
      type: Array,
      default: () => [],
    },
    monthNames: {},
    firstDay: {},
    holidays: {},
  },
  created() {
    this.events.forEach((item, index) => {
      /* eslint-disable no-param-reassign */
      item.id = item.id || index;
      item.end = item.end || item.start;
    });
    // this.events = events
  },
  data() {
    return {
      // weekNames : DAY_NAMES,
      weekMask: [1, 2, 3, 4, 5, 6, 7],
      // events : [],
      // isLismit: true,
      eventLimit: 3,
      showMore: false,
      morePos: {
        top: 0,
        left: 0,
      },
      selectDay: {},
    };
  },
  watch: {
    weekNames(val) {
      console.log('watch weekNames', val);
    },
  },
  computed: {
    sortedWeekNames() {
      return this.weekNames
        .slice(this.firstDay - 1, 7)
        .concat(this.weekNames.slice(0, this.firstDay - 1));
    },
    currentDates() {
      return this.getCalendar();
    },
  },
  methods: {
    isBegin(event, date, index) {
      const st = new Date(event.start);

      if (index === 0 || st.toDateString() === date.toDateString()) {
        return event.title;
      }
      return '　';
    },
    moreTitle(date) {
      const dt = new Date(date);
      return `${this.weekNames[dt.getDay()]}, ${this.monthNames[
        dt.getMonth()
      ]}${dt.getDate()}`;
    },
    classNames(cssClass) {
      if (!cssClass) return '';
      // string
      if (typeof cssClass === 'string') return cssClass;

      // Array
      if (Array.isArray(cssClass)) return cssClass.join(' ');

      // else
      return '';
    },
    getCalendar() {
      // calculate 2d-array of each month
      // first day of this month
      const now = new Date(); // today
      const current = new Date(this.currentDate);

      const startDate = dateFunc.getStartDate(current); // 1st day of this month

      const curWeekDay = startDate.getDay();

      // begin date of this table may be some day of last month
      let diff = parseInt(this.firstDay, 10) - curWeekDay;
      diff = diff > 0 ? diff - 7 : diff;

      startDate.setDate(startDate.getDate() + diff);
      const calendar = [];

      for (let perWeek = 0; perWeek < 6; perWeek += 1) {
        const week = [];
        if (perWeek === 5 && startDate.getMonth() !== current.getMonth()) {
          break;
        }
        for (let perDay = 0; perDay < 7; perDay += 1) {
          let isHoliday = false;
          let isTurnWorkingDay = false;
          let isTuneHoliday = false;
          const weekDay = startDate.getDay();
          const monthDate = dateFunc.format(startDate, 'yyyy-MM');
          const monthHolidays = this.holidays[monthDate];
          if (monthHolidays && monthHolidays) {
            isHoliday =
              monthHolidays.findIndex(
                holiday => holiday === dateFunc.format(startDate, 'yyyy-MM-dd'),
              ) !== -1;
            isTuneHoliday = weekDay !== 6 && weekDay !== 0 && isHoliday;
            isTurnWorkingDay = (weekDay === 6 || weekDay === 0) && !isHoliday;
          } else {
            isHoliday = weekDay === 6 || weekDay === 0;
            isTurnWorkingDay = false;
            isTuneHoliday = false;
          }

          week.push({
            monthDay: startDate.getDate(),
            isToday: now.toDateString() === startDate.toDateString(),
            isCurMonth: startDate.getMonth() === current.getMonth(),
            isHoliday,
            isTurnWorkingDay,
            isTuneHoliday,
            weekDay: perDay,
            date: new Date(startDate),
            events: this.slotEvents(startDate),
          });

          startDate.setDate(startDate.getDate() + 1);
          // if (startDate.toDateString() === endDate.toDateString()) {
          //   isFinal = true
          //   break
          // }
        }
        calendar.push(week);
        // if (isFinal) break
      }
      return calendar;
    },
    slotEvents(date) {
      // find all events start from this date
      // const cellIndexArr = [];
      const thisDayEvents = this.events.filter(day => {
        const dt = new Date(day.start);
        const st = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
        const ed = day.end ? new Date(day.end) : st;
        // console.log('slotEvt', st, ed, date)
        return date >= st && date <= ed;
      });

      // sort by duration
      thisDayEvents.sort((a, b) => {
        if (!a.cellIndex) return 1;
        if (!b.cellIndex) return -1;
        return a.cellIndex - b.cellIndex;
      });

      // mark cellIndex and place holder
      for (let i = 0; i < thisDayEvents.length; i += 1) {
        thisDayEvents[i].cellIndex = thisDayEvents[i].cellIndex || i + 1;
        thisDayEvents[i].isShow = true;
        if (thisDayEvents[i].cellIndex === i + 1 || i > 2) continue;
        thisDayEvents.splice(i, 0, {
          title: 'holder',
          cellIndex: i + 1,
          start: dateFunc.format(date, 'yyyy-MM-dd'),
          end: dateFunc.format(date, 'yyyy-MM-dd'),
          isShow: false,
        });
      }

      return thisDayEvents;
    },
    isStart(eventDate, date) {
      const st = new Date(eventDate);
      return st.toDateString() === date.toDateString();
    },
    isEnd(eventDate, date) {
      const ed = new Date(eventDate);
      return ed.toDateString() === date.toDateString();
    },
    selectThisDay(day, jsEvent) {
      this.selectDay = day;
      this.showMore = true;
      this.morePos = this.computePos(event.target);
      this.morePos.top -= 100;
      const events = day.events.filter(item => item.isShow);
      this.$emit('moreclick', day.date, events, jsEvent);
    },
    computePos(target) {
      const eventRect = target.getBoundingClientRect();
      const pageRect = this.$refs.dates.getBoundingClientRect();
      return {
        /* eslint-disable no-mixed-operators */
        left: eventRect.left - pageRect.left,
        top: eventRect.top + eventRect.height - pageRect.top,
      };
    },
    dayClick(day, jsEvent) {
      this.$emit('dayclick', day, jsEvent);
    },
    eventClick(event, jsEvent) {
      if (!event.isShow) {
        return;
      }
      jsEvent.stopPropagation();
      const pos = this.computePos(jsEvent.target);
      this.$emit('eventclick', event, jsEvent, pos);
    },
  },
};
</script>
<style lang="scss">
.full-calendar-body {
  margin-top: 20px;
  border: 2px solid #57abff;
  .weeks {
    display: flex;
    border-top: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
    border-left: 1px solid #e0e0e0;
    .week {
      flex: 1;
      text-align: center;
      border-right: 1px solid #e0e0e0;
    }
  }
  .dates {
    position: relative;
    .week-row {
      // width: 100%;
      // position:absolute;
      border-left: 1px solid #e0e0e0;
      display: flex;
      .day-cell {
        flex: 1;
        min-height: 100px;
        padding: 4px;
        border-right: 1px solid #e0e0e0;
        border-bottom: 1px solid #e0e0e0;
        position: relative;
        .day-number {
          text-align: right;
          color: #000;
          font-size: 18px;
        }
        .holiday-tag {
          position: absolute;
          left: 0;
          top: 0;
          display: block;
          width: 15px;
          height: 15px;
          color: #fff;
          background: #f43;
          text-align: left;
          text-indent: 1px;
          line-height: 14px;
          overflow: hidden;
          font-size: 13px;
        }
        .workday-tag {
          position: absolute;
          left: 0;
          top: 0;
          display: block;
          width: 15px;
          height: 15px;
          color: #fff;
          background: #969799;
          text-align: left;
          text-indent: 1px;
          line-height: 14px;
          overflow: hidden;
          font-size: 13px;
        }
        &.today {
          background-color: #fb0;
          .day-number {
            color: #fff;
          }
        }
        &.holiday {
          background-color: #fff0f0;
          .day-number {
            color: #e02d2d;
          }
        }
        &.not-cur-month {
          .day-number {
            color: #bfbfbf;
          }
          &.holiday {
            background-color: #fff0f0;
            .holiday-tag {
              opacity: 0.5;
            }
          }
        }
      }
    }
    .dates-events {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      height: 100%;
      .events-week {
        display: flex;
        .events-day {
          cursor: pointer;
          flex: 1;
          min-height: 100px;
          overflow: hidden;
          text-overflow: ellipsis;
          .day-number {
            text-align: right;
            padding: 4px 5px 4px 4px;
            opacity: 0;
          }
          &.not-cur-month {
            .day-number {
              color: #bfbfbf;
            }
          }
          .event-box {
            .event-item {
              cursor: pointer;
              font-size: 12px;
              background-color: #c7e6fd;
              margin-bottom: 2px;
              color: rgba(0, 0, 0, 0.87);
              padding: 0 0 0 4px;
              height: 18px;
              line-height: 18px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              &.is-start {
                margin-left: 4px;
                // border-top-left-radius:4px;
                // border-bottom-left-radius:4px;
              }
              &.is-end {
                margin-right: 4px;
                // border-top-right-radius:4px;
                // border-bottom-right-radius:4px;
              }
              &.is-opacity {
                opacity: 0;
              }
            }
            .more-link {
              cursor: pointer;
              // text-align: right;
              padding-left: 8px;
              padding-right: 2px;
              color: rgba(0, 0, 0, 0.38);
              font-size: 14px;
            }
          }
        }
      }
    }
    .more-events {
      position: absolute;
      width: 150px;
      z-index: 2;
      border: 1px solid #eee;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
      .more-header {
        background-color: #eee;
        padding: 5px;
        display: flex;
        align-items: center;
        font-size: 14px;
        .title {
          flex: 1;
        }
        .close {
          margin-right: 2px;
          cursor: pointer;
          font-size: 16px;
        }
      }
      .more-body {
        height: 140px;
        overflow: hidden;
        .body-list {
          height: 120px;
          padding: 5px;
          overflow: auto;
          background-color: #fff;
          .body-item {
            cursor: pointer;
            font-size: 12px;
            background-color: #c7e6fd;
            margin-bottom: 2px;
            color: rgba(0, 0, 0, 0.87);
            padding: 0 0 0 4px;
            height: 18px;
            line-height: 18px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
}
</style>
