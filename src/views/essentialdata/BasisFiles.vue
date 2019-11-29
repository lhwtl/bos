<template>
  <div class="divClass">
    <!--面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/Home' }">基础数据</el-breadcrumb-item>
      <el-breadcrumb-item><a>基础档案</a></el-breadcrumb-item>
    </el-breadcrumb>
    <!--搜索框-->
    <el-form :inline="true" class="demo-form-inline" style="margin-top: 10px;">
      <el-form-item label="档案编号:">
        <el-input v-model="bhid" placeholder="请输入档案编号"></el-input>
      </el-form-item>
      <el-form-item label="档案名称:">
        <el-input v-model="bhname" placeholder="请输入档案名称"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button @click="moreGet">更多</el-button>
      </el-form-item>
      <el-row style="text-align: left;;">
        <el-button type="primary" icon="el-icon-plus" @click="onadd">添加</el-button>
        <el-button type="primary">编辑</el-button>

      </el-row>
    </el-form>
  <!--数据表格-->
   <el-table :data="result" style="width: 100%;" :border="true" max-height="550">
     <el-table-column prop="id" label="序号" min-width="20" align="center"></el-table-column>
     <el-table-column prop="nameid" label="基础档案编号" min-width="40"></el-table-column>
     <el-table-column prop="name" label="基础档案名称" min-width="40"></el-table-column>
     <el-table-column v-if="grade=1" prop="grade"  label="档案是否分级" min-width="30">是</el-table-column>
     <el-table-column v-else  prop="grade"  label="档案是否分级" min-width="30">否</el-table-column>
     <el-table-column prop="syEmp.empname" label="操作人员" min-width="40"></el-table-column>
     <el-table-column prop="syUnits.name" label="操作单位" min-width="40"></el-table-column>
     <el-table-column prop="time" label="操作时间" min-width="70"></el-table-column>
          <el-table-column label="操作">
             <template slot-scope="scope">
               <el-button size="mini" @click="onss()" min-width="30">查看列表</el-button>
               <el-button type="primary" size="mini" @click="handleDelete(scope.row)" min-width="30">删除</el-button>
             </template>
           </el-table-column>
   </el-table>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
  name:"BasisFiles",
  data:function(){
    return{
    result:[],
    bhid:null,
    bhname:null,
    options: [{
              value: '选项1',
              label: '是'
            }, {
              value: '选项2',
              label: '否'
            }]
    }

  },
  methods:{
    query:function(){
      let url = 'http://localhost/wuliuxm/select_BasBasicarchives';
      axios.post(url, null).then(resp => {
        console.log(resp)
        this.result = resp.data;
        this.result=resp.formatDate();
      }).catch(error => {
        console.log(error);
      });
    },
    /*删除*/
    handleDelete: function(row) {
     // alert(row.id);

      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let url = 'http://localhost/wuliuxm/delete_BasBasicarchives';
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
    /* var str1 = qs.stringify(pages); */
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
