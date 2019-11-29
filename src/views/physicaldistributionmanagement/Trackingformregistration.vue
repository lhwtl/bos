<template>
  <div class="ktzd">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top: 20px;">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>调度</el-breadcrumb-item>
      <el-breadcrumb-item>跟踪表登记</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="线路名称">
        <el-input v-model="linename" placeholder="请输入线路名称" style="width: 150px;"></el-input>
      </el-form-item>
      <el-form-item label="物流车">
        <el-input v-model="logisticscar" placeholder="请输入物流车" style="width: 150px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row style="text-align: left;;">
      <el-button type="primary">生成</el-button>
    </el-row>

    <!-- 第一个表格 -->
    <el-table :data="result" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="250">
      </el-table-column>
      <el-table-column  prop="linestate" label="状态" width="250">
        <template slot-scope="scope1">
         <span v-if="scope1.row.linestate==1">未处理</span>
         <span v-if="scope1.row.linestate==2">已处理</span>
         </template>
      </el-table-column>
      <el-table-column prop="linename" label="线路名称" width="250">
      </el-table-column>
      <el-table-column prop="basShuttlebus.licenseplateint" label="车号" width="250">
      </el-table-column>
    </el-table>
    <br />
    <!-- 表格 -->
    <el-table :data="result" border style="width: 100%">
      <el-table-column prop="describe" label="描述" width="150">
      </el-table-column>
      <el-table-column prop="nodename" label="节点名称" width="150">
      </el-table-column>
      <el-table-column prop="starttimes" label="发车时间" width="150">
      </el-table-column>
      <el-table-column prop="arrivaltimes" label="到达时间" width="150">
      </el-table-column>
      <el-table-column prop="carint" label="车号" width="150">
      </el-table-column>
      <el-table-column prop="nextnodeload" label="下节点可装载量" width="100">
      </el-table-column>
      <el-table-column prop="basShuttlebus.ton" label="满载量(吨)" width="100">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
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
        total: 10,
        pages: 1,
        rows: 5,
        radio: 3,
        linename: '',
        logisticscar: '',
        id:''

      }
    },
    methods: {
      onSubmit: function() {
        let fy = {
          pages: this.pages,
          rows: this.rows,
          linename: this.linename,
          logisticscar: this.logisticscar
        }
        var str = qs.stringify(fy);
        let url = "http://localhost/wuliuxm/selectLogTrackHLP"
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
          linename: this.linename,
          logisticscar: this.logisticscar
        }
        var str = qs.stringify(fy);
        let url = "http://localhost/wuliuxm/selectLogTrackHLP"
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
          linename: this.linename,
          logisticscar: this.logisticscar
        }
        var str = qs.stringify(fy);
        let url = "http://localhost/wuliuxm/selectLogTrackHLP"
        axios.post(url, str).then(response => {
          this.result = response.data.rows;
          this.total = response.data.total;
        }).catch(error => {
          console.log('erro')
        });

      },


      /* 删除 */
      handleDelete: function(row) {
       this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning'
       }).then(() => {
         let url = 'http://localhost/wuliuxm/delectLogTrackByidHlp';
         let pages = {
           id: row.id,
         }
         axios.post(url, qs.stringify(pages)).then(resp => {
           console.log(resp)
           this.onSubmit();
           this.$message({
             type: 'success',
             message: '删除成功!'
           });
         }).catch(error => {
           console.log("删除失败");
         }).catch(() => {
           this.$message({
             type: 'info',
             message: '已取消删除'
           });
         });
       });
       }
    },
    //钩子函数
    created: function() {

      let fy = {
        pages: this.pages,
        rows: this.rows,
        linename: this.linename,
        logisticscar: this.logisticscar
      }
      var str = qs.stringify(fy);
      let url = "http://localhost/wuliuxm/selectLogTrackHLP"
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
