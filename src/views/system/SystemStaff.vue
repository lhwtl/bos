<template>
  <div class="divClass">
    <!--面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a>员工管理</a></el-breadcrumb-item>
    </el-breadcrumb>
    <!--搜索框-->

    <el-form :inline="true" class="demo-form-inline" style="margin-top: 10px;">

      <el-form-item label="员工姓名">
        <el-input v-model="empname" placeholder="请输入员工姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-form-item label="是否可用">
          <el-select v-model="disabled" placeholder="--请选择状态--" style="width: 100%;">
            <el-option value=1 label="是"></el-option>
            <el-option value=0 label="否"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item> -->
        <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-plus" @click="add">新增</el-button>
      </el-form-item>
    </el-form>
    <!--数据表格-->
    <el-table :data="result" style="width: 100%;" :border="true" max-height="550">
      <el-table-column prop="id" label="序号" min-width="30" align="center"></el-table-column>
      <el-table-column prop="empno" label="编号" min-width="40"></el-table-column>
      <el-table-column prop="empname" label="用户名" min-width="50"></el-table-column>
      <el-table-column prop="roleid"  label="角色"  min-width="70"></el-table-column>
     <!-- <el-table-column prop="disabled"  label="状态"  min-width="70"></el-table-column> -->
     <el-table-column prop="disabled"  label="状态" min-width="70">
       <template slot-scope="scope1">
          <span v-if="scope1.row.disabled==0">否</span>
          <span v-if="scope1.row.disabled==1">是</span>
       </template>
     </el-table-column>
<!--<p v-if="ok">现在你可以看到我了</p>
            <p v-else>隐藏了</p>-->

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

  <!--  对话框-->
    <!-- @close="cleanForm" 关门按钮x   可以写方法  我没 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="StaffForm" ref="StaffForm" :rules="rules">
        <el-form-item label="编号" :label-width="formLabelWidth" v-show="false">
          <el-input v-model="StaffForm.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="员工姓名" prop="empname" :label-width="formLabelWidth">
          <el-input v-model="StaffForm.empname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd" :label-width="formLabelWidth">
          <el-input v-model="StaffForm.pwd" autocomplete="off"></el-input>
        </el-form-item>
       <!-- <el-form-item label="确认密码" prop="pwd" :label-width="formLabelWidth">
          <el-input v-model="StaffForm.pwd" autocomplete="off"></el-input>
        </el-form-item> -->
        <el-form-item label="查台密码" prop="querypwd" :label-width="formLabelWidth">
          <el-input v-model="StaffForm.querypwd" autocomplete="off"></el-input>
        </el-form-item>
       <!-- <el-form-item label="确认查台密码" prop="QueryPwd" :label-width="formLabelWidth">
          <el-input v-model="StaffForm.QueryPwd" autocomplete="off"></el-input>
        </el-form-item> -->
        <el-form-item label="角色" prop="roleid" :label-width="formLabelWidth">
          <el-select v-model="StaffForm.roleid" placeholder="--请选择角色--" style="width: 100%;">
            <el-option v-for="d1 in role" :key="d1.id" :index="d1.id" :value="d1.id" :label="d1.rolename" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属单位" prop="empunit" :label-width="formLabelWidth">
          <el-select v-model="StaffForm.empunit" placeholder="--请选择单位--" style="width: 100%;">
            <el-option v-for="d1 in gong" :key="d1.id" :index="d1.id" :value="d1.id" :label="d1.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="disabled" :label-width="formLabelWidth">
          <el-select v-model="StaffForm.disabled" placeholder="--请选择状态--" style="width: 100%;">
            <el-option value=1 label="是"></el-option>
            <el-option value=0 label="否"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工号" prop="empno" :label-width="formLabelWidth">
          <el-input v-model="StaffForm.empno" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark" :label-width="formLabelWidth">
          <el-input v-model="StaffForm.remark" autocomplete="off"></el-input>
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
    name: 'SystemStaff',
    data: function() {
      return {
        disabled: null, //状态
        empname: null, //查询名称
        result: [], //主显示集合
        role:[],//角色
        gong:[],//员工公司
        total: 7,
        size: 7, //条数
        pag: 1, //页数
        dialogFormVisible: false,
        formLabelWidth: "120px",
        title: '添加员工',
        StaffForm: {
          empname: null,
          empno: null,
          pwd: null,
          querypwd: null,
          roleid: null, //角色id
          empunit: null, //单位id
          remark: null, //备注
          disabled: null, //状态
        },
        rules: {
          empname: [{
              required: true,
              message: '请填写',
              trigger: 'change'
            },

          ],
          EmpNo: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur' /* blur change*/
          }],
          pwd: [{
            required: true,
            message: '请输入密码 ',
            trigger: 'blur'
          }, {
            min: 3,
            max: 16,
            message: '长度在 3 到 16 个字符',
            trigger: 'blur'
          }],
          QueryPwd: [{
            required: true,
            message: '请输入查台密码 ',
            trigger: 'blur'
          }, {
            min: 3,
            max: 16,
            message: '长度在 3 到 16 个字符',
            trigger: 'blur'
          }],
          RoleID: [{
            required: true,
            message: '请输入管理员 ',
            trigger: 'blur'
          }],
          EmpUnit: [{
            required: true,
            message: '请输入单位 ',
            trigger: 'blur'
          }],
          Remark: [{
            required: true,
            message: '请输入备注 ',
            trigger: 'blur'
          }],
          disabled: [{
            required: true,
            message: '请选择状态 ',
            trigger: 'blur'
          }]
        }


      }
    },
    methods: {
      /* 书本查询方法 */
      onSubmit: function() {

          let pages = {
            empname: this.empname,
            disabled: this.disabled,
            pag: this.pag,
            size: this.size,
          }
         /* //console.log(qs.stringify(pages)) */
          let url = 'http://localhost/wuliuxm/FillAllSyEmpLikePagLx';
          axios.post(url, qs.stringify(pages)).then(resps => {
            console.log("abc" + resps)
            this.result = resps.data;
          }).catch(error => {
            console.log(error);
          });
        this.max();
      },

      colchange: function(r) {

      },
      /* 删除 */
      handleDelete: function(row) {
        //alert(row.id);
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let url = 'http://localhost/wuliuxm/deleteSyEmpLx';
          let pages = {
            id: row.id,
          }
          axios.post(url, qs.stringify(pages)).then(resp => {
            console.log(resp)
            this.query();
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
        this.title="员工编辑";
        this.StaffForm.id=row.id;
        this.StaffForm.empname=row.empname;
        this.StaffForm.empno=row.empno;
        this.StaffForm.pwd=row.pwd;
        this.StaffForm.querypwd=row.querypwd;
        this.StaffForm.roleid=row.roleid;
        this.StaffForm.empunit=row.empunit;
        this.StaffForm.remark=row.remark;

        this.StaffForm.disabled="否";
        if(row.disabled==1){
          this.StaffForm.disabled="是";
        }
        this.dialogFormVisible = true;

      },


    },


    created: function() { /* 初始化 */
      //初始化分页查询
      this.query(); /* 调用 */
      this.max();
      /* 角色*/
     let url1 = 'http://localhost/wuliuxm/FillAllSyRole';
      axios.post(url1, null).then(resps => {
        console.log("角色" + resps)
          this.role = resps.data;
      }).catch(error => {
        console.log(error);
      });
      /* 公司*/
     let url2 = 'http://localhost/wuliuxm/FillAllSyUnitsLx';
      axios.post(url2, null).then(resps => {
        console.log("公司" + resps)
          this.gong = resps.data;
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
