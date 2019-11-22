<template>
  <div class="ktzd">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top: 20px;">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>调度</el-breadcrumb-item>
      <el-breadcrumb-item>人工调度</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="签收人">
        <el-input v-model="recipient" placeholder="请输入签收人" style="width: 150px;"></el-input>
      </el-form-item>
      <el-form-item label="工作单号">
        <el-input v-model="worksheetno" placeholder="请输入工作单号" style="width: 150px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button @click="moreGet">更多</el-button>
      </el-form-item>
      <br>
      <el-form-item v-show="ok" label="签收类型">
        <el-select v-model="value" placeholder="请选择" style="width: 100px;">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-show="ok" label="派送人工号">
        <el-input v-model="ss" placeholder="请输入派送人工号" style="width: 150px;"></el-input>
      </el-form-item>
      <el-form-item v-show="ok" label="签收日期">
        <el-input v-model="ss" placeholder="YYYY-MM-DD" style="width: 150px;"></el-input>-
        <el-input v-model="ss" placeholder="YYYY-MM-DD" style="width: 150px;"></el-input>
      </el-form-item><br />
      <el-form-item v-show="ok" label="单位">
        <el-select v-model="value" placeholder="请选择" style="width: 200px;">
          <el-option v-for="item in istf" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-show="ok" label="含下级">
        <el-select v-model="value" placeholder="请选择" style="width: 200px;">
          <el-option v-for="item in istf" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-show="ok" label="作废">
        <el-select v-model="value" placeholder="请选择" style="width: 200px;">
          <el-option  :key="1" :label="是" :value="1">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <el-row style="text-align: left;;">
      <el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
      <el-button type="primary">修改</el-button>
      <el-button type="primary">详情</el-button>
    </el-row>
    <!--转单的弹框 -->
    <el-dialog title="分配" :visible.sync="dialogFormVisible" style="width: 500px;">
      <el-form :model="form">
        <el-form-item label="所属单位" :label-width="formLabelWidth">
          <el-select v-model="processingunit" placeholder="请选择"">
             <el-option
               v-for=" item
            in options" :key="item.id" :label="item.name" :value="item.id">
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

      <el-table-column type="selection" width="80">
      </el-table-column>
      <el-table-column prop="id" label="序号" width="80">
      </el-table-column>
      <el-table-column prop="workorderid" label="工作单ID" width="80">
      </el-table-column>
      <el-table-column prop="worksheetno" label="工作单号" width="100">
      </el-table-column>
      <el-table-column prop="worktype.typename" label="工作单类型" width="100">
      </el-table-column>
      <el-table-column prop="qsType.rtypename" label="签收类型" width="100">
      </el-table-column>
      <el-table-column prop="syUnits.name" label="录入单位" width="100">
      </el-table-column>
      <el-table-column prop="syEmp.empno" label="录入人编码" width="100">
      </el-table-column>
      <el-table-column prop="syEmp.empname" label="录入人姓名" width="100">
      </el-table-column>
      <el-table-column prop="recipient" label="签收人" width="100">
      </el-table-column>
      <el-table-column prop="couriername" label="派送员工姓名" width="100">
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
        recipient: '',
        worksheetno: '',
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
        fjbm: [],
        sortingcode: ''

      }
    },
    methods: {
      handleClick: function() { /* 查看详情 */

      },
      onSubmit: function() {
        let fy = {
          pages: this.pages,
          rows: this.rows,
          recipient: this.recipient,
          worksheetno: this.worksheetno
        }
        var str = qs.stringify(fy);
        let url = "http://localhost/wuliuxm/selectDisWorkordersignHlp"
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
          recipient: this.recipient,
          worksheetno: this.worksheetno
        }
        var str = qs.stringify(fy);
        let url = "http://localhost/wuliuxm/selectDisWorkordersignHlp"
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
          recipient: this.recipient,
          worksheetno: this.worksheetno
        }
        var str = qs.stringify(fy);
        let url = "http://localhost/wuliuxm/selectDisWorkordersignHlp"
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
        recipient: this.recipient,
        worksheetno: this.worksheetno
      }
      var str = qs.stringify(fy);
      let url = "http://localhost/wuliuxm/selectDisWorkordersignHlp"
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
