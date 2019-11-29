<template>
  <div class="divClass">
    <!--面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a>包装材料管理</a></el-breadcrumb-item>
    </el-breadcrumb>
    <!--搜索框-->

    <el-form :inline="true" class="demo-form-inline" style="margin-top: 10px;">
      <!-- v-for="c1 in oneColumn" -->
      <el-form-item label="物品编码" ><!--v-for="c in oneColumn"  -->
        <el-input v-model="column" placeholder="请输入物品编码"></el-input>
      </el-form-item>
      <el-form-item label="物品名称">
        <el-input v-model="columnName" placeholder="请输入物品名称"></el-input>
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
      <el-table-column prop="itemcode" label="物品编码" min-width="40"></el-table-column>
      <el-table-column prop="itemname" label="物品名称" min-width="50"></el-table-column>
      <el-table-column prop="plannedprice" label="计划价格" min-width="70"></el-table-column>
      <el-table-column prop="specifications" label="规格" min-width="70"></el-table-column>
      <el-table-column prop="type" label="类型" min-width="70"></el-table-column>
      <el-table-column prop="measurementunit" label="计量单位" min-width="70"></el-table-column>
	  <el-table-column prop="status" label="状态" min-width="70"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    </el-pagination>


    <!--对话框-->
    <el-dialog :title="title" :visible.sync="dialogFormVisible" >
      <!-- @close="cleanForm" 关门按钮x   可以写方法  我没写-->
      <el-form :model="columnForm" ref="columnForm" >
        <!--:model="bookForm" ref="bookForm" :rules="rules" -->
        
		<el-form-item label="物品编码" :label-width="formLabelWidth">
		  <el-input v-model="columnForm.itemcode" autocomplete="off"></el-input>
		</el-form-item>
        <el-form-item label="物品名称" prop="itemname" :label-width="formLabelWidth">
          <el-input v-model="columnForm.itemname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="计划价格" prop="plannedprice" :label-width="formLabelWidth">
          <el-input v-model="columnForm.plannedprice" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="规格" prop="specifications" :label-width="formLabelWidth">
          <el-input v-model="columnForm.specifications" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type" :label-width="formLabelWidth">
          <el-input v-model="columnForm.type" autocomplete="off"></el-input>
        </el-form-item>
		<el-form-item label="状态" prop="status" :label-width="formLabelWidth">
		  <el-input v-model="columnForm.status" autocomplete="off"></el-input>
		</el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="doSubmit">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
  export default {
    name: 'Materialgoods',
    data: function() {
      return {
        column: null,
        columnName: null,
        result: [],
        dialogFormVisible: false,
        formLabelWidth: "120px",
		title: '添加栏目',
		    columnForm:{
		    id: null,
		    itemcode: null,
		    itemname: null,
		    plannedprice: null,
		    specifications: null,
		    type: null,
			measurementunit: null,
			status: null
			}
		}	
    },
    methods: {

      /* 书本查询方法 */
	  /* 查询之后数据分页 */
      onSubmit: function() { 
		 
      let pages = {
        itemcode:this.column,
		itemname:this.columnName
      }
      let urll = 'http://localhost/wuliuxm/selectPacPackagingname';
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
                  let url = 'http://localhost/wuliuxm/deletePacPackaging';
                       let pages = {
                        id: row.id,
                       }
                   axios.post(url, qs.stringify(pages)).then(resp => {
                     console.log(resp)
                     this.$message({
                       type: 'success',
                       message: '删除成功!',
					  
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

        this.columnForm.itemcode= row.itemcode;
        this.columnForm.itemname= row.itemname;
        this.columnForm.plannedprice= row.plannedprice;
        this.columnForm.specifications= row.specifications;
		this.columnForm.type= row.type;
		this.columnForm.status= row.status;
        this.dialogFormVisible = true;

      },
      /* 添加方法 */
      add: function() {
		 
		  
        this.title = "添加栏目"
        this.columnForm.itemcode= null;
        this.columnForm.itemname= null;
        this.columnForm.plannedprice= null;
        this.columnForm.specifications= null;
        this.columnForm.type= null;
        this.columnForm.status= null;
        this.dialogFormVisible = true;

      },
       /* //新增修改提交的方法 */
       doSubmit: function() {
		   
          this.$refs['columnForm'].validate((valid) => {
          console.log(valid);
          if (valid) {
            console.log("........");
              let url = 'http://localhost/wuliuxm/insertPacPackaging';
             if (this.title == '编辑栏目') {
                console.log(this.title)
                  url = 'http://localhost/wuliuxm/updatePacPackaging';
              }
                let pages = {
                 id: this.columnForm.id,
                 itemcode:this.columnForm.itemcode,
				 itemname:this.columnForm.itemname,
                 plannedprice:this.columnForm.plannedprice,
                 specifications:this.columnForm.specifications,
                 type:this.columnForm.type,
                 status:this.columnForm.status
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

			},
			query: function() {

			  let url = 'http://localhost/wuliuxm/selectPacPackaging';
			  axios.post(url, null).then(resp => {
			    console.log(resp)
			    this.result = resp.data;
			  }).catch(error => {
			    console.log(error);
			  });
			
			}
			
			
            },
     
   

    created: function() { 
	  
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
