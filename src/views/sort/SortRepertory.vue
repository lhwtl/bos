<template>
  <div class="divClass">
    <!--面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a>库存查询</a></el-breadcrumb-item>
    </el-breadcrumb>


   <el-form :inline="true" class="demo-form-inline" style="margin-top: 10px;text-align: left;margin-left: 30px;">
       <el-form-item>
         <el-button type="primary"  @click="add">导出</el-button>
       </el-form-item>
     </el-form>

   <!--数据表格-->
   <el-table :data="result" style="width: 100%;" :border="true" max-height="550">
     <el-table-column prop="rolename" label="工作单号" min-width="50"></el-table-column>
     <el-table-column prop="rolename" label="入库人" min-width="50"></el-table-column>
     <el-table-column prop="roledesc"  label="入库时间"  min-width="70"></el-table-column>
     <el-table-column prop="id" label="在库时间" min-width="30" align="center"></el-table-column>
     <el-table-column prop="rolename" label="到达地" min-width="50"></el-table-column>
     <el-table-column prop="roledesc"  label="受理单位"  min-width="70"></el-table-column>
     <el-table-column prop="id" label="收货地址" min-width="30" align="center"></el-table-column>
     <el-table-column prop="rolename" label="在库件数" min-width="50"></el-table-column>
     <el-table-column prop="roledesc" label="实际件数"  min-width="70"></el-table-column>
     <el-table-column prop="rolename" label="重量" min-width="50"></el-table-column>
     <el-table-column prop="roledesc" label="送达时限"  min-width="70"></el-table-column>

   </el-table>
   <el-pagination background @current-change="change"  layout="prev, pager, next"
     :current-page="pag" :page-size="size" :total="total">
   </el-pagination>



  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
  export default {
    name: 'SortRepertory',
    data: function() {
      return {
        navigation1: null, //导航栏查询。。
        navigation2: null, //导航栏查询查询。。
        result: [], //主显示集合
        total: 7,
        size: 7, //条数
        pag: 1, //页数
        dialogFormVisible: false,
        dialogFormVisiblelist:false,
        formLabelWidth: "120px",
        title:'title',
        titlelist:'titlelist',
        RoleForm:[],//对话框值帮定
      }
    },
    methods: {
        /* 查询 */
        onSubmit:function(){
          alert("查询");
        },
         /* 重置 */
        refresh:function(){
          alert("重置");
        },
         /* 新增 */
        add:function(){
          alert("新增");
        this.dialogFormVisible= true;
        },
         /* 新增异常 */
        addyc:function(){
          alert("新增异常");
        },
        /* 编辑 */
        handleEdit:function(row){
          alert("编辑");
        this.dialogFormVisible= true;
        },
        /* 删除 */
        handleDelete:function(row){
          alert("删除");
        },
        /* 查看明细 */
        handleMX:function(row){
          alert("查看明细");
        this.dialogFormVisiblelist=true;
        },
        /* 点击分页*/
       change: function(r) {
          alert("点击分页");
       },
       /* 对话框 中确定 */
       doSubmit:function(){

       },
       /* 封装方法   初始化查询*/
      query:function(){

      },
      /* 封装方法  初始化最大值*/
      max:function(){

      }
    },
    /* -----------------万恶的分割线------------------ */
    /* 初始化 */
      created: function() {

      }
  }
</script>

<style>
  .divClass {
    margin-top: 10px;
    margin-left: 10px;
  }
  .divClassqx {
    margin-top: 10px;
    margin-left: 60px;
  }
  .divClassqxs {
    margin-top: 10px;
    margin-left: 25px;
  }

</style>
