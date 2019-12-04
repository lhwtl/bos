<template>
  <div class="divClass">
    <!--面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a>库存管理</a></el-breadcrumb-item>
    </el-breadcrumb>
    <!--搜索框-->

    <el-form :inline="true" class="demo-form-inline" style="margin-top: 10px;">
      <!-- v-for="c1 in oneColumn" -->
      <el-form-item label="货物编码" ><!--v-for="c in oneColumn"  -->
        <el-input v-model="column" placeholder="请输入货物编码"></el-input>
      </el-form-item>
      <el-form-item label="所属单位">
        <el-input v-model="columnName" placeholder="请输入所属单位"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
      </el-form-item>
	 <div class="export">
	      <el-button @click="exportExcel" style="margin-top: 2px;" size="medium" type="success">导出</el-button>
	 </div>
    </el-form>
	
    <!--数据表格-->
    <el-table :data="result" style="width: 100%;" :border="true" max-height="550" id="invent">
      <el-table-column prop="id" label="序号" min-width="30" align="center"></el-table-column>
      <el-table-column prop="goodscode" label="货物编码" min-width="40"></el-table-column>
      <el-table-column prop="goodsname" label="货物名称" min-width="50"></el-table-column>
      <el-table-column prop="storagenum" label="数量" min-width="70"></el-table-column>
      <el-table-column prop="plannedprice" label="计划价格" min-width="70"></el-table-column>
      <el-table-column prop="specifications" label="规格" min-width="70"></el-table-column>
      <el-table-column prop="type" label="类型" min-width="70">
				<template slot-scope="scope1">
				     <span v-if="scope1.row.type==1">初期入库</span>
				     <span v-if="scope1.row.type==2">调拨入库</span>
					 <span v-if="scope1.row.type==3">下发入库</span>
					 <span v-if="scope1.row.type==4">盘盈调整</span>
				  </template>
			</el-table-column>
	  <el-table-column prop="pacStock.subordinateunit" label="所属单位" min-width="70"></el-table-column>
    </el-table>
    </el-pagination>

  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'
  export default {
    name: 'inventory',
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
		exportExcel () {
		                /* generate workbook object from table */
		                let wb = XLSX.utils.table_to_book(document.querySelector('#invent'));
		                /* get binary string as output */
		                let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' });
		                try {
		                    FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '库存管理.xlsx');
		                } catch (e)
		                {
		                    if (typeof console !== 'undefined')
		                        console.log(e, wbout)
		                }
		                return wbout
		 },
		
		query: function() {

		  let url = 'http://localhost/wuliuxm/selectPacStockitemkc';
		  axios.post(url, null).then(resp => {
			  console.log("=--------------------------");
		    console.log(resp);
		    this.result = resp.data;
		  }).catch(error => {
		    console.log(error);
		  });
		
		},


      onSubmit: function() { 

      let pages = {
        goodscode:this.column,
		goodsname:this.columnName 
      }
      let urll = 'http://localhost/wuliuxm/selectPacStockitemhc';
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
