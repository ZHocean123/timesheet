<template>
  <section class="home">
    <div class="card">
      <div class="page-title">预约信息管理</div>
      <el-form ref="searchForm" :inline="true" :model="searchParams" :rules="rules" class="params-wrapper">
        <el-form-item label="日期：" prop="beginDate">
          <el-date-picker v-model="searchParams.beginDate" placeholder="开始时间" class="date-picker"></el-date-picker>
        </el-form-item>
        <el-form-item label="至" prop="endDate">
          <el-date-picker v-model="searchParams.endDate" placeholder="结束时间" class="date-picker"></el-date-picker>
        </el-form-item>
        <el-form-item label="科室：" prop="departmentId">
          <el-select v-model="searchParams.departmentId" value-key="id" placeholder="">
            <el-option v-for="department in departments" :key="department.id" :value="department.id" :label="department.name">{{department.name}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否团体：" prop="type">
          <el-radio v-model="searchParams.type" :label="1">团体</el-radio>
          <el-radio v-model="searchParams.type" :label="0">非团体</el-radio>
        </el-form-item>
        <el-button @click="getAppointments" type="primary" class="search-btn">搜索</el-button>
      </el-form>
      <el-table :data="list">
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="expand"></el-table-column>
        <el-table-column label="预约日期" prop="createDate">
          <template slot-scope="scope">
            {{scope.row.createDate | date}}
          </template>
        </el-table-column>
        <el-table-column label="预约时间" prop=""></el-table-column>
        <el-table-column label="受理科室" prop="departmentInfo.name"></el-table-column>
        <el-table-column label="受理窗口" prop="windowName"></el-table-column>
        <el-table-column label="预约人数" prop="applicantCount"></el-table-column>
        <el-table-column label="是否团队" prop="type">
          <template slot-scope="scope">
            <el-tag :type="scope.row.type === 1 ? 'success' : 'primary'" close-transition>
              {{scope.row.type === 1 ? '是' : '否'}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="提交时间" prop="createDate">
          <template slot-scope="scope">
            {{scope.row.createDate | date}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="210">
          <template slot-scope="scope">
            <el-button @click.native.prevent="deleteRow(scope.$index, tableData4)" type="warning" size="small">
              确认预约
            </el-button>
            <el-button @click.native.prevent="deleteRow(scope.$index, tableData4)" type="primary" size="small">
              审核不通过
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :total="total" :current-page="page" :page-size="size" @current-change="onPageChange" layout="total, sizes, prev, pager, next, jumper"></el-pagination>
    </div>
  </section>
</template>

<script>
import { getDepartments } from '../api/department';
import { getAppointments } from '../api/appointment';
import { format } from '../utils/date-format';

export default {
  name: 'home',
  data() {
    return {
      searchParams: {
        beginDate: new Date(),
        endDate: null, // new Date(new Date().getTime()),
        departmentId: null,
        type: 0,
      },
      departments: [],
      list: [],
      total: 0,
      page: 0,
      size: 10,
      rules: {
        beginDate: [
          {
            type: 'date',
            validator: (rule, value, callback) => {
              if (value === null) {
                callback(new Error('请选择开始时间'));
              } else {
                callback();
              }
            },
            trigger: 'change',
          },
        ],
        endDate: [
          {
            type: 'date',
            validator: (rule, value, callback) => {
              if (value === null) {
                callback(new Error('请选择结束时间'));
              } else {
                callback();
              }
            },
            trigger: 'change',
          },
        ],
        departmentId: [
          {
            validator: (rule, value, callback) => {
              if (value === null) {
                callback(new Error('请选择科室'));
              } else {
                callback();
              }
            },
            trigger: 'change',
          },
        ],
      },
    };
  },
  filters: {
    date(value) {
      return format(new Date(value));
    },
  },
  methods: {
    loadList() {},
    onPageChange() {},
    getDepartments() {
      getDepartments()
        .then(data => {
          this.departments = data;
          if (
            this.searchParams.departmentId === null &&
            this.departments.length > 0
          ) {
            this.searchParams.departmentId = this.departments[0].id;
          }
          console.info(data);
        })
        .catch(error => console.error(error));
    },
    getAppointments() {
      this.$refs.searchForm.validate(valid => {
        if (valid) {
          getAppointments({
            sort: { id: 'desc' },
            searchPhrase: {},
            offset: this.page,
            limit: this.size,
            state: '',
            departmentId: '',
            startDate: '',
            endDate: '',
            type: this.type,
          })
            .then(data => {
              this.list = data.rows;
              this.total = data.total;
              this.page = data.offset;
              this.size = data.limit;
              console.info(data);
            })
            .catch(error => console.error(error));
        }
      });
    },
  },
  mounted() {
    this.loadList();
    this.getDepartments();
  },
};
</script>

<style lang="less" scoped>
.home {
  // background-color: gray;
  .params-wrapper {
    padding: 10px;
    .date-picker {
      width: 140px;
    }
    .search-btn {
      // float: right;
    }
  }
  tr:nth-of-type(odd) {
    background-color: #f4f4f4;
  }
}
</style>
