<template>
  <div class="ktzd">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top: 20px;">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>调度</el-breadcrumb-item>
      <el-breadcrumb-item>人工调度</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="所属单位">
        <el-select v-model="processingunit" placeholder="请选择" style="width: 100px;">
          <el-option v-for=" item in options" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="通知单号">
        <el-input v-model="businessnoticeno" placeholder="请输入通知单号" style="width: 150px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button @click="moreGet">更多</el-button>
      </el-form-item>
      <br>
      <el-form-item v-show="ok" label="来源类型">
        <el-select v-model="value" placeholder="请选择" style="width: 100px;">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-show="ok" label="日期">
        <el-input v-model="ss" placeholder="请输入日期" style="width: 150px;"></el-input>
      </el-form-item>
      <el-form-item v-show="ok" label="是否超时">
        <el-select v-model="value" placeholder="请选择" style="width: 100px;">
          <el-option v-for="item in istf" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-show="ok" label="是否异常">
        <el-select v-model="value" placeholder="请选择" style="width: 100px;">
          <el-option v-for="item in istf" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <el-row style="text-align: left;;">
      <el-button type="primary" @click="dialogFormVisible = true">分配</el-button>
      <el-button type="primary">退回</el-button>
      <el-button type="primary">销单</el-button>
      <el-button type="primary">详情</el-button>
    </el-row>
    <!--转单的弹框 -->
    <el-dialog title="分配" :visible.sync="dialogFormVisible" style="width: 500px;">
      <el-form :model="form">
        <el-form-item label="所属单位" :label-width="formLabelWidth">
          <el-select v-model="processingunit" placeholder="请选择"">
             <el-option
               v-for=" item in
            options" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分拣编码">
          <el-select v-model="sortingcode" placeholder="请选择"">
             <el-option
               v-for=" item in
            fjbm" :key="item.id" :label="item.sortingcode" :value="item.sortingcode">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 表格 -->
    <el-table :data="result" border style="width: 100%">

      <el-table-column type="selection" width="50">
      </el-table-column>
      <el-table-column prop="id" label="序号" width="50">
      </el-table-column>
      <el-table-column prop="businessnoticeno" label="通知单号" width="80">
      </el-table-column>
      <el-table-column prop="reservationtimes" label="预约收件时间" width="100">
      </el-table-column>
      <el-table-column prop="customname" label="客户名称" width="80">
      </el-table-column>
      <el-table-column prop="pickupaddress" label="取件地址" width="100">
      </el-table-column>
      <el-table-column prop="customcode" label="客户编号" width="80">
      </el-table-column>
      <el-table-column prop="linkman" label="联系人" width="80">
      </el-table-column>
      <el-table-column prop="telphone" label="电话" width="100">
      </el-table-column>
      <el-table-column prop="weight" label="重量" width="80">
      </el-table-column>
      <el-table-column prop="volume" label="体积" width="80">
      </el-table-column>
      <el-table-column prop="importanthints" label="重要提示" width="100">
      </el-table-column>
      <el-table-column prop="arrivecity" label="到达城市" width="80">
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
        processingunit: '',
        businessnoticeno:'',
        formInline: '',
        form: {
          name: '',
          region: ''

        },
        dialogFormVisible: false,
        total: 10,
        pages: 1,
        rows: 5,
        radio: 3,
        ww: '',
        ss: '',
        qq: '',
        zrmb: '',
        cc: '',
        options: [],
        ok: false,
        fjbm:[],
        sortingcode:''

      }
    },
    methods: {
      handleClick: function() { /* 查看详情 */

      },
      onSubmit: function() {
        let fy = {
          pages: this.pages,
          rows: this.rows,
          processingunit:this.processingunit,
          businessnoticeno:this.businessnoticeno
        }
        var str = qs.stringify(fy);
        let url = "http://localhost/wuliuxm/selectHlpAccBusinessadmissibilityRgdd"
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
        this.pages=pages;
       let fy = {
         pages: this.pages,
         rows: this.rows,
       }
       var str = qs.stringify(fy);
       let url = "http://localhost/wuliuxm/selectHlpAccBusinessadmissibilityRgddfy"
       axios.post(url, str).then(response => {
         this.result = response.data.rows;
         this.total = response.data.total;
       }).catch(error => {
         console.log('erro')
       });
      },
      handleSizeChange: function(rows) {
       this.rows=rows
        let fy = {
          pages: this.pages,
          rows: this.rows,
        }
        var str = qs.stringify(fy);
        let url = "http://localhost/wuliuxm/selectHlpAccBusinessadmissibilityRgddfy"
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
      }
      var str = qs.stringify(fy);
      let url = "http://localhost/wuliuxm/selectHlpAccBusinessadmissibilityRgddfy"
      axios.post(url, str).then(response => {
        this.result = response.data.rows;
        this.total = response.data.total;
      }).catch(error => {
        console.log('erro')
      });


     //查询所有单位
     let url1 = "http://localhost/wuliuxm/selectSyUnitsHlp"
     axios.post(url1, null).then(response => {
       this.options=response.data;
     }).catch(error => {
       console.log('erro')
     });

     //查询所有分拣编码
     let url2 = "http://localhost/wuliuxm/selectAllAccWorkorderHlp"
     axios.post(url2, null).then(response => {
       this.fjbm=response.data;
     }).catch(error => {
       console.log('erro')
     });

    }
  }
</script>

<style>
</style>
