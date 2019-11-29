<template>
  <div class="divClass">
    <!--面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a>包装材料录入</a></el-breadcrumb-item>
    </el-breadcrumb>
    <!--搜索框-->

    <el-form :inline="true" class="demo-form-inline" style="margin-top: 10px;">
      <!-- v-for="c1 in oneColumn" -->
      <el-form-item label="入库单号" ><!--v-for="c in oneColumn"  -->
        <el-input v-model="column" placeholder="请输入入库单号"></el-input>
      </el-form-item>
      <el-form-item label="入库类型">
        <el-input v-model="columnName" placeholder="请输入入库类型"></el-input>
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
      <el-table-column prop="warehouseno" label="入库单号" min-width="40"></el-table-column>
      <el-table-column prop="reservoirtype" label="入库类型" min-width="50"></el-table-column>
      <el-table-column prop="transport" label="运输单号" min-width="70"></el-table-column>
      <el-table-column prop="subordinateunit" label="所属单位" min-width="70"></el-table-column>
      <el-table-column prop="drawerno" label="开单人工号" min-width="70"></el-table-column>
      <el-table-column prop="drawername" label="开单人姓名" min-width="70"></el-table-column>
	  <el-table-column prop="remark" label="状态" min-width="70"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
			<el-button size="mini" @click="querymx">明细</el-button>
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    </el-pagination>


 

   <el-dialog title="外层查询" :visible.sync="outerVisible" width="800px">
   	   <el-button type="primary" @click="add1">新增</el-button>
   	    
   	   
     <el-table :data="gridData" height="200px" >
       <el-table-column property="id" label="序号" ></el-table-column>
       <el-table-column property="goodscode" label="货物编码" ></el-table-column>
       <el-table-column property="goodsname" label="货物名称"></el-table-column>
   	   <el-table-column property="storagenum" label="入库数量"></el-table-column>
   	   <el-table-column property="actualnum" label="实际数量"></el-table-column>
   	   <el-table-column property="plannedprice" label="计划价格"></el-table-column>
   	   <el-table-column property="specifications" label="规格"></el-table-column>
   	   <el-table-column property="type" label="类型"></el-table-column>
			 <el-table-column property="status" label="状态"></el-table-column>
   	     <el-table-column label="操作">
   	   <template slot-scope="scope1">
   	   	<!-- -->
   	    <el-button type="danger" @click="update(scope1.row)" >编辑</el-button> 
   	   </template>
   	   </el-table-column>
     </el-table>
   	 
   </el-dialog>



    <!--对话框-->
    <el-dialog :title="title" :visible.sync="dialogFormVisible" >
      <!-- @close="cleanForm" 关门按钮x   可以写方法  我没写-->
      <el-form :model="columnForm" ref="columnForm" >
        <!--:model="bookForm" ref="bookForm" :rules="rules" -->
        <el-form-item label="入库单号" :label-width="formLabelWidth" v-show="false">
          <el-input v-model="columnForm.warehouseno" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="入库类型" prop="reservoirtype" :label-width="formLabelWidth">
          <el-input v-model="columnForm.reservoirtype" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="运输单号" prop="transport" :label-width="formLabelWidth">
          <el-input v-model="columnForm.transport" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属单位" prop="subordinateunit" :label-width="formLabelWidth">
          <el-input v-model="columnForm.subordinateunit" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="开单人工号" prop="drawerno" :label-width="formLabelWidth">
          <el-input v-model="columnForm.drawerno" autocomplete="off"></el-input>
        </el-form-item>
		<el-form-item label="开单人姓名" prop="drawername" :label-width="formLabelWidth">
		  <el-input v-model="columnForm.drawername" autocomplete="off"></el-input>
		</el-form-item>
		<el-form-item label="状态" prop="remark" :label-width="formLabelWidth">
		  <el-input v-model="columnForm.remark" autocomplete="off"></el-input>
		</el-form-item>
      </el-form>
	  
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="doSubmit">确 定</el-button>
      </div>
    </el-dialog>





	<el-dialog :title="title1" :visible.sync="innerVisible" >
	  <!-- @close="cleanForm" 关门按钮x   可以写方法  我没写-->
	  <el-form :model="gData" ref="gData" >
	    <!--:model="bookForm" ref="bookForm" :rules="rules" -->
	    <el-form-item label="序号" :label-width="formLabelWidth" v-show="false">
	      <el-input v-model="gData.id" autocomplete="off"></el-input>
	    </el-form-item>
	    <el-form-item label="货物编码" prop="reservoirtype" :label-width="formLabelWidth">
	      <el-input v-model="gData.goodscode" autocomplete="off"></el-input>
	    </el-form-item>
	    <el-form-item label="货物名称" prop="transport" :label-width="formLabelWidth">
	      <el-input v-model="gData.goodsname" autocomplete="off"></el-input>
	    </el-form-item>
	    <el-form-item label="入库数量" prop="subordinateunit" :label-width="formLabelWidth">
	      <el-input v-model="gData.storagenum" autocomplete="off"></el-input>
	    </el-form-item>
	    <el-form-item label="实际数量" prop="drawerno" :label-width="formLabelWidth">
	      <el-input v-model="gData.actualnum" autocomplete="off"></el-input>
	    </el-form-item>
		<el-form-item label="计划价格" prop="drawername" :label-width="formLabelWidth">
		  <el-input v-model="gData.plannedprice" autocomplete="off"></el-input>
		</el-form-item>
		<el-form-item label="规模" prop="drawername" :label-width="formLabelWidth">
		  <el-input v-model="gData.specifications" autocomplete="off"></el-input>
		</el-form-item>
		<el-form-item label="类型" prop="drawername" :label-width="formLabelWidth">
		  <el-input v-model="gData.type" autocomplete="off"></el-input>
		</el-form-item>
		<el-form-item label="状态" prop="remark" :label-width="formLabelWidth">
		  <el-input v-model="gData.status" autocomplete="off"></el-input>
		</el-form-item>
	  </el-form>
	  
	  <div slot="footer" class="dialog-footer">
	    <el-button @click="innerVisible = false">取 消</el-button>
	    <el-button type="primary" @click="toSubmit">确 定</el-button>
	  </div>
	</el-dialog>

  </div>
</template>







<script>
  import axios from 'axios'
  import qs from 'qs'
  export default {
    name: 'information',
    data: function() {
      return {
        column: null,
        columnName: null,
        result: [],
		gridData:[],
		 outerVisible: false,
		 innerVisible: false,
        dialogFormVisible: false,
        formLabelWidth: "120px",
		title: '添加栏目',
		    columnForm:{
		    id: null,
		    warehouseno: null,
		    reservoirtype: null,
		    transport: null,
		    subordinateunit: null,
		    drawerno: null,
			drawername: null,
			drawertime:new Date,
			remark: null
			},
			title1: '添加',
			gData:{
				id:null,
				goodscode:null,
				goodsname:null,
				storagenum:null,
				actualnum:null,
				plannedprice:null,
				specifications:null,
				type:null,
				status:null
			}
		}	
    },
    methods: {
		add1: function() {
		  this.title1 = "添加"
		  this.gData.id= null;
		  this.gData.goodscode= null;
		  this.gData.goodsname= null;
		  this.gData.storagenum= null;
		  this.gData.actualnum= null;
		  this.gData.plannedprice= null;
		  this.gData.specifications=null;
		  this.gData.type=null;
		  this.gData.status=null;
		  this.innerVisible = true;
		},
		update: function(row) {
		  this.title1 = "编辑"
		  this.gData.id= row.id;
		  this.gData.goodscode= row.goodscode;
		  this.gData.goodsname= row.goodsname;
		  this.gData.storagenum= row.storagenum;
		  this.gData.actualnum= row.actualnum;
		  this.gData.plannedprice= row.plannedprice;
		  this.gData.specifications=row.specifications;
		  this.gData.type=row.type;
		  this.gData.status=row.status;
		  this.innerVisible = true;
		},
		toSubmit: function() {
				  
		   this.$refs['gData'].validate((valid) => {
		   console.log(valid);
		   if (valid) {
		     console.log("........");
		       let url = 'http://localhost/wuliuxm/insertPacStockitem';
		      if (this.title1 =="编辑") {
		         console.log(this.title1);
				 console.log("编辑--------");
		           url = 'http://localhost/wuliuxm/updatePacStockitem';
		       }
			   				 console.log("新增-----");
		         let pages = {
		          id: this.gData.id,
		          goodscode:this.gData.goodscode,
		          goodsname:this.gData.goodsname,
		          storagenum:this.gData.storagenum,
		          actualnum:this.gData.actualnum,
		          plannedprice:this.gData.plannedprice,
				  specifications:this.gData.specifications,
				  type:this.gData.type,
				  status:this.gData.status
		         }
		         console.log(url)
				 
		     axios.post(url, qs.stringify(pages)).then(resp => {
		       console.log(resp)
		       this.innerVisible = false;//隐藏
		       this.querymx();
		     }).catch(error => {
		       console.log("失败");
		     });
		   } else {
		     console.log('error submit!!提交失败');
		     return false;
		   }
		 });
		
					},
		
		
		querymx:function(){
			this.outerVisible = true;
			let url = 'http://localhost/wuliuxm/selectPacStockitem';
			axios.post(url, null).then(resp => {
			 console.log("=--------------------------");
			  console.log(resp);
			  this.gridData = resp.data;
			}).catch(error => {
			  console.log(error);
			});
		},
		
		
		query: function() {
		
		  let url = 'http://localhost/wuliuxm/selectPacStock';
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
        warehouseno:this.column,
		reservoirtype:this.columnName
      }
		alert(pages.column)
		alert(pages.columnName)
      let urll = 'http://localhost/wuliuxm/selectPacStockname';
      axios.post(urll, qs.stringify(pages)).then(resp => {
        console.log(resp.data);
		this.result = resp.data;
      }).catch(error => {
        console.log(error);
      });

      
      } ,
     
	
          
      
      /* 删除 */
      handleDelete: function(row) {
         this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  let url = 'http://localhost/wuliuxm/deletePacStock';
                       let pages = {
                        id: row.id,
                       }
                   axios.post(url, qs.stringify(pages)).then(resp => {
                     console.log(resp)
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

					this.query();
                });


      },
      /*编辑修改 */
      handleEdit: function(row) {
         this.title = "编辑栏目",
         this.columnForm.id= row.id;

        this.columnForm.warehouseno= row.warehouseno;
        this.columnForm.reservoirtype= row.reservoirtype;
        this.columnForm.transport= row.transport;
        this.columnForm.subordinateunit= row.subordinateunit;
		this.columnForm.drawerno= row.drawerno;
		this.columnForm.drawername= row.drawername;
		this.columnForm.remark= row.remark;
        this.dialogFormVisible = true;

      },
      /* 添加方法 */
      add: function() {
		 
		  
        this.title = "添加栏目"
        this.columnForm.warehouseno= null;
        this.columnForm.reservoirtype= null;
        this.columnForm.transport= null;
        this.columnForm.subordinateunit= null;
        this.columnForm.drawerno= null;
        this.columnForm.drawername= null;
        this.columnForm.remark=null;
        this.dialogFormVisible = true;
      },
       /* //新增修改提交的方法 */
       doSubmit: function() {
		  
          this.$refs['columnForm'].validate((valid) => {
          console.log(valid);
          if (valid) {
            console.log("........");
              let url = 'http://localhost/wuliuxm/insertPacStock';
             if (this.title == '编辑栏目') {
                console.log(this.title)
                  url = 'http://localhost/wuliuxm/updatePacStock';
              }
                let pages = {
                 id: this.columnForm.id,
                 warehouseno:this.columnForm.warehouseno,
                 reservoirtype:this.columnForm.reservoirtype,
                 transport:this.columnForm.transport,
                 subordinateunit:this.columnForm.subordinateunit,
                 drawerno:this.columnForm.drawerno,
				 drawername:this.columnForm.drawername,
				 remark:this.columnForm.remark
                }
                console.log(url)
            axios.post(url, qs.stringify(pages)).then(resp => {
              console.log(resp)
              this.dialogFormVisible = false;//隐藏
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
