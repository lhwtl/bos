<template>
  <div class="ktzd">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top: 20px;">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>物流管理</el-breadcrumb-item>
      <el-breadcrumb-item>物流交接单查询</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="交接单号">
        <el-input v-model="transferint" placeholder="请输入交接单号" style="width: 150px;"></el-input>
      </el-form-item>
      <el-form-item label="司机名称">
        <el-input v-model="driver" placeholder="请输入司机名称" style="width: 150px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="result" border style="width: 100%">
      <el-table-column  prop="id" label="序号" width="100">
      </el-table-column>
      <el-table-column prop="transferint" label="交接单号" width="100">
      </el-table-column>
      <el-table-column  prop="startstation" label="发站" width="100">
      </el-table-column>
      <el-table-column  prop="endstation" label="到站" width="100">
      </el-table-column>
      <el-table-column  prop="dispatcher" label="调度人员" width="150">
      </el-table-column>
      <el-table-column prop="driver" label="司机" width="150">
      </el-table-column>
      <el-table-column prop="syEmp.empname"  label="发货人" width="150">
      </el-table-column>
      <el-table-column prop="deliverydates"  label="发货时间" width="150">
      </el-table-column>
      <br />
    </el-table>
    <br />
      <p style="color: red;text-align: left;">统计 交接单：{{total}}</p>
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
        dialogFormVisible: false,
        total: 10,
        pages: 1,
        rows: 5,
        radio: 3,
        transferint:'',
        driver:''

      }
    },
    methods: {
      handleClick: function() { /* 查看详情 */

      },
      onSubmit: function() {
      let fy = {
        pages: this.pages,
        rows: this.rows,
        transferint:this.transferint,
        driver:this.driver
      }
      var str = qs.stringify(fy);
      let url = "http://localhost/wuliuxm/selectLogLogisticstransferHlp"
      axios.post(url, str).then(response => {
        this.result = response.data.rows;
        this.total = response.data.total;

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
       transferint:this.transferint,
       driver:this.driver
     }
     var str = qs.stringify(fy);
     let url = "http://localhost/wuliuxm/selectLogLogisticstransferHlp"
     axios.post(url, str).then(response => {
       this.result = response.data.rows;
       this.total = response.data.total;
     
     }).catch(error => {
       console.log('erro')
     });


      },
      handleSizeChange: function(rows) {
        this.rows = rows
    let fy = {
      pages: this.pages,
      rows: this.rows,
      transferint:this.transferint,
      driver:this.driver
    }
    var str = qs.stringify(fy);
    let url = "http://localhost/wuliuxm/selectLogLogisticstransferHlp"
    axios.post(url, str).then(response => {
      this.result = response.data.rows;
      this.total = response.data.total;
    
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
        transferint:this.transferint,
        driver:this.driver
      }
      var str = qs.stringify(fy);
      let url = "http://localhost/wuliuxm/selectLogLogisticstransferHlp"
      axios.post(url, str).then(response => {
        this.result = response.data.rows;
        this.total = response.data.total;
      
      }).catch(error => {
        console.log('erro')
      });

    }
  }
</script>

<style>
</style>
