<template>
  <div class="ktzd">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top: 20px;">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>物流管理</el-breadcrumb-item>
      <el-breadcrumb-item>货量统计</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="物流序号">
        <el-input v-model="logisticsint" placeholder="请输入物流序号" style="width: 150px;"></el-input>
      </el-form-item>
      <el-form-item label="线路名称">
        <el-input v-model="linename" placeholder="请输入线路名称" style="width: 150px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="result" border style="width: 100%">
      <el-table-column prop="id" label="序号" width="150">
      </el-table-column>
      <el-table-column prop="logTrack.nodename" label="节点名称" width="150">
        未作废
      </el-table-column>
      <el-table-column prop="linename" label="线路名称" width="150">
      </el-table-column>
      <el-table-column prop="logisticsint" label="物流序号" width="200">
      </el-table-column>
      <el-table-column prop="logTrack.starttime" label="节点发车时间" width="200">
      </el-table-column>
      <el-table-column prop="logTrack.arrivaltime" label="到达时间" width="200">
      </el-table-column>

    </el-table>
    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pages"
      :page-sizes="[1,3,5,8]" :page-size="rows" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>

  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
  export default {
    name: 'Manualscheduling',
    data: function() {
      return {
        result: [],
        dialogFormVisibles: false,
        total: 10,
        pages: 1,
        rows: 5,
        radio: 3,
        linename: '',
        logisticsint: '',
      }
    },
    methods: {

      onSubmit: function() {
        let fy = {
          pages: this.pages,
          rows: this.rows,
          logisticsint:this.logisticsint,
          linename:this.linename
        }
        var str = qs.stringify(fy);
        let url = "http://localhost/wuliuxm/selectLogLogisticsHLP"
        axios.post(url, str).then(response => {
          this.result = response.data.rows;
          this.total = response.data.total;
          console.log(this.bus + "车")
          console.log(this.result + "跟踪")
        }).catch(error => {
          console.log('erro')
        });


      },
      resetForm: function(formName) {
        this.$refs[formName].resetFields();
      },
      moreGet: function() {
        this.ok = !this.ok;
      },
      handleCurrentChange: function(pages) {
        this.pages = pages;
        let fy = {
          pages: this.pages,
          rows: this.rows,
          logisticsint:this.logisticsint,
          linename:this.linename
        }
        var str = qs.stringify(fy);
        let url = "http://localhost/wuliuxm/selectLogLogisticsHLP"
        axios.post(url, str).then(response => {
          this.result = response.data.rows;
          this.total = response.data.total;
          console.log(this.bus + "车")
          console.log(this.result + "跟踪")
        }).catch(error => {
          console.log('erro')
        });

      },
      handleSizeChange: function(rows) {
        this.rows = rows
      let fy = {
        pages: this.pages,
        rows: this.rows,
        logisticsint:this.logisticsint,
        linename:this.linename
      }
      var str = qs.stringify(fy);
      let url = "http://localhost/wuliuxm/selectLogLogisticsHLP"
      axios.post(url, str).then(response => {
        this.result = response.data.rows;
        this.total = response.data.total;
        console.log(this.bus + "车")
        console.log(this.result + "跟踪")
      }).catch(error => {
        console.log('erro')
      });

      }
    },
    //钩子函数
    created: function() {

      let fy = {
        pages: this.pages,
        rows: this.rows,
        logisticsint:this.logisticsint,
        linename:this.linename
      }
      var str = qs.stringify(fy);
      let url = "http://localhost/wuliuxm/selectLogLogisticsHLP"
      axios.post(url, str).then(response => {
        this.result = response.data.rows;
        this.total = response.data.total;
        console.log(this.bus + "车")
        console.log(this.result + "跟踪")
      }).catch(error => {
        console.log('erro')
      });
    }
  }
</script>

<style>
</style>
