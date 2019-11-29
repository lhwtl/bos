<template>
  <div class="ktzd">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top: 20px;">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>调度</el-breadcrumb-item>
      <el-breadcrumb-item>生成返货单</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="工作单号">
        <el-input v-model="worksheetno" placeholder="请输入工作单号" style="width: 150px;"></el-input>
      </el-form-item>
       <el-form-item label="开单时间">
         <el-input v-model="recordingtime" placeholder="请输入开单时间" style="width: 150px;"></el-input>
       </el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button @click="moreGet">更多</el-button>
      </el-form-item>
      <br>
      <el-form-item v-show="ok" label="异常时间">
        <el-input v-model="recordingtime" placeholder="请输入异常时间" style="width: 150px;"></el-input>
      </el-form-item>
     <el-form-item v-show="ok"  label="状态">
       <el-select  placeholder="请选择" style="width: 150px;">
         <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
         </el-option>
       </el-select>
     </el-form-item>
     <el-form-item v-show="ok"  label="受理单位">
       <el-select  placeholder="请选择" style="width: 150px;">
         <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
         </el-option>
       </el-select>
     </el-form-item>
     <br />
      <el-form-item v-show="ok"  label="返货单位">
        <el-select  placeholder="请选择" style="width:150px;">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-show="ok"  label="含下级">
        <el-select placeholder="请选择" style="width: 150px;">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item  v-show="ok" label="签收部门">
        <el-select  placeholder="请选择" style="width: 150px;">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="result" border style="width: 100%">

      <el-table-column type="selection" width="50">
      </el-table-column>
      <el-table-column prop="id" label="序号" width="50">
      </el-table-column>
      <el-table-column prop="worksheetno" label="工作单号" width="80">
      </el-table-column>
      <el-table-column  prop="iaeLineresource.warename" label="品名" width="80">
      </el-table-column>
      <el-table-column  prop="treatmentstate" label="返货状态" width="80">
        <template slot-scope="scope1">
            <span v-if="scope1.row.treatmentstate==1">未确认</span>
            <span v-if="scope1.row.treatmentstate==2">同意返货</span>
            <span v-if="scope1.row.treatmentstate==3">拒绝</span>
            <span v-if="scope1.row.treatmentstate==4">同意转发</span>
        </template>
      </el-table-column>
      <el-table-column  prop="iaeLineresource.cargo" label="件数" width="80">
      </el-table-column>
     <el-table-column  prop="iaeLineresource.volume" label="体积" width="80">
     </el-table-column>
      <el-table-column prop="iaeLineresource.destination" label="到达地" width="80">
      </el-table-column>
      <el-table-column prop="confirmationpersonname" label="委托人" width="80">
      </el-table-column>
      <el-table-column prop="iaeLineresource.handleperson" label="受理人" width="80">
      </el-table-column>
      <el-table-column prop="confirmationpersonname" label="返货确认人" width="80">
      </el-table-column>

      <el-table-column label="操作" width="260">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="handlereturnCode(scope.row)">生成返货单</el-button>
          <el-button size="mini" type="success" @click="handleDetail(scope.row)">详细</el-button>
          <el-button size="mini" type="danger" @click="handlezf(scope.row)">作废</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pages"
      :page-sizes="[1,3,5,8]" :page-size="rows" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>

      <!-- 详情-->
      <el-dialog :title="返货申请详情" :visible.sync="dialogFormVisibledetail">
        <h3 style="text-align: left;">返货申请详情</h3>
         <hr />
        <el-form :model="Returnapplication" ref="Returnapplication" :rules="rules">
          申请单号:<el-input v-model="Returnapplication.applicationno" placeholder="请输入内容" readonly="true" style="width: 150px;"></el-input>
          工作单号:<el-input v-model="Returnapplication.worksheetno" placeholder="请输入内容" readonly="true" style="width: 150px;"></el-input>
          返货类型:<el-input v-model="Returnapplication.returntype" placeholder="请输入内容" readonly="true" style="width: 140px;"></el-input><br />
          申请备注:<el-input v-model="Returnapplication.apremark" placeholder="请输入内容" readonly="true" style="width: 570px;"></el-input><br />
          破损丢失件数:<el-input v-model="Returnapplication.aploss" placeholder="请输入内容" readonly="true" style="width: 135px;"></el-input>
          进港时间:<el-input v-model="Returnapplication.entrytimes" placeholder="请输入内容" readonly="true" style="width: 135px;"></el-input>
           接收单位:<el-input v-model="Returnapplication.receivegunit" placeholder="请输入内容" readonly="true" style="width: 145px;"></el-input><br />
           作废标志:<el-input v-model="Returnapplication.invalidatesign" placeholder="请输入内容" readonly="true" style="width: 145px;"></el-input>
           返货单位:<el-input v-model="Returnapplication.returnunit" placeholder="请输入内容" readonly="true" style="width: 145px;"></el-input>
           录入时间:<el-input v-model="Returnapplication.recordingtimes" placeholder="请输入内容" readonly="true" style="width: 145px;"></el-input><br />
          录入单位:<el-input v-model="Returnapplication.entryunit" placeholder="请输入内容" readonly="true" style="width: 150px;"></el-input>
          录入人:<el-input v-model="Returnapplication.personname" placeholder="请输入内容" readonly="true" style="width: 150px;"></el-input>
          确认时间:<el-input v-model="Returnapplication.confirmationtimes" placeholder="请输入内容" readonly="true" style="width: 155px;"></el-input><br />
          确认单位:<el-input v-model="Returnapplication.confirmationunit" placeholder="请输入内容" readonly="true" style="width: 150px;"></el-input>
          确认人:<el-input v-model="Returnapplication.confirmationpersonname" placeholder="请输入内容" readonly="true" style="width: 140px;"></el-input>
          返货处理状态:<el-input v-model="Returnapplication.treatmentstate" placeholder="请输入内容" readonly="true" style="width: 140px;"></el-input><br />
          返货执行状态:<el-input v-model="Returnapplication.apreturnstatus" placeholder="请输入内容" readonly="true" style="width: 120px;"></el-input>
          系统自动确认标志:<el-input v-model="Returnapplication.identificationsign" placeholder="请输入内容" readonly="true" style="width: 120px;"></el-input>
          拒绝类型:<el-input v-model="Returnapplication.denialtype" placeholder="请输入内容" readonly="true" style="width: 120px;"></el-input><br />
           处理意见:<el-input v-model="Returnapplication.handlingopinions" placeholder="请输入内容" readonly="true" style="width: 560px;"></el-input>
        </el-form>
      </el-dialog>
      <!-- 生成返货单-->
      <el-dialog :title="生成返货单" :visible.sync="dialogFormVisibledetai2">
        <h3 style="text-align: left;">生成返货单</h3>
         <hr />
        <el-form :model="BecomeReturncode" ref="BecomeReturncode" :rules="rules">
          工作单号:<el-input v-model="BecomeReturncode.worksheetno" placeholder="请输入内容" readonly="true" style="width: 150px;"></el-input>
          实际件数:<el-input v-model="BecomeReturncode.actualcount" placeholder="请输入内容" readonly="true" style="width: 150px;"></el-input>
          品名:<el-input v-model="BecomeReturncode.warename" placeholder="请输入内容" readonly="true" style="width: 150px;"></el-input><br />
           实际体积:<el-input v-model="BecomeReturncode.actualvolume" placeholder="请输入内容" readonly="true" style="width: 150px;"></el-input>
           到达地:<el-input v-model="BecomeReturncode.destination" placeholder="请输入内容" readonly="true" style="width: 150px;"></el-input>
           配置要求:<el-input v-model="BecomeReturncode.ask" placeholder="请输入内容" readonly="true" style="width: 150px;"></el-input><br />
          送达时间:<el-input v-model="BecomeReturncode.timelimit" placeholder="请输入内容" readonly="true" style="width: 150px;"></el-input>
          委托人:<el-input v-model="BecomeReturncode.confirmationpersonname" placeholder="请输入内容" readonly="true" style="width: 150px;"></el-input>
          发货单位:<el-input v-model="BecomeReturncode.entercompany" placeholder="请输入内容" readonly="true" style="width: 150px;"></el-input><br />
          发货地址:<el-input v-model="BecomeReturncode.destination" placeholder="请输入内容" readonly="true" style="width: 135px;"></el-input>
          发货单位编号:<el-input v-model="BecomeReturncode.ids" placeholder="请输入内容" readonly="true" style="width: 130px;"></el-input>
          收货人:<el-input v-model="BecomeReturncode.takecargoperson" placeholder="请输入内容" readonly="true" style="width: 150px;"></el-input><br />
          收货地址:<el-input v-model="BecomeReturncode.tackcargoaddress" placeholder="请输入内容" readonly="true" style="width: 570px;"></el-input>
           重要提示:<el-input v-model="BecomeReturncode.importanthints" placeholder="请输入内容" readonly="true" style="width: 570px;"></el-input>
           到付款:<el-input v-model="BecomeReturncode.payment" placeholder="请输入内容" readonly="true" style="width: 580px;"></el-input><br />
           特殊保障:<el-input v-model="BecomeReturncode.specialensure" placeholder="请输入内容" readonly="true" style="width: 570px;"></el-input>
        </el-form>
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
        worksheetno: '',
        recordingtime:'',
        dialogFormVisible: false,
        dialogFormVisibledetail:false,
        dialogFormVisibledetai2:false,
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
        Returnapplication:{
          applicationno:null,
          worksheetno:null,
          returntype:null,
          apremark:null,
          aploss:null,
          entrytimes:null,
          receivegunit:null,
          invalidatesign:null,
          returnunit:null,
          recordingtimes:null,
          entryunit:null,
          personname:null,
          confirmationtimes:null,
          confirmationunit:null,
          confirmationpersonname:null,
          treatmentstate:null,
          apreturnstatus:null,
          identificationsign:null,
          denialtype:null,
          handlingopinions:null
        },
        BecomeReturncode:{
         worksheetno:null,
         actualcount:null,
         warename:null,
         actualvolume:null,
         destination:null,
         ask:null,
         timelimit:null,
         confirmationpersonname:null,
         entercompany:null,
         destination:null,
         ids:null,
         takecargoperson:null,
         tackcargoaddress:null,
         importanthints:null,
         payment:null,
         specialensure:null,
        }
      }
    },
    methods: {
      onSubmit: function() {
      let fy = {
        pages: this.pages,
        rows: this.rows,
        worksheetno:this.worksheetno
      }
      var str = qs.stringify(fy);
      let url = "http://localhost/wuliuxm/selectRetReturnlistScfhdHlp"
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
        worksheetno:this.worksheetno
      }
      var str = qs.stringify(fy);
      let url = "http://localhost/wuliuxm/selectRetReturnlistScfhdHlp"
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
       worksheetno:this.worksheetno
     }
     var str = qs.stringify(fy);
     let url = "http://localhost/wuliuxm/selectRetReturnlistScfhdHlp"
     axios.post(url, str).then(response => {
       this.result = response.data.rows;
       this.total = response.data.total;
     }).catch(error => {
       console.log('erro')
     });
    },
    //详情
    handleDetail:function(row){

this.dialogFormVisibledetail=true;
        this.Returnapplication.applicationno=row.applicationno;
        this.Returnapplication.worksheetno=row.worksheetno;
        if(row.returntype=1){
          this.Returnapplication.returntype='没有原因'
        }
        if(row.returntype=2){
          this.Returnapplication.returntype='不想要'
        }
        if(row.returntype=3){
          this.Returnapplication.returntype='错拍'
        }
        if(row.returntype=4){
          this.Returnapplication.returntype='破损'
        }

        this.Returnapplication.apremark=row.apremark;
        this.Returnapplication.aploss=row.aploss;
        this.Returnapplication.entrytimes=row.entrytimes;
        this.Returnapplication.receivegunit=row.syUnits.name;
        //this.Returnapplication.invalidatesign=row.invalidatesign;
        if(row.invalidatesign==1){
          this.Returnapplication.invalidatesign='否';
        }else{
          this.Returnapplication.invalidatesign='是';
        }

        this.Returnapplication.returnunit=row.syUnits.name;
        this.Returnapplication.recordingtimes=row.recordingtimes;
        this.Returnapplication.entryunit=row.syUnits.name;
        this.Returnapplication.personname=row.personname;
        this.Returnapplication.confirmationtimes=row.confirmationtimes;
        this.Returnapplication.confirmationunit=row.syUnits.name;
        this.Returnapplication.confirmationpersonname=row.confirmationpersonname;
        this.Returnapplication.treatmentstate=row.treatmentstate;
        if(row.treatmentstate==1){
          this.Returnapplication.treatmentstate='未确认';
        }else if(row.apreturnstatus==2){
          this.Returnapplication.treatmentstate='同意返货';
        }else if(row.apreturnstatus==3){
          this.Returnapplication.treatmentstate='拒绝';
        }else if(row.apreturnstatus==4){
          this.Returnapplication.treatmentstate='同意转发';
        }
        if(row.apreturnstatus==1){
          this.Returnapplication.apreturnstatus='无';
        }else if(row.apreturnstatus==2){
          this.Returnapplication.apreturnstatus='已转发';
        }else if(row.apreturnstatus==3){
          this.Returnapplication.apreturnstatus='已返货';
        }

        if(row.identificationsign==1){
          this.Returnapplication.identificationsign='否';
        }
        if(row.identificationsign==2){
          this.Returnapplication.identificationsign='是';
        }

        this.Returnapplication.denialtype=row.denialtype;
        this.Returnapplication.handlingopinions=row.handlingopinions;

    },
    //生成返货单
    handlereturnCode:function(row){
      this.dialogFormVisibledetai2=true;
      this.BecomeReturncode.worksheetno=row.worksheetno;
       this.BecomeReturncode.actualcount=row.iaeLineresource.actualcount;
        this.BecomeReturncode.warename=row.iaeLineresource.warename;
         this.BecomeReturncode.actualvolume=row.iaeLineresource.actualvolume;
          this.BecomeReturncode.destination=row.iaeLineresource.destination;
           this.BecomeReturncode.ask=row.iaeLineresource.ask;
            this.BecomeReturncode.timelimit=row.iaeLineresource.timelimit;
             this.BecomeReturncode.confirmationpersonname=row.confirmationpersonname;
              this.BecomeReturncode.entercompany=row.iaeLineresource.entercompany;
               this.BecomeReturncode.destination=row.iaeLineresource.destination;
                this.BecomeReturncode.ids=row.syUnits.id;
                 this.BecomeReturncode.takecargoperson=row.iaeLineresource.takecargoperson;
                  this.BecomeReturncode.tackcargoaddress=row.iaeLineresource.tackcargoaddress;
                   this.BecomeReturncode.importanthints=row.iaeLineresource.importanthints;
                    this.BecomeReturncode.payment=row.iaeLineresource.payment;
                     this.BecomeReturncode.specialensure=row.iaeLineresource.specialensure;


    },
    //作废
    handlezf:function(row){

    }
    },
    //钩子函数
        created: function() {

         let fy = {
           pages: this.pages,
           rows: this.rows,
           worksheetno:this.worksheetno
         }
         var str = qs.stringify(fy);
         let url = "http://localhost/wuliuxm/selectRetReturnlistScfhdHlp"
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
