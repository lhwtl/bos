<template>
  <div class="divClass">
    <!--面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/Home' }">基础数据</el-breadcrumb-item>
      <el-breadcrumb-item><a>收派管理</a></el-breadcrumb-item>
    </el-breadcrumb>
    <!--搜索框-->
    {{aaat}}aaa
    <el-form :inline="true" class="demo-form-inline" style="margin-top: 10px;">
      <el-form-item label="收派标准名称:">
        <el-input v-model="bookname" placeholder="请输入收派标准名称"></el-input>
      </el-form-item>
      <el-form-item label="作废标注:">
         <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button @click="moreGet">更多</el-button>
      </el-form-item>
      <el-row style="text-align: left;;">
        <el-button type="primary" icon="el-icon-plus" @click="onadd">添加</el-button>

       <!-- <el-button type="primary" @click="handleDelete(row)">删除</el-button> -->
      </el-row>
    </el-form>
  <!--数据表格-->
   <el-table :data="result" style="width: 100%;" :border="true" max-height="550">
     <el-table-column prop="id" label="序号" min-width="30" align="center"></el-table-column>
     <el-table-column prop="name" label="收派标准名称" min-width="60"></el-table-column>
     <el-table-column prop="minweight" label="最小重量" min-width="50"></el-table-column>
     <el-table-column prop="maxweight" label="最大重量" min-width="50"></el-table-column>
     <el-table-column prop="cancel" label="作废" min-width="50">
       <template slot-scope="scope1">
          <span v-if="scope1.row.cancel==0">否</span>
          <span v-if="scope1.row.cancel==1">是</span>
       </template>
     </el-table-column>
     <el-table-column prop="syEmps.empname" label="操作人员" min-width="50"></el-table-column>
     <el-table-column prop="syUnitss.name" label="操作单位" min-width="60"></el-table-column>
     <el-table-column prop="time" label="操作时间" min-width="100"></el-table-column>
     <el-table-column label="操作">
       <template slot-scope="scope">
         <!-- <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button> -->
         <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
         <el-button size="mini" type="primary"  @click="handleEdit(scope.row)">编辑</el-button>
       </template>
     </el-table-column>
   </el-table>
   <!-- 添加的弹出框-->
   <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="BasDeliverystandardForm" ref="BasDeliverystandardForm" :rules="rules">
        <el-form-item label="编号" :label-width="formLabelWidth" v-show="false">
          <el-input v-model="BasDeliverystandardForm.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="标准名称" prop="name" :label-width="formLabelWidth">
          <el-input v-model="BasDeliverystandardForm.name" autocomplete="off" ></el-input>
        </el-form-item>

        <el-form-item label="作废标志" prop="cancel" :label-width="formLabelWidth">

          <template>
            <el-radio v-model="BasDeliverystandardForm.cancel" :label="1" >是</el-radio>
            <el-radio v-model="BasDeliverystandardForm.cancel"  :label="0">否</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="最小重量" prop="minweight" :label-width="formLabelWidth">
          <el-input v-model="BasDeliverystandardForm.minweight" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="最大重量" prop="maxweight" :label-width="formLabelWidth">
          <el-input v-model="BasDeliverystandardForm.maxweight" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="操作人员" prop="operatorid" :label-width="formLabelWidth" >
          <el-input v-model="BasDeliverystandardForm.operatorid" autocomplete="off" readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="操作单位" prop="operationunitid" :label-width="formLabelWidth">
          <el-input v-model="BasDeliverystandardForm.operationunitid" autocomplete="off" readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="操作时间" prop="operationtime" :label-width="formLabelWidth" v-show="false">
          <el-input v-model="BasDeliverystandardForm.operationtime" autocomplete="off" value-format="yyyy-MM-dd HH:mm:ss" ></el-input>
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
  name:"PickAStandard",
  data:function(){
    return{
        aaat:null,
       result:[ ],
     options: [{
              value: '选项1',
              label: '是'
            }, {
              value: '选项2',
              label: '否'
            }],
     dialogFormVisible:false,
     formLabelWidth: "120px",
     title: '收派管理添加',
     BasDeliverystandardForm:{
       id:0,
       name:null,
       minweight:null,
       maxweight:null,
       cancel:null,
       operatorid:null,
       operationunitid:null,
     },
     rules:{
       name:[{
         required:true,
         message:'请输入收派标准名称',
         trigger:'change'
       }],
       minweight:[{
           required:true,
           message:'请输入最小重量',
           trigger:'blur'
         }],
       maxweight:[{
           required:true,
           message:'请输入最大重量',
           trigger:'blur'
         }],
       cancel:[{
           required:true,
           message:'请选择',
           trigger:'blur'
         }],
       operatorid:[{
           required:true,
           message:'请输入',
           trigger:'blur'
         }],
       operationunitid:[{
           required:true,
           message:'请输入',
           trigger:'blur'
         }],

      }
    }
  },
  created:function(){
    this.query();
  },
  methods:{
    query:function(){
      let url = 'http://localhost/wuliuxm/select_BasDeliverystandard';
      axios.post(url, null).then(resp => {
        console.log(resp)
        this.result = resp.data;
      }).catch(error => {
        console.log(error);
      });
        /* 登录的账号  session*/
      /* this.aaat=this.$session.get("key"); */
    },
    /* 删除 */
    handleDelete: function(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let url = 'http://localhost/wuliuxm/delete_BasDeliverystandard';
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

    /* 添加方法 */
    onadd: function() {
      this.title="收派管理添加";
      this.BasDeliverystandardForm.name=null;
      this.BasDeliverystandardForm.minweight=null;
      this.BasDeliverystandardForm.maxweight=null;
      //this.BasDeliverystandardForm.cancel=0;
      this.BasDeliverystandardForm.operatorid=1;
      this.BasDeliverystandardForm.operationunitid=2;
      this.dialogFormVisible = true;

    },
    /*编辑修改 */
    handleEdit: function(row) {
      this.title="收派管理编辑";
      this.BasDeliverystandardForm.id=row.id;
      this.BasDeliverystandardForm.name=row.name;
      this.BasDeliverystandardForm.minweight=row.minweight;
      this.BasDeliverystandardForm.maxweight=row.maxweight;
      this.BasDeliverystandardForm.cancel=row.cancel;
      this.BasDeliverystandardForm.operatorid=row.operatorid;
      this.BasDeliverystandardForm.operationunitid=row.operationunitid;
      this.dialogFormVisible = true;
    },

    /* //新增修改提交的方法 */
    doSubmit: function() {
      alert(this.BasDeliverystandardForm.cancel)
      this.$refs['BasDeliverystandardForm'].validate((valid) => {
        console.log(valid);
        alert(valid)
        if (valid) {
          console.log("........");
          let url = 'http://localhost/wuliuxm/insert_BasDeliverystandard';
         if (this.title == '收派管理编辑') {
            console.log(this.title)
            url = 'http://localhost/wuliuxm/update_BasDeliverystandard';
          }
          let pages = {
           id:this.BasDeliverystandardForm.id,
           name: this.BasDeliverystandardForm.name,
           minweight:this.BasDeliverystandardForm.minweight,
           maxweight:this.BasDeliverystandardForm.maxweight,
           cancel:this.BasDeliverystandardForm.cancel,
           operatorid:this.BasDeliverystandardForm.operatorid,
           operationunitid:this.BasDeliverystandardForm.operationunitid,
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
}

</script>

<style>
  .divClass {
    margin-top: 10px;
    margin-left: 10px;
  }
</style>
