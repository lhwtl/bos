<template>
  <div class="ktzd">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top: 20px;">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>调度</el-breadcrumb-item>
      <el-breadcrumb-item>查台转单</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="来电电话">
        <el-input v-model="telephone" placeholder="请输入来电电话" style="width: 150px;"></el-input>
      </el-form-item>
      <el-form-item label="通知单号">
        <el-input v-model="businessnoticeno" placeholder="请输入通知单号" style="width: 150px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查台</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button @click="moreGet">更多</el-button>
      </el-form-item>
    </el-form>
    <el-form :inline="true" :hidden="hidden" :model="formInline" class="demo-form-inline">
      <el-form-item label="工单日期">
        <el-input v-model="ww" placeholder="请输入工单日期" style="width: 150px;"></el-input>
      </el-form-item>
      <el-form-item label="员工工号">
        <el-input v-model="ss" placeholder="请输入员工工号" style="width: 150px;"></el-input>
      </el-form-item>
      <el-form-item label="短信序号">
        <el-input v-model="qq" placeholder="请输入短信序号" style="width: 150px;"></el-input>
      </el-form-item>
      <el-form-item label="查台密码">
        <el-input v-model="cc" placeholder="请输入查台密码" style="width: 150px;"></el-input>
      </el-form-item>

    </el-form>
    <el-row style="text-align: left;;">
      <el-button type="primary" @click="dialogFormVisible = true">转单</el-button>
      <el-button type="info">重发</el-button>
    </el-row>
    <!--转单的弹框 -->
    <el-dialog title="转单" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="转入方式" :label-width="formLabelWidth">
        <el-radio-group v-model="radio">
            <el-radio :label="3">定区编号</el-radio>
            <el-radio :label="6">小件员工号</el-radio>
            <el-radio :label="9">单位</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="转入目标" :label-width="formLabelWidth">
        <el-input v-model="zrmb" style="width: 300px;" placeholder="请输入转入目标"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
 </el-dialog>




    <el-table :data="result" border style="width: 100%">

      <el-table-column type="selection" width="80">
      </el-table-column>
      <el-table-column prop="id" label="序号" width="80">
      </el-table-column>
      <el-table-column prop="accWorkorders[0].jobno" label="工单号" width="100">
      </el-table-column>
      <el-table-column prop="accWorkorders[0].shortmessageint" label="短信序号" width="100">
      </el-table-column>
      <el-table-column prop="businessnoticeno" label="业务通知单号" width="100">
      </el-table-column>
      <el-table-column prop="accWorkorders[0].workgenerationtime" label="工单生成时间" width="100">
      </el-table-column>
      <el-table-column prop="pickupaddress" label="收件地址" width="100">
      </el-table-column>
      <el-table-column prop="linkman" label="联系人" width="100">
      </el-table-column>
      <el-table-column prop="telphone" label="联系电话" width="100">
      </el-table-column>
      <el-table-column prop="accWorkorders[0].aftersinglenum" label="追单次数" width="100">
      </el-table-column>
      <el-table-column prop="accWorkorders[0].pickupunit" label="处理单位" width="100">
      </el-table-column>
    </el-table>
<el-pagination background @current-change="change" @size-change="SizeChange" layout="prev, pager, next"
      :current-pag="size" :total="total">
      <!-- 行 page-size-->
      <!-- 页 current-pag-->
    </el-pagination>

  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
  export default {
    name: 'Bleacherstransfer',
    data: function() {
      return {
        result: [],
        telephone: '',
        businessnoticeno: '',
        formInline: '',
        hidden: true,
        form: {
          name:'',
          region:''

        },
        dialogFormVisible: false,
        total:10,
        size:5,
        radio:3,
        ww:'',
        ss:'',
        qq:'',
        zrmb:'',
        cc:'',
        formLabelWidth:'',
        model:''

      }
    },
    methods: {
      handleClick: function() { /* 查看详情 */

      },
      onSubmit: function() {
        /* console.log("进来了")
           let tel={
             telephone:this.telephone,
             businessnoticeno:this.businessnoticeno
           }
           var str=qs.stringify(tel);
           let url = "http://localhost/wuliuxm/selectHlpAccBusinessadmissibilityByteleAndbusi"
           axios.post(url, str).then(response => {
             console.log("_______________");
             console.log(response.data)
             this.result = response.data;
             console.log(this.result.accWorkorders);
           }).catch(error => {
             console.log('erro')
           }); */
      },
      resetForm: function(formName) {
        this.$refs[formName].resetFields();
      },
      moreGet: function() {
        return this.hidden = !this.hidden;
        console.log(this.hidden);
      },
      SizeChange:function(){

      },
      change:function(){

      }

    },
    //钩子函数
    created: function() {

      let url = "http://localhost/wuliuxm/selectHlpAccBusinessadmissibility"
      axios.post(url, null).then(response => {
        console.log(response);
        console.log(response.data)
        this.result = response.data;

        var arr1 = [];
        this.result.forEach(function(v) {
          arr1.push(v.accWorkorders);
        });
        this.result.accWorkorders = arr1;
        console.log(this.result.accWorkorders);
      }).catch(error => {
        console.log('erro')
      });

    }
  }
</script>


<style>
</style>
