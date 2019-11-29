  <template>
     <div class="divClass">
       <!--面包屑-->
       <el-breadcrumb separator="/">
         <el-breadcrumb-item :to="{ path: '/Home' }">基础数据</el-breadcrumb-item>
         <el-breadcrumb-item><a>班车设置</a></el-breadcrumb-item>
       </el-breadcrumb>
       <!--搜索框-->
       <el-form :inline="true" class="demo-form-inline" style="margin-top: 10px;">
             <el-form-item label="路线名称:">
               <el-input v-model="bhid" placeholder="请输入路线名称"></el-input>
             </el-form-item>
             <el-form-item label="线路类型:">
               <el-input v-model="bhname" placeholder="请输入线路类型"></el-input>
             </el-form-item>

             <el-form-item>
               <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
               <el-button @click="resetForm('ruleForm')">重置</el-button>
               <el-button @click="moreGet">更多</el-button>
             </el-form-item>
             <el-row style="text-align: left;;">
               <el-button type="primary" icon="el-icon-plus" @click="onadd">添加</el-button>

               <el-button type="primary">删除</el-button>
             </el-row>
           </el-form>
     <!--数据表格-->
      <el-table :data="result" style="width: 100%;" :border="true" max-height="550">
           <el-table-column prop="id" label="序号" min-width="20" align="center"></el-table-column>
           <el-table-column prop="linetype" label="线路类型" min-width="30">
             <template slot-scope="scope1">
                <span v-if="scope1.row.linetype==1">全部</span>
                <span v-if="scope1.row.linetype==2">干线</span>
                <span v-if="scope1.row.linetype==3">省内</span>
                <span v-if="scope1.row.linetype==4">周边</span>
                <span v-if="scope1.row.linetype==5">临时</span>
                <span v-if="scope1.row.linetype==6">市内</span>

             </template>
           </el-table-column>
           <el-table-column prop="lineid" label="路线名称" min-width="30">

           </el-table-column>
           <el-table-column prop="licenseplateint"  label="车牌号" min-width="50"></el-table-column>
           <el-table-column prop="carrier" label="承运商" min-width="40"></el-table-column>
           <el-table-column prop="models" label="车型" min-width="30"></el-table-column>
           <el-table-column prop="driver" label="司机" min-width="30"></el-table-column>
           <el-table-column prop="telephone" label="电话" min-width="60"></el-table-column>
           <el-table-column prop="ton" label="吨控" min-width="20"></el-table-column>
           <el-table-column prop="syEmp.empname" label="操作人员" min-width="40"></el-table-column>
           <el-table-column prop="syUnits.name" label="操作单位" min-width="40"></el-table-column>
           <el-table-column prop="operationtime" label="操作时间" min-width="70"></el-table-column>
           <el-table-column label="操作">
             <template slot-scope="scope">
               <el-button size="mini" type="danger" @click="handleDelete(scope.row)" min-width="30">删除</el-button>
               <el-button size="mini" type="primary"  @click="handleEdit(scope.row)" min-width="30">编辑</el-button>
             </template>
           </el-table-column>
         </el-table>

      <!-- 添加的弹出框-->
      <el-dialog :title="title" :visible.sync="dialogFormVisible">
         <el-form :model="BasShuttlebusForm" ref="BasShuttlebusForm" :rules="rules">
           <el-form-item label="编号" :label-width="formLabelWidth" v-show="false">
             <el-input v-model="BasShuttlebusForm.id" autocomplete="off"></el-input>
           </el-form-item>
           <el-form-item label="路线名称" prop="lineid" :label-width="formLabelWidth">
             <el-input v-model="BasShuttlebusForm.lineid" autocomplete="off" ></el-input>
           </el-form-item>

           <el-form-item label="路线类型" prop="linetype" :label-width="formLabelWidth">
             <el-select v-model="BasShuttlebusForm.linetype" placeholder="--请选择--" style="width: 100%;">
               <el-option   value="1"  label="全部"  ></el-option>
               <el-option   value="2"  label="干线"></el-option>
               <el-option   value="3"  label="省内"  ></el-option>
               <el-option   value="4"  label="周边"></el-option>
               <el-option   value="5"  label="临时"  ></el-option>
               <el-option   value="6"  label="市内"></el-option>
             </el-select>
           </el-form-item>
           <el-form-item label="车牌号" prop="licenseplateint" :label-width="formLabelWidth">
             <el-input v-model="BasShuttlebusForm.licenseplateint" autocomplete="off"></el-input>
           </el-form-item>
           <el-form-item label="承运商" prop="carrier" :label-width="formLabelWidth">
             <el-input v-model="BasShuttlebusForm.carrier" autocomplete="off"></el-input>
           </el-form-item>
           <el-form-item label="车型" prop="models" :label-width="formLabelWidth" >
             <el-input v-model="BasShuttlebusForm.models" autocomplete="off" ></el-input>
           </el-form-item>
           <el-form-item label="司机" prop="driver" :label-width="formLabelWidth">
             <el-input v-model="BasShuttlebusForm.driver" autocomplete="off" ></el-input>
           </el-form-item>
           <el-form-item label="电话" prop="telephone" :label-width="formLabelWidth">
             <el-input v-model="BasShuttlebusForm.telephone" autocomplete="off"></el-input>
           </el-form-item>
           <el-form-item label="吨控" prop="ton" :label-width="formLabelWidth">
             <el-input v-model="BasShuttlebusForm.ton" autocomplete="off" ></el-input>
           </el-form-item>
           <el-form-item label="备注" prop="remarks" :label-width="formLabelWidth">
             <el-input v-model="BasShuttlebusForm.remarks" autocomplete="off"></el-input>
           </el-form-item>
<!--           <el-form-item label="操作人员" prop="operatorid" :label-width="formLabelWidth" v-show="false">
             <el-input v-model="BasShuttlebusForm.operatorid" autocomplete="off"></el-input>
           </el-form-item>
           <el-form-item label="操作单位" prop="operationunitid" :label-width="formLabelWidth" v-show="false">
             <el-input v-model="BasShuttlebusForm.operationunitid" autocomplete="off"></el-input>
           </el-form-item> -->
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
     name:"TrainSet",
     data:function(){
       return{
       result:[],
       bhid:null,
       bhname:null,
       abc:[],
       dialogFormVisible:false,
       formLabelWidth: "120px",
       title: '班车添加',
       BasShuttlebusForm:{
         id:0,
         linetype:null,
         lineid:null,
         licenseplateint:null,
         carrier:null,
         models:null,
         driver:null,
         telephone:null,
         ton:null,
         remarks:null,
         operatorid:null,
         operationunitid:null,
        },
        rules:{
          linetype:[{
            required:true,
            message:'请选择线路类型',
            trigger:'change'
          }],
          lineid:[{
              required:true,
              message:'请输入路线名称',
              trigger:'blur'
            }],
          licenseplateint:[{
              required:true,
              message:'请输入车牌号',
              trigger:'blur'
            }],
          carrier:[{
              required:true,
              message:'请输入承运商',
              trigger:'blur'
            }],
          models:[{
              required:true,
              message:'请输入',
              trigger:'blur'
            }],
          driver:[{
              required:true,
              message:'请输入',
              trigger:'blur'
            }],
            telephone:[{
                required:true,
                message:'请输入',
                trigger:'blur'
              }],
            ton:[{
                required:true,
                message:'请输入',
                trigger:'blur'
              }],
              remarks:[{
                  required:true,
                  message:'备注',
                  trigger:'blur'
                }]
         }
       }

     },
     methods:{
       query:function(){
         let url = 'http://localhost/wuliuxm/select_BasShuttlebus';
         axios.post(url, null).then(resp => {
           console.log(resp)
           this.result = resp.data;

         }).catch(error => {
           console.log(error);
         });
        },
        
        handleDelete: function(row) {
          alert("aa")
           alert(row.id);
           this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
             confirmButtonText: '确定',
             cancelButtonText: '取消',
             type: 'warning'
           }).then(() => {
             let url = 'http://localhost/wuliuxm/delete_BasShuttlebus';
             let pages = {
               id: row.id,
             }
             axios.post(url, qs.stringify(pages)).then(resp => {
               console.log(resp)
               this.query();
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
        /* 添加方法 */
        onadd: function() {
          this.title="班车添加";
          this.BasShuttlebusForm.linetype=null;
          this.BasShuttlebusForm.lineid=null;
          this.BasShuttlebusForm.licenseplateint=null;
          this.BasShuttlebusForm.carrier=null;
          this.BasShuttlebusForm.models=null;
          this.BasShuttlebusForm.driver=null;
          this.BasShuttlebusForm.telephone=null;
          this.BasShuttlebusForm.ton=null;
          this.BasShuttlebusForm.remarks=null;
          this.BasShuttlebusForm.operatorid=null,
          this.BasShuttlebusForm.operationunitid=null,
          this.dialogFormVisible = true;

        },
        /*编辑修改 */
        handleEdit: function(row) {
          this.title="班车编辑";
          this.BasShuttlebusForm.id=row.id;
          this.BasShuttlebusForm.lineid=row.lineid;
          this.BasShuttlebusForm.linetype=row.linetype;
          this.BasShuttlebusForm.licenseplateint=row.licenseplateint;
          this.BasShuttlebusForm.carrier=row.carrier;
          this.BasShuttlebusForm.models=row.models;
          this.BasShuttlebusForm.driver=row.driver;
          this.BasShuttlebusForm.telephone=row.telephone;
          this.BasShuttlebusForm.ton=row.ton;
          this.BasShuttlebusForm.remarks=row.remarks;


          this.dialogFormVisible = true;
        },
        /* //新增修改提交的方法 */
            doSubmit: function() {
              /* alert(this.BasShuttlebusForm.carrier) */
              this.$refs['BasShuttlebusForm'].validate((valid) => {
                console.log(valid);
                alert(valid)
                if (valid) {
                  console.log("........");
                  let url = 'http://localhost/wuliuxm/insert_BasShuttlebus';
                 if (this.title == '班车编辑') {
                    console.log(this.title)
                    url = 'http://localhost/wuliuxm/update_BasShuttlebus';
                  }
                  let pages = {
                   id:this.BasShuttlebusForm.id,
                   linetype: this.BasShuttlebusForm.linetype,
                   lineid:this.BasShuttlebusForm.lineid,
                   licenseplateint:this.BasShuttlebusForm.licenseplateint,
                   carrier:this.BasShuttlebusForm.carrier,
                   models:this.BasShuttlebusForm.models,
                   driver:this.BasShuttlebusForm.driver,
                   telephone:this.BasShuttlebusForm.telephone,
                   ton:this.BasShuttlebusForm.ton,
                   remarks:this.BasShuttlebusForm.remarks,
                   operatorid:this.abc.id,
                   operationunitid:this.abc.syUnits.id,
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
          }
        },
     created:function(){
       this.query();
              this.abc=this.$session.get("emplist");
             /* alert(this.abc.syUnits.name) */

     }
   }

   </script>

   <style>
     .divClass {
       margin-top: 10px;
       margin-left: 10px;
     }
   </style>
