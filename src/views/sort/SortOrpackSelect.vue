<template>
  <div class="divClass">
    <!--面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a>合包查询</a></el-breadcrumb-item>
    </el-breadcrumb>


    <el-form :inline="true" class="demo-form-inline" style="margin-top: 10px;text-align: left;margin-left: 30px;">
      <el-form-item>
        <el-button type="primary" @click="add">导出</el-button>
      </el-form-item>
    </el-form>

    <!--数据表格-->
    <el-table :data="result" style="width: 100%;" :border="true" max-height="550">
    <el-table-column prop="id" label="合包号"  min-width="30" align="center" ></el-table-column>
      <el-table-column prop="sealint" label="封签号" min-width="50"></el-table-column>
      <el-table-column prop="packageperson" label="合包人" min-width="70">
        <template slot-scope="scope1" >
          <div  v-for="c in EmpList" :key="c.id">
            <p v-if="scope1.row.packageperson==c.id">
                 {{c.empname}}
            </p>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="packageperson" label="合包单位" min-width="30" align="center">
        <template slot-scope="scope1" >
             <div  v-for="c in EmpList" :key="c.id">
               <p v-if="scope1.row.packageperson==c.syUnits.id">
                   {{c.syUnits.name}}
               </p>
             </div>
           </template>
      </el-table-column>
      <!--    <el-table-column prop="rolename" label="拆包人" min-width="50"></el-table-column>
      <el-table-column prop="roledesc"  label="拆包单位"  min-width="70"></el-table-column> -->
      <el-table-column prop="packageperson" label="记录人" min-width="30" align="center">
        <template slot-scope="scope1" >
          <div  v-for="c in EmpList" :key="c.id">
            <p v-if="scope1.row.packageperson==c.id">
                 {{c.empname}}
            </p>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="timelimit" label="记录时间" min-width="50"></el-table-column>

     <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleMX(scope.row)">明细</el-button>
        </template>
      </el-table-column>

    </el-table>


<el-dialog :title="titlelist" :visible.sync="dialogFormVisible">
<el-table :data="results" style="width: 100%;" :border="true" max-height="550">
 <el-table-column prop="id" label="单号" min-width="40"></el-table-column>
           <el-table-column prop="warename"  label="产品类型"  min-width="70">
            <template slot-scope="scope1">
               <p v-if="scope1.row.warename=='0'">电器类型</p>
               <p v-if="scope1.row.warename=='1'">食物类型</p>
               <p v-if="scope1.row.warename=='2'">家用类型</p>
               <p v-if="scope1.row.warename=='3'">玩具类型</p>
             </template>
           </el-table-column>
          <el-table-column prop="weight"  label="重量"  min-width="50"></el-table-column>
          <el-table-column prop="volume"  label="体积"  min-width="50"> </el-table-column>
          <el-table-column prop="cargoint"  label="件数"  min-width="50"> </el-table-column>
          <el-table-column prop="importanthints"  label="提示"  min-width="50"></el-table-column>
          <el-table-column prop="ask"  label="配载"  min-width="50"></el-table-column>


          </el-table>
 </el-dialog>




  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
  export default {
    name: 'SortOrpackSelect',
    data: function() {
      return {
        navigation1: null, //导航栏查询。。
        navigation2: null, //导航栏查询查询。。
        result: [], //主显示集合
        results:[],
        EmpList:[],
        total: 7,
        size: 7, //条数
        pag: 1, //页数
        dialogFormVisible: false,
        dialogFormVisiblelist: false,
        formLabelWidth: "120px",
        title: 'title',
        titlelist: '明细详情',
        RoleForm: [], //对话框值帮定
      }
    },
    methods: {
      handleMX:function(r){
       /* alert(r.id) */
         this.dialogFormVisible = true;
         let pasp={
           id:r.id,
         }
         let urls = 'http://localhost/wuliuxm/FillSorPackagedetailsManyByidLx';
         axios.post(urls, qs.stringify(pasp)).then(resp => {
           console.log(resp.data);
           this.results = resp.data;
         }).catch(error => {
           console.log(error);
         });
      },

      /* 新增 */
      add: function() {

      },

    },
    /* -----------------万恶的分割线------------------ */
    /* 初始化 */
    created: function() {

      let urls = 'http://localhost/wuliuxm/FillSorPackageLX';
      axios.post(urls, null).then(resp => {
        console.log(resp.data);
        this.result = resp.data;
      }).catch(error => {
        console.log(error);
      });



/* 员工装换 */
 let url = 'http://localhost/wuliuxm/FillAllSyEmpLx';
       axios.post(url,null).then(resp => {
           console.log(resp.data);
           this.EmpList = resp.data;
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
