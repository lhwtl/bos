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
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-plus" @click="onadd">添加</el-button>
      </el-form-item>
    </el-form>
  <!--数据表格-->
   <el-table :data="result" style="width: 100%;" :border="true" max-height="550">
     <el-table-column prop="id" label="序号" min-width="30" align="center"></el-table-column>
     <el-table-column prop="id" label="基础档案编号" min-width="80"></el-table-column>
     <el-table-column prop="name" label="基础档案名称" min-width="60"></el-table-column>
     <el-table-column prop="grade"  label="档案是否分级" min-width="60">是</el-table-column>
     <el-table-column prop="syEmp.empname" label="操作人员" min-width="50"></el-table-column>
     <el-table-column prop="syUnits.name" label="操作单位" min-width="70"></el-table-column>
     <el-table-column prop="operationtime" label="操作时间" min-width="80"></el-table-column>
          <el-table-column label="操作">
             <template slot-scope="scope">
               <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
               <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
             </template>
           </el-table-column>
   </el-table>
  </div>
</template>

<script>
  /* import { formatDate } from '@/common/date.js' */ // 在组件中引用date.js
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
  created:function(){
    /* var str1 = qs.stringify(pages); */
    let url = 'http://localhost/wuliuxm/select_BasBasicarchives';
    axios.post(url, null).then(resp => {
      console.log(resp)
      this.result = resp.data;
      this.result=resp.formatDate();
    }).catch(error => {
      console.log(error);
    });

  },
  filters: {
   /*
    时间格式自定义 只需把字符串里面的改成自己所需的格式
   */
   /* formatDate(time) {
     time=time.replace("T","");
    var date = new Date(time);
    return formatDate(date, 'yyyy年MM月dd日 hh:mm:ss');
   } */

         formatDate: function (value) {
           let date = new Date(value);
           let y = date.getFullYear();
           let MM = date.getMonth() + 1;
           MM = MM < 10 ? ('0' + MM) : MM;
           let d = date.getDate();
           d = d < 10 ? ('0' + d) : d;
           let h = date.getHours();
           h = h < 10 ? ('0' + h) : h;
           let m = date.getMinutes();
           m = m < 10 ? ('0' + m) : m;
           let s = date.getSeconds();
           s = s < 10 ? ('0' + s) : s;
           return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
         }
  }
}

</script>

<style>
  .divClass {
    margin-top: 10px;
    margin-left: 10px;
  }
</style>
