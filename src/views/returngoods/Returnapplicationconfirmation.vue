<template>
  <div class="ktzd">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top: 20px;">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>返货</el-breadcrumb-item>
      <el-breadcrumb-item>返货申请确认</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="工作单号">
        <el-input v-model="worksheetno" placeholder="请输入工作单号" style="width: 150px;"></el-input>
      </el-form-item>
      <el-form-item  label="申请单号">
         <el-input v-model="applicationno" placeholder="请输入工作单号" style="width: 150px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <el-table :data="result" border style="width: 100%">

      <el-table-column type="selection" width="80">
      </el-table-column>
      <el-table-column prop="id" label="序号" width="80">
      </el-table-column>
      <el-table-column prop="confirmationtime" label="确认时间" width="80">
      </el-table-column>
      <el-table-column prop="syUnits.name" label="确认单位" width="80">
      </el-table-column>
      <el-table-column  prop="confirmationpersonname" label="确认人" width="80">
      </el-table-column>
      <el-table-column  prop="treatmentstate" label="返货处理状态" width="80">
         <template slot-scope="scope1">
         <span v-if="scope1.row.treatmentstate==1">未确认</span>
         <span v-if="scope1.row.treatmentstate==2">同意返货</span>
         <span v-if="scope1.row.treatmentstate==3">拒绝</span>
         <span v-if="scope1.row.treatmentstate==4">同意转发</span>
         </template>
      </el-table-column>
      <el-table-column v-if="identificationsign=1" prop="identificationsign" label="系统自动确认标志" width="150">
         <template slot-scope="scope2">
         <span v-if="scope2.row.identificationsign==1">否</span>
         <span v-if="scope2.row.identificationsign==2">是</span>
         </template>
      </el-table-column>
      <el-table-column  label="反馈信息" width="80">
        还没有
      </el-table-column>
      <el-table-column prop="handlingopinions" label="处理意见" width="80">
      </el-table-column>
      <el-table-column label="操作" width="360">
        <template slot-scope="scope">
      <el-button size="mini" type="success" @click="sqQRClick(scope.row)">申请确认</el-button>
      <el-button size="mini" type="success" @click="sqFhClick(scope.row)">转发</el-button>
      <el-button size="mini" type="success" @click="jJClick(scope.row)">拒绝</el-button>
      <el-button size="mini" type="success" @click="qxClick(scope.row)">取消</el-button>
      </template>
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
        worksheetno: '',
        applicationno:'',
        dialogFormVisible: false,
        total: 10,
        pages: 1,
        rows: 5,
        radio: 3,
        options: [{
                 returntypes: '1',
                 label: '没有原因'
               }, {
                 returntypes: '2',
                 label: '不想要'
               }, {
                 returntypes: '3',
                 label: '错拍'
               }, {
                 returntypes: '4',
                 label: '破损'
               }],
        ok: false,
        sortingcode: '',
        returntypes:'',
        treatmentstate:0,
        id:0

      }
    },
    methods: {
      handleClick: function() { /* 查看详情 */

      },
      onSubmit: function() {
      let fy = {
        pages: this.pages,
        rows: this.rows,
        worksheetno:this.worksheetno,
        applicationno:this.applicationno
      }
      var str = qs.stringify(fy);
      let url = "http://localhost/wuliuxm/selectRetReturnlistHlp"
      axios.post(url, str).then(response => {
        this.result = response.data.rows;
        this.total = response.data.total;
        console.log(response)
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
         worksheetno:this.worksheetno,
         applicationno:this.applicationno
       }
       var str = qs.stringify(fy);
       let url = "http://localhost/wuliuxm/selectRetReturnlistHlp"
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
        worksheetno:this.worksheetno,
        applicationno:this.applicationno
      }
      var str = qs.stringify(fy);
      let url = "http://localhost/wuliuxm/selectRetReturnlistHlp"
      axios.post(url, str).then(response => {
        this.result = response.data.rows;
        this.total = response.data.total;
      }).catch(error => {
        console.log('erro')
      });

    },
    sqQRClick:function(rows){
      this.id=rows.id;
      this.treatmentstate=2;
      let fy = {
        id: this.id,
       treatmentstate:this.treatmentstate
      }
      var str = qs.stringify(fy);
      let url = "http://localhost/wuliuxm/updateFHQRRetReturnlistHlp"
      axios.post(url, str).then(response => {
        this.onSubmit();
      }).catch(error => {
        console.log('erro')
      });

    },
    jJClick:function(rows){
      this.id=rows.id;
      this.treatmentstate=3;
      let fy = {
        id: this.id,
       treatmentstate:this.treatmentstate
      }
      var str = qs.stringify(fy);
      let url = "http://localhost/wuliuxm/updateFHQRRetReturnlistHlp"
      axios.post(url, str).then(response => {
        this.onSubmit();
      }).catch(error => {
        console.log('erro')
      });

    },
    qxClick:function(rows){
      this.id=rows.id;
      this.treatmentstate=1;
      let fy = {
        id: this.id,
       treatmentstate:this.treatmentstate
      }
      var str = qs.stringify(fy);
      let url = "http://localhost/wuliuxm/updateFHQRRetReturnlistHlp"
      axios.post(url, str).then(response => {
        this.onSubmit();
      }).catch(error => {
        console.log('erro')
      });

    },
    sqFhClick:function(rows){
      this.id=rows.id;
      this.treatmentstate=4;
      let fy = {
        id: this.id,
       treatmentstate:this.treatmentstate
      }
      var str = qs.stringify(fy);
      let url = "http://localhost/wuliuxm/updateFHQRRetReturnlistHlp"
      axios.post(url, str).then(response => {
        this.onSubmit();
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
           worksheetno:this.worksheetno,
           applicationno:this.applicationno
         }
         var str = qs.stringify(fy);
         let url = "http://localhost/wuliuxm/selectRetReturnlistHlp"
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
