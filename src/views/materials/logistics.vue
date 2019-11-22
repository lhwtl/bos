<template>
  <div class="divClass">
    <!--面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a>书本管理</a></el-breadcrumb-item>
    </el-breadcrumb>
    <!--搜索框-->

    <el-form :inline="true" class="demo-form-inline" style="margin-top: 10px;">
      <!-- v-for="c1 in oneColumn" -->
      <el-form-item label="工作单号" ><!--v-for="c in oneColumn"  -->
        <el-input v-model="column" placeholder="请输入工作单号"></el-input>
      </el-form-item>
      <el-form-item label="代理公司">
        <el-input v-model="columnName" placeholder="请输入代理公司"></el-input>
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
      <el-table-column prop="worksheetno" label="工作单号" min-width="40"></el-table-column>
      <el-table-column prop="corporation" label="代理公司" min-width="50"></el-table-column>
      <el-table-column prop="waybillid" label="货票号" min-width="70"></el-table-column>
      <el-table-column prop="inputperson" label="录入人" min-width="70"></el-table-column>
      <el-table-column prop="inputdate" label="录入时间" min-width="70"></el-table-column>
      <el-table-column prop="remarks" label="备注" min-width="70"></el-table-column>
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
        <el-form-item label="序号" :label-width="formLabelWidth" v-show="false">
          <el-input v-model="columnForm.id" autocomplete="off"></el-input>
        </el-form-item>
		<el-form-item label="工作单号" :label-width="formLabelWidth">
		  <el-input v-model="columnForm.worksheetno" autocomplete="off"></el-input>
		</el-form-item>
        <el-form-item label="类型" prop="ctype" :label-width="formLabelWidth">
          <el-input v-model="columnForm.ctype" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="代理公司" prop="corporation" :label-width="formLabelWidth">
          <el-input v-model="columnForm.corporation" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="货票号" prop="waybillid" :label-width="formLabelWidth">
          <el-input v-model="columnForm.waybillid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remarks" :label-width="formLabelWidth">
          <el-input v-model="columnForm.remarks" autocomplete="off"></el-input>
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
    name: 'logistics',
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
		    worksheetno: null,
		    ctype: null,
		    corporation: null,
		    waybillid: null,
		    remarks: null
			
			}
		}	
    },
    methods: {
		
		query: function() {
		
		
		 // var str1 = qs.stringify(pages);
		  //console.log(str1)
		  let url = 'http://localhost/wuliuxm/selectBiglogLogisticscontroltable';
		  axios.post(url, null).then(resp => {
			  console.log("=--------------------------");
		    console.log(resp);
		    this.result = resp.data;
		  }).catch(error => {
		    console.log(error);
		  });
		
		},

      /* 书本查询方法 */
	  /* 查询之后数据分页 */
      onSubmit: function() { 
		  alert("搜索")
      let pages = {
        column:this.column,
		columnName:this.columnName
      }
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
                  let url = 'http://localhost/wuliuxm/deleteBiglogLogisticscontroltable';
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

        this.columnForm.worksheetno= row.worksheetno;
        this.columnForm.ctype= row.ctype;
        this.columnForm.corporation= row.corporation;
        this.columnForm.waybillid= row.waybillid;
		this.columnForm.remarks= row.remarks;
        this.dialogFormVisible = true;

      },
      /* 添加方法 */
      add: function() {
		  alert("lalala")
		  
        this.title = "添加栏目"
        this.columnForm.worksheetno= null;
        this.columnForm.ctype= null;
        this.columnForm.corporation= null;
        this.columnForm.waybillid= null;
        this.columnForm.remarks= null;
        this.dialogFormVisible = true;
      },
       /* //新增修改提交的方法 */
       doSubmit: function() {
		   alert("xixix")
          this.$refs['columnForm'].validate((valid) => {
          console.log(valid);
          if (valid) {
            console.log("........");
              let url = 'http://localhost/wuliuxm/insertBiglogLogisticscontroltable';
             if (this.title == '编辑栏目') {
                console.log(this.title)
                  url = 'http://localhost/wuliuxm/updateBiglogLogisticscontroltable';
              }
                let pages = {
                 id: this.columnForm.id,
                 worksheetno:this.columnForm.worksheetno,
                 ctype:this.columnForm.ctype,
                 corporation:this.columnForm.corporation,
                 waybillid:this.columnForm.waybillid,
                 remarks:this.columnForm.remarks
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
	  alert("lalala");
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
