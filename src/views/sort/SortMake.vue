<template>
  <div class="divClass">
    <!--面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a>入库管理</a></el-breadcrumb-item>
    </el-breadcrumb>
    <!--搜索框-->

    <el-form :inline="true" class="demo-form-inline" style="margin-top: 10px;">

      <el-form-item label="出库交接单:">
        <el-input v-model="navigation1" placeholder="出库交接单号"></el-input>
      </el-form-item>
      <el-form-item label="接货时间:">
        <el-input v-model="navigation2" placeholder="接货时间"></el-input>
      </el-form-item>

      <el-form-item>
        <!-- <el-form-item> -->
        <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-refresh" @click="refresh">重置</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="add">新增入库</el-button>
      </el-form-item>

    </el-form>
    <!--数据表格-->
    <el-table :data="result" style="width: 100%;" :border="true" max-height="550">
      <el-table-column prop="id" label="盘库单号" min-width="50"></el-table-column>
      <el-table-column prop="scanid" label="扫描设备号" min-width="60">
        <template slot-scope="scope1">
          <p v-if="scope1.row.scanid=='0'">长途交接单</p>
          <p v-if="scope1.row.scanid=='1'">市内交接单</p>
          <p v-if="scope1.row.scanid=='2'">省内交接单</p>
          <p v-if="scope1.row.scanid=='3'">全国交接单</p>
        </template>
      </el-table-column>
      <el-table-column prop="cargosum" label="总件数" min-width="50"></el-table-column>
      <el-table-column prop="checkperson" label="盘库人" min-width="50">
        <template slot-scope="scope1" >
          <div  v-for="c in EmpList" :key="c.id">
            <p v-if="scope1.row.checkperson==c.id">
                 {{c.empname}}
            </p>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="checkdate" label="盘库时间" min-width="70"></el-table-column>
      <el-table-column prop="checkcompany" label="操作单位" min-width="50"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          <el-button size="mini" type="danger" @click="handleMX(scope.row)">查看明细</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background @current-change="change" layout="prev, pager, next" :current-page="pag" :page-size="size"
      :total="total">
    </el-pagination>

    <!--  对话框 新增修改  ref="RoleForm" :rules="rules"-->
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="RoleForm">
        <el-form-item label="盘库单号" :label-width="formLabelWidth" v-show="false">
          <el-input v-model="RoleForm.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="扫描设备号" :label-width="formLabelWidth">
          <el-select v-model="RoleForm.scanid"  placeh older="--交接单类型--" style="width: 100%;">
           <el-option value="0" label="长途交接单" ></el-option>
           <el-option value="1" label="市内交接单" ></el-option>
           <el-option value="2" label="省内交接单" ></el-option>
           <el-option value="3" label="全国交接单" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="总件数" :label-width="formLabelWidth">
          <el-input v-model="RoleForm.cargosum" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <label>盘库时间</label>
        <el-date-picker v-model="RoleForm.checkdate" type="date" placeholder="选择日期" style="width: 75%;left: 30px;"></el-date-picker> -->

        <el-form-item label="盘库时间" :label-width="formLabelWidth">
        				<el-date-picker v-model="RoleForm.checkdate" style="width: 100%;"  value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择時間" >
        				</el-date-picker>
        </el-form-item>

         <el-form-item label="盘库人" :label-width="formLabelWidth">
        <el-select v-model="RoleForm.checkperson" @change="empchange1" placeholder="--盘库人--" style="width: 100%;">
          <el-option v-for="c in EmpList" :key="c.id" :value="c.id" :label="c.empname"></el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="操作单位" :label-width="formLabelWidth">
          <el-input v-model="RoleForm.checkcompany" autocomplete="off"></el-input>
        </el-form-item>
        </el-table-column>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="doSubmit">确 定</el-button>
      </div>
    </el-dialog>


    <!-- 详情-->
    <el-dialog :title="titlelist" :visible.sync="dialogFormVisiblelist" width="800px">
        <el-button type="primary" @click="addxq">新增</el-button>
      <el-table :data="results" style="width: 100%;" :border="true" max-height="550">
        <el-table-column prop="id" label="工作单号" min-width="50"></el-table-column>
        <el-table-column prop="packageid" label="扫描设备" min-width="70"></el-table-column>
        <el-table-column prop="cargocount" label="件数" min-width="70"></el-table-column>
        <el-table-column prop="weight" label="重量" min-width="70"></el-table-column>
        <el-table-column prop="volume" label="体积" min-width="70"></el-table-column>
        <el-table-column prop="cargotype" label="类型" min-width="70">
           <template slot-scope="scope1" >
          <p v-if="scope1.row.cargotype=='0'">电器类型</p>
          <p v-if="scope1.row.cargotype=='1'">食物类型</p>
          <p v-if="scope1.row.cargotype=='2'">家用类型</p>
          <p v-if="scope1.row.cargotype=='3'">玩具类型</p>
           </template>
        </el-table-column>
        <el-table-column prop="direction" label="方向" min-width="70"></el-table-column>
        <el-table-column prop="storageperson" label="入库人" min-width="70">
          <template slot-scope="scope1" >
            <div  v-for="c in EmpList" :key="c.id">
              <p v-if="scope1.row.storageperson==c.id">
                   {{c.empname}}
              </p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="storagedate" label="入库时间" min-width="70"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleEditxq(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDeletexq(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

<!-- 详情修改新增   -->
<el-dialog :title="titles" :visible.sync="dialogFormVisiblexqs">
      <el-form :model="RoleForms">
        <el-form-item label="工作单号" :label-width="formLabelWidth"  >
          <el-input v-model="RoleForms.id" autocomplete="off" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="扫描设备号" :label-width="formLabelWidth" v-show="false">
           <el-input v-model="RoleForms.packageid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="件数" :label-width="formLabelWidth">
          <el-input v-model="RoleForms.cargocount" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="重量" :label-width="formLabelWidth">
                 <el-input v-model="RoleForms.weight" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="体积" :label-width="formLabelWidth">
                 <el-input v-model="RoleForms.volume" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="类型" :label-width="formLabelWidth">
        <el-select v-model="RoleForms.cargotype"  placeh older="--类型--" style="width: 100%;">
         <el-option value="0" label="电器类型" ></el-option>
         <el-option value="1" label="食物类型" ></el-option>
         <el-option value="2" label="家用类型" ></el-option>
         <el-option value="3" label="玩具类型" ></el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="方向" :label-width="formLabelWidth">
          <el-input v-model="RoleForms.direction" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="入库人" :label-width="formLabelWidth">
          <el-select v-model="RoleForms.storageperson" @change="empchange1" placeholder="--入库人--" style="width: 100%;">
            <el-option v-for="c in EmpList" :key="c.id" :value="c.id" :label="c.empname"></el-option>
          </el-select>
        </el-form-item>
        </el-table-column>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisiblexqs = false">取 消</el-button>
        <el-button type="primary" @click="doSubmits">确 定</el-button>
      </div>
    </el-dialog>






  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
  export default {
    name: 'SortMake',
    data: function() {
      return {
        pid:null,/* packageid赋值 */
        navigation1: null, //导航栏查询。。
        navigation2: null, //导航栏查询查询。。
        result: [], //主显示集合
        results: [],
        EmpList: [],
        total: 7,
        size: 7, //条数
        pag: 1, //页数
        dialogFormVisible: false,
        dialogFormVisiblelist: false,
        dialogFormVisiblexqs:false,
        formLabelWidth: "120px",
        title: '盘亏新增',
        titlelist: '明细',
        titles:'详情新增',
        RoleForm: {
          id:null,
          scanid: null,
          cargosum: null,
          checkdate: null,
          checkperson: null,
          checkcompany: null,
        }, //对话框值帮定
        RoleForms:{
          id:null,
          packageid:null,
          cargocount:null,
          weight:null,
          volume:null,
          cargotype:null,
          direction:null,
          storageperson:null,
        }
      }
    },
    methods: {
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
        this.title == '盘库新增'
        this.RoleForm.id=null,
        this.RoleForm.scanid=null,
        this.RoleForm.cargosum=null,
        this.RoleForm.checkdate=null,
        this.RoleForm.checkperson=null,
        this.RoleForm.checkcompany=null,
        this.dialogFormVisible = true;
      },
      /* 新增详情 */
      addxq: function() {
        this.titles='详情新增';
        this.RoleForms.id=null,
        this.RoleForms.packageid=null,
        this.RoleForms.cargocount=null,
        this.RoleForms.weight=null,
        this.RoleForms.volume=null,
        this.RoleForms.cargotype=null,
        this.RoleForms.storageperson=null,
        this.RoleForms.direction=null,
          this.dialogFormVisiblexqs=true;

      },
      /* xq详情 */
      handleEditxq: function(row) {
        this.titles='详情编辑';
        this.RoleForms.id=row.id,
        this.RoleForms.packageid=row.packageid,
        this.RoleForms.cargocount=row.cargocount,
        this.RoleForms.weight=row.weight,
        this.RoleForms.volume=row.volume,
        this.RoleForms.cargotype=row.cargotype,
        this.RoleForms.storageperson=row.storageperson,
        this.RoleForms.direction=row.direction,
        this.dialogFormVisiblexqs=true;

      },
      /* xq详情 */
      handleDeletexq: function(row) {
        alert(row.id)
        let pages = {
            id:row.id,
         }
         let url = 'http://localhost/wuliuxm/deleteSorCheckbounddetailsByidLx';
         axios.post(url,qs.stringify(pages)).then(resp => {
             console.log(resp.data);

             /* s删除的刷新*/
             let pagess = {
                 packageid:this.pid,
              }
              let urls = 'http://localhost/wuliuxm/FillSSorCheckbounddetailspackagesByidLx';
               //alert(qs.stringify(pagess))
              axios.post(urls,qs.stringify(pagess)).then(resp => {
                  console.log(resp.data);
                   this.results=resp.data;
                  this.dialogFormVisiblelist = true;
                }).catch(error => {
                  console.log(error);
                });






           }).catch(error => {
             console.log(error);
           });
      },
      /* 编辑 */
      handleEdit: function(row) {
        this.title= '盘库编辑'
         this.RoleForm.id=row.id,
         this.RoleForm.scanid=row.scanid,
         this.RoleForm.cargosum=row.cargosum,
         this.RoleForm.checkdate=row.checkdate,
         this.RoleForm.checkperson=row.checkperson,
         this.RoleForm.checkcompany=row.checkcompany,
        this.dialogFormVisible = true;
      },
      /* 删除 */
      handleDelete: function(row) {

        let pages = {
            id:row.id,
         }
         let url = 'http://localhost/wuliuxm/deleteSorCheckbound';
         axios.post(url,qs.stringify(pages)).then(resp => {
             console.log(resp.data);

           }).catch(error => {
             console.log(error);
           });
      },
      /* 查看明细 */
      handleMX: function(row) {
        this.pid=row.id;
        let pages = {
            packageid:row.id,
         }
         let url = 'http://localhost/wuliuxm/FillSSorCheckbounddetailspackagesByidLx';
         axios.post(url,qs.stringify(pages)).then(resp => {
             console.log(resp.data);
              this.results=resp.data;
             this.dialogFormVisiblelist = true;
           }).catch(error => {
             console.log(error);
           });

      },
      /* 详情提交修改新增*/
      doSubmits:function(){

        let pages = {
         id:this.RoleForms.id,
         packageid:this.pid,
         cargocount:this.RoleForms.cargocount,
         weight:this.RoleForms.weight,
         volume:this.RoleForms.volume,
         cargotype:this.RoleForms.cargotype,
         storageperson :this.RoleForms.storageperson,
         direction :this.RoleForms.direction,
        }
        let url = 'http://localhost/wuliuxm/insertSorCheckbounddetailsLx';
        if (this.titles=="详情编辑") {
          url = 'http://localhost/wuliuxm/updateSorCheckbounddetailsLx';
        }
        alert(url)
        axios.post(url, qs.stringify(pages)).then(resp => {
          this.dialogFormVisiblexqs = false;

          /* 修改新增后的刷新*/
          let pagess = {
              packageid:this.pid,
           }
           let urls = 'http://localhost/wuliuxm/FillSSorCheckbounddetailspackagesByidLx';
            //alert(qs.stringify(pagess))
           axios.post(urls,qs.stringify(pagess)).then(resp => {
               console.log(resp.data);
                this.results=resp.data;
               this.dialogFormVisiblelist = true;
             }).catch(error => {
               console.log(error);
             });





        }).catch(error => {
          console.log(error);
        });

      },
      /* 点击分页*/
      change: function(r) {
        alert("点击分页");
      },
      /* 下拉框值改变事件 */
      empchange1: function(r) {
      //  alert(r)
        let pages = {
          unid: r,
        }
        let url = 'http://localhost/wuliuxm/FillSyUnitsByidLx';
        axios.post(url, qs.stringify(pages)).then(resp => {
          console.log(resp.data);
          console.log(resp.data.name);
          this.RoleForm.checkcompany = resp.data.name;
          /* this.cys=resp.data.id; */
        }).catch(error => {
          console.log(error);
        });
      },
      /* 对话框 中确定 */
      doSubmit: function() {

        let pages = {
         id: this.RoleForm.id,
          scanid: this.RoleForm.scanid,
          cargosum: this.RoleForm.cargosum,
          checkdate: this.RoleForm.checkdate,
          checkperson: this.RoleForm.checkperson,
          checkcompany: this.RoleForm.checkcompany,
        }
        let url = 'http://localhost/wuliuxm/insertSorCheckboundLx';
        if (this.title == '盘库编辑') {
          url = 'http://localhost/wuliuxm/updateSorCheckboundLx';
        }
        alert(qs.stringify(pages))
        axios.post(url, qs.stringify(pages)).then(resp => {
          this.dialogFormVisible = false;
          this.query();
        }).catch(error => {
          console.log(error);
        });

},
        /* 封装方法   初始化查询*/
        query: function() {
            let url = 'http://localhost/wuliuxm/FillSorCheckboundLx';
            axios.post(url, null).then(resp => {
              console.log(resp.data);
              this.result = resp.data;
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
        this.query();

        /* 员工下拉*/
        let url = 'http://localhost/wuliuxm/FillAllSyEmpLx';
        axios.post(url, null).then(resp => {
          console.log(resp.data);
          this.EmpList = resp.data;
        }).catch(error => {
          console.log(error);
        });

      },

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
