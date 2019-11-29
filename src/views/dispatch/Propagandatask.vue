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
      <el-form-item v-show="ok" label="失效时间">
        <el-input v-model="failuretime" placeholder="失效时间" style="width: 150px;"></el-input>
      </el-form-item>
      <el-form-item v-show="ok" label="状态">
        <el-select v-model="value" placeholder="请选择" style="width: 200px;">
          <el-option  :key="1" :label="有效" :value="1">
          </el-option>
          <el-option  :key="2" :label="作废" :value="2">
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
      <el-table-column  label="更新单位" width="100">
          总公司
      </el-table-column>
      <el-table-column  label="更新人" width="80">
            {{gxperson}}
      </el-table-column>
      <el-table-column  prop="status" label="状态" width="80">
        <template slot-scope="scope2">
         <span v-if="scope2.row.status==1">有效</span>
         <span v-if="scope2.row.status==2">作废</span>
         </template>
      </el-table-column>
      <el-table-column prop="content" label="宣传内容" width="80">
      </el-table-column>
      <el-table-column label="操作" width="230">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="handleEdit(scope.row)">修改</el-button>
          <el-button size="mini" type="success" @click="handleadd(scope.row)">新增</el-button>
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
        form: {
          name: '',
          region: ''

        },
        dialogFormVisibledetail: false,
        total: 10,
        pages: 1,
        rows: 5,
        radio: 3,
        options: [],
        ok: false,
        fjbm: [],
        sortingcode: '',
        gxperson:'',
        Signinput:{
          releasetime:null,
          failuretime:null,
          status:null,
          datenew:null,
          unit:null,
          outlines:null,
          contents:null

        }

      }
    },
    methods: {
      onSubmit: function() {
       let fy = {
         pages: this.pages,
         rows: this.rows,
         outline: this.outline
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
          outline: this.outline
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
         outline: this.outline
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
      handleDetail:function(row){
         this.dialogFormVisibledetail=true;
         this.Signinput.releasetime=row.releasetime;
         this.Signinput.failuretime=row.failuretime;

         if(row.status==1){
            this.Signinput.status='启用';
           }

           if(row.status==2){
              this.Signinput.status='停用';
             }
         this.Signinput.datenew=row.releasetime;
         this.Signinput.unit=null;
         this.Signinput.outlines=row.outline;
         this.Signinput.contents=row.content;

      }

    },
    //钩子函数
    created: function() {

      let fy = {
        pages: this.pages,
        rows: this.rows,
        outline: this.outline
      }
      var str = qs.stringify(fy);
      let url = "http://localhost/wuliuxm/selectDisPropagandataskHlp"
      axios.post(url, str).then(response => {
        this.result = response.data.rows;
        this.total = response.data.total;
        response.data.rows.gxperson=this.$cookies.get("gxr");
        console.log(response.data.rows.content+"内容内容");
      }).catch(error => {
        console.log('erro')
      });
       this.gxperson= this.$cookies.get("gxr");
      console.log( this.$cookies.get("gxr")+"更新人"+this.gxperson)


    }
  }
</script>

<style>
</style>
