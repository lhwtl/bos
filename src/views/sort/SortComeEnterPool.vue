<template>
  <div class="divClass">
    <!--面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a>出入库查询</a></el-breadcrumb-item>
    </el-breadcrumb>


    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="入库管理" name="first">入库管理
        <el-form :inline="true" class="demo-form-inline" style="margin-top: 10px;text-align: left;margin-left: 30px;">
          <el-form-item>
            <el-button type="primary" @click="daoru1">导出</el-button>
          </el-form-item>
        </el-form>

        <!--数据表格-->
        <el-table :data="results" style="width: 100%;" :border="true" max-height="550" id="table-data1">
          <!-- <el-table-column prop="id" label="序号" min-width="30" align="center"></el-table-column> -->
          <el-table-column prop="id" label="出库交接单号" min-width="50"></el-table-column>
          <el-table-column prop="handovertype" label="交接单类型" min-width="70">
            <template slot-scope="scope1">
              <p v-if="scope1.row.handovertype=='0'">长途交接单</p>
              <p v-if="scope1.row.handovertype=='1'">市内交接单</p>
              <p v-if="scope1.row.handovertype=='2'">省内交接单</p>
              <p v-if="scope1.row.handovertype=='3'">全国交接单</p>
            </template>
          </el-table-column>

          <el-table-column prop="line" label="线路资源" min-width="50">
            <template slot-scope="scope1">
              <div v-for="c in EmpList" :key="c.id">
                <p v-if="scope1.row.line==c.id">
                  {{c.empname}}
                </p>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="direction" label="物流方向" min-width="70">
            <template slot-scope="scope1">
              <div v-for="c in EmpList" :key="c.id">
                <p v-if="scope1.row.direction==c.syUnits.id">
                  {{c.syUnits.name}}
                </p>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="acceptperson" label="接货人" min-width="50">
            <template slot-scope="scope1">
              <div v-for="c in EmpList" :key="c.id">
                <p v-if="scope1.row.acceptperson==c.id">
                  {{c.empname}}
                </p>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="carriers" label="承运商" min-width="70">
            <template slot-scope="scope1">
              <div v-for="c in EmpList" :key="c.id">
                <p v-if="scope1.row.carriers==c.syUnits.id">
                  {{c.syUnits.name}}
                </p>
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="deliveryperson" label="出货人" min-width="50">
            <template slot-scope="scope1">
              <div v-for="c in EmpList" :key="c.id">
                <p v-if="scope1.row.deliveryperson==c.id">
                  {{c.empname}}
                </p>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="deliverycompany" label="出货单位" min-width="50">
            <template slot-scope="scope1">
              <div v-for="c in EmpList" :key="c.id">
                <p v-if="scope1.row.carriers==c.syUnits.id">
                  {{c.syUnits.name}}
                </p>
              </div>
            </template>
          </el-table-column><!-- prop="enterperson" -->
          <el-table-column prop="enterperson" label="确认人" min-width="70">
            <template slot-scope="scope1">
              <div v-for="c in EmpList" :key="c.id">
                <p v-if="scope1.row.enterperson==c.id">
                  {{c.empname}}
                </p>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="enterdate" label="却认时间" min-width="50"></el-table-column>
        </el-table>

      </el-tab-pane>
<!--                    -----------------呵呵------------------                                              -->

      <el-tab-pane label="出库管理" name="second">出库管理
        <el-form :inline="true" class="demo-form-inline" style="margin-top: 10px;text-align: left;margin-left: 30px;">
          <el-form-item>
            <el-button type="primary" @click="daoru1">导出</el-button>
          </el-form-item>
        </el-form>

        <!--数据表格出库-->
        <el-table :data="result" style="width: 100%;" :border="true" max-height="550" id="table-data2">
          <el-table-column prop="id" label="入库交接单" min-width="30"></el-table-column>
          <el-table-column prop="acceptdate" label="接货时间" min-width="60"></el-table-column>
          <el-table-column prop="syEmp.empname" label="接货人" min-width="50"></el-table-column>
          <el-table-column prop="syEmp.syUnits.name" label="接货单位" min-width="50"></el-table-column>
          <el-table-column prop="syEmps.empname" label="发货人" min-width="50"></el-table-column>
          <el-table-column prop="syEmps.syUnits.name" label="发货单位" min-width="50"></el-table-column>
        </el-table>


      </el-tab-pane>
    </el-tabs>









  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'
  export default {
    name: 'SortComeEnterPool',
    data: function() {
      return {
        activeName: 'first',
        /* 选项卡 */
        navigation1: null, //导航栏查询。。
        navigation2: null, //导航栏查询查询。。
        result: [], //主显示集合出
        results: [], //主显示集合入
        EmpList: [], //装装换数据
        total: 7,
        size: 7, //条数
        pag: 1, //页数
        dialogFormVisible: false,
        dialogFormVisiblelist: false,
        formLabelWidth: "120px",
        title: 'title',
        titlelist: 'titlelist',
        RoleForm: [], //对话框值帮定
      }
    },
    methods: {
      /* 导入*/
      daoru1(){
       let wb = XLSX.utils.table_to_book(document.querySelector('#table-data1'));
                      /* get binary string as output */
                      let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' });
                      try {
                          FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '入库表.xlsx');
                      } catch (e)
                      {
                          if (typeof console !== 'undefined')
                              console.log(e, wbout)
                      }
                      return wbout
      },
      daoru2(){
       let wb = XLSX.utils.table_to_book(document.querySelector('#table-data2'));
                      /* get binary string as output */
                      let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' });
                      try {
                          FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '出库表.xlsx');
                      } catch (e)
                      {
                          if (typeof console !== 'undefined')
                              console.log(e, wbout)
                      }
                      return wbout
      },
      /* 选项*/
      handleClick(tab, event) {
        console.log(tab, event);
      },
      /* 查询 */
      onSubmit: function() {
        alert("查询");
      },
      /* 重置 */
      refresh: function() {
        alert("重置");
      },
      /* 新增 */
      add: function() {
        alert("新增");
        this.dialogFormVisible = true;
      },
      /* 新增异常 */
      addyc: function() {
        alert("新增异常");
      },
      /* 编辑 */
      handleEdit: function(row) {
        alert("编辑");
        this.dialogFormVisible = true;
      },
      /* 删除 */
      handleDelete: function(row) {
        alert("删除");
      },
      /* 查看明细 */
      handleMX: function(row) {
        alert("查看明细");
        this.dialogFormVisiblelist = true;
      },
      /* 点击分页*/
      change: function(r) {
        alert("点击分页");
      },
      /* 对话框 中确定 */
      doSubmit: function() {

      },
      /* 封装方法   初始化出库查询*/
      query1: function() {
        let url = 'http://localhost/wuliuxm/FillAllSorStorageLx';
        axios.post(url, null).then(resp => {
          console.log(resp.data);
          this.result = resp.data;
        }).catch(error => {
          console.log(error);
        });
      },
      /* 入库*/
      query2: function() {
        let url = 'http://localhost/wuliuxm/FillSorOutboundLx';
        axios.post(url, null).then(resp => {
          console.log(resp.data);
          this.results = resp.data;
        }).catch(error => {
          console.log(error);
        });
      },
      /* 封装方法  初始化最大值*/
      max: function() {

      }
    },
    /* -----------------万恶的分割线------------------ */
    /* 初始化 */
    created: function() {
      this.query1(); /* 入库 */
      this.query2(); /* 出库 */
      /* 入库数据转换*/
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
