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


    <el-table :data="result" border style="width: 100%">
      <el-table-column type="selection" width="80">
      </el-table-column>
      <el-table-column prop="id" label="序号" width="80">
      </el-table-column>
      <el-table-column prop="accWorkorder.jobno" label="工单号" width="80">
      </el-table-column>
      <el-table-column prop="accWorkorder.shortmessageint" label="短信序号" width="80">
      </el-table-column>
      <el-table-column prop="businessnoticeno" label="业务通知单号" width="80">
      </el-table-column>
      <el-table-column prop="accWorkorder.workgenerationtime" label="工单生成时间" width="80">
      </el-table-column>
      <el-table-column prop="pickupaddress" label="收件地址" width="80">
      </el-table-column>
      <el-table-column prop="linkman" label="联系人" width="80">
      </el-table-column>
      <el-table-column prop="telphone" label="联系电话" width="80">
      </el-table-column>
      <el-table-column prop="accWorkorder.aftersinglenum" label="追单次数" width="80">
      </el-table-column>
      <el-table-column prop="syUnits.name" label="处理单位" width="80">
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
         <el-button type="success" @click="zdOrder(scope.row)">转单</el-button>
        </template>
      </el-table-column>

    </el-table>
<el-pagination  background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pages"
      :page-sizes="[1,3,5,8]" :page-size="rows" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>

    <!--转单的弹框 -->
       <el-dialog title="转单" :visible.sync="dialogFormVisible">
         <el-form >
           <el-form-item label="转入方式" :label-width="formLabelWidth">
           <el-radio-group v-model="radio" @change="getValue">
               <el-radio  :label="3">分拣编码</el-radio>
               <el-radio  :label="6">小件员编号</el-radio>
               <el-radio  :label="9">单位</el-radio>
             </el-radio-group>
           </el-form-item>
           <el-form-item label="转入目标" :label-width="formLabelWidth"  v-show="false">
           <el-input v-model="id" style="width: 300px;" placeholder="请输入转入目标"></el-input>
           </el-form-item>
           <el-form-item label="转入目标" :label-width="formLabelWidth"  v-show="ok1">
           <el-input v-model="sortingcode" style="width: 300px;" placeholder="请输入转入目标"></el-input>
           </el-form-item>
           <el-form-item label="转入目标" :label-width="formLabelWidth" v-show="ok2">
           <el-input v-model="smallmembernum" style="width: 300px;" placeholder="请输入转入目标" ></el-input>
           </el-form-item>
           <el-form-item label="转入目标" :label-width="formLabelWidth" v-show="ok3">
          <el-select v-model="pickupunit" placeholder="请选择" style="width: 500px">
            <el-option v-for="item in worktypes" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
           </el-form-item>
         </el-form>
         <div slot="footer" class="dialog-footer">
           <el-button @click="dialogFormVisible = false">取 消</el-button>
           <el-button type="primary" @click="yesSubmit">确 定</el-button>
         </div>
    </el-dialog>



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
        dialogFormVisible: false,
        total:10,
        pages:1,
        rows:5,
        radio:3,
        formLabelWidth:'',
        model:'',
        ok:false,
        ok1:true,
        ok2:false,
        ok3:false,
        id:0,
        sortingcode:null,
        smallmembernum:null,
        pickupunit:null,
        worktypes:[]

      }
    },
    methods: {
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
          this.result = response.data.rows;
          this.total=response.data.total;
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
               this.result = response.data.rows;
               this.total=response.data.total;
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
           this.result = response.data.rows;
           this.total=response.data.total;
         }).catch(error => {
           console.log('erro')
         });

      },
      zdOrder:function(row){
        if (this.telphone=='' || this.businessnoticeno=='') {
          this.dialogFormVisible=false;

        }else{
          this.dialogFormVisible=true;
        }

        this.id=row.accWorkorder.id;
        this.sortingcode=row.accWorkorder.sortingcode;
        this.smallmembernum=row.accWorkorder.smallmembernum;
        this.pickupunit=row.accWorkorder.pickupunit;
      },
      getValue:function(){
        if(this.radio==3){
           this.ok1=true;
           this.ok2=false;
           this.ok3=false;

        }
        if(this.radio==6){
          this.ok1=false;
          this.ok2=true;
          this.ok3=false;
        }
        if(this.radio==9){
           this.ok1=false;
           this.ok2=false;
           this.ok3=true;
        }
      },
       yesSubmit:function(){

         if(this.radio==3){
           let fy={
              id:this.id,
              sortingcode:this.sortingcode
            }
           var str= qs.stringify(fy);
           let url6 = "http://localhost/wuliuxm/updateSortingCodeByidHlp"
           axios.post(url6, str).then(response => {
             this.dialogFormVisible=false;
             this.onSubmit();
           }).catch(error => {
             console.log('erro')
           });

         }
         if(this.radio==6){
           let fy={
              id:this.id,
              smallmembernum:this.smallmembernum
            }
           var str= qs.stringify(fy);
           let url6 = "http://localhost/wuliuxm/updateSortingCodeByidsHlp"
           axios.post(url6, str).then(response => {
             this.dialogFormVisible=false;
             this.onSubmit();
           }).catch(error => {
             console.log('erro')
           });

         }
         if(this.radio==9){
           let fy={
              id:this.id,
              pickupunit:this.pickupunit
            }
           var str= qs.stringify(fy);
           let url6 = "http://localhost/wuliuxm/updateSortingCodeByidssHlp"
           axios.post(url6, str).then(response => {
             this.dialogFormVisible=false;
             this.onSubmit();
           }).catch(error => {
             console.log('erro')
           });

         }

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

      //查询所有单位同时对应得人
      let url2 = "http://localhost/wuliuxm/selectSyUnitsHlp"
      axios.post(url2, null).then(response => {
        this.worktypes = response.data;
      }).catch(error => {
        console.log('erro')
      });

    }
  }
</script>


<style>
</style>
