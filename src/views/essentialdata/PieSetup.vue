  <template>
     <div class="divClass">
       <!--面包屑-->
       <el-breadcrumb separator="/">
         <el-breadcrumb-item :to="{ path: '/Home' }">基础数据</el-breadcrumb-item>
         <el-breadcrumb-item><a>取派员设置</a></el-breadcrumb-item>
       </el-breadcrumb>
       <!--搜索框-->
       <el-form :inline="true" class="demo-form-inline" style="margin-top: 10px;">
             <el-form-item label="员工工号:">
               <el-input v-model="bhid" placeholder="请输入员工工号"></el-input>
             </el-form-item>
             <el-form-item label="员工名称:">
               <el-input v-model="bhname" placeholder="请输入员工名称"></el-input>
             </el-form-item>

             <el-form-item>
               <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
               <el-button @click="resetForm('ruleForm')">重置</el-button>
               <el-button @click="moreGet">更多</el-button>
             </el-form-item>
             <el-row style="text-align: left;;">
               <el-button type="primary" icon="el-icon-plus" @click="onadd">添加</el-button>
             </el-row>
           </el-form>
     <!--数据表格-->
      <el-table :data="result" style="width: 100%;" :border="true" max-height="550">
           <el-table-column prop="id" label="序号" min-width="30" align="center"></el-table-column>
           <el-table-column prop="empno" label="员工工号" min-width="50"></el-table-column>
           <el-table-column prop="empname" label="员工名称" min-width="50"></el-table-column>
           <el-table-column prop="mobileno"  label="手机号" min-width="50"></el-table-column>
           <el-table-column prop="pda" label="PDA标志" min-width="50">
             <template slot-scope="scope1">
                <span v-if="scope1.row.pda==0">有</span>
                <span v-if="scope1.row.pda==1">没有</span>
             </template>
           </el-table-column>
           <el-table-column prop="invalidatemark" label="作废标记" min-width="50">
             <template slot-scope="scope1">
                <span v-if="scope1.row.invalidatemark==0">否</span>
                <span v-if="scope1.row.invalidatemark==1">是</span>
             </template>
           </el-table-column>
           <el-table-column prop="type" label="类型" min-width="50">
             <template slot-scope="scope">
                <span v-if="scope.row.type==1">小件员</span>
                <span v-if="scope.row.type==2">驾驶员</span>
             </template>
           </el-table-column>
            
           <el-table-column prop="syUnits.name" label="所属单位" min-width="50"></el-table-column>
           <el-table-column prop="models" label="车型" min-width="50"></el-table-column>
           <el-table-column prop="plateint" label="车牌号" min-width="50"></el-table-column>
           <el-table-column prop="syUnits.syEmp.empname" label="操作人员" min-width="50"></el-table-column>
           <el-table-column prop="syUnits.operationtime" label="操作时间" min-width="70"></el-table-column>
           <el-table-column label="操作">
             <template slot-scope="scope">
               <el-button size="mini"  type="primary" @click="handleEdit(scope.row)">编辑</el-button>
               <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
             </template>
           </el-table-column>
         </el-table>

         <!-- 添加的弹出框-->
               <el-dialog :title="title" :visible.sync="dialogFormVisible">
                  <el-form :model="BasSubstituteForm" ref="BasSubstituteForm" :rules="rules">
                    <el-form-item label="编号" :label-width="formLabelWidth" v-show="false">
                      <el-input v-model="BasSubstituteForm.id" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="员工工号"  prop="empno" :label-width="formLabelWidth">
                      <el-select @change="selectGet" v-model="BasSubstituteForm.empno" placeholder="--请选择--" style="width: 100%;">
                         <el-option v-for="d1 in emp" :key="d1.empno"  :value="d1.empno" :label="d1.empno" ></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="员工名称" prop="empname" :label-width="formLabelWidth">
                      <el-input v-model="BasSubstituteForm.empname" autocomplete="off" ></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码" prop="mobileno" :label-width="formLabelWidth">
                      <el-input v-model="BasSubstituteForm.mobileno" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="取派员类型" prop="type" :label-width="formLabelWidth">
                      <el-select v-model="BasSubstituteForm.type" placeholder="--请选择--" style="width: 100%;">
                        <el-option   value="全部"  label="全部"  ></el-option>
                        <el-option :value="1" label="小件员"></el-option>
                        <el-option :value="2" label="驾驶员"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="是否使用PDA" prop="pda" :label-width="formLabelWidth" >
                      <template>
                        <el-radio v-model="BasSubstituteForm.pda" :label="1" >有</el-radio>
                        <el-radio v-model="BasSubstituteForm.pda"  :label="0">没有</el-radio>
                      </template>
                    </el-form-item>
                    <el-form-item label="收派标准（公斤）" prop="standardkg" :label-width="formLabelWidth">
                      <el-select v-model="BasSubstituteForm.standardkg" placeholder="--请选择--" style="width: 100%;">
                        <el-option   :value="20"  label="20"></el-option>
                        <el-option   :value="30"  label="30"></el-option>
                        <el-option   :value="40"  label="40"></el-option>
                        <el-option   :value="60"  label="60"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="收派标准（长度）" prop="standardlength" :label-width="formLabelWidth">
                      <el-select v-model="BasSubstituteForm.standardlength" placeholder="--请选择--" style="width: 100%;">
                        <el-option   value="2"  label="2"  ></el-option>
                        <el-option   value="4"  label="4"></el-option>
                        <el-option   value="6"  label="6"></el-option>
                        <el-option   value="10"  label="10"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="车型" prop="models" :label-width="formLabelWidth">
                      <el-input v-model="BasSubstituteForm.models" autocomplete="off" ></el-input>
                    </el-form-item>
                    <el-form-item label="车牌号" prop="plateint" :label-width="formLabelWidth">
                      <el-input v-model="BasSubstituteForm.plateint" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="作废标记" prop="invalidatemark" :label-width="formLabelWidth" >
                      <template>
                        <el-radio v-model="BasSubstituteForm.invalidatemark" :label="1" >是</el-radio>
                        <el-radio v-model="BasSubstituteForm.invalidatemark"  :label="0">否</el-radio>
                      </template>
                    </el-form-item>
                    <el-form-item label="所属单位" prop="subordinateunit" :label-width="formLabelWidth" v-show="false">
                      <el-input v-model="BasSubstituteForm.subordinateunit" autocomplete="off"></el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="doSubmit">确 定</el-button>
                  </div>
                </el-dialog>
     </div>
   </template>

   <script>
     import axios from 'axios'
     import qs from 'qs'
     export default {
     name:"PieSetup",
     data:function(){
       return{
       result:[],
       bhid:null,
       bhname:null,
       abc:[],//员工表
       emp:[],//员工表
       dialogFormVisible:false,
       formLabelWidth: "120px",
       title: '取派员添加',
       BasSubstituteForm:{
         id:0,
         empno:null,
         empname:null,
         mobileno:null,
         type:null,
         pda:null,
         standardkg:null,
         standardlength:null,
         models:null,
         plateint:null,
         invalidatemark:null,
         subordinateunit:null,
        },
        rules:{

        },
        empno:''
       }
     },
     methods:{
       /* 添加方法 */
       onadd: function() {
         this.title="取派员添加";
         this.BasSubstituteForm.empno=null;
         /* this.BasSubstituteForm.empname=null; */
         this.BasSubstituteForm.mobileno=null;
         this.BasSubstituteForm.type=null;
         this.BasSubstituteForm.pda=0;
         this.BasSubstituteForm.standardkg=null;
         this.BasSubstituteForm.standardlength=null;
         this.BasSubstituteForm.models=null;
         this.BasSubstituteForm.plateint=null;
         this.BasSubstituteForm.invalidatemark=0;
         this.BasSubstituteForm.subordinateunit=null,
         this.dialogFormVisible = true;

       },
       /*编辑修改 */
       handleEdit: function(row) {
         this.title="取派员编辑";
         this.BasSubstituteForm.id=row.id;
         this.BasSubstituteForm.empno=row.empno;
         this.BasSubstituteForm.empname=row.empname;
         this.BasSubstituteForm.mobileno=row.mobileno;
         this.BasSubstituteForm.type=row.type;
         this.BasSubstituteForm.pda=row.pda;
         this.BasSubstituteForm.standardkg=row.standardkg;
         this.BasSubstituteForm.standardlength=row.standardlength;
         this.BasSubstituteForm.models=row.models;
         this.BasSubstituteForm.plateint=row.plateint;
         this.BasSubstituteForm.invalidatemark=row.invalidatemark;
         this.BasSubstituteForm.subordinateunit=row.subordinateunit;
         this.dialogFormVisible = true;
       },
       /* //新增修改提交的方法 */
           doSubmit: function() {
             /* alert(this.BasSubstituteForm.carrier) */
             this.$refs['BasSubstituteForm'].validate((valid) => {
               console.log(valid);
               alert(valid)
               if (valid) {
                 console.log("........");
                 let url = 'http://localhost/wuliuxm/insert_BasSubstitute';
                if (this.title == '取派员编辑') {
                  console.log(url);
                   console.log(this.title)
                   url = 'http://localhost/wuliuxm/update_BasSubstitute';
                 }
                 let pages = {
                  id:this.BasSubstituteForm.id,
                  empno: this.BasSubstituteForm.empno,
                  empname:this.BasSubstituteForm.empname,
                  mobileno:this.BasSubstituteForm.mobileno,
                  type:this.BasSubstituteForm.type,
                  pda:this.BasSubstituteForm.pda,
                  standardkg:this.BasSubstituteForm.standardkg,
                  standardlength:this.BasSubstituteForm.standardlength,
                  models:this.BasSubstituteForm.models,
                  plateint:this.BasSubstituteForm.plateint,
                  invalidatemark:this.BasSubstituteForm.invalidatemark,
                  subordinateunit:this.abc.syUnits.id,

                 }
                 alert(qs.stringify(pages))
                 axios.post(url, qs.stringify(pages)).then(resp => {
                   console.log(resp)
                    alert(this.dialogFormVisible)
                   this.dialogFormVisible=false; //隐藏
                   alert(this.dialogFormVisible)
                 this.query();
                 }).catch(error => {
                   console.log("失败");
                 });
               } else {
                 console.log('error submit!!提交失败');
                 return false;
               }
             });
         },
       query:function(){
        let url = 'http://localhost/wuliuxm/select_BasSubstitute';
        axios.post(url, null).then(resp => {
          console.log(resp)
          this.result = resp.data;
          }).catch(error => {
          console.log(error);
           });
       },
       /* 删除 */
       handleDelete: function(row) {
        // alert(row.id);
         this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
           confirmButtonText: '确定',
           cancelButtonText: '取消',
           type: 'warning'
         }).then(() => {
           let url = 'http://localhost/wuliuxm/delete_BasSubstitute';
           let pages = {
             id: row.id,
           }
           axios.post(url, qs.stringify(pages)).then(resp => {
             console.log(resp)
             this.query();
             this.max();
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
        selectGet:function(vId){
              let obj = {};
              obj = this.emp.find((d1)=>{//这里的selectList就是上面遍历的数据源
                  return d1.empno === vId;//筛选出匹配数据
              });
              this.empno=vId;
              let param={
                empno:this.empno
              }
              var str=qs.stringify(param);
              let url = 'http://localhost/wuliuxm/FillAllSyEmpEmpToLx';
              axios.post(url, str).then(resp => {
                console.log(resp)
                this.BasSubstituteForm.empname=resp.data.empname;
                }).catch(error => {
                console.log(error);
                 });
                 alert(obj.empname)
              console.log(obj.empname);//我这边的name就是对应label的
              console.log(obj.id);
            }
     },
     created:function(){
       this.query();
       let url = 'http://localhost/wuliuxm/FillAllSyEmpLx';
       axios.post(url, null).then(resp => {
         console.log(resp)
         this.emp = resp.data;
         }).catch(error => {
         console.log(error);
          });
       this.abc=this.$session.get("emplist");

     },

   }

   </script>

   <style>
     .divClass {
       margin-top: 10px;
       margin-left: 10px;
     }
   </style>
