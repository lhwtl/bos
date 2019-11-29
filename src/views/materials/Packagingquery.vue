<template>
  <div class="divClass">
    <!--面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a>包装信息查询</a></el-breadcrumb-item>
    </el-breadcrumb>
    <!--搜索框-->

    <el-form :inline="true" class="demo-form-inline" style="margin-top: 10px;">
      <!-- v-for="c1 in oneColumn" -->
      <el-form-item label="工作单号" ><!--v-for="c in oneColumn"  -->
        <el-input v-model="column" placeholder="请输入工作单号"></el-input>
      </el-form-item>
      <el-form-item label="入库时间">
        <el-input v-model="columnName" placeholder="请输入入库时间"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <!--数据表格-->
    <el-table :data="result" style="width: 100%;" :border="true" max-height="550">
      <el-table-column prop="id" label="序号" min-width="30" align="center"></el-table-column>
      <el-table-column prop="workint" label="工作单号" min-width="40"></el-table-column>
      <el-table-column prop="warename" label="品名" min-width="50"></el-table-column>
      <el-table-column prop="delivery" label="发货方式" min-width="70"></el-table-column>
      <el-table-column prop="packingunit" label="包装单位" min-width="70"></el-table-column>
      <el-table-column prop="storageperson" label="入库人" min-width="70"></el-table-column>
      <el-table-column prop="storagedate" label="入库时间" min-width="70"></el-table-column>
	  <el-table-column prop="packer" label="包装员" min-width="70"></el-table-column>
	  <el-table-column prop="outbound" label="出库人" min-width="70"></el-table-column>
	  <el-table-column prop="outbounddate" label="出库时间" min-width="70"></el-table-column>
    </el-table>
    </el-pagination>

  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
  export default {
    name: 'Packagingquery',
    data: function() {
      return {
        column: null,
        columnName: null,
        result: [],
        dialogFormVisible: false,
        formLabelWidth: "120px"
		}	
    },
    methods: {
		
		query: function() {

		  let url = 'http://localhost/wuliuxm/selectPacPackagingc';
		  axios.post(url, null).then(resp => {
			  console.log("=--------------------------");
		    console.log(resp);
		    this.result = resp.data;
		  }).catch(error => {
		    console.log(error);
		  });
		
		},


      onSubmit: function() { 
		  alert("搜索")
      let pages = {
        goodscode:this.column
      }
      let urll = 'http://localhost/wuliuxm/selectPacStockname';
      axios.post(urll, qs.stringify(pages)).then(resp => {
        console.log(resp.data);
		this.result = resp.data;
      }).catch(error => {
        console.log(error);
      });

      
      } 
   

    
     

    },
	created:function() { /* 初始化 */
	  //初始化分页查询
	  
	  this.query(); /* 调用 */

  }
  }
</script>

<style>
  .divClass {
    margin-top: 10px;
    margin-left: 10px;
  }
</style>
