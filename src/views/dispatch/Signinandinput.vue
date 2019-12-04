<template>
  <div class="ktzd">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top: 20px;">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>调度</el-breadcrumb-item>
      <el-breadcrumb-item>签收录入</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form  :inline="true" class="demo-form-inline">
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
        <el-select v-model="signtypes" placeholder="请选择" style="width: 300px;">
          <el-option v-for="item in options" :key="item.id" :label="item.value" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-show="ok" label="派送员工号">
        <el-input v-model="courierint" placeholder="请输入派送人工号" style="width: 300px;"></el-input>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="result" border style="width: 100%">

      <el-table-column type="selection" width="50">
      </el-table-column>
      <el-table-column prop="id" label="序号" width="50">
      </el-table-column>
      <el-table-column prop="workorderid" label="工作单ID" width="80">
      </el-table-column>
      <el-table-column prop="worksheetno" label="工作单号" width="80">
      </el-table-column>
      <el-table-column prop="worktype.typename" label="工作单类型" width="80">
      </el-table-column>
      <el-table-column prop="signtype" label="签收类型" width="80">
        <template slot-scope="scope1">
           <span v-if="scope1.row.signtype==1">否</span>
           <span v-if="scope1.row.signtype==2">是</span>
        </template>
      </el-table-column>
      <el-table-column prop="syUnits.name" label="录入单位" width="80">
      </el-table-column>
      <el-table-column prop="syEmp.empno" label="录入人编码" width="80">
      </el-table-column>
      <el-table-column prop="syEmp.empname" label="录入人姓名" width="80">
      </el-table-column>
      <el-table-column prop="recipient" label="签收人" width="80">
      </el-table-column>
      <el-table-column prop="couriername" label="派送员工姓名" width="80">
      </el-table-column>
      <el-table-column label="操作" width="220">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="handleAdd">新增</el-button>
          <el-button size="mini" type="success" @click="handleEdit(scope.row)">修改</el-button>
          <el-button size="mini" type="success" @click="handleDetail(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pages"
      :page-sizes="[1,3,5,8]" :page-size="rows" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>

 <!-- 详情-->
    <el-dialog :title="签收录入详情" :visible.sync="dialogFormVisibledetail">
      <h3 style="text-align: left;">签收录入详情</h3>
       <hr />
      <el-form :model="Qsdescrible" ref="Qsdescrible" :rules="rules">
        工作单ID:<el-input v-model="Qsdescrible.workorderid" placeholder="请输入内容" readonly="true" style="width: 140px;"></el-input>
        工作单号:<el-input v-model="Qsdescrible.worksheetno" placeholder="请输入内容" readonly="true" style="width: 140px;"></el-input>
        工作单类型:<el-input v-model="Qsdescrible.typename" placeholder="请输入内容" readonly="true" style="width: 140px;"></el-input><br />
        签收类型:<el-input v-model="Qsdescrible.rtypename" placeholder="请输入内容" readonly="true" style="width: 140px;"></el-input>
        录入单位:<el-input v-model="Qsdescrible.name" placeholder="请输入内容" readonly="true" style="width: 140px;"></el-input>
        录入人编码:<el-input v-model="Qsdescrible.empno" placeholder="请输入内容" readonly="true" style="width: 140px;"></el-input><br />
        录入人姓名:<el-input v-model="Qsdescrible.empname" placeholder="请输入内容" readonly="true" style="width: 140px;"></el-input>
         签收人:<el-input v-model="Qsdescrible.recipient" placeholder="请输入内容" readonly="true" style="width: 140px;"></el-input>
         派送员工号:<el-input v-model="Qsdescrible.courierint" placeholder="请输入内容" readonly="true" style="width: 130px;"></el-input><br/>
         派送员工姓名:<el-input v-model="Qsdescrible.couriername" placeholder="请输入内容" readonly="true" style="width: 130px;"></el-input>
         签收单位:<el-input v-model="Qsdescrible.names" placeholder="请输入内容" readonly="true" style="width: 130px;"></el-input>
         签收时间:<el-input v-model="Qsdescrible.signtimes" placeholder="请输入内容" readonly="true" style="width: 140px;"></el-input><br />
         录入人:<el-input v-model="Qsdescrible.empnames" placeholder="请输入内容" readonly="true" style="width: 150px;"></el-input>
         录入单位:<el-input v-model="Qsdescrible.name1" placeholder="请输入内容" readonly="true" style="width: 150px;"></el-input>
         录入时间:<el-input v-model="Qsdescrible.inputtimes" placeholder="请输入内容" readonly="true" style="width: 150px;"></el-input><br />
         作废标记:<el-input v-model="Qsdescrible.invalidatemark" placeholder="请输入内容" readonly="true" style="width: 560px;"></el-input><br />
         异常备注:<el-input v-model="Qsdescrible.abnormalmark" placeholder="请输入内容" readonly="true" style="width: 560px;"></el-input><br />
      </el-form>
    </el-dialog>

    <!-- 新增修改对话框-->
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="Signinand" ref="Signinand" :rules="rules">
        <input v-show="false"  v-model="Signinand.inputpersonid"></input>
        <input v-show="false"  v-model="Signinand.inputid"></input>
        <el-form-item label="编号" :label-width="formLabelWidth" v-show="false">
          <el-input v-model="Signinand.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="工作单号" prop="worksheetno" :label-width="formLabelWidth" >
          <el-select @change="selectget1" v-model="Signinand.worksheetno" placeholder="请选择" style=" :  500px"  >
            <el-option v-for="items in workorders" :key="items.worksheetno" :label="items.worksheetno" :value="items.worksheetno">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工作单ID" prop="workorderid" :label-width="formLabelWidth" v-show="false" >
          <el-input v-model="Signinand.workorderid" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="工作单类型" prop="workordertype" :label-width="formLabelWidth">
         <el-select v-model="Signinand.workordertype" placeholder="请选择" style="width: 500px">
           <el-option v-for="item in worktypes" :key="item.id" :label="item.typename" :value="item.id">
           </el-option>
         </el-select>
        </el-form-item>
        <el-form-item label="签收类型" prop="signtype" :label-width="formLabelWidth">
          <template>
            <el-radio v-model="Signinand.signtype" label="2">是</el-radio>
            <el-radio v-model="Signinand.signtype" label="1">否</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="签收人" prop="recipient" :label-width="formLabelWidth" >
        <el-select v-model="Signinand.recipient" placeholder="请选择"  style="width: 500px">
          <el-option v-for="items in inputperson" :key="items.empname" :label="items.empname" :value="items.empname">
          </el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="派送员工号"  prop="courierint" :label-width="formLabelWidth" >
          <el-select @change="selectGet" v-model="Signinand.courierint" placeholder="请选择" style=" :  500px"   >
            <el-option v-for="items in inputperson" :key="items.id" :label="items.id" :value="items.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="派送人" prop="couriername" :label-width="formLabelWidth" >
           <el-input v-model="Signinand.couriername" autocomplete="off"></el-input>
        </el-form-item>
           <el-form-item label="录入人" prop="inputpersonid" :label-width="formLabelWidth"  >
              <el-input v-model="Signinand.xx1" readonly="true"  autocomplete="off"  style="width: 500px">
              </el-input>
            </el-form-item>
            <!--  v-text="byempgetemp.syUnits.name"-->
            <el-form-item label="录入单位" prop="inputid" :label-width="formLabelWidth" >
               <el-input v-model="Signinand.xx2" readonly="true" autocomplete="off" style="width: 500px"></el-input>
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
        signtypes:1,
        courierint:1,
        dialogFormVisibledetail: false,
        total: 10,
        pages: 1,
        rows: 5,
        radio: 3,
        options: [
          {
            id:1,
            value:'否',
            ids:1,
            names:'否'
          },
          {
            id:2,
            value:'是',
            ids:1,
            names:'是'
          }
        ],
        ok: false,
        sortingcode: '',
       Qsdescrible:{
         workorderid:null,
         worksheetno:null,
         typename:null,
         rtypename:null,
         name:null,
         empno:null,
         empname:null,
         recipient:null,
         courierint:null,
         couriername:null,
         names:null,
         signtimes:null,
         empnames:null,
         name1:null,
         inputtimes:null,
         invalidatemark:null,
         abnormalmark:null,
       },
       title:'',
       dialogFormVisible:false,
       Signinand:{
           id:0,
           worksheetno:null,
           workorderid:null,
           workordertype:null,
           signtype:null,
           recipient:null,
           courierint:null,
           couriername:null,
           inputpersonid:null,
           inputid:null,
           xx1:null,
           xx2:null,
       },
       worktypes:[],
       signtype:'1',
       inputperson:[],
       inputunit:[],
       empno:'',
       byempgetemp:{},
       workorders:[],
       id:0,
       rules:{
         worksheetno:[
           {required: true, message: '请选择工作单号', trigger: 'change' }
         ],
          workordertype:[{
            required: true, message: '请选择工作单状态', trigger: 'change'
          }],
          recipient:[{
            required: true, message: '请选择签收人', trigger: 'change'
            }
          ],
          courierint:[{
             required: true, message: '请选择派送员工号', trigger: 'change'
          }],
          couriername:[{
            required: true, message: '请输入派送员工姓名', trigger: 'blur'
          }],
          worksheepnos:'',


       }
      }
    },
    methods: {
      onSubmit: function() {
        let fy = {
          pages: this.pages,
          rows: this.rows,
          recipient: this.recipient,
          worksheetno: this.worksheetno,
          signtype:this.signtypes,
          courierint:this.courierint,
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
          worksheetno: this.worksheetno,
          signtype:this.signtypes,
          courierint:this.courierint,
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
          worksheetno: this.worksheetno,
          signtype:this.signtypes,
          courierint:this.courierint,
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
      //详情
      handleDetail:function(row){
        this.dialogFormVisibledetail=true;
        this.Qsdescrible.workorderid=row.workorderid;
        this.Qsdescrible.worksheetno=row.worksheetno;
        this.Qsdescrible.typename=row.worktype.typename;

        if (row.signtype==1) {
            this.Qsdescrible.rtypename='否';

        }
        if (row.signtype==2) {
            this.Qsdescrible.rtypename='是';

        }
        this.Qsdescrible.name=row.syUnits.name;
        this.Qsdescrible.empno=row.syEmp.empno;
        this.Qsdescrible.empname=row.syEmp.empname;
        this.Qsdescrible.recipient =row.recipient;
        this.Qsdescrible.courierint=row.courierint;
        this.Qsdescrible.couriername=row.couriername;
        this.Qsdescrible.names=row.syUnits.name;
        this.Qsdescrible.signtimes=row.signtime;
        this.Qsdescrible.name1=row.syUnits.name;
        this.Qsdescrible.inputtimes=row.inputtime;

        if (row.invalidatemark==1) {
          this.Qsdescrible.invalidatemark='否';
        }
        if (row.invalidatemark==2) {
          this.Qsdescrible.invalidatemark='是';
        }
        this.Qsdescrible.abnormalmark=row.abnormalmark;
        this.Qsdescrible.empnames=row.syEmp.empname;
      },
      //新增
      handleAdd:function(row){
        this.title='增加';
        this.dialogFormVisible=true;
        //根据empno查询
        this.empno=this.$session.get("key");
         let pages = {
           empno:this.empno
         }
         let str1=qs.stringify(pages);
         let url5 = "http://localhost/wuliuxm/selectSyEmpByempnoHlp"
         axios.post(url5, str1).then(response => {
          this.byempgetemp = response.data;
          this.Signinand.inputpersonid=response.data.id;
          this.Signinand.inputid=response.data.syUnits.id;
          this.Signinand.xx1=response.data.empname;
           this.Signinand.xx2=response.data.syUnits.name;

         }).catch(error => {
           console.log('erro')
         });
          this.Signinand.worksheetno=null;
          this.Signinand.workordertype=null;
          this.Signinand.signtype='1';
          this.Signinand.recipient=null;
          this.Signinand.courierint=null;
          this.Signinand.couriername=null;

      },

      handleEdit:function(row){
        this.title='修改';
        //根据empno查询
         this.empno=this.$session.get("key");
         let pages = {
           empno:this.empno
         }
         let str1=qs.stringify(pages);
         let url5 = "http://localhost/wuliuxm/selectSyEmpByempnoHlp"
         axios.post(url5, str1).then(response => {
          this.byempgetemp = response.data;
          this.Signinand.inputpersonid=response.data.id;
          this.Signinand.inputid=response.data.syUnits.id;
          this.Signinand.xx1=response.data.empname;
           this.Signinand.xx2=response.data.syUnits.name;

         }).catch(error => {
           console.log('erro')
         });
        this.dialogFormVisible=true;
        this.Signinand.id=row.id;
        this.Signinand.worksheetno=row.worksheetno;
        this.Signinand.workorderid=row.workorderid;
        this.Signinand.workordertype=row.workordertype;
        this.Signinand.signtype=row.signtype+'';
        this.Signinand.recipient=row.recipient;
        this.Signinand.courierint=row.courierint;
        this.Signinand.couriername=row.couriername;
      },
      //新增与修改的提交方法
      addEditSubmit:function(){
        this.$refs['Signinand'].validate((valid) => {
          console.log(valid);
          if (valid) {
            console.log("........");
            if (this.title=='增加') {
                 let url = 'http://localhost/wuliuxm/addDisWorkordersignHlp';
                 let pages = {
                       id:this.Signinand.id,
                       worksheetno:this.Signinand.worksheetno,
                       workorderid:this.Signinand.workorderid,
                       workordertype:this.Signinand.workordertype,
                       signtype:this.Signinand.signtype,
                       recipient:this.Signinand.recipient,
                       courierint:this.Signinand.courierint,
                       couriername:this.Signinand.couriername,
                       inputpersonid:this.Signinand.inputpersonid,
                       inputid:this.Signinand.inputid,

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
           if(this.title=='修改'){
             let url = 'http://localhost/wuliuxm/updateDisWorkordersignHlp';
             let pages = {
                   id:this.Signinand.id,
                   worksheetno:this.Signinand.worksheetno,
                   workorderid:this.Signinand.workorderid,
                   workordertype:this.Signinand.workordertype,
                   signtype:this.Signinand.signtype,
                   recipient:this.Signinand.recipient,
                   courierint:this.Signinand.courierint,
                   couriername:this.Signinand.couriername,
                   inputpersonid:this.Signinand.inputpersonid,
                   inputid:this.Signinand.inputid,

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
    selectGet:function(ids){
      let obj={};
      obj = this.inputperson.find((items)=>{//这里的selectList就是上面遍历的数据源
                return items.id === ids;//筛选出匹配数据
            });
            this.id=ids;
            let param={
              id:this.id
            }
            var str=qs.stringify(param);
             let url = 'http://localhost/wuliuxm/selectSyEmpByIdHlp';
            axios.post(url, str).then(resp => {
                    this.Signinand.couriername=resp.data.empname;
                }).catch(error => {
                  console.log("失败");
                });


    },
     selectget1:function(ids){
        let obj1={};
        obj1 = this.workorders.find((items)=>{//这里的selectList就是上面遍历的数据源
               return items.id === ids;//筛选出匹配数据
           });
           this.worksheetnos=ids;
           let param1={
             worksheetnos:this.worksheetnos
           }
           var str9=qs.stringify(param1);
            let url = 'http://localhost/wuliuxm/selectAccWorksheetByworksheetnoHlp';
           axios.post(url, str9).then(resp => {
                  this.Signinand.workorderid=resp.data.id;

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
        recipient: this.recipient,
        worksheetno: this.worksheetno,
        signtype:this.signtypes,
        courierint:this.courierint,

      }
      var str = qs.stringify(fy);
      let url = "http://localhost/wuliuxm/selectDisWorkordersignHlp"
      axios.post(url, str).then(response => {
        this.result = response.data.rows;
        this.total = response.data.total;
      }).catch(error => {
        console.log('erro')
      });


      //查询工作单类型

      let url1 = "http://localhost/wuliuxm/selectWorktypeAllHlp"
      axios.post(url1, null).then(response => {
       this.worktypes = response.data;
      }).catch(error => {
        console.log('erro')
      });



 //查询所有员工
      let url2 = "http://localhost/wuliuxm/selectSyEmpAllHlp"
      axios.post(url2, null).then(response => {
       this.inputperson = response.data;
      }).catch(error => {
        console.log('erro')
      });

      //查询所有单位
      let url3 = "http://localhost/wuliuxm/selectSyUnitsHlp"
      axios.post(url3, null).then(response => {
       this.inputunit = response.data;
      }).catch(error => {
        console.log('erro')
      });

      /* let url5 = "http://localhost/wuliuxm/selectAllAccWorkorderHlp"
      axios.post(url5, null).then(response => {
       this.workorders = response.data;
      }).catch(error => {
        console.log('erro')
      }); */
      //查询工作单号结果集
      let url5 = "http://localhost/wuliuxm/selectAccWorksheetAndDisWorkordersignHlp"
      axios.post(url5, null).then(response => {
        this.workorders = response.data;
      }).catch(error => {
        console.log('erro')
      });


    }
  }
</script>

<style>
</style>
