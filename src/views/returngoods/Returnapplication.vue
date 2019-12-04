<template>
  <div class="ktzd">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top: 20px;">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>返货</el-breadcrumb-item>
      <el-breadcrumb-item>返货申请</el-breadcrumb-item>
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

      <el-table-column type="selection" width="50">
      </el-table-column>
      <el-table-column prop="id" label="序号" width="50">
      </el-table-column>
      <el-table-column prop="applicationno" label="申请单号" width="80">
      </el-table-column>
      <el-table-column prop="worksheetno" label="工作单号" width="80">
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
      <el-table-column prop="entrytime" label="进港时间" width="80">
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

      <el-table-column label="操作" width="380">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="handleAdd(scope.row)">新增</el-button>
          <el-button size="mini" type="success" @click="handleEdit(scope.row)">修改</el-button>
          <el-button size="mini" type="success" @click="handleDetail(scope.row)">详情</el-button>
           <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
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


    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="CancelSigninand" ref="Signinand" :rules="rules">
        <el-form-item label="编号" prop="id" :label-width="formLabelWidth" v-show="false">
          <el-input v-model="CancelSigninand.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="工作单号" prop="worksheetno" :label-width="formLabelWidth">
          <el-select @change="selectget1" v-model="CancelSigninand.worksheetno" placeholder="请选择" style=" width: 500px">
            <el-option v-for="items in workorders" :key="items.worksheetno" :label="items.worksheetno" :value="items.worksheetno">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="返货类型" prop="returntype" :label-width="formLabelWidth">
          <el-select v-model="CancelSigninand.returntype" placeholder="请选择" style="width: 500px">
            <el-option v-for="item in returntype" :key="item.id" :label="item.typename" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请备注" prop="apremark" :label-width="formLabelWidth">
          <el-input v-model="CancelSigninand.apremark" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="破损丢失件数" prop="aploss" :label-width="formLabelWidth">
          <el-input v-model="CancelSigninand.aploss" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="进港时间" prop="entrytime" :label-width="formLabelWidth">
            <el-date-picker v-model="CancelSigninand.entrytime" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="接收单位" prop="receivegunit" :label-width="formLabelWidth">
          <el-select @change="selectGet" v-model="CancelSigninand.receivegunit" placeholder="请选择" style="width: 500px">
            <el-option v-for="item in worktypes" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作废标志" prop="invalidatesign" :label-width="formLabelWidth">
          <template>
            <el-radio v-model="CancelSigninand.invalidatesign" label="1">否</el-radio>
            <el-radio v-model="CancelSigninand.invalidatesign" label="2">是</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="返货单位" prop="returnunit" :label-width="formLabelWidth">
          <el-select @change="selectGet" v-model="CancelSigninand.returnunit" placeholder="请选择" style="width: 500px">
            <el-option v-for="item in worktypes" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="录入时间" prop="recordingtime" :label-width="formLabelWidth">
            <el-date-picker v-model="CancelSigninand.recordingtime" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="录入人" prop="personname"  :label-width="formLabelWidth" >
          <el-input v-model="CancelSigninand.personname" readonly="true" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="录入单位" prop="entryunit"  :label-width="formLabelWidth" v-show="false" >
          <el-input v-model="CancelSigninand.entryunit"  readonly="true" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认单位" prop="confirmationunit" :label-width="formLabelWidth">
          <el-select @change="getSelect" v-model="CancelSigninand.confirmationunit" placeholder="请选择" style="width: 500px">
            <el-option v-for="item in worktypes" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="确认人" prop="inputpersonid" :label-width="formLabelWidth">
          <el-select v-model="CancelSigninand.confirmationpersonname" placeholder="请选择" style="width: 500px">
            <el-option v-for="items in inputperson" :key="items.empname" :label="items.empname" :value="items.empname">
            </el-option>
          </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="确认时间" prop="confirmationtime" :label-width="formLabelWidth">
            <el-date-picker  v-model="CancelSigninand.confirmationtime" type="datetime" placeholder="选择日期时间">
            </el-date-picker>
        </el-form-item>

        <el-form-item label="返货处理状态" prop="treatmentstate" :label-width="formLabelWidth">
          <el-select v-model="CancelSigninand.treatmentstate" placeholder="请选择" style="width: 500px">
            <el-option v-for="item in returnstate" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="返货执行状态" prop="apreturnstatus" :label-width="formLabelWidth">
          <el-select v-model="CancelSigninand.apreturnstatus" placeholder="请选择" style="width: 500px">
            <el-option v-for="item in apreturntype" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="系统自动确认标志" prop="identificationsign" :label-width="formLabelWidth">
          <template>
            <el-radio v-model="CancelSigninand.identificationsign" label="1">未确认</el-radio>
            <el-radio v-model="CancelSigninand.identificationsign" label="2">已确认</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="拒绝类型" prop="denialtype" :label-width="formLabelWidth" v-show="false">
          <el-input v-model="CancelSigninand.denialtype" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="处理意见" prop="handlingopinions" :label-width="formLabelWidth" v-show="false">
          <el-input v-model="CancelSigninand.handlingopinions" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addEditSubmit">确 定</el-button>
      </div>
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
        applicationno:'',
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
          entryunit:0,
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
        id:'',
        returntype: [{
            id: 1,
            typename: '没有原因'

          },
          {
            id: 2,
            typename: '不想要'

          },
          {
            id: 3,
            typename: '错拍'

          },
          {
            id: 4,
            typename: '破损'

          }
        ],
        workorders:[],
        worktypes:[],
        returnstate:[
          {
              id:1,
              name:'未确认'

            },
          {
            id:2,
            name:'同意返货'

          },
          {
            id:3,
            name:'拒绝'

          },
          {
            id:4,
            name:'同意转发'

          }

        ],
        apreturntype:[{
          id:1,
          name:'无'
        },
        {
          id:2,
          name:'已转发'
        },
        {
          id:3,
          name:'已返货'
        }
        ],
        CancelSigninand: {
          id: 0,
          worksheetno: null,
          returntype: null,
          apremark:null,
          aploss:0,
          entrytime:null,
          receivegunit:null,
          invalidatesign:null,
          returnunit:null,
          recordingtime:null,
          confirmationunit: null,
          confirmationpersonname: null,
          confirmationtime: null,
          identificationsign: '1',
          personname:null,
          entryunit:null,
          treatmentstate:null,
          apreturnstatus:null,
          handlingopinions:null,
          denialtype:null

        },
        rules:{
          worksheetno:[
            { required: true, message: '请选择工作单号', trigger: 'change'}
          ],
          returntype:[
            {required: true, message: '请选择返货类型', trigger: 'change'}
          ],
          apremark:[
            {
               required: true, message: '请输入申请备注', trigger: 'blur'
            }
          ],
          aploss:[
            { required: true, message: '请输入申请备注和填数字',trigger: 'blur'}

          ],
          entrytime:[{
            required: true, message: '请选择进港时间', trigger: 'change'
          }],
          receivegunit:[{
             required: true, message: '请选择接收单位', trigger: 'change'
            }
          ],
          returnunit:[{
             required: true, message: '请选择返货单位', trigger: 'change'
          }],
          recordingtime:[{
             required: true, message: '请选择录入时间', trigger: 'change'
          }],
          confirmationunit:[{
             required: true, message: '请选择确认单位', trigger: 'change'
          }],
          confirmationpersonname:[{
            required: true, message: '请选择确认人', trigger: 'change'
          }],
          confirmationtime:[{
            required: true, message: '请选择确认时间', trigger: 'change'
            },
          ],
          treatmentstate:[{
            required: true, message: '请选择返货处理状态', trigger: 'change'
          }],
          apreturnstatus:[{
            required: true, message: '请选择返货执行状态', trigger: 'change'
          }]

        }

      }
    },
    methods: {
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
    /*  moreGet: function() {
        this.ok = !this.ok;
      }, */
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

//添加
        handleAdd:function(){
          this.title="增加";
          this.dialogFormVisible = true;
          this.CancelSigninand.invalidatesign='1';
          //根据empno查询
          this.empno=this.$session.get("key",this.empno);
           let pages = {
             empno:this.empno
           }
           let str1=qs.stringify(pages);
           let url5 = "http://localhost/wuliuxm/selectSyEmpByempnoHlp"
           axios.post(url5, str1).then(response => {
               this.CancelSigninand.entryunit=response.data.empunit;
               this.CancelSigninand.personname=response.data.empname;
           }).catch(error => {
             console.log('erro')
           });
        },
/*编辑修改 */
      handleEdit: function(row) {
        this.title="修改";
        this.dialogFormVisible = true;
        this.CancelSigninand.id=row.id;
         this.CancelSigninand.worksheetno=row.worksheetno;
          this.CancelSigninand.returntype=row.returntype;
          this.CancelSigninand.apremark=row.apremark;
           this.CancelSigninand.aploss=row.aploss;
            this.CancelSigninand.entrytime=row.entrytime;
             this.CancelSigninand.receivegunit=row.receivegunit;
              this.CancelSigninand.invalidatesign=row.invalidatesign+'';
               this.CancelSigninand.returnunit=row.returnunit;
                this.CancelSigninand.confirmationtime=row.confirmationtime;
                 this.CancelSigninand.recordingtime=row.recordingtime;
                  this.CancelSigninand.confirmationunit=row.confirmationunit;
                   this.CancelSigninand.confirmationpersonname=row.confirmationpersonname;
                    this.CancelSigninand.identificationsign=row.identificationsign+'';
                     this.CancelSigninand.personname=row.personname;
                      this.CancelSigninand.entryunit=row.entryunit;
                       this.CancelSigninand.treatmentstate=row.treatmentstate;
                        this.CancelSigninand.apreturnstatus=row.apreturnstatus;
                         this.CancelSigninand.handlingopinions=row.handlingopinions;
                          this.CancelSigninand.denialtype=row.denialtype;

      },

      addEditSubmit:function(){
        this.$refs['Signinand'].validate((valid) => {
          console.log(valid);
          if (valid) {
            if (this.title=='增加') {
                 let url = 'http://localhost/wuliuxm/addRetReturnlistsHlp';
                 let pages = {
                     id:this.CancelSigninand.id,
                     worksheetno: this.CancelSigninand.worksheetno,
                     returntype: this.CancelSigninand.returntype,
                     apremark: this.CancelSigninand.apremark,
                     aploss: this.CancelSigninand.aploss,
                     entrytime: this.CancelSigninand.entrytime,
                     receivegunit: this.CancelSigninand.receivegunit,
                     invalidatesign: this.CancelSigninand.invalidatesign,
                     returnunit: this.CancelSigninand.returnunit,
                     recordingtime: this.CancelSigninand.recordingtime,
                     confirmationunit: this.CancelSigninand.confirmationunit,
                     confirmationpersonname: this.CancelSigninand.confirmationpersonname,
                     confirmationtime: this.CancelSigninand.confirmationtime,
                     identificationsign: this.CancelSigninand.identificationsign,
                     personname:this.CancelSigninand.personname,
                     entryunit:this.CancelSigninand.entryunit,
                     treatmentstate: this.CancelSigninand.treatmentstate,
                     apreturnstatus: this.CancelSigninand.apreturnstatus,
                     handlingopinions: this.CancelSigninand.handlingopinions,
                     denialtype: this.CancelSigninand.denialtype
                     }
                     axios.post(url, qs.stringify(pages)).then(resp => {
                       console.log(resp)
                       this.dialogFormVisible = false; //隐藏
                       this.onSubmit();
                     }).catch(error => {
                       console.log("失败");
                     });
            }
           if(this.title=='修改'){
             let url = 'http://localhost/wuliuxm/updateRetReturnlistsHlp';
             let pages = {
                  id:this.CancelSigninand.id,
                  worksheetno: this.CancelSigninand.worksheetno,
                  returntype: this.CancelSigninand.returntype,
                  apremark: this.CancelSigninand.apremark,
                  aploss: this.CancelSigninand.aploss,
                  entrytime: this.CancelSigninand.entrytime,
                  receivegunit: this.CancelSigninand.receivegunit,
                  invalidatesign: this.CancelSigninand.invalidatesign,
                  returnunit: this.CancelSigninand.returnunit,
                  recordingtime: this.CancelSigninand.recordingtime,
                  confirmationunit: this.CancelSigninand.confirmationunit,
                  confirmationpersonname: this.CancelSigninand.confirmationpersonname,
                  confirmationtime: this.CancelSigninand.confirmationtime,
                  identificationsign: this.CancelSigninand.identificationsign,
                  personname:this.CancelSigninand.personname,
                  entryunit:this.CancelSigninand.entryunit,
                  treatmentstate: this.CancelSigninand.treatmentstate,
                  apreturnstatus: this.CancelSigninand.apreturnstatus,
                  handlingopinions: this.CancelSigninand.handlingopinions,
                  denialtype: this.CancelSigninand.denialtype

                 }
                 axios.post(url, qs.stringify(pages)).then(resp => {
                   console.log(resp)
                   this.dialogFormVisible = false; //隐藏
                   this.onSubmit();
                 }).catch(error => {
                   console.log("失败");
                 });
             }

               } else {
                 console.log('error submit!!提交失败');
                 return false;
               }
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
        this.Returnapplication.recordingtimes=row.recordingtime;
        this.Returnapplication.entryunit=row.syUnits.name;
        this.Returnapplication.personname=row.personname;
        this.Returnapplication.confirmationtimes=row.confirmationtime;
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

     },
     getSelect: function(ids) {
       let obj = {};
       obj = this.worktypes.find((items) => { //这里的selectList就是上面遍历的数据源
         return items.id === ids; //筛选出匹配数据
       });
       this.id = ids;
       let param = {
         id: this.id
       }
       var str = qs.stringify(param);
       let url = 'http://localhost/wuliuxm/selectSyUnitsByIdHlp';
       axios.post(url, str).then(resp => {
         let sets = []
         if (resp.data != null || resp.data != undefined) {
           console.log(resp)
           for (let i = 0; i < resp.data.length; i++) {
             sets = resp.data[i].syEmps;
           }
           this.inputperson = sets;

         }

       }).catch(error => {
         console.log("失败");
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


         //查询所有单位同时对应得人
         let url2 = "http://localhost/wuliuxm/selectSyUnitsHlp"
         axios.post(url2, null).then(response => {
           this.worktypes = response.data;
         }).catch(error => {
           console.log('erro')
         });
         //查询工作单号结果集
         let url4 = "http://localhost/wuliuxm/selectAccWorksheetAndRetReturnlistByJobHlp"
         axios.post(url4, null).then(response => {
           this.workorders = response.data;
         }).catch(error => {
           console.log('erro')
         });



    }
  }
</script>

<style>
</style>
