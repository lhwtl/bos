<template>
<div class="divClass">
    <!--面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/Home' }">受理</el-breadcrumb-item>
      <el-breadcrumb-item><a>工作单查询</a></el-breadcrumb-item>
    </el-breadcrumb>
    <!--搜索框-->
    <el-form :inline="true" class="demo-form-inline" style="margin-top: 10px;">
      <el-form-item label="名称:">
        <el-input v-model="bhid" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="时间名称:">
        <el-input v-model="bhname" placeholder="请输入时间名称"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button @click="moreGet">更多</el-button>
      </el-form-item>
      <el-row style="text-align: left;;">
        <el-button type="primary" icon="el-icon-plus" @click="onadd">添加</el-button>
        <el-button type="primary">编辑</el-button>
        <el-button type="primary">删除</el-button>
      </el-row>
    </el-form>
  <!--数据表格-->
   <el-table :data="result" style="width: 100%;" :border="true" max-height="550">
     <el-table-column prop="id" label="序号" min-width="20" align="center"></el-table-column>
     <el-table-column prop="jobno" label="工作单号" min-width="50"></el-table-column>
     <el-table-column prop="accBusinessadmissibility.customcode" label="客户单号" min-width="40"></el-table-column>
     <el-table-column prop="accWorksheet.producttime"  label="产品" min-width="30"></el-table-column>
     <!-- <el-table-column prop="accWorksheet.destination" label="到达地编码" min-width="30"></el-table-column> -->
     <el-table-column prop="accWorksheet.destination" label="到达地" min-width="60"></el-table-column>
     <el-table-column prop="businessnoticeno" label="业务通知单号" min-width="50"></el-table-column>
     <el-table-column prop="accBusinessadmissibility.syEmp.empno" label="取货人工号" min-width="40"></el-table-column>
     <el-table-column prop="accBusinessadmissibility.syEmp.empname"  label="取货人姓名" min-width="30"></el-table-column>
     <el-table-column prop="accBusinessadmissibility.reservationtimes" label="取货时间" min-width="40"></el-table-column>
     <el-table-column prop="accBusinessadmissibility.customname" label="寄件人" min-width="40"></el-table-column>
     <el-table-column prop="disWorkordersign.recipient" label="收件人" min-width="40"></el-table-column>
     <el-table-column>
       <el-table-column label="操作" min-width="50">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)" min-width="20">删除</el-button>
          </template>
        </el-table-column>
     </el-table-column>

   </el-table>
  </div>
</template>

WorkOrderQuery

<script>
  import axios from 'axios'
    export default {
    name:"WorkOrderQuery",
      data:function(){
       return{
       result:[],
       bhid:null,
       bhname:null
       }
      },
      methods:{
        query:function(){
          let url = 'http://localhost/wuliuxm/select_AccWorkorder';
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
            let url = 'http://localhost/wuliuxm/delete_BasZoneinfo';
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
      },
    created:function(){
      this.query();
    }

    }
</script>

<style>

  .divClass {
    margin-top: 10px;
    margin-left: 10px;
    }

</style>
