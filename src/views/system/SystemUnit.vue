<template>
  <div class="divClass">
    <!--面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a>单位管理</a></el-breadcrumb-item>
    </el-breadcrumb>
    <!--搜索框-->
    <el-form :inline="true" class="demo-form-inline" style="margin-top: 10px;">

      <el-form-item label="单位名称">
        <el-input v-model="unitname" placeholder="请输入单位名称"></el-input>
      </el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-plus" @click="add">新增</el-button>
      </el-form-item>
    </el-form>
    <!--数据表格-->
    <el-table :data="result"   style="width: 100%;" :border="true" max-height="550">
      <el-table-column prop="id" label="序号" min-width="30" align="center"></el-table-column>
      <el-table-column prop="syEmp.empno" label="编号" min-width="40"></el-table-column>
      <el-table-column prop="name" label="单位名称" min-width="50"></el-table-column>
      <el-table-column prop="remarks"  label="备注"  min-width="70"></el-table-column>
      <el-table-column prop="syEmp.empname"  label="操作员"  min-width="70"></el-table-column>
      <el-table-column prop="operationtime"  label="操作时间"  min-width="70"></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background @current-change="change"  layout="prev, pager, next"
      :current-page="pag" :page-size="size" :total="total">
    </el-pagination>

    <!-- @close="cleanForm" 关门按钮x   可以写方法  我没 -->
   <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="UnitForm" ref="UnitForm" :rules="rules">
        <el-form-item label="编号" :label-width="formLabelWidth" v-show="false">
          <el-input v-model="UnitForm.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="单位名称" prop="name" :label-width="formLabelWidth">
          <el-input v-model="UnitForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remarks" :label-width="formLabelWidth">
          <el-input v-model="UnitForm.remarks" autocomplete="off"></el-input>
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
// import global_ from '../../components/Global'//引用模块进来 局部
  import axios from 'axios'
  import qs from 'qs'
  export default {
    name: 'SystemUnit',
    data: function() {
      return {
        //TOemp:this.GLOBAL.TOemp,
        //  token:this.GLOBAL.token,//直接通过this访问  全局变量。
        TOemp:null,
        cname:null,
        empnos:null,
        empnames:null,
        unitname: null, //查询名称
        result: [], //主显示集合
        total: 7,
        size: 7, //条数
        pag: 1, //页数
        dialogFormVisible: false,
        formLabelWidth: "120px",
        title: '单位员工',
        UnitForm: {
          name: null,//公司名
          remarks: null, //备注
        },
        rules: {
          name: [{
              required: true,
              message: '请填写公司名称',
              trigger: 'blur'
            }],
          remarks: [{
            required: true,
            message: '请输入备注',
            trigger: 'blur' /* blur change*/
          }]
      }
    }
},
    methods: {
      /* 书本查询方法 */
      onSubmit: function() {

         //alert("查询方法");
         this.query();
         this.max();
      },

      /* 删除 */
      handleDelete: function(row) {
       // alert(row.id);

        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let url = 'http://localhost/wuliuxm/deleteSyUnitsLx';
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
      /*编辑修改 */
      handleEdit: function(row) {
        //  alert("修改");
      //  alert(row.syEmp.empno)
        this.title="修改单位";
        this.UnitForm.id=row.id;
        this.UnitForm.name=row.name;
        this.UnitForm.remarks=row.remarks;
        this.empnames=row.syEmp.id,
        this.dialogFormVisible = true;

      },
      /* 添加方法 */
      add: function() {
        //alert("添加")
         this.title="添加单位";
        this.UnitForm.name=null;
        this.UnitForm.remarks=null;
        this.dialogFormVisible = true;

      },
      /* //新增修改提交的方法 */
      doSubmit: function() {
        this.$refs['UnitForm'].validate((valid) => {
          alert(valid);
          console.log(valid);
          if (valid) {
            console.log("........");
            let url = 'http://localhost/wuliuxm/insertSyUnitsLx';
            if (this.title == '修改单位') {
              console.log(this.title)
              url = 'http://localhost/wuliuxm/updateSyUnitsLx';
            }
            let pages = {
             id:this.UnitForm.id,
             name:this.UnitForm.name,
             remarks:this.UnitForm.remarks,
             empid:this.empnames,
             toemp:this.TOemp,
            }
            console.log("值值值:"+pages)
            axios.post(url, qs.stringify(pages)).then(resp => {
              console.log(resp)
              this.dialogFormVisible = false; //隐藏
              this.query();
              this.max();
            }).catch(error => {
              console.log("失败");
            });
          } else {
            console.log('error submit!!提交失败');
            return false;
          }
        });


      },
      /* 点击分页查询  页数 */
      change: function(r) {
        this.pag=r;
        this.query();
       // this.max();
      },
      //初始化分页查询   封装方法方便全局调用
      query: function() {
        let pages = {
            name:this.unitname,
            pag: this.pag,
            size: this.size,
          }
        //console.log(pages)
        let url = 'http://localhost/wuliuxm/FillAllSyUnitsLx';
        axios.post(url, qs.stringify(pages)).then(resps => {
         // console.log("abc" + resps)
          this.result = resps.data;
         // Console.log(this.result)
        }).catch(error => {
          console.log(error);
        });
      },
      max:function(){
        let pages = {
            name:this.unitname,
          }
          //console.log(pages)
          let url = 'http://localhost/wuliuxm/MaxSyUnitsLx';
          axios.post(url, qs.stringify(pages)).then(resps => {
            console.log("abc" + resps)
            this.total = resps.data;
           // Console.log(this.result),
          }).catch(error => {
            console.log(error);
          });
      }
  }, /* ---------------------------------------------*/
     created: function() { /* 初始化 */
      this.query();
      this.max();
    },
    mounted() {
      this.TOemp=this.$session.get("key");



    }
}
</script>

<style>
  .divClass {
    margin-top: 10px;
    margin-left: 10px;
  }
</style>
