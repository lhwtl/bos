<template>
  <div class="divClass">
    <!--面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a>入库管理</a></el-breadcrumb-item>
    </el-breadcrumb>
    <!--搜索框-->

    <el-form :inline="true" class="demo-form-inline" style="margin-top: 10px;">

      <el-form-item label="出库交接单:">
        <el-input v-model="navigation1" placeholder="出库交接单号"></el-input>
      </el-form-item>
      <el-form-item label="接货时间:">
        <el-input v-model="navigation2" placeholder="接货时间"></el-input>
      </el-form-item>

      <el-form-item>
        <!-- <el-form-item> -->
        <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
      </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-refresh" @click="refresh">重置</el-button>
          </el-form-item>
      <el-form-item>
        <el-button type="primary"  @click="add">新增入库</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"  @click="addyc">新增异常记录</el-button>
      </el-form-item>
    </el-form>
    <!--数据表格-->
    <el-table :data="result" style="width: 100%;" :border="true" max-height="550">
      <!-- <el-table-column prop="id" label="序号" min-width="30" align="center"></el-table-column> -->
      <el-table-column prop="id" label="异常编号" min-width="50"></el-table-column>
      <el-table-column prop="launchdate"  label="发起时间"  min-width="70"></el-table-column>
      <el-table-column prop="launchperson" label="发起人" min-width="50"></el-table-column>
      <el-table-column prop="launchcompany"  label="异常说明"  min-width="70"></el-table-column>
      <el-table-column prop="abnormaltype" label="异常类型" min-width="50">
        <template slot-scope="scope1">
           <span v-if="scope1.row.abnormaltype==0">有单无货</span>
           <span v-if="scope1.row.abnormaltype==1">有货无单</span>
        </template>
      </el-table-column>
      <el-table-column prop="transferint"  label="交接单号"  min-width="70"></el-table-column>
      <el-table-column prop="cargoint"  label="单号"  min-width="70"></el-table-column>
      <el-table-column prop="packageint" label="合包号" min-width="50"></el-table-column>
      <el-table-column prop="hedgeabnint"  label="对冲异常编号"  min-width="70"></el-table-column>
      <el-table-column prop="abostate"  label="状态"  min-width="70">
        <template slot-scope="scope1">
           <span v-if="scope1.row.abostate==0">未处理</span>
           <span v-if="scope1.row.abostate==1">以处理</span>
        </template>
      </el-table-column>
      <el-table-column prop="handledate"  label="处理时间"  min-width="70"></el-table-column>
     </el-table-column>
<!--<p v-if="ok">现在你可以看到我了</p>
            <p v-else>隐藏了</p>-->

      <!-- <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          <el-button size="mini" type="danger" @click="handleMX(scope.row)">查看明细</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <el-pagination background @current-change="change"  layout="prev, pager, next"
      :current-page="pag" :page-size="size" :total="total">
    </el-pagination>

  <!--  对话框  ref="RoleForm" :rules="rules"-->
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="RoleForm" >
        <el-form-item label="编号" :label-width="formLabelWidth" v-show="false">
          <el-input v-model="RoleForm.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色名称" prop="rolename" :label-width="formLabelWidth" >
          <el-input v-model="RoleForm.rolename" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="是否可用" prop="disabled" :label-width="formLabelWidth">
          <el-select v-model="RoleForm.disabled" placeholder="--请选择状态--" style="width: 100%;">
            <el-option value="是" label="是"></el-option>
            <el-option value="否" label="否"></el-option>
          </el-select>
        </el-form-item>
        </el-table-column>

        <el-form-item label="描述" prop="roledesc" :label-width="formLabelWidth" >
          <el-input v-model="RoleForm.roledesc" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="doSubmit">确 定</el-button>
      </div>
    </el-dialog>


    <!-- 权限框-->
<el-dialog :title="titlelist" :visible.sync="dialogFormVisiblelist">

 </el-dialog>


  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
  export default {
    name: 'SortAbnormal',
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
        let url = 'http://localhost/wuliuxm/selectSorAbnormalLX';
        axios.post(url,null).then(resp => {
          console.log(resp.data)
               this.result = resp.data;
             }).catch(error => {
               console.log(error);
             });
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
