<template>
  <section class="window-setting">
    <div class="card">
      <div class="page-title">预约时间设置</div>
      <fullcalendar ref="calendar" :date="currentDate" :events="events" :firstDay="1" lang="zh" @dayClick="dayClick" @changeMonth="changeMonth" class="calendar">
      </fullcalendar>
    </div>
    <el-dialog title="窗口设置" :visible.sync="dialogVisible">
      <el-form :model="windowEvent" label-width="80px" inline>
        <el-form-item label="科室名称">
          <el-input v-model="windowEvent.departmentName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="受理日期">
          <el-date-picker v-model="windowEvent.date" placeholder=""></el-date-picker>
        </el-form-item>
        <el-form-item label="窗口数量">
          <el-input v-model="windowEvent.windowNum" placeholder=""></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary">确定</el-button>
        <el-button type="default">取消</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import fullcalendar from '../components/fullCalendar/fullCalendar';
// import { getAppointments } from '../api/appointment';

export default {
  name: 'window-setting',
  components: { fullcalendar },
  data() {
    return {
      dialogVisible: false,
      currentDate: new Date(),
      windowEvent: {},
      holidays: [],
      events: [
        {
          title: 'event1',
          start: '2017-12-01',
          YOUR_DATA: {},
        },
        {
          title: 'event1',
          start: '2017-12-01',
          end: '2018-01-01',
          YOUR_DATA: {},
        },
      ],
    };
  },
  methods: {
    dayClick(day, jsEvent) {
      console.log(day, jsEvent);
      this.dialogVisible = true;
    },
    changeMonth(start, end, currentStart) {
      console.log(start, end, currentStart);
      if (this.$refs.calendar) {
        // this.loadHolidays();
      }
    },
    // loadList() {},
    // onPageChange() {},
    // getDepartments() {
    //   getDepartments()
    //     .then(data => {
    //       this.departments = data;
    //       if (
    //         this.searchParams.departmentId === null &&
    //         this.departments.length > 0
    //       ) {
    //         this.searchParams.departmentId = this.departments[0].id;
    //       }
    //       console.info(data);
    //     })
    //     .catch(error => console.error(error));
    // },
    // getAppointments() {
    //   this.$refs.searchForm.validate(valid => {
    //     if (valid) {
    //       getAppointments({
    //         sort: { id: 'desc' },
    //         searchPhrase: {},
    //         offset: this.page,
    //         limit: this.size,
    //         state: '',
    //         departmentId: '',
    //         startDate: '',
    //         endDate: '',
    //         type: this.type,
    //       })
    //         .then(data => {
    //           this.list = data.rows;
    //           this.total = data.total;
    //           this.page = data.offset;
    //           this.size = data.limit;
    //           console.info(data);
    //         })
    //         .catch(error => console.error(error));
    //     }
    //   });
    // },
  },
  mounted() {
    // this.loadList();
    // this.getDepartments();
  },
};
</script>

<style lang="less" scoped>
.window-setting {
  .calendar {
    max-width: none;
  }
}
</style>
