<template>
  <div class="ktzd">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top: 20px;">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>调度</el-breadcrumb-item>
      <el-breadcrumb-item>取消签收申请录入</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="工作单号">
        <el-input v-model="worksheetno" placeholder="请输入工作单号" style="width: 150px;"></el-input>
      </el-form-item>
      <el-form-item label="申请单号">
        <el-input v-model="applicationno" placeholder="请输入申请单号" style="width: 150px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <el-table :data="result" border style="width: 100%">

      <el-table-column type="selection" width="80">
      </el-table-column>
      <el-table-column prop="id" label="序号" width="80">
      </el-table-column>
      <el-table-column prop="worksheetno" label="工作单号" width="80">
      </el-table-column>
      <el-table-column prop="applicationno" label="申请单号" width="80">
      </el-table-column>
      <el-table-column prop="disWorkordersign.signtime" label="签收时间" width="80">
      </el-table-column>
      <el-table-column prop="syUnits.name" label="签收单位" width="80">
      </el-table-column>
      <el-table-column prop="confirmationpersonname" label="申请人" width="80">
      </el-table-column>
      <el-table-column prop="confirmationtime" label="申请时间" width="80">
      </el-table-column>
      <el-table-column prop="syUnits.name" label="申请单位" width="80">
      </el-table-column>
      <el-table-column prop="confirmationpersonname" label="确认人" width="80">
      </el-table-column>
      <el-table-column label="操作" width="290">
        <template slot-scope="scope">
           <el-button size="mini" type="success" @click="handleadd">新增</el-button>
          <el-button size="mini" type="success" @click="handleEdit(scope.row)">修改</el-button>
          <el-button size="mini" type="success" @click="handleDetail(scope.row)">详情</el-button>
          <el-button size="mini" type="danger" @click="handleZf(scope.row)">作废</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pages"
      :page-sizes="[1,3,5,8]" :page-size="rows" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>

    <!-- 详情-->
    <el-dialog :title="取消签收申请确认单详情" :visible.sync="dialogFormVisibledetail">
      <h3 style="text-align: left;">取消签收申请确认单详情</h3>
      <hr />
      <el-form :model="RemoveApplication" ref="RemoveApplication" :rules="rules">
        工作单号:<el-input v-model="RemoveApplication.worksheetno" placeholder="请输入内容" readonly="true" style="width: 140px;"></el-input>
        申请单号:<el-input v-model="RemoveApplication.applicationno" placeholder="请输入内容" readonly="true" style="width: 140px;"></el-input>
        签收单位:<el-input v-model="RemoveApplication.name" placeholder="请输入内容" readonly="true" style="width: 140px;"></el-input><br />
        申请人:<el-input v-model="RemoveApplication.confirmationpersonname" placeholder="请输入内容" readonly="true" style="width: 140px;"></el-input>
        申请时间:<el-input v-model="RemoveApplication.confirmationtime" placeholder="请输入内容" readonly="true" style="width: 150px;"></el-input>
        申请单位:<el-input v-model="RemoveApplication.names" placeholder="请输入内容" readonly="true" style="width: 140px;"></el-input><br />
        确认人:<el-input v-model="RemoveApplication.confirmationpersonnames" placeholder="请输入内容" readonly="true" style="width: 140px;"></el-input>
        确认时间:<el-input v-model="RemoveApplication.confirmationtimes" placeholder="请输入内容" readonly="true" style="width: 140px;"></el-input>
        确认状态:<el-input v-model="RemoveApplication.identificationsign" placeholder="请输入内容" readonly="true" style="width: 150px;"></el-input><br />

      </el-form>
    </el-dialog>
    <!-- 新增修改对话框-->
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="CancelSigninand" ref="Signinand" :rules="rules">
        <el-form-item label="编号" prop="id" :label-width="formLabelWidth" v-show="false">
          <el-input v-model="CancelSigninand.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="录入人" prop="personname" :label-width="formLabelWidth" v-show="false">
          <el-input v-model="CancelSigninand.personname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="录入单位" prop="entryunit" :label-width="formLabelWidth" v-show="false">
          <el-input v-model="CancelSigninand.entryunit" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="工作单号" prop="worksheetno" :label-width="formLabelWidth">
          <el-select @change="selectget1" v-model="CancelSigninand.worksheetno" placeholder="请选择" style=" width: 500px">
            <el-option v-for="items in workorders" :key="items.worksheetno" :label="items.worksheetno" :value="items.worksheetno">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请原因" prop="returntype" :label-width="formLabelWidth">
          <el-select v-model="CancelSigninand.returntype" placeholder="请选择" style="width: 500px">
            <el-option v-for="item in returntype" :key="item.id" :label="item.typename" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请单位" prop="confirmationunit" :label-width="formLabelWidth">
          <el-select @change="selectGet" v-model="CancelSigninand.confirmationunit" placeholder="请选择" style="width: 500px">
            <el-option v-for="item in worktypes" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请人" prop="confirmationpersonname" :label-width="formLabelWidth">
          <el-select v-model="CancelSigninand.confirmationpersonname" placeholder="请选择" style="width: 500px">
            <el-option v-for="items in inputperson" :key="items.empname" :label="items.empname" :value="items.empname">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请时间" prop="confirmationtime" :label-width="formLabelWidth">
          <el-date-picker  v-model="CancelSigninand.confirmationtime" type="datetime" placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="确认单位" prop="confirmationunit" :label-width="formLabelWidth">
          <el-select v-model="CancelSigninand.confirmationunit" placeholder="请选择" style="width: 500px">
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
        <el-form-item label="确认状态" prop="identificationsign" :label-width="formLabelWidth">
          <template>
            <el-radio v-model="CancelSigninand.identificationsign" label="1">未确认</el-radio>
            <el-radio v-model="CancelSigninand.identificationsign" label="2">已确认</el-radio>
          </template>
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
        recipient: '',
        worksheetno: '',
        applicationno:'',
        dialogFormVisibledetail: false,
        dialogFormVisible: false,
        total: 10,
        pages: 1,
        rows: 5,
        radio: 3,
        options: [],
        ok: false,
        RemoveApplication: {
          worksheetno: null,
          applicationno: null,
          name: null,
          confirmationpersonname: null,
          confirmationtime: null,
          names: null,
          confirmationpersonnames: null,
          confirmationtimes: null,
          identificationsign: null
        },
        CancelSigninand: {
          id: 0,
          worksheetno: null,
          returntype: null,
          confirmationunit: null,
          confirmationpersonname: null,
          confirmationtime: null,
          identificationsign: '1',
          personname:null,
          entryunit:null

        },
        rules:{
          worksheetno:[
            { required: true, message: '请选择工作单号', trigger: 'change'}
          ],
          returntype:[{
             required: true, message: '请选择申请原因', trigger: 'change'
          }],
          confirmationunit:[{
            required: true, message: '请选择申请单位或确认单位', trigger: 'change'
          }],
          confirmationpersonname:[{
            required: true, message: '请选择申请人或确认人', trigger: 'change'
          }],
          confirmationtime:[{
              required: true, message: '请选择申请时间或确认时间', trigger: 'change'
            }
          ]

        },
        workorders: [],
        worktypes: [],
        inputperson: [],
        id: 0,
        sets: [],
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

      }
    },
    methods: {
      onSubmit: function() {
        let fy = {
          pages: this.pages,
          rows: this.rows,
          worksheetno: this.worksheetno,
          applicationno:this.applicationno,

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
          worksheetno: this.worksheetno,
          applicationno:this.applicationno,

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
          worksheetno: this.worksheetno,
          applicationno:this.applicationno,

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
      //详情
      handleDetail: function(row) {
        this.dialogFormVisibledetail = true;
        this.RemoveApplication.worksheetno = row.disWorkordersign.worksheetno;
        this.RemoveApplication.applicationno = row.applicationno;

        this.RemoveApplication.name = row.syUnits.name;
        this.RemoveApplication.confirmationpersonname = row.confirmationpersonname;
        this.RemoveApplication.confirmationtime = row.confirmationtime;
        this.RemoveApplication.names = row.syUnits.name;
        this.RemoveApplication.confirmationpersonnames = row.confirmationpersonname;
        this.RemoveApplication.confirmationtimes = row.confirmationtime;

        if (row.identificationsign == 1) {
          this.RemoveApplication.identificationsign = '否';
        }
        if (row.identificationsign == 2) {
          this.RemoveApplication.identificationsign = '是';
        }
      },
      handleEdit:function(row) {
        this.title = "修改";
        this.dialogFormVisible = true;
        this.CancelSigninand.id=row.id;
        this.CancelSigninand.worksheetno=row.worksheetno;
        this.CancelSigninand.returntype=row.returntype;
        this.CancelSigninand.confirmationunit=row.confirmationunit;
        this.CancelSigninand.confirmationpersonname=row.confirmationpersonname;
        this.CancelSigninand.confirmationtime=row.confirmationtime;
        this.CancelSigninand.identificationsign=row.identificationsign+'';
        this.CancelSigninand.personname=row.personname;
        this.CancelSigninand.entryunit=row.entryunit;

      },
      handleadd: function() {
        this.title = "增加";
        this.dialogFormVisible = true;
        this.CancelSigninand.identificationsign='1';
        //根据empno查询
         this.empno=this.$session.get("key");
         let pages = {
           empno:this.empno
         }
         let str1=qs.stringify(pages);
         let url5 = "http://localhost/wuliuxm/selectSyEmpByempnoHlp"
         axios.post(url5, str1).then(response => {
          this.CancelSigninand.entryunit=response.data.syUnits.id;
            this.CancelSigninand.personname=response.data.empname;

         }).catch(error => {
           console.log('erro')
         });
      },
      //新增与修改的提交方法
        addEditSubmit:function(){
          this.$refs['Signinand'].validate((valid) => {
            console.log(valid);
            if (valid) {
              if (this.title=='增加') {
                   let url = 'http://localhost/wuliuxm/addRetReturnlistHlp';
                   let pages = {
                       id:this.CancelSigninand.id,
                       worksheetno: this.CancelSigninand.worksheetno,
                       returntype: this.CancelSigninand.returntype,
                       confirmationunit: this.CancelSigninand.confirmationunit,
                       confirmationpersonname: this.CancelSigninand.confirmationpersonname,
                       confirmationtime: this.CancelSigninand.confirmationtime,
                       identificationsign: this.CancelSigninand.identificationsign,
                       personname:this.CancelSigninand.personname,
                       entryunit:this.CancelSigninand.entryunit
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
               let url = 'http://localhost/wuliuxm/updateRetReturnlistHlp';
               let pages = {
                     id:this.CancelSigninand.id,
                     worksheetno: this.CancelSigninand.worksheetno,
                     returntype: this.CancelSigninand.returntype,
                     confirmationunit: this.CancelSigninand.confirmationunit,
                     confirmationpersonname: this.CancelSigninand.confirmationpersonname,
                     confirmationtime: this.CancelSigninand.confirmationtime,
                     identificationsign: this.CancelSigninand.identificationsign,
                     personname:this.CancelSigninand.personname,
                     entryunit:this.CancelSigninand.entryunit

                   }
                   console.log(url)
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

      selectGet: function(ids) {
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


      },
      handleZf:function(rows){
        this.id=rows.disWorkordersign.id;

        let fy = {
         id:this.id
        }
        var str = qs.stringify(fy);
        let url = "http://localhost/wuliuxm/updateDisWorkordersignZfHlp"
        axios.post(url, str).then(response => {
          this.onSubmit();
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
        worksheetno: this.worksheetno,
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

      //查询工作单号结果集
      let url1 = "http://localhost/wuliuxm/selectAccWorksheetAndRetReturnlistByJobHlp"
      axios.post(url1, null).then(response => {
        this.workorders = response.data;
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
