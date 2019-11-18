<template>
  <div class="divClass">
    <!--面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a>书本管理</a></el-breadcrumb-item>
    </el-breadcrumb>
    <!--搜索框-->

    <el-form :inline="true" class="demo-form-inline" style="margin-top: 10px;"><!-- v-for="c1 in oneColumn" -->
        <el-form-item label="请选择栏目" >
               <el-select v-model="column"   placeholder="--请选择主栏目--"  >
                 <el-option  label="c.ld" value="c.text"></el-option>
               </el-select>
       </el-form-item>
      <el-form-item label="栏目名称">
        <el-input v-model="columnName" placeholder="请输入栏目名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-plus" @click="add">新增</el-button>
      </el-form-item>
    </el-form>
    <!--数据表格-->
    <el-table :data="result" style="width: 100%;" :border="true" max-height="550">
      <el-table-column prop="id" label="序号" min-width="30" align="center"></el-table-column>
      <el-table-column prop="parentid" label="编号" min-width="40"></el-table-column>
      <el-table-column prop="" label="上级栏目" min-width="50"></el-table-column>
      <el-table-column prop="type" label="栏目类型" min-width="70"></el-table-column>
      <el-table-column prop="text" label="栏目名称" min-width="70"></el-table-column>
      <el-table-column prop="url" label="栏目地址" min-width="70"></el-table-column>
      <el-table-column prop="tip" label="栏目提示语" min-width="70"></el-table-column>
   <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
              </template>
            </el-table-column>
    </el-table>
    <el-pagination background @current-change="change" @size-change="SizeChange" layout="prev, pager, next"
      :current-pag="size" :total="total">
      <!-- 行 page-size-->
      <!-- 页 current-pag-->
    </el-pagination>
  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
  export default {
    name: 'BookList',
    data: function() {
      return {
        column: null,
        columnName: null,
        result: [],
        oneColumn : {},/* 一级栏目 */
        total: null, //最大条数
        size: 7, //条数
        pag: 1, //页数

      }
    },
    methods: {
      //书本查询方法
      onSubmit: function() {/* 查询之后数据分页 */
          
      },
      /* 删除 */
      handleDelete:function(row){
        alert("删除"+row.id)

      },
      /*编辑修改 */
      handleEdit:function(row){
        alert("修改"+row.id)
      },
     /* 添加方法 */
     add: function() {
        console.log("新增");
      },
     /* 点击分页查询  页数 */
     change: function(r) {
        this.pag = r;
        this.query();
      },
    /* 行数 */
     SizeChange: function(h) {  },
 //初始化分页查询   封装方法方便全局调用
      query: function() {

        let pages = {
          pag: this.pag,
          size: this.size,
        }
        var str1 = qs.stringify(pages);
        let url = 'http://localhost/wuliuxm/FillAllSyMenusPag';
        axios.post(url, str1).then(resp => {
          console.log(resp)
          this.result = resp.data;
        }).catch(error => {
          console.log(error);
        });

      },


    },


    created: function() { /* 初始化 */
      //初始化分页查询
      this.query(); /* 调用 */
      //max最大值
      let urll = 'http://localhost/wuliuxm/MaxSyMenus';
      axios.post(urll, null).then(resp => {
        console.log( resp.data);
        this.total = resp.data;/* 赋值最大值 */
      }).catch(error => {
        console.log(error);
      });
      //一级栏目 /* 有问题没写*/
      let url1 = 'http://localhost/wuliuxm/FillAllOneColumnSyMenus';
      axios.post(url1, null).then(resp => {
       // var b = JSON.stringify(resp);/* 转换[object Object]格式为字符串格式 */
       // console.log( b);
        this.oneColumn=resp.data;
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
</style>
