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
        <el-input v-model="rolename" placeholder="请输入员工姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-form-item label="是否可用">
          <el-select v-model="disabled" placeholder="--请选择状态--" style="width: 100%;">
            <el-option value="是" label="是"></el-option>
            <el-option value="否" label="否"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item> -->
        <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
      </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-refresh" @click="refresh">重置</el-button>
          </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-plus" @click="add">新增</el-button>
      </el-form-item>
    </el-form>
    <!--数据表格-->
    <el-table :data="result" style="width: 100%;" :border="true" max-height="550">
      <el-table-column prop="id" label="序号" min-width="30" align="center"></el-table-column>
      <el-table-column prop="rolename" label="角色" min-width="50"></el-table-column>
      <el-table-column prop="roledesc"  label="角色描述"  min-width="70"></el-table-column>
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
          <el-button size="mini" type="danger" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          <el-button size="mini" type="danger" @click="handleqx(scope.row)">权限</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background @current-change="change"  layout="prev, pager, next"
      :current-page="pag" :page-size="size" :total="total">
    </el-pagination>

  <!--  对话框-->
    <!-- @close="cleanForm" 关门按钮x   可以写方法  我没 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="RoleForm" ref="RoleForm" :rules="rules">
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
 <el-dialog :title="titles" :visible.sync="dialogFormVisibleqx">
    <el-tree
      :data="qxtext"
      show-checkbox
      default-expand-all
      node-key="id"
      ref="tree"
      highlight-current
      :props="defaultProps"
      >
    </el-tree>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisibleqx = false">取 消</el-button>
      <el-button type="primary" @click="doSubmitqx">确 定</el-button>
   <!--   <el-button @click="resetChecked">清空</el-button> -->
    </div>

 </el-dialog>


  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
  export default {
    name: 'SystemRole',
    data: function() {
      return {

              defaultProps: {
                children: 'symbols',
                label: 'text'
            },
        qxtext:[],
        listid:{},
        qxid:null,
        titles:'权限管理',
        checkAll:false,
        isIndeterminate: true,
        disabled: null, //状态
        rolename: null, //查询名称
        result: [], //主显示集合
        total: 7,
        size: 7, //条数
        pag: 1, //页数
        dialogFormVisible: false,
        dialogFormVisibleqx:false,
        formLabelWidth: "120px",
        title: '添加角色',
        RoleForm: {
          rolename: null,
          roledesc: null,
          disabled: null,

        },
        rules: {
          rolename: [{
              required: true,
              message: '请填写角色',
              trigger: 'blur'
            }],
          roledesc: [{
              required: true,
              message: '请填写描述',
              trigger: 'blur'
              }],
           disabled: [{
              required: true,
              message: 'blur',
              trigger: '请选择状态'
              }],
        }


      }
    },
    methods: {
      /* 权限提交 */
      doSubmitqx:function(){
        /* 点击保存先删除权限 然后在重新添加勾选的权限*/
        //alert(this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys()));
        this.listid=this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys());
        //alert( this.listid+"xx");

        let pages = {
           qxlistid :this.listid,
           roleid: this.qxid,
         }  /* 删除deleteSyRolesmenusRoleidLx*/
         let url1 = 'http://localhost/wuliuxm/deleteSyRolesmenusRoleidLx';
         axios.post(url1, qs.stringify(pages)).then(resps => {
           console.log("删除：" + resps)
         }).catch(error => {
           console.log(error);
         });

           /* 新增*/
          console.log(" list    :"+   qs.stringify(this.listid))
         let url = 'http://localhost/wuliuxm/insertyRolesmenusLx';
         axios.post(url, qs.stringify(pages)).then(resps => {
           console.log("新增：" + resps)
         }).catch(error => {
           console.log(error);
         });



        this.dialogFormVisibleqx = false;



      },
      /* 权限框*/
      handleqx:function(r){
          this.qxid=r.id;
          this.dialogFormVisibleqx = true;
          this.$refs.tree.setCheckedKeys([]);//第一次点击会报错不影响
      },

      /* 书本查询方法 */
      onSubmit: function() {
          this.querys();
          this.max();

      },
 /* 重置按钮*/
      refresh:function(){
        this.rolename=null;
        this.disabled=null;
       this.query(); /* 调用 */
       this.maxs();
      },
      colchange: function(r) {

      },

      /* 删除 */
      handleDelete: function(row) {
       this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning'
       }).then(() => {
         let url = 'http://localhost/wuliuxm/deleteSyRoleLx';
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
       // alert("修改");
        this.title="角色编辑";
        this.RoleForm.id=row.id;
        this.RoleForm.rolename=row.rolename;
        this.RoleForm.roledesc=row.roledesc;
        this.RoleForm.disabled="否";
        if(row.disabled=1){
           this.RoleForm.disabled="是";
        }

        this.dialogFormVisible = true;

      },
      /* 添加方法 */
      add: function() {
        //alert("新增");
         this.title="添加角色";
         this.RoleForm.rolename=null;
         this.RoleForm.roledesc=null;
         this.RoleForm.disabled=null;
         this.dialogFormVisible = true;


      },
      /* //新增修改提交的方法 */
      doSubmit: function() {
        //alert( this.RoleForm.disabled+"top")
        this.$refs['RoleForm'].validate((valid) => {
          console.log(valid);
          if (valid) {
            console.log("........");
            let url = 'http://localhost/wuliuxm/insertSyRoleLx';
            if (this.title == '角色编辑') {
              console.log(this.title)
              url = 'http://localhost/wuliuxm/updateSyRoleLx';
            }
            let pages = {
              id:this.RoleForm.id,
              rolename:this.RoleForm.rolename,
              roledesc:this.RoleForm.roledesc,
              a:this.RoleForm.disabled,
              disabled:0,
                if(a="是"){
                  disabled:1;
                }
            }
            console.log(url)
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
      // 点击分页查询  页数
      change: function(r) {
        //alert(r)
        this.pag=r;
        if(this.rolename==null && this.disabled==null){
            this.query();
        }else{
            this.querys();
        }


      },
      //初始化分页查询   封装方法方便全局调用
      query: function() {
         let pages = {
            pag: this.pag,
            size: this.size,
          }
         console.log(qs.stringify(pages))
          let url = 'http://localhost/wuliuxm/FillAllSyRoleZhuLx';
          axios.post(url, qs.stringify(pages)).then(resps => {
            console.log("abc" + resps)
            this.result = resps.data;
          }).catch(error => {
            console.log(error);
          });
      },
      querys: function() {
        let pages = {
          rolename: this.rolename,
          disabled: this.disabled,
           pag: this.pag,
           size: this.size,
         }
        console.log(qs.stringify(pages))
         let url = 'http://localhost/wuliuxm/FillAllSyRoleLikePagLx';
         axios.post(url, qs.stringify(pages)).then(resps => {
           console.log("abc" + resps)
           this.result = resps.data;
         }).catch(error => {
           console.log(error);
         });
      },
      /* Max*/
      max: function() {
           let pages = {
              rolename: this.rolename,
              disabled: this.disabled,
            }
            console.log(qs.stringify(pages))
            let url = 'http://localhost/wuliuxm/MaxSyRoleLx';
            axios.post(url, qs.stringify(pages)).then(resps => {

              //var result = $.parseJSON(jsonData);// 转成JSON对象
              console.log("最大最" + resps)
              this.total = resps.data;
            }).catch(error => {
              console.log(error);
            });
      },
      maxs:function(){
         let url = 'http://localhost/wuliuxm/MaxSyRoleOewLx';
         axios.post(url, null).then(resps => {
           console.log("最大最" + resps)
           this.total = resps.data;
         }).catch(error => {
           console.log(error);
         });
      },


    },
/* ------------------------------------------ */

    created: function() { /* 初始化 */
      //初始化分页查询
      this.query(); /* 调用 */
      this.maxs();
      console.log("xxxx")
         let url = 'http://localhost/wuliuxm/FillAllOneTwoColumnSyMenus';
          axios.post(url, null).then(resps => {
            console.log("abc" + resps)
            console.log(resps.data)
            this.qxtext = resps.data;
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
