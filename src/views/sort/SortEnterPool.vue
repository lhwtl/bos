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
        <el-button type="primary"  @click="add">新增入库</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"  @click="addyc">新增异常记录</el-button>
      </el-form-item>
    </el-form>

    <!--数据表格-->
    <el-table :data="result" style="width: 100%;" :border="true" max-height="550">
      <el-table-column prop="id" label="序号" min-width="30" align="center"></el-table-column>
      <el-table-column prop="id" label="入库交接单" min-width="30"></el-table-column>
      <el-table-column prop="acceptdate"  label="接货时间"  min-width="60"></el-table-column>
      <el-table-column prop="syEmp.empname"  label="接货人"  min-width="50"></el-table-column>
      <el-table-column prop="syEmp.syUnits.name"  label="接货单位"  min-width="50"></el-table-column>
      <el-table-column prop="syEmps.empname"  label="发货人"  min-width="50"></el-table-column>
      <el-table-column prop="syEmps.syUnits.name"  label="发货单位"  min-width="50"></el-table-column>


      <el-table-column label="操作" min-width="100">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          <el-button size="mini" type="danger" @click="handleMX(scope.row)">查看明细</el-button>
        </template>
      </el-table-column>
    </el-table>

<!-- 没有    分页    已删除方法-->



  <!--  对话框  ref="RoleForm" :rules="rules"-->
    <el-dialog :title="title" :visible.sync="dialogFormVisible"  width="700px">
      <el-form :model="EmpPoolForm"  >
        <el-form-item label="编号" :label-width="formLabelWidth" v-show="false">
          <el-input v-model="EmpPoolForm.id" autocomplete="off"></el-input>
        </el-form-item>
      <p>
       <label>接货人：</label>
          <el-select v-model="EmpPoolForm.acceptperson" @change="empchange1"   placeh older="--请选择接货人--" style="width: 35%;">
           <el-option v-for="c in EmpList" :key="c.id" :value="c.id" :label="c.empname" ></el-option>
          </el-select>
        </el-form-item>
      <label>接货单位：</label><!-- disabled="true"  -->
        <el-input v-model="EmpPoolForm.acceptcompany" autocomplete="off" :readonly="true"  style="width: 35%;"></el-input>
      </p>
      <P>
       <label>发货人：</label>
          <el-select v-model="EmpPoolForm.deliveryperson" @change="empchange2" placeholder="--请选择发货人--" style="width: 35%;">
            <el-option v-for="c in EmpList" :key="c.id" :value="c.id" :label="c.empname"></el-option>
          </el-select>
        </el-form-item>
        <label>发货单位：</label>
        <el-input v-model="EmpPoolForm.deliverycompany"  autocomplete="off" :readonly="true"   style="width: 35%;"></el-input>
      </p>

<p>
                  <el-input v-model="EmpPoolForm.xx[0].id1" placeholder="单号" :readonly="true" style="width: 18%;"></el-input>
                  <el-input v-model="EmpPoolForm.xx[0].packageid1" placeholder="请输入合包号" style="width: 18%;"></el-input>
                  <el-input v-model="EmpPoolForm.xx[0].weight1" placeholder="请输入重量" style="width: 18%;"></el-input>
                  <el-input v-model="EmpPoolForm.xx[0].outboundid1" placeholder="关联出库交接单" :readonly="true" style="width: 18%;"></el-input>
                  <el-select v-model="EmpPoolForm.xx[0].state1" placeholder="请选择" style="width: 18%;">
                    <el-option label="中转入库" value="3"></el-option>
                    <el-option label="二次入库" value="2"></el-option>
                    <el-option label="初始入库" value="1"></el-option>
                    <el-option label="有货无单" value="0"></el-option>
                  </el-select>
</p>
<p>
                  <el-input v-model="EmpPoolForm.xx[1].id2" placeholder="单号" :readonly="true" style="width: 18%;"></el-input>
                  <el-input v-model="EmpPoolForm.xx[1].packageid2" placeholder="请输入合包号" style="width: 18%;"></el-input>
                  <el-input v-model="EmpPoolForm.xx[1].weight2" placeholder="请输入重量" style="width: 18%;"></el-input>
                  <el-input v-model="EmpPoolForm.xx[1].outboundid2" placeholder="关联出库交接单"  :readonly="true" style="width: 18%;"></el-input>
                  <el-select v-model="EmpPoolForm.xx[1].state2" placeholder="请选择" style="width: 18%;">
                    <el-option label="中转入库" value="3"></el-option>
                    <el-option label="二次入库" value="2"></el-option>
                    <el-option label="初始入库" value="1"></el-option>
                    <el-option label="有货无单" value="0"></el-option>
                  </el-select>
</p>
<p>
                  <el-input v-model="EmpPoolForm.xx[2].id3" placeholder="单号" :readonly="true" style="width: 18%;"></el-input>
                  <el-input v-model="EmpPoolForm.xx[2].packageid3" placeholder="请输入合包号" style="width: 18%;"></el-input>
                  <el-input v-model="EmpPoolForm.xx[2].weight3" placeholder="请输入重量" style="width: 18%;"></el-input>
                  <el-input v-model="EmpPoolForm.xx[2].outboundid3" placeholder="关联出库交接单" :readonly="true" style="width: 18%;"></el-input>
                  <el-select v-model="EmpPoolForm.xx[2].state3" placeholder="请选择" style="width: 18%;">
                    <el-option label="中转入库" value="3"></el-option>
                    <el-option label="二次入库" value="2"></el-option>
                    <el-option label="初始入库" value="1"></el-option>
                    <el-option label="有货无单" value="0"></el-option>
                  </el-select>
</p>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="doSubmit">确 定</el-button>
      </div>
    </el-dialog>


    <!-- 权限框-->
<el-dialog :title="titlelist" :visible.sync="dialogFormVisiblelist">
    <el-table :data="results" style="width: 100%;" :border="true" max-height="650">
      <el-table-column prop="id" label="接单" min-width="30"></el-table-column>
      <el-table-column prop="packageid"  label="合包号"  min-width="60"></el-table-column>
      <el-table-column prop="weight"  label="重量"  min-width="50"></el-table-column>
      <el-table-column prop="outboundid"  label="关联出库交接单"  min-width="50"></el-table-column>
      <el-table-column prop="state"  label="状态"  min-width="50">
        <template slot-scope="scope1">
          <p v-if="scope1.row.state=='0'">有货无单</p>
          <p v-if="scope1.row.state=='1'">初始入库</p>
          <p v-if="scope1.row.state=='2'">二次入库</p>
          <p v-if="scope1.row.state=='3'">中转入库</p>
         </template>
      </el-table-column>

    </el-table>
</el-dialog>


 <!-- 新增异常记录 -->
    <el-dialog title="新增异常记录" :visible.sync="dialogFormVisibleyc"  :append-to-body="true" width="1000px"
      height="700px">
      <div align="center">
        <el-form :inline="true" :model="sorabnormalfrom" class="demo-form-inline">
          <el-form-item label="异常编号">
            <el-input v-model="sorabnormalfrom.id" placeholder="异常编号" :readonly="true" ></el-input>
          </el-form-item>
          <el-form-item label="异常类型">
            <el-select v-model="sorabnormalfrom.abnormaltype" placeholder="请选择">
              <el-option label="有单无货" value="0"></el-option>
              <el-option label="有货无单" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="sorabnormalfrom.abostate" placeholder="请选择">
              <el-option label="未处理" value="0"></el-option>
              <el-option label="以处理" value="1"></el-option>
            </el-select>
          </el-form-item>
          <br />
          <el-form-item label="异常说明">
            <el-input v-model="sorabnormalfrom.launchcompany" style="width:780px;" placeholder="请输入异常说明"></el-input>
          </el-form-item>
          <br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <el-form-item label="单号">
            <el-input v-model="sorabnormalfrom.cargoint" placeholder="请输入单号"></el-input>
          </el-form-item>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <el-form-item label="合包号">
            <el-input v-model="sorabnormalfrom.packageint" placeholder="请输入合包号"></el-input>
          </el-form-item>&nbsp;&nbsp;&nbsp;
          <el-form-item label="交接单号">
            <el-input v-model="sorabnormalfrom.transferint" placeholder="请输入交接单号"></el-input>
          </el-form-item>
          <br />
          <el-form-item label="对冲异常编号">
            <el-input v-model="sorabnormalfrom.hedgeabnint" placeholder="请输入对冲异常编号"></el-input>
          </el-form-item>
          <el-form-item label="异常记录人">
            <el-input v-model="sorabnormalfrom.launchperson" placeholder="请输入异常记录人"></el-input>
          </el-form-item>
          <el-form-item label="异常记录时间">
            <el-input v-model="sorabnormalfrom.launchdate" placeholder="以获取异常记录事件" :readonly="true" ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button type="danger" @click="dialogFormVisibleyc= false">取消</el-button>
        <el-button type="success" @click="ycSubmit">提交</el-button>
      </div>
    </el-dialog>


 </div>
</template>
<script>
  import axios from 'axios'
  import qs from 'qs'
  export default {
    name: 'SortEnterPool',
    data: function() {
      return {
        empkey:[],
        xklzhi1:null,
        xklzhi2:null,
        navigation1: null, //导航栏查询。。
        navigation2: null, //导航栏查询查询。。
        result: [], //主显示集合
        results:[],
        /* total: 7,
        size: 7, //条数
        pag: 1, //页数 */
        dialogFormVisible: false,
        dialogFormVisiblelist:false,
        dialogFormVisibleyc:false,
        formLabelWidth: "60px",
        title:'新增入库',
        titlelist:'titlelist',
        EmpList:[],
        RoleForm:[],//对话框值帮定
        sorabnormalfrom:{
          id:null,
          abnormaltype:null,
          abostate:null,
          launchcompany:null,
          cargoint:null,
          packageint:null,
          transferint:null,
          hedgeabnint:null,
          launchperson:null,
          launchdate:null,
        },
        EmpPoolForm:{
          acceptperson:null,
          acceptcompany:null,
          deliveryperson:null,
          deliverycompany:null,
          xx:[{
            id1:null,
            packageid1:null,
            weight1:null,
            outboundid1:null,
            state1:null,
          },
          {
            id2:null,
            packageid2:null,
            weight2:null,
            outboundid2:null,
            state2:null,
          },
          {
            id3:null,
            packageid3:null,
            weight3:null,
            outboundid3:null,
            state3:null,
          }],
        },
      }
    },
    methods: {
        /* 查询 */
        onSubmit:function(){
          //alert("查询");
           this.query();
        },
         /* 重置 */
        refresh:function(){
          this.EmpPoolForm.xx[0].id1=null;
          this.EmpPoolForm.xx[0].packageid1=null;
          this.EmpPoolForm.xx[0].weight1=null;
          this.EmpPoolForm.xx[0].outboundid1=null;
          this.EmpPoolForm.xx[0].state1=null;
          this.EmpPoolForm.xx[1].id2=null;
          this.EmpPoolForm.xx[1].packageid2=null;
          this.EmpPoolForm.xx[1].weight2=null;
          this.EmpPoolForm.xx[1].outboundid2=null;
          this.EmpPoolForm.xx[1].state2=null;
          this.EmpPoolForm.xx[2].id3=null;
          this.EmpPoolForm.xx[2].packageid3=null;
          this.EmpPoolForm.xx[2].weight3=null;
          this.EmpPoolForm.xx[2].outboundid3=null;
          this.EmpPoolForm.xx[2].state3=null;
          this.EmpPoolForm.acceptperson=null;
          this.EmpPoolForm.acceptcompany=null;
          this.EmpPoolForm.deliveryperson=null;
          this.EmpPoolForm.deliverycompany=null;
          this.query();
        },
         /* 新增 */
        add:function(){
            this.title='新增入库';
            this.EmpPoolForm.acceptperson=null;
            this.EmpPoolForm.acceptcompany=null;
            this.EmpPoolForm.deliveryperson=null;
            this.EmpPoolForm.deliverycompany=null;

            this.dialogFormVisible= true;


        },
         /* 新增异常 */
        addyc:function(){
          //alert("新增异常");
        this.refresh();
          /* launchdate:this.sorabnormalfrom.launchdate, */
          this.dialogFormVisibleyc=true;
        },
        /* 编辑 */
        handleEdit:function(r){
          this.title='入库修改';
          let pages = {
              id:r.id,
           }
           let url = 'http://localhost/wuliuxm/FillSorStoragedetailsByidLx';
           axios.post(url,qs.stringify(pages)).then(resp => {
               console.log(resp.data);
               this.results = resp.data;


          this.EmpPoolForm.xx[0].id1=this.results[0].id;
          this.EmpPoolForm.xx[0].packageid1=this.results[0].packageid;
          this.EmpPoolForm.xx[0].weight1=this.results[0].weight;
          this.EmpPoolForm.xx[0].outboundid1=this.results[0].outboundid;
          this.EmpPoolForm.xx[0].state1=this.results[0].state;
          if(this.EmpPoolForm.xx[0].state1==0){
            this.EmpPoolForm.xx[0].state1='有货无单';
          }
          if(this.EmpPoolForm.xx[0].state1==1){
            this.EmpPoolForm.xx[0].state1='初始入库';
          }
          if(this.EmpPoolForm.xx[0].state1==2){
            this.EmpPoolForm.xx[0].state1='二次入库';
          }
          if(this.EmpPoolForm.xx[0].state1==3){
            this.EmpPoolForm.xx[0].state1='中转入库';
          }
          this.EmpPoolForm.xx[1].id2=this.results[1].id;
          this.EmpPoolForm.xx[1].packageid2=this.results[1].packageid;
          this.EmpPoolForm.xx[1].weight2=this.results[1].weight;
          this.EmpPoolForm.xx[1].outboundid2=this.results[1].outboundid;
          this.EmpPoolForm.xx[1].state2=this.results[1].state;;
         if(this.EmpPoolForm.state2==0){
           this.EmpPoolForm.state2='有货无单';
         }
         if(this.EmpPoolForm.xx[1].state2==1){
           this.EmpPoolForm.xx[1].state2='初始入库';
         }
         if(this.EmpPoolForm.xx[1].state2==2){
           this.EmpPoolForm.xx[1].state2='二次入库';
         }
         if(this.EmpPoolForm.xx[1].state2==3){
           this.EmpPoolForm.xx[1].state2='中转入库';
         }
          this.EmpPoolForm.xx[2].id3=this.results[2].id;
          this.EmpPoolForm.xx[2].packageid3=this.results[2].packageid;
          this.EmpPoolForm.xx[2].weight3=this.results[2].weight;;
          this.EmpPoolForm.xx[2].outboundid3=this.results[2].outboundid;
          this.EmpPoolForm.xx[2].state3=this.results[2].state;
          if(this.EmpPoolForm.xx[2].state3==0){
            this.EmpPoolForm.xx[2].state3='有货无单';
          }
          if(this.EmpPoolForm.xx[2].state3==1){
            this.EmpPoolForm.xx[2].state3='初始入库';
          }
          if(this.EmpPoolForm.xx[2].state3==2){
            this.EmpPoolForm.xx[2].state3='二次入库';
          }
          if(this.EmpPoolForm.xx[2].state3==3){
            this.EmpPoolForm.xx[2].state3='中转入库';
          }

          this.EmpPoolForm.id=r.id;
          this.EmpPoolForm.acceptperson=r.acceptperson;
          this.EmpPoolForm.acceptcompany=r.acceptcompany;
          this.EmpPoolForm.deliveryperson=r.deliveryperson;
          this.EmpPoolForm.deliverycompany=r.deliverycompany;
        this.dialogFormVisible= true;
        }).catch(error => {
          console.log(error);
        });
        },
        /* 删除 */
        handleDelete:function(r){
           // alert(r.id)
            let pages = {
                id:r.id,
             }
             let url = 'http://localhost/wuliuxm/deleteSorStorageLx';
             axios.post(url,qs.stringify(pages)).then(resp => {
                 console.log(resp.data);
                 this.query();
               }).catch(error => {
                 console.log(error);
               });
        },
        /* 查看明细 */
        handleMX:function(row){
             let pages = {
                 id:row.id,
              }
              let url = 'http://localhost/wuliuxm/FillSorStoragedetailsByidLx';
              axios.post(url,qs.stringify(pages)).then(resp => {
                  console.log(resp.data);
                  this.results = resp.data;
                }).catch(error => {
                  console.log(error);
                });
            this.dialogFormVisiblelist=true;
        },
        /* 异常对话框 确认*/
        ycSubmit:function(){
                    let pages = {
                        id:this.sorabnormalfrom.id,
                        abnormaltype:this.sorabnormalfrom.abnormaltype,
                        abostate:this.sorabnormalfrom.abostate,
                        launchcompany:this.sorabnormalfrom.launchcompany,
                        cargoint:this.sorabnormalfrom.cargoint,
                        packageint:this.sorabnormalfrom.packageint,
                        transferint:this.sorabnormalfrom.transferint,
                        hedgeabnint:this.sorabnormalfrom.hedgeabnint,
                        launchperson:this.empkey.empname,
                        /* launchdate:this.sorabnormalfrom.launchdate, */

                     }
                     alert(qs.stringify(pages))
                     console.log(qs.stringify(pages))
          let url = 'http://localhost/wuliuxm/insertSorAbnormalLX';
           axios.post(url,qs.stringify(pages)).then(resp => {
                 this.dialogFormVisibleyc=false;
             }).catch(error => {
               console.log(error);
             });
        },
       /* 对话框 中确定 */
       doSubmit:function(){

        // alert(this.EmpPoolForm.acceptcompany)

         let pages = {
           id:this.EmpPoolForm.id,
           acceptperson: this.EmpPoolForm.acceptperson,
           acceptcompany: this.EmpPoolForm.acceptcompany,
           deliveryperson: this.EmpPoolForm.deliveryperson,
           deliverycompany: this.EmpPoolForm.deliverycompany,
           list:JSON.stringify([{


             id:this.EmpPoolForm.xx[0].id1,
             packageid:this.EmpPoolForm.xx[0].packageid1,
             weight:this.EmpPoolForm.xx[0].weight1,
             outboundid:this.EmpPoolForm.xx[0].outboundid1,
             state:this.EmpPoolForm.xx[0].state1,

           },
           {

             id:this.EmpPoolForm.xx[1].id2,
             packageid:this.EmpPoolForm.xx[1].packageid2,
             weight:this.EmpPoolForm.xx[1].weight2,
             outboundid:this.EmpPoolForm.xx[1].outboundid2,
             state:this.EmpPoolForm.xx[1].state2,

           },
           {

             id:this.EmpPoolForm.xx[2].id3,
             packageid:this.EmpPoolForm.xx[2].packageid3,
             weight:this.EmpPoolForm.xx[2].weight3,
             outboundid:this.EmpPoolForm.xx[2].outboundid3,
             state:this.EmpPoolForm.xx[2].state3,

           },
           ]),
         }
       // alert("xx")
         console.log(qs.stringify(pages))
                //  alert(qs.stringify(pages));
         let url = 'http://localhost/wuliuxm/insertStoragedetailsByidLx';
         if(this.title=='入库修改'){
             url = 'http://localhost/wuliuxm/updateStoragedetailsByidLx';
         }
         axios.post(url,qs.stringify(pages)).then(resp => {
             console.log(resp.data);

             this.dialogFormVisible= false;
             this.query();
           }).catch(error => {
             console.log(error);
           });

       },
       /* 下拉框值改变事件 */
       empchange1:function(r){
          let pages = {
            unid:r,
           }
           let url = 'http://localhost/wuliuxm/FillSyUnitsByidLx';
             axios.post(url,qs.stringify(pages)).then(resp => {
               console.log(resp.data);
               console.log(resp.data.name);
               this.EmpPoolForm.acceptcompany = resp.data.name;
             }).catch(error => {
               console.log(error);
             });
       },
       empchange2:function(r){
          let pages = {
              unid:r,
           }
           let url = 'http://localhost/wuliuxm/FillSyUnitsByidLx';
           axios.post(url,qs.stringify(pages)).then(resp => {
               console.log(resp.data);
               console.log(resp.data.name);
               this.EmpPoolForm.deliverycompany = resp.data.name;
             }).catch(error => {
               console.log(error);
             });
       },
       /* 封装方法   初始化查询*/
      query:function(){
         let url = 'http://localhost/wuliuxm/FillAllSorStorageLx';
        axios.post(url,null).then(resp => {
            console.log(resp.data);
            this.result = resp.data;
          }).catch(error => {
            console.log(error);
          });
      },

    },
    /* -----------------万恶的分割线------------------ */
    /* 初始化 */
      created: function() {
      this.query();
        this.empkey=this.$session.get("emplistkey");
       // alert(this.empkey.empname)
          /*所有员工*/
         let url = 'http://localhost/wuliuxm/FillAllSyEmpLx';
          axios.post(url,null).then(resp => {
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
 .divClassjzys {
    width: 1800px;
    align:center;
  }
</style>
