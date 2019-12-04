<template>
  <div class="divClass">
    <!--面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a>库存查询</a></el-breadcrumb-item>
    </el-breadcrumb>



   <el-form :inline="true" class="demo-form-inline" style="margin-top: 10px;text-align: left;margin-left: 30px;">
       <el-form-item>
         <el-button type="primary"  @click="daoru1">导出</el-button>
       </el-form-item>
     </el-form>



   <!--数据表格-->
   <el-table :data="result" style="width: 100%;" :border="true" max-height="550" id="table-data1">
     <el-table-column prop="id" label="工作单号" min-width="50"></el-table-column>
    <el-table-column prop="storageperson" label="人库人" min-width="60">
      <template slot-scope="scope1" >
        <div  v-for="c in EmpList" :key="c.id">
          <p v-if="scope1.row.storageperson==c.id">
               {{c.empname}}
          </p>
        </div>
      </template>
    </el-table-column>
     <el-table-column prop="storagedate"  label="入库时间"  min-width="80"></el-table-column>
     <el-table-column prop="storageperson"  label="受理单位"  min-width="60">
       <template slot-scope="scope1" >
         <div  v-for="c in EmpList" :key="c.id">
           <p v-if="scope1.row.storageperson==c.id">
            {{c.syUnits.name}}

           </p>
         </div>
       </template>
     </el-table-column>
     <el-table-column prop="direction" label="路径方向" min-width="50" align="center"></el-table-column>
     <el-table-column prop="cargocount" label="在库件数" min-width="50"></el-table-column>
     <el-table-column prop="cargocount" label="实际件数"  min-width="40"></el-table-column>
     <el-table-column prop="weight" label="重量"  min-width="40"></el-table-column>
     <el-table-column prop="volume" label="体积" min-width="40"></el-table-column>
     <el-table-column prop="cargotype" label="货物类型" min-width="60">
        <template slot-scope="scope1" >
       <p v-if="scope1.row.cargotype=='0'">电器类型</p>
       <p v-if="scope1.row.cargotype=='1'">食物类型</p>
       <p v-if="scope1.row.cargotype=='2'">家用类型</p>
       <p v-if="scope1.row.cargotype=='3'">玩具类型</p>
        </template>
     </el-table-column>

   </el-table>



  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'
  export default {
    name: 'SortRepertory',
    data: function() {
      return {
        navigation1: null, //导航栏查询。。
        navigation2: null, //导航栏查询查询。。
        result: [], //主显示集合
        EmpList:[],
        total: 7,
        size: 7, //条数
        pag: 1, //页数
        dialogFormVisible: false,
        dialogFormVisiblelist:false,
        formLabelWidth: "120px",
        title:'title',
        titlelist:'titlelist',
        RoleForm:[],//对话框值帮定
      }
    },
    methods: {
      /* 导入*/
      daoru1(){
       let wb = XLSX.utils.table_to_book(document.querySelector('#table-data1'));
                      /* get binary string as output */
                      let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' });
                      try {
                          FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '库存表.xlsx');
                      } catch (e)
                      {
                          if (typeof console !== 'undefined')
                              console.log(e, wbout)
                      }
                      return wbout
      },
        /* 查询 */
        onSubmit:function(){
          alert("查询");
        },
         /* 重置 */
        refresh:function(){
          alert("重置");
        },
         /* 新增 */
        add:function(){
          alert("新增");
        this.dialogFormVisible= true;
        },
         /* 新增异常 */
        addyc:function(){
          alert("新增异常");
        },
        /* 编辑 */
        handleEdit:function(row){
          alert("编辑");
        this.dialogFormVisible= true;
        },
        /* 删除 */
        handleDelete:function(row){
          alert("删除");
        },
        /* 查看明细 */
        handleMX:function(row){
          alert("查看明细");
        this.dialogFormVisiblelist=true;
        },
        /* 点击分页*/
       change: function(r) {
          alert("点击分页");
       },
       /* 对话框 中确定 */
       doSubmit:function(){

       },
       /* 封装方法   初始化查询*/
      query:function(){

          let url = 'http://localhost/wuliuxm/FillKCSorCheckbounddetailslx';
          axios.post(url,null).then(resp => {
              console.log(resp.data);
              this.result = resp.data;
            }).catch(error => {
              console.log(error);
            });
      },
      /* 封装方法  初始化最大值*/
      max:function(){

      }
    },
    /* -----------------万恶的分割线------------------ */
    /* 初始化 */
      created: function() {
        this.query();
        let url = 'http://localhost/wuliuxm/FillAllSyEmpLx';
        axios.post(url, null).then(resp => {
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
