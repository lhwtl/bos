<template>
  <div class="ktzd">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top: 20px;">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>调度</el-breadcrumb-item>
      <el-breadcrumb-item>宣传任务</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="宣传概要">
        <el-input v-model="outline" placeholder="请输入宣传概要" style="width: 150px;"></el-input>
      </el-form-item>
      <el-form-item label="发布时间">
        <el-input v-model="releasetime" placeholder="请输入发布时间" style="width: 150px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button @click="moreGet">更多</el-button>
      </el-form-item>
      <br>
      <el-form-item v-show="ok" label="宣传内容">
        <el-input v-model="content" placeholder="宣传内容" style="width: 300px;"></el-input>
      </el-form-item>
      <el-form-item v-show="ok" label="状态">
       <el-select v-model="status" placeholder="请选择" style="width: 300px;">
         <el-option v-for=" item in options" :key="item.id" :label="item.name" :value="item.id">
         </el-option>
       </el-select>
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <el-table :data="result" border style="width: 100%">

      <el-table-column type="selection" width="80">
      </el-table-column>
      <el-table-column prop="id" label="序号" width="80">
      </el-table-column>
      <el-table-column prop="outline" label="宣传概要" width="80">
      </el-table-column>
      <el-table-column prop="releasetime" label="发布时间" width="80">
      </el-table-column>
      <el-table-column prop="failuretime" label="失效时间" width="80">
      </el-table-column>
      <el-table-column prop="releasetime" label="更新时间" width="100">
      </el-table-column>
      <el-table-column v-model="gxunit" label="更新单位" width="100">
        {{gxunit}}
      </el-table-column>
      <el-table-column v-model="gxperson" label="更新人" width="80">
        {{gxperson}}
      </el-table-column>
      <el-table-column prop="status" label="状态" width="80">
        <template slot-scope="scope2">
          <span v-if="scope2.row.status==1">开启</span>
          <span v-if="scope2.row.status==2">作废</span>
        </template>
      </el-table-column>
      <el-table-column prop="content" label="宣传内容" width="80">
      </el-table-column>
      <el-table-column label="操作" width="230">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="handleadd">新增</el-button>
          <el-button size="mini" type="success" @click="handleEdit(scope.row)">修改</el-button>
          <el-button size="mini" type="success" @click="handleDetail(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pages"
      :page-sizes="[1,3,5,8]" :page-size="rows" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>


    <!-- 详情-->
    <el-dialog :title="宣传任务详情" :visible.sync="dialogFormVisibledetail">
      <h3 style="text-align: left;">宣传任务详情</h3>
      <hr />
      <el-form :model="Signinput" ref="Signinput" :rules="rules">
        发布时间:<el-input v-model="Signinput.releasetime" placeholder="请输入内容" readonly="true" style="width: 250px;"></el-input>
        失效时间:<el-input v-model="Signinput.failuretime" placeholder="请输入内容" readonly="true" style="width: 250px;"></el-input><br />
        状态:<el-input v-model="Signinput.status" placeholder="请输入内容" readonly="true" style="width: 250px;"></el-input>
        更新时间:<el-input v-model="Signinput.datenew" placeholder="请输入内容" readonly="true" style="width: 250px;"></el-input><br />
        更新单位:<el-input v-model="Signinput.unit" placeholder="请输入内容" readonly="true" style="width: 550px;"></el-input><br />
        宣传概要:<el-input v-model="Signinput.outlines" placeholder="请输入内容" readonly="true" style="width: 550px;"></el-input><br />
        宣传内容:<el-input v-model="Signinput.contents" placeholder="请输入内容" readonly="true" style="width: 550px;"></el-input><br />

      </el-form>
    </el-dialog>

    <!-- 新增修改对话框-->
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="Propagand" ref="Propagand" :rules="rules">
        <el-form-item label="编号" :label-width="formLabelWidth" v-show="false">
          <el-input v-model="Propagand.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="发布时间" prop="releasetime" :label-width="formLabelWidth">
            <el-date-picker v-model="Propagand.releasetime" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="失效时间" prop="failuretime" :label-width="formLabelWidth">
            <el-date-picker v-model="Propagand.failuretime" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>

         <el-form-item label="状态" prop="status" :label-width="formLabelWidth">
           <template>
             <el-radio v-model="Propagand.status" label="1">开启</el-radio>
             <el-radio v-model="Propagand.status" label="2">关闭</el-radio>
           </template>
         </el-form-item>
        <el-form-item label="宣传概要" prop="outline" :label-width="formLabelWidth">
            <el-input v-model="Propagand.outline"  autocomplete="off" style="width: 500px"></el-input>
        </el-form-item>

        <el-form-item label="宣传内容" prop="content" :label-width="formLabelWidth">
           <el-input v-model="Propagand.content"  autocomplete="off" style="width: 500px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addEditSubmit">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
  export default {
    name: 'Manualscheduling',
    data: function() {
      return {
        result: [],
        outline: '',
        releasetime: '',
        content:'',
        status:1,
        dialogFormVisibledetail: false,
        dialogFormVisible: false,
        total: 10,
        pages: 1,
        rows: 5,
        radio: 3,
        options: [{
          id:1,
          name:'开启'
        },
        {
          id:2,
          name:'关闭'
        }
        ],
        ok: false,
        gxperson: '',
        Signinput: {
          releasetime: null,
          failuretime: null,
          status: null,
          datenew: null,
          unit: null,
          outlines: null,
          contents: null

        },
        Propagand:{
          id:null,
          releasetime:null,
          failuretime: null,
          status: null,
          outline: null,
          content: null
        },
        rules:{
         releasetime:[{
            required: true, message: '请选择发布时间', trigger: 'change'
           }
         ],
         failuretime:[{
           required: true, message: '请选择失效时间', trigger: 'change'
         }],
         outline:[{
            required: true, message: '请输入宣传概要', trigger: 'blur'
         }],
         content:[{
            required: true, message: '请输入宣传内容', trigger: 'blur'
         }]

        },
        empno:'',
        gxunit:''

      }
    },
    methods: {
      onSubmit: function() {
        let fy = {
          pages: this.pages,
          rows: this.rows,
          outline: this.outline,
          content:this.content,
          status:this.status
        }
        var str = qs.stringify(fy);
        let url = "http://localhost/wuliuxm/selectDisPropagandataskHlp"
        axios.post(url, str).then(response => {
          this.result = response.data.rows;
          this.total = response.data.total;
        }).catch(error => {
          console.log('erro')
        });

      },
      resetForm: function(formName) {
        this.$refs[formName].resetFields();
      },
      moreGet: function() {
        this.ok = !this.ok;
      },
      handleCurrentChange: function(pages) {
        this.pages = pages;
        let fy = {
          pages: this.pages,
          rows: this.rows,
          outline: this.outline,
          content:this.content,
          status:this.status
        }
        var str = qs.stringify(fy);
        let url = "http://localhost/wuliuxm/selectDisPropagandataskHlp"
        axios.post(url, str).then(response => {
          this.result = response.data.rows;
          this.total = response.data.total;
        }).catch(error => {
          console.log('erro')
        });
      },
      handleSizeChange: function(rows) {
        this.rows = rows
        let fy = {
          pages: this.pages,
          rows: this.rows,
          outline: this.outline,
          content:this.content,
          status:this.status
        }
        var str = qs.stringify(fy);
        let url = "http://localhost/wuliuxm/selectDisPropagandataskHlp"
        axios.post(url, str).then(response => {
          this.result = response.data.rows;
          this.total = response.data.total;
        }).catch(error => {
          console.log('erro')
        });
      },
      handleDetail: function(row) {
        this.dialogFormVisibledetail = true;
        this.Signinput.releasetime = row.releasetime;
        this.Signinput.failuretime = row.failuretime;

        if (row.status == 1) {
          this.Signinput.status = '启用';
        }

        if (row.status == 2) {
          this.Signinput.status = '停用';
        }
        this.Signinput.datenew = row.releasetime;
        this.empno=this.$session.get("key",this.empno);
         let pages = {
           empno:this.empno
         }
         let str2=qs.stringify(pages);
         let url6 = "http://localhost/wuliuxm/selectSyEmpByempnoHlp"
         axios.post(url6, str2).then(response => {
             this.Signinput.unit=response.data.syUnits.name;
         }).catch(error => {
           console.log('erro')
         });

        this.Signinput.outlines = row.outline;
        this.Signinput.contents = row.content;

      },
      handleadd: function() {
        this.title = '增加';
        this.dialogFormVisible = true;
        this.Propagand.status='1';

      },
      handleEdit: function(row) {
        this.title='修改';
        this.dialogFormVisible = true;
        this.Propagand.id=row.id;
        this.Propagand.outline=row.outline;
        this.Propagand.releasetime=row.releasetime;
        this.Propagand.failuretime=row.failuretime;
        this.Propagand.content=row.content;
        this.Propagand.status=row.status+'';

      },
      addEditSubmit:function(){
        this.$refs['Propagand'].validate((valid) => {
          console.log(valid);
          if (valid) {
            if (this.title=='增加') {
                 let url = 'http://localhost/wuliuxm/addDisPropagandataskHlp';
                 let pages = {
                   id:this.Propagand.id,
                   releasetime:this.Propagand.releasetime,
                   failuretime:this.Propagand.failuretime,
                   status:this.Propagand.status,
                   outline:this.Propagand.outline,
                   content:this.Propagand.content

                     }
                     axios.post(url, qs.stringify(pages)).then(resp => {
                       console.log(resp)
                       this.dialogFormVisible = false; //隐藏
                       this.onSubmit();
                     }).catch(error => {
                       console.log("失败");
                     });
            }
           if(this.title=='修改'){
             let url = 'http://localhost/wuliuxm/updateDisPropagandataskHlp';
             let pages = {
                 id:this.Propagand.id,
                 releasetime:this.Propagand.releasetime,
                 failuretime:this.Propagand.failuretime,
                 status:this.Propagand.status,
                 outline:this.Propagand.outline,
                 content:this.Propagand.content
                 }
                 console.log(url)
                 axios.post(url, qs.stringify(pages)).then(resp => {
                   console.log(resp)
                   this.dialogFormVisible = false; //隐藏
                   this.onSubmit();
                 }).catch(error => {
                   console.log("失败");
                 });
             }

               } else {
                 console.log('error submit!!提交失败');
                 return false;
               }
             });



      }


    },
    //钩子函数
    created: function() {

      let fy = {
        pages: this.pages,
        rows: this.rows,
        outline: this.outline,
        content:this.content,
        status:this.status
      }
      var str = qs.stringify(fy);
      let url = "http://localhost/wuliuxm/selectDisPropagandataskHlp"
      axios.post(url, str).then(response => {
        this.result = response.data.rows;
        this.total = response.data.total;
        response.data.rows.gxperson = this.$cookies.get("gxr");
        console.log(response.data.rows.content + "内容内容");
      }).catch(error => {
        console.log('erro')
      });

      this.gxperson = this.$cookies.get("gxr");
      console.log(this.$cookies.get("gxr") + "更新人" + this.gxperson)


      //根据empno查询
      this.empno=this.$session.get("key",this.empno);
       let pages = {
         empno:this.empno
       }
       let str1=qs.stringify(pages);
       let url5 = "http://localhost/wuliuxm/selectSyEmpByempnoHlp"
       axios.post(url5, str1).then(response => {
           this.gxperson=response.data.empname;
           this.gxunit=response.data.syUnits.name;
           //this.Signinput.unit=response.data.syUnits.name;
       }).catch(error => {
         console.log('erro')
       });


    }
  }
</script>

<style>
</style>
