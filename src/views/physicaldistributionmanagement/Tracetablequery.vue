<template>
  <div class="ktzd">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top: 20px;">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>物流管理</el-breadcrumb-item>
      <el-breadcrumb-item>跟踪表查询</el-breadcrumb-item>
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
      <el-table-column prop="id" label="序号" width="50">
      </el-table-column>
      <el-table-column prop="logisticsint" label="物流序号" width="50">
      </el-table-column>
      <el-table-column prop="linename" label="线路名称" width="100">
      </el-table-column>
      <el-table-column prop="startcompany" label="发车单位" width="100">
      </el-table-column>
      <el-table-column prop="generateperson" label="生成人" width="100">
      </el-table-column>
      <el-table-column prop="carint" label="车牌号" width="100">
      </el-table-column>
      <el-table-column prop="driver" label="司机" width="100">
      </el-table-column>
      <el-table-column prop="driverphone" label="司机电话" width="100">
      </el-table-column>
      <el-table-column prop="cartype" label="车型" width="100">
      </el-table-column>
      <el-table-column prop="logisticsstate" label="物流状态" width="100">
      </el-table-column>
      <el-table-column  prop="iscancel" label="作废" width="50">
         <template slot-scope="scope2">
         <span v-if="scope2.row.iscancel==1">否</span>
         <span v-if="scope2.row.iscancel==2">是</span>
         </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="success" size="mini" @click="detail(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pages"
      :page-sizes="[1,3,5,8]" :page-size="rows" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>


    <el-dialog title="查看详情" :visible.sync="dialogFormVisibles" style="width: 1600px;">
      <!-- 表格 -->
      <el-table :data="qq" border style="width: 100%">
        <el-table-column prop="id" label="序号" width="50">
          {{qq.id}}
        </el-table-column>
        <el-table-column prop="logisticsint" label="物流序号" width="50">
          {{qq.logisticsint}}
        </el-table-column>
        <el-table-column prop="linename" label="线路名称" width="80">
          {{qq.linename}}
        </el-table-column>
        <el-table-column prop="companyname" label="单位名称" width="80">
          {{qq.companyname}}
        </el-table-column>
        <el-table-column prop="expectarrivaldate" label="预计到达时间" width="80">
          {{qq.expectarrivaldate}}
        </el-table-column>
        <el-table-column prop="actualarrivaldate" label="实际到达时间" width="80">
          {{qq.actualarrivaldate}}
        </el-table-column>
        <el-table-column prop="expectdeparturedate" label="预计离开时间" width="80">
          {{qq.expectdeparturedate}}
        </el-table-column>
        <el-table-column prop="actualdeparturedate" label="实际离开时间" width="80">
          {{qq.actualdeparturedate}}
        </el-table-column>
        <el-table-column prop="operationperson" label="操作人" width="80">
          {{qq.operationperson}}
        </el-table-column>
        <el-table-column prop="logisticstype" label="类型" width="80">
          {{qq.logisticstype}}
        </el-table-column>
      </el-table>
    </el-dialog>


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
        qq:[
          {
            id:'',
            logisticsint:'',
            linename:'',
            companyname:'',
            expectarrivaldate:'',
            actualarrivaldate:'',
            expectdeparturedate:'',
            actualdeparturedate:'',
            operationperson:'',
            logisticstype:''
          }
        ]

      }
    },
    methods: {
      detail:function(row){
        console.log(row+"这一行数据");
            this.dialogFormVisibles=true;
            this.qq.id=row.id;
            this.qq.logisticsint=row.logisticsint;
            this.qq.linename=row.linename;
            this.qq.companyname=row.logLogisticsdetails.companyname;
            this.qq.expectarrivaldate=row.logLogisticsdetails.expectarrivaldate;
            this.qq.actualarrivaldate=row.logLogisticsdetails.actualarrivaldate;
            this.qq.expectdeparturedate=row.logLogisticsdetails.expectdeparturedate;
            this.qq.actualdeparturedate=row.logLogisticsdetails.actualdeparturedate;
            this.qq.operationperson=row.logLogisticsdetails.operationperson;
            this.qq.logisticstype=row.logLogisticsdetails.logisticstype;
            console.log(this.qq.actualdeparturedate+"时间");

      },
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
