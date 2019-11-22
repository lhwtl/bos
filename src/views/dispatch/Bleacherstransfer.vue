<template>
  <div class="ktzd">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top: 20px;">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>调度</el-breadcrumb-item>
      <el-breadcrumb-item>查台转单</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="来电电话">
        <el-input v-model="telphone" placeholder="请输入来电电话" style="width: 150px;"></el-input>
      </el-form-item>
      <el-form-item label="通知单号">
        <el-input v-model="businessnoticeno" placeholder="请输入通知单号" style="width: 150px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查台</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button @click="moreGet">更多</el-button>
      </el-form-item>
      <br />
      <el-form-item label="工单日期" v-show="ok">
        <el-input v-model="workgenerationtime"  placeholder="请输入工单日期" style="width: 150px;"></el-input>
      </el-form-item>
      <el-form-item label="员工工号" v-show="ok">
        <el-input v-model="empno" placeholder="请输入员工工号" style="width: 150px;"></el-input>
      </el-form-item>
      <el-form-item label="短信序号" v-show="ok">
        <el-input v-model="shortmessageint" placeholder="请输入短信序号" style="width: 150px;"></el-input>
      </el-form-item>
      <el-form-item label="查台密码" v-show="ok">
        <el-input v-model="querypwd" placeholder="请输入查台密码" style="width: 150px;"></el-input>
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
      <el-table-column prop="accWorkorder.jobno" label="工单号" width="100">
      </el-table-column>
      <el-table-column prop="accWorkorder.shortmessageint" label="短信序号" width="100">
      </el-table-column>
      <el-table-column prop="businessnoticeno" label="业务通知单号" width="100">
      </el-table-column>
      <el-table-column prop="accWorkorder.workgenerationtimes" label="工单生成时间" width="100">
      </el-table-column>
      <el-table-column prop="pickupaddress" label="收件地址" width="100">
      </el-table-column>
      <el-table-column prop="linkman" label="联系人" width="100">
      </el-table-column>
      <el-table-column prop="telphone" label="联系电话" width="100">
      </el-table-column>
      <el-table-column prop="accWorkorder.aftersinglenum" label="追单次数" width="100">
      </el-table-column>
      <el-table-column prop="syUnits.name" label="处理单位" width="100">
      </el-table-column>
    </el-table>
<el-pagination  background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pages"
      :page-sizes="[1,3,5,8]" :page-size="rows" layout="total, sizes, prev, pager, next, jumper" :total="total">
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
        telphone: '',
        businessnoticeno: '',
        workgenerationtime:'',
        empno:'',
        shortmessageint:'',
        querypwd:'',
        formInline: '',
        hidden: true,
        form: {
          name:'',
          region:''

        },
        dialogFormVisible: false,
        total:10,
        pages:1,
        rows:5,
        radio:3,
        formLabelWidth:'',
        model:'',
        ok:false

      }
    },
    methods: {
      handleClick: function() { /* 查看详情 */

      },
      moreGet:function(){
          this.ok=!this.ok;
      },
      onSubmit: function() {
        let fy={
           pages:this.pages,
           rows:this.rows,
           telphone:this.telphone,
           businessnoticeno:this.businessnoticeno
         }
        var str= qs.stringify(fy);
        let url = "http://localhost/wuliuxm/selectHlpAccBusinessadmissibility"
        axios.post(url, str).then(response => {
          console.log(response);
          console.log(response.data)
          this.result = response.data.rows;
          this.total=response.data.total;
          console.log("--------------------")
          console.log(response.data.total)
         // console.log(response.data.accWorkorders);
        }).catch(error => {
          console.log('erro')
        });

      },
      resetForm: function(formName) {
        this.$refs[formName].resetFields();
      },
      handleCurrentChange:function(pages){
             this.pages=pages;
             let fy={
                pages:this.pages,
                rows:this.rows,
                telphone:this.telphone,
                businessnoticeno:this.businessnoticeno
              }
             var str= qs.stringify(fy);
             let url = "http://localhost/wuliuxm/selectHlpAccBusinessadmissibility"
             axios.post(url, str).then(response => {
               console.log(response);
               console.log(response.data)
               this.result = response.data.rows;
               this.total=response.data.total;
               console.log("--------------------")
               console.log(response.data.total)
              // console.log(response.data.accWorkorders);
             }).catch(error => {
               console.log('erro')
               })

      },
      handleSizeChange:function(rows){
         this.rows=rows;
         let fy={
            pages:this.pages,
            rows:this.rows,
            telphone:this.telphone,
            businessnoticeno:this.businessnoticeno
          }
         var str= qs.stringify(fy);
         let url = "http://localhost/wuliuxm/selectHlpAccBusinessadmissibility"
         axios.post(url, str).then(response => {
           console.log(response);
           console.log(response.data)
           this.result = response.data.rows;
           this.total=response.data.total;
           console.log("--------------------")
           console.log(response.data.total)
          // console.log(response.data.accWorkorders);
         }).catch(error => {
           console.log('erro')
         });

      }

    },
    //钩子函数
    created: function() {
       let fy={
         pages:this.pages,
         rows:this.rows,
         telphone:this.telphone,
         businessnoticeno:this.businessnoticeno
       }
      var str= qs.stringify(fy);
      let url = "http://localhost/wuliuxm/selectHlpAccBusinessadmissibility"
      axios.post(url, str).then(response => {
        console.log(response);
        console.log(response.data)
        this.result = response.data.rows;
        this.total=response.data.total;
        console.log("--------------------")
        console.log(response.data.total)
       // console.log(response.data.accWorkorders);
      }).catch(error => {
        console.log('erro')
      });

    }
  }
</script>


<style>
</style>
