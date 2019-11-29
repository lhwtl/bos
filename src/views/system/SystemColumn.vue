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
      <el-form-item label="请选择栏目" ><!--v-for="c in oneColumn"  -->
        <el-select v-model="column"  placeholder="--请选择主栏目--" @change="colchange">
          <el-alert value="--请选择主栏目--" label="--请选择主栏目--"></el-alert>
          <el-option v-for="c1 in oneColumn"   :key="'key'+c1.id"  :value="c1.id"  :label="c1.text"   ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="栏目名称">
        <el-input v-model="columnName" placeholder="请输入栏目名称"></el-input>
      </el-form-item>
      <el-form-item>
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
      <el-table-column prop="parentid" label="上级栏目" min-width="60">
        <template slot-scope="scope1">
          <div v-for="(p,index) in oneColumn" :key="index" >
            <p v-if="scope1.row.parentid==p.id">{{p.text}}</p>
          </div>
          <p v-if="scope1.row.parentid=='0'">待分配上级编号</p>
          <p v-if="scope1.row.parentid=='-1'">暂无上级编号</p>
          <!-- <span v-if="scope1.row.parentid=='-1'">暂无上级编号</span>
           <span v-if="scope1.row.parentid=='0'">待分配上级编号</span>
           <span v-if="scope1.row.parentid!='-1' && scope1.row.parentid!='0'">{{scope1.row.parentid}}</span> -->

         </template>
      </el-table-column>
      <!-- <el-table-column prop="parentid" label="上级栏目" min-width="50"></el-table-column> -->
      <el-table-column prop="type" label="栏目类型" min-width="50"></el-table-column>
      <el-table-column prop="text" label="栏目名称" min-width="60"></el-table-column>
      <el-table-column prop="url" label="栏目地址" min-width="60"></el-table-column>
      <el-table-column prop="tip" label="栏目提示语" min-width="70"></el-table-column>
      <el-table-column label="操作" min-width="100">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          <el-button size="mini"  @click="handleupdate(scope.row)">栏目</el-button>
        </template>
      </el-table-column>
    </el-table>
   <el-pagination background @current-change="change" @size-change="SizeChange" layout="prev, pager, next"
    :current-page="pag"
    :page-size="size"
     :total="total"
      >
    </el-pagination>


    <!--对话框-->
    <el-dialog :title="title" :visible.sync="dialogFormVisible" >
      <!-- @close="cleanForm" 关门按钮x   可以写方法  我没写-->
      <el-form :model="columnForm" ref="columnForm" :rules="rules">
        <!--:model="bookForm" ref="bookForm" :rules="rules" -->
        <el-form-item label="编号" :label-width="formLabelWidth" v-show="false">
          <el-input v-model="columnForm.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="栏目级" prop="parentid" :label-width="formLabelWidth">
          <el-select v-model="columnForm.parentid" placeholder="--请选择栏目级--" style="width: 100%;">
            <el-option   value="-1"  label="一级栏目"  ></el-option>
            <el-option   value="0"  label="二级栏目"></el-option><!--  我不是这么写的右箭头写不出 如果parentid不等于负一就显示二级目录if判断 -->
          </el-select>
        </el-form-item>

        <el-form-item label="栏目名称" prop="text" :label-width="formLabelWidth">
          <el-input v-model="columnForm.text" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="栏目类型" prop="type" :label-width="formLabelWidth">
          <el-input v-model="columnForm.type" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="栏目提示语" prop="tip" :label-width="formLabelWidth">
          <el-input v-model="columnForm.tip" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="栏目路径" prop="url" :label-width="formLabelWidth">
          <el-input v-model="columnForm.url" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="doSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!--  选择二级菜单显示 v-show="false">
        <el-form-item label="请选择栏目" prop="column" :label-width="formLabelWidth" >
          <el-select v-model="column"  placeholder="--请选择主栏目--"  @change="twochange" style="width: 100%;">
            <el-alert value="--请选择主栏目--" label="--请选择主栏目--"></el-alert>
            <el-option v-for="c1 in oneColumn"   :key="'key'+c1.id"  :value="c1.id"  :label="c1.text"   ></el-option>
          </el-select>
        </el-form-item>-->
    <!--对话框-->
    <el-dialog :title="title" :visible.sync="dialogFormVisibletwo" >
      <el-form :model="columnForm" ref="columnFormtwo" :rules="rules">
        <el-form-item label="编号" :label-width="formLabelWidth" v-show="false">
          <el-input v-model="columnForm.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="请选择栏目" prop="parentid" :label-width="formLabelWidth" >
          <el-select v-model="columnForm.parentid"  placeholder="--请选择主栏目--"  style="width: 100%;">
            <el-alert value="--请选择主栏目--" label="--请选择主栏目--"></el-alert>
            <el-option v-for="c1 in oneColumn"   :key="'key'+c1.id"  :value="c1.id"  :label="c1.text"   ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibletwo = false">取 消</el-button>
          <el-button type="primary" @click="doSubmittwo">确 定</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
  export default {
    name: 'SystemColumn',
    data: function() {
      return {
        twoxs:false,
        column: null,
        columnName: null,
        result: [],
        oneColumn: {},
        /* 一级栏目 */
        total:67,
        size: 7, //条数
        pag: 1, //页数
        dialogFormVisible: false,
        dialogFormVisibletwo:false,
        formLabelWidth: "120px",
        title: '添加栏目',
            columnForm:{
            id: null,
            parentid: null,
            type: null,
            text: null,
            url: null,
            tip: null,},
            rules: {
                      parentid: [{
                          required: true,
                          message: '请选择栏目',
                          trigger: 'change'
                        },
                     /*   {
                          min: 1,
                          max: 5,
                          message: '长度在 1 到 5 个字符',
                          trigger: 'blur'
                        } */
                      ],
                      text: [{
                        required: true,
                        message: '请输入栏目名',
                        trigger: 'blur'/* blur change*/
                      }],
                      type: [{
                        required: true,
                        message: '请输入栏目类型 ',
                        trigger: 'blur'
                      }],
                      tip: [{
                        required: true,
                        message: '请输入栏目提示语 ',
                        trigger: 'blur'
                      }],
                      url: [{
                        required: true,
                        message: '请输入栏目路径 ',
                        trigger: 'blur'
                      }]
                    }


      }
    },
    methods: {
      /* 二级栏目却修改*/
    doSubmittwo:function(){
      this.$refs['columnFormtwo'].validate((valid) => {
        console.log(valid);
        if (valid) {
               var url = 'http://localhost/wuliuxm/updateSyMenusTwoLx';
              let pages = {
               id: this.columnForm.id,
               parentid:this.columnForm.parentid,
              }
              console.log(url)
          axios.post(url, qs.stringify(pages)).then(resp => {
            console.log(resp)
          this.dialogFormVisibletwo=false;
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
    handleupdate:function(r){
      if(r.parentid=='-1'){
        this.$message({
          type: 'info',
          message: '一级栏目不能修改'
        });
        return false;
      }
       this.columnForm.id= r.id;
       this.columnForm.parentid=null;
       this.dialogFormVisibletwo=true;
    },


      /* 书本查询方法 */
      onSubmit: function() { /* 查询之后数据分页 */
        this.column="--请选择主栏目--";
        /* max3   模糊查询最大值赋值*/
        let pages = {
          column:this.columnName,
        }
        let urll = 'http://localhost/wuliuxm/MaxMenusLikeNameLX';
        axios.post(urll, qs.stringify(pages)).then(resp => {
          console.log(resp.data);
          this.total = resp.data; /* 赋值最大值 */
        }).catch(error => {
          console.log(error);
        });


        /* 分页查*/
        this.pag=1,
        this.size=7;
        this.query();
      },
      /* 重置按钮*/
      refresh:function(){
             this.column=null;
             this.columnName=null;
           this.query(); /* 调用 */
           //max最大值
          this.max();
           },
      /* 下拉框值改变事件*/
      colchange:function(r){

            let pages = {
             pag: 1,
             size: 7,
             column:r,
            }
            console.log("...0"+qs.stringify(pages))
            let url = 'http://localhost/wuliuxm/FillSyMenusByidLX';
            axios.post(url, qs.stringify(pages)).then(resp => {
              console.log(resp)
              this.result = resp.data;
            }).catch(error => {
              console.log(error);
            });

          /* max查询*/
          let url1 = 'http://localhost/wuliuxm/MaxTwoMenusByidLX';
          axios.post(url1, qs.stringify(pages)).then(resp => {
            console.log(resp)
            this.total = resp.data;
            console.log("max:"+this.total)
          }).catch(error => {
            console.log(error);
          });
      },
      /* 删除 */
      handleDelete: function(row) {
         this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  let url = 'http://localhost/wuliuxm/deleteSyMenus';
                       let pages = {
                        id: row.id,
                       }
                   axios.post(url, qs.stringify(pages)).then(resp => {
                     console.log(resp)
                     this.$message({
                       type: 'success',
                       message: '删除成功!'
                     });
                     this.query(); /* 调用 */
                     //max最大值
                     this.max();
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
         this.title = "编辑栏目",
         this.columnForm.id= row.id;
        if(row.parentid=='-1'){
            this.columnForm.parentid='一级目录';
         }else{
            this.columnForm.parentid='二级目录';
         }

        this.columnForm.type= row.type;
        this.columnForm.text= row.text;
        this.columnForm.url= row.url;
        this.columnForm.tip= row.tip;
        this.dialogFormVisible = true;

      },
      /* 添加方法 */
      add: function() {
        this.title = "添加栏目"
         this.columnForm.parentid=null;
         this.columnForm.type= null;
         this.columnForm.text= null;
         this.columnForm.url= null;
         this.columnForm.tip= null;
        this.dialogFormVisible = true;

      },
       /* //新增修改提交的方法 */
       doSubmit: function() {
          this.$refs['columnForm'].validate((valid) => {
          console.log(valid);
          if (valid) {
            console.log("........");
              let url = 'http://localhost/wuliuxm/insertSyMenus';
             if (this.title == '编辑栏目') {
                console.log(this.title)
                  url = 'http://localhost/wuliuxm/updateSyMenus';
              }
                let pages = {
                 id: this.columnForm.id,
                 parentid:this.columnForm.parentid,
                 type:this.columnForm.type,
                 text:this.columnForm.text,
                 url:this.columnForm.url,
                 tip:this.columnForm.tip,
                }
                console.log(url)
            axios.post(url, qs.stringify(pages)).then(resp => {
              console.log(resp)
              this.dialogFormVisible = false;//隐藏
          this.query(); /* 调用 */
           //max最大值
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

          this.pag = r;
          this.query();

              if(this.column!=null){/*'--请选择主栏目--'  */
                let pages = {
                     pag: r,
                     size: 7,
                     column:this.column,
                     }

                  console.log("...0"+qs.stringify(pages))
                  let url = 'http://localhost/wuliuxm/FillSyMenusByidLX';
                  axios.post(url, qs.stringify(pages)).then(resp => {
                    console.log(resp)
                    this.result = resp.data;
                  }).catch(error => {
                    console.log(error);
                  });
                }
      },
      /*没传 行数 */
      SizeChange: function(h) {},
      //初始化分页查询   封装方法方便全局调用
      query: function() {

        let pages = {
          pag: this.pag,
          size: this.size,
          column:this.columnName,
          /* columnName:this.columnName, */
        }
        var str1 = qs.stringify(pages);
        console.log(str1)
        let url = 'http://localhost/wuliuxm/FillAllSyMenusPag';
        axios.post(url, str1).then(resp => {
          console.log(resp)
          this.result = resp.data;
        }).catch(error => {
          console.log(error);
        });

      },
      max:function(){
        let urll = 'http://localhost/wuliuxm/MaxSyMenus';
        axios.post(urll, null).then(resp => {
          console.log("max"+resp.data);
          this.total = resp.data; /* 赋值最大值 */
          console.log(this.total);
        }).catch(error => {
          console.log(error);
        });
        //一级栏目
        let pathurl = 'http://localhost/wuliuxm/FillAllOneColumnSyMenus';
          axios.post(pathurl, null).then(resp => {
          console.log(resp.data);
          this.oneColumn = resp.data; /* 赋值最大值 */
        }).catch(error => {
          console.log(error);
        });
      },


    },


    created: function() { /* 初始化 */
      //初始化分页查询
      this.query(); /* 调用 */
      //max最大值
      this.max();


    }

  }
</script>

<style>
  .divClass {
    margin-top: 10px;
    margin-left: 10px;
  }
</style>
