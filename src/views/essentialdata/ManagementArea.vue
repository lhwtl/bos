<template>
<div class="divClass">
    <!--面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/Home' }">基础数据</el-breadcrumb-item>
      <el-breadcrumb-item><a>管理定区</a></el-breadcrumb-item>
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
     <el-table-column prop="zonecode" label="定区编码" min-width="30"></el-table-column>
     <el-table-column prop="zonename" label="定区名称" min-width="60"></el-table-column>
     <el-table-column prop="syEmp.empname"  label="定区负责人" min-width="30"></el-table-column>
     <el-table-column prop="telphone" label="联系电话" min-width="50"></el-table-column>
     <el-table-column prop="syUnits.name" label="所属单位" min-width="40"></el-table-column>
     <el-table-column>
       <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)" min-width="30">查看客户信息</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)" min-width="20">删除</el-button>
          </template>
        </el-table-column>
     </el-table-column>

   </el-table>
  </div>
</template>

<script>
  import axios from 'axios'
    export default {
    name:"ManagementArea",
      data:function(){
       return{
       result:[],
       bhid:null,
       bhname:null
       }
      },
      methods:{
        query:function(){
          let url = 'http://localhost/wuliuxm/select_BasZoneinfo';
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
