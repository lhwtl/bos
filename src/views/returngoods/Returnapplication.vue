<template>
  <div class="ktzd">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top: 20px;">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>调度</el-breadcrumb-item>
      <el-breadcrumb-item>返货申请</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="工作单号">
        <el-input v-model="worksheetno" placeholder="请输入工作单号" style="width: 150px;"></el-input>
      </el-form-item>
      <el-form-item  label="返货原因">
        <el-select v-model="returntypes"  placeholder="请选择" style="width: 150px;">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
       <!-- <el-button @click="moreGet">更多</el-button> -->
      </el-form-item>
     <!-- <br>
     <el-form-item v-show="ok"  label="工作单类型">
       <el-select  placeholder="请选择" style="width: 150px;">
         <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
         </el-option>
       </el-select>
     </el-form-item>
      <el-form-item v-show="ok"  label="执行状态">
        <el-select  placeholder="请选择" style="width:150px;">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-show="ok"  label="申请单状态">
        <el-select placeholder="请选择" style="width: 150px;">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-show="ok"  label="进港时间">
        <el-select  placeholder="请选择" style="width: 150px;">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item><br />
      <el-form-item  v-show="ok" label="作废标志">
        <el-select  placeholder="请选择" style="width: 150px;">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item  v-show="ok" label="录入时间">
       <el-input v-model="ss" placeholder="请输入录入时间" style="width: 150px;"></el-input>
      </el-form-item>
      <el-form-item v-show="ok" label="录入单位">
       <el-input v-model="ss" placeholder="请输入录入单位" style="width: 150px;"></el-input>
      </el-form-item>
      <el-form-item v-show="ok" label="确认时间">
       <el-input v-model="ss" placeholder="请输入确认时间" style="width: 150px;"></el-input>
      </el-form-item><br>
     <el-form-item v-show="ok" label="确认单位">
      <el-input v-model="ss" placeholder="请输入确认单位" style="width: 150px;"></el-input>
     </el-form-item>
      <el-form-item v-show="ok" label="确认人">
       <el-input v-model="ss" placeholder="请输入确认人" style="width: 150px;"></el-input>
      </el-form-item> -->
    </el-form>
   <!-- <el-row style="text-align: left;;">
      <el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
      <el-button type="primary">修改</el-button>
      <el-button type="primary">作废</el-button>
      <el-button type="primary">详情</el-button>
    </el-row> -->
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

      <el-table-column type="selection" width="50">
      </el-table-column>
      <el-table-column prop="id" label="序号" width="50">
      </el-table-column>
      <el-table-column prop="applicationno" label="申请单号" width="80">
      </el-table-column>
      <el-table-column prop="disWorkordersign.worksheetno" label="工作单号" width="80">
      </el-table-column>
      <el-table-column  prop="returntype" label="返货类型" width="80">
     <template slot-scope="scope2">
         <span v-if="scope2.row.returntype==1">没有原因</span>
         <span v-if="scope2.row.returntype==2">不想要</span>
         <span v-if="scope2.row.returntype==3">错拍</span>
         <span v-if="scope2.row.returntype==4">破损</span>
     </template>
      </el-table-column>
      <el-table-column prop="aploss" label="破损丢失件数" width="80">
      </el-table-column>
      <el-table-column prop="entrytimes" label="进港时间" width="100">
      </el-table-column>
      <el-table-column prop="syUnits.name" label="接收单位" width="80">
      </el-table-column>
      <el-table-column  prop="invalidatesign" label="作废标志" width="80">
       <template slot-scope="scope1">
          <span v-if="scope1.row.invalidatesign==1">否</span>
          <span v-if="scope1.row.invalidatesign==2">是</span>
       </template>
      </el-table-column>
      <el-table-column prop="syUnits.name" label="返货单位" width="80">
      </el-table-column>
      <el-table-column prop="syUnits.name" label="录入单位" width="80">
      </el-table-column>
      <el-table-column prop="personname" label="录入人" width="80">
      </el-table-column>

      <el-table-column label="操作" width="170">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          <el-button size="mini" type="success" @click="handleDetail(scope.row)">详情</el-button>
          <el-button size="mini" type="danger" @click="handlezf(scope.row)">作废</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pages"
      :page-sizes="[1,3,5,8]" :page-size="rows" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>

    <!-- 修改弹出框-->
   <!-- <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="RoleForm" ref="RoleForm" :rules="rules">
        <el-form-item label="编号" :label-width="formLabelWidth" v-show="false">
          <el-input v-model="RoleForm.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色名称" prop="rolename" :label-width="formLabelWidth" >
          <el-input v-model="RoleForm.rolename" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="是否可用" prop="disabled" :label-width="formLabelWidth">
          <el-select v-model="RoleForm.disabled" placeholder="--请选择状态--" style="width: 100%;">
            <el-option value="是" label="是"></el-option>
            <el-option value="否" label="否"></el-option>
          </el-select>
        </el-form-item>
        </el-table-column>

        <el-form-item label="描述" prop="roledesc" :label-width="formLabelWidth" >
          <el-input v-model="RoleForm.roledesc" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="doSubmit">确 定</el-button>
      </div>
    </el-dialog> -->
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
        dialogFormVisible: false,
        dialogFormVisibledetail:false,
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
       // ok: false,
        sortingcode: '',
        returntypes:'',
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
        id:''

      }
    },
    methods: {
      onSubmit: function() {
      let fy = {
        pages: this.pages,
        rows: this.rows,
        worksheetno:this.worksheetno,
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
    /*  moreGet: function() {
        this.ok = !this.ok;
      }, */
      handleCurrentChange: function(pages) {
        this.pages = pages;
       let fy = {
         pages: this.pages,
         rows: this.rows,
         worksheetno:this.worksheetno
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
    /* 删除 */
    handleDelete: function(row) {
     this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
       confirmButtonText: '确定',
       cancelButtonText: '取消',
       type: 'warning'
     }).then(() => {
       let url = 'http://localhost/wuliuxm/deleteRetReturnlistByIdHlp';
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
},
/*编辑修改 */
      handleEdit: function(row) {
       // alert("修改");
        this.title="角色编辑";
        this.RoleForm.id=row.id;
        this.RoleForm.rolename=row.rolename;
        this.RoleForm.roledesc=row.roledesc;
        this.RoleForm.disabled="否";
        if(row.disabled=1){
           this.RoleForm.disabled="是";
        }

        this.dialogFormVisible = true;

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
      //作废
     handlezf:function(row){

     }

    },
    //钩子函数
        created: function() {

         let fy = {
           pages: this.pages,
           rows: this.rows,
           worksheetno:this.worksheetno,
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
