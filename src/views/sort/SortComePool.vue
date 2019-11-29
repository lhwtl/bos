<template>
  <div class="divClass">
    <!--面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a>出库管理</a></el-breadcrumb-item>
    </el-breadcrumb>
    <!--搜索框-->

    <el-form :inline="true" class="demo-form-inline" style="margin-top: 10px;">

      <el-form-item label="出库交接单:">
        <el-input v-model="navigation1" placeholder="出库交接单号"></el-input>
      </el-form-item>
  <el-form-item label="交接单类型">
          <el-select v-model="navigation2" placeholder="--交接单类型--" style="width: 100%;">
            <el-option value=1 label="是"></el-option>
            <el-option value=0 label="否"></el-option>
          </el-select>
        </el-form-item>
      <el-form-item>
        <!-- <el-form-item> -->
        <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
      </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-refresh" @click="refresh">重置</el-button>
          </el-form-item>
      <el-form-item>
        <el-button type="primary"  @click="add">新增出库</el-button>
      </el-form-item>

    </el-form>


    <!--数据表格-->
    <el-table :data="result" style="width: 100%;" :border="true" max-height="550">
     <!-- <el-table-column prop="id" label="序号" min-width="30" align="center"></el-table-column> -->
      <el-table-column prop="id" label="出库交接单号" min-width="50"></el-table-column>
      <el-table-column prop="handovertype"  label="交接单类型"  min-width="70">
        <template slot-scope="scope1" >
            <p v-if="scope1.row.handovertype=='0'">长途交接单</p>
            <p v-if="scope1.row.handovertype=='1'">市内交接单</p>
            <p v-if="scope1.row.handovertype=='2'">省内交接单</p>
            <p v-if="scope1.row.handovertype=='3'">全国交接单</p>
        </template>
      </el-table-column>

      <el-table-column prop="line" label="线路资源" min-width="50">
        <template slot-scope="scope1" >
          <div  v-for="c in EmpList" :key="c.id">
            <p v-if="scope1.row.line==c.id">
                 {{c.empname}}
            </p>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="direction"  label="物流方向"  min-width="70">
        <template slot-scope="scope1" >
             <div  v-for="c in EmpList" :key="c.id">
               <p v-if="scope1.row.direction==c.syUnits.id">
                   {{c.syUnits.name}}
               </p>
             </div>
           </template>
      </el-table-column>
      <el-table-column prop="acceptperson" label="接货人" min-width="50">
        <template slot-scope="scope1" >
          <div  v-for="c in EmpList" :key="c.id">
            <p v-if="scope1.row.acceptperson==c.id">
                 {{c.empname}}
            </p>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="carriers"  label="承运商"  min-width="70">
       <template slot-scope="scope1" >
            <div  v-for="c in EmpList" :key="c.id">
              <p v-if="scope1.row.carriers==c.syUnits.id">
                  {{c.syUnits.name}}
              </p>
            </div>
          </template>
        </el-table-column>

      <el-table-column prop="deliveryperson" label="出货人" min-width="50">
        <template slot-scope="scope1" >
          <div  v-for="c in EmpList" :key="c.id">
            <p v-if="scope1.row.deliveryperson==c.id">
                {{c.empname}}
            </p>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="deliverycompany" label="出货单位" min-width="50">
      <template slot-scope="scope1" >
           <div  v-for="c in EmpList" :key="c.id">
             <p v-if="scope1.row.carriers==c.syUnits.id">
                 {{c.syUnits.name}}
             </p>
           </div>
         </template>
      </el-table-column><!-- prop="enterperson" -->
      <el-table-column prop="enterperson"   label="确认人"  min-width="70">
         <template slot-scope="scope1" >
              <div  v-for="c in EmpList" :key="c.id">
                <p v-if="scope1.row.enterperson==c.id">
                    {{c.empname}}
                </p>
              </div>
            </template>
    </el-table-column>
      <el-table-column prop="enterdate" label="却认时间" min-width="50"></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          <el-button size="mini" type="danger" @click="handleMX(scope.row)">明细</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background @current-change="change"  layout="prev, pager, next"
      :current-page="pag" :page-size="size" :total="total">
    </el-pagination>

 <!--  对话框  ref="RoleForm" :rules="rules"-->
     <el-dialog :title="title" :visible.sync="dialogFormVisible" width="800px">

       <el-form :model="EmpPoolForm"  >
         <el-form-item label="编号" :label-width="formLabelWidth" v-show="false">
           <el-input v-model="EmpPoolForm.id" autocomplete="off"></el-input>
         </el-form-item>
       <p>
          <label>交接单类型：</label>
             <el-select v-model="EmpPoolForm.handovertype"  placeh older="--交接单类型--" style="width: 20%;">
              <el-option value="0" label="长途交接单" ></el-option>
              <el-option value="1" label="市内交接单" ></el-option>
              <el-option value="2" label="省内交接单" ></el-option>
              <el-option value="3" label="全国交接单" ></el-option>
             </el-select>
           </el-form-item>
         <label>线路资源：</label><!-- disabled="true"  -->
         <el-select v-model="EmpPoolForm.line" @change="empchange0" placeholder="--线路资源--" style="width: 20%;">
           <el-option v-for="c in EmpList" :key="c.id" :value="c.id" :label="c.empname"></el-option>
         </el-select>
         <label>物流方向：</label><!-- disabled="true" direction -->
             <el-input v-model="EmpPoolForm.direction"  autocomplete="off" :readonly="true"   style="width: 20%;"></el-input>
      </p>

       <P>
          <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;接货人：</label>
             <el-select v-model="EmpPoolForm.acceptperson" @change="empchange1" placeholder="--接货人--" style="width: 20%;">
               <el-option v-for="c in EmpList" :key="c.id" :value="c.id" :label="c.empname"></el-option>
             </el-select>
           </el-form-item>
           <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;承运商：</label>
           <el-input v-model="EmpPoolForm.carriers"  autocomplete="off" :readonly="true"   style="width: 20%;"></el-input>
           <label>确认时间：</label>
           <el-input v-model="EmpPoolForm.enterdate"  placeholder="当前时间" autocomplete="off" :readonly="true"   style="width: 20%;"></el-input>
       </p>
       <P>
          <label>&nbsp;&nbsp;出货人：</label>
             <el-select v-model="EmpPoolForm.deliveryperson" @change="empchange2" placeholder="--出货人--" style="width: 20%;">
               <el-option v-for="c in EmpList" :key="c.id" :value="c.id" :label="c.empname"></el-option>
             </el-select>
           </el-form-item>
           <label>出货单位：</label>
           <el-input v-model="EmpPoolForm.deliverycompany"  autocomplete="off" :readonly="true"   style="width: 20%;"></el-input>
           <label>&nbsp;&nbsp;确认人：</label>
           <el-select v-model="EmpPoolForm.enterperson"  placeholder="--确认人--" style="width: 20%;">
             <el-option v-for="c in EmpList" :key="c.id" :value="c.id" :label="c.empname"></el-option>
           </el-select>
       </p>

 <p>
                   <el-input v-model="EmpPoolForm.id1" placeholder="单号" :readonly="true" style="width: 14%;"></el-input>
                   <el-input v-model="EmpPoolForm.packageid1" placeholder="交接单号" :readonly="true" style="width: 14%;"></el-input>
                   <el-input v-model="EmpPoolForm.xx[0].weight1" placeholder="重量" style="width: 12%;"></el-input>
                   <el-input v-model="EmpPoolForm.xx[0].volume1" placeholder="体积"  style="width: 12%;"></el-input>
                   <el-select v-model="EmpPoolForm.xx[0].isscan1" placeholder="状态" style="width: 13%;">
                     <el-option label="是" value="1"></el-option>
                     <el-option label="否" value="0"></el-option>
                   </el-select>
                   <el-select v-model="EmpPoolForm.xx[0].isnextstorage1" placeholder="下环节入库" style="width: 16%;">
                     <el-option label="是" value="1"></el-option>
                     <el-option label="否" value="0"></el-option>
                   </el-select>
                   <el-select v-model="EmpPoolForm.xx[0].isdoublestorage1" placeholder="二次入库" style="width: 14%;">
                     <el-option label="是" value="1"></el-option>
                     <el-option label="否" value="0"></el-option>

                   </el-select>
 </p>
<p>
                   <el-input v-model="EmpPoolForm.id2" placeholder="单号" :readonly="true" style="width: 14%;"></el-input>
                   <el-input v-model="EmpPoolForm.packageid2" placeholder="交接单号" :readonly="true" style="width: 14%;"></el-input>
                   <el-input v-model="EmpPoolForm.xx[1].weight2" placeholder="重量" style="width: 12%;"></el-input>
                   <el-input v-model="EmpPoolForm.xx[1].volume2" placeholder="体积"  style="width: 12%;"></el-input>
                   <el-select v-model="EmpPoolForm.xx[1].isscan2" placeholder="状态" style="width: 13%;">
                     <el-option label="是" value="1"></el-option>
                     <el-option label="否" value="0"></el-option>
                   </el-select>
                   <el-select v-model="EmpPoolForm.xx[1].isnextstorage2" placeholder="下环节入库" style="width: 16%;">
                     <el-option label="是" value="1"></el-option>
                     <el-option label="否" value="0"></el-option>
                   </el-select>
                   <el-select v-model="EmpPoolForm.xx[1].isdoublestorage2" placeholder="二次入库" style="width: 14%;">
                     <el-option label="是" value="1"></el-option>
                     <el-option label="否" value="0"></el-option>
                   </el-select>
 </p>
 <p>
                   <el-input v-model="EmpPoolForm.id3" placeholder="单号" :readonly="true" style="width: 14%;"></el-input>
                   <el-input v-model="EmpPoolForm.packageid3" placeholder="交接单号" :readonly="true" style="width: 14%;"></el-input>
                   <el-input v-model="EmpPoolForm.xx[2].weight3" placeholder="重量" style="width: 12%;"></el-input>
                   <el-input v-model="EmpPoolForm.xx[2].volume3" placeholder="体积"  style="width: 12%;"></el-input>
                   <el-select v-model="EmpPoolForm.xx[2].isscan3" placeholder="状态" style="width: 13%;">
                     <el-option label="是" value="1"></el-option>
                     <el-option label="否" value="0"></el-option>
                   </el-select>
                   <el-select v-model="EmpPoolForm.xx[2].isnextstorage3" placeholder="下环节入库" style="width: 16%;">
                     <el-option label="是" value="1"></el-option>
                     <el-option label="否" value="0"></el-option>
                   </el-select>
                   <el-select v-model="EmpPoolForm.xx[2].isdoublestorage3" placeholder="二次入库" style="width: 14%;">
                     <el-option label="是" value="1"></el-option>
                     <el-option label="否" value="0"></el-option>
                   </el-select>
 </p>
       </el-form>
       <div slot="footer" class="dialog-footer">
         <el-button @click="dialogFormVisible = false">取 消</el-button>
         <el-button type="primary" @click="doSubmit">确 定</el-button>
       </div>
     </el-dialog>

    <!-- 详情弹框 -->


    <!-- 权限框-->
<el-dialog :title="titlelist" :visible.sync="dialogFormVisiblelist">
<el-table :data="results" style="width: 100%;" :border="true" max-height="550">
 <el-table-column prop="id" label="单号" min-width="40"></el-table-column>
          <el-table-column prop="packageid"  label="交接单号"  min-width="40"></el-table-column>
          <el-table-column prop="weight"  label="重量"  min-width="50"></el-table-column>
          <el-table-column prop="volume"  label="体积"  min-width="50"> </el-table-column>
          <el-table-column prop="scandate"  label="时间"  min-width="50"></el-table-column>
          <el-table-column prop="isscan"  label="状态"  min-width="50">
            <template slot-scope="scope1">
              <p v-if="scope1.row.isscan=='0'">否</p>
              <p v-if="scope1.row.isscan=='1'">是</p>
            </template>
            </el-table-column>
          <el-table-column prop="isnextstorage"  label="下环节入库"  min-width="50">
            <template slot-scope="scope1">
              <p v-if="scope1.row.isnextstorage=='0'">否</p>
              <p v-if="scope1.row.isnextstorage=='1'">是</p>
             </template>
          </el-table-column>
          <el-table-column prop="isdoublestorage"  label="二次入库"  min-width="50">
            <template slot-scope="scope1">
              <p v-if="scope1.row.isdoublestorage=='0'">否</p>
              <p v-if="scope1.row.isdoublestorage=='1'">是</p>
             </template>
          </el-table-column>
          </el-table>
 </el-dialog>


  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
  export default {
    name: 'SortComePool',
    data: function() {
      return {
        cys:null,
        chdw:null,
        wlfx:null,
        navigation1: null, //导航栏查询。。
        navigation2: null, //导航栏查询查询。
        EmpList:[],
        result: [], //主显示集合
        results:[],//详情
        total: 7,
        size: 7, //条数
        pag: 1, //页数
        dialogFormVisible: false,
        dialogFormVisiblelist:false,
        formLabelWidth: "120px",
        title:'出库新增',
        titlelist:'出库详情',
        EmpPoolForm:{
          id:null,
          handovertype:null,
          line:null,
          direction:null,
          acceptperson:null,
          carriers:null,
          enterdate:null,
          deliveryperson:null,
          deliverycompany:null,
          enterperson:null,
          xx:[{
            id1:null,
            packageid1:null,
            weight1:null,
            volume1:null,
            isscan1:null,
            isnextstorage1:null,
            isdoublestorage1:null,
          },
          {
            id2:null,
            packageid2:null,
            weight2:null,
            volume2:null,
            isscan2:null,
            isnextstorage2:null,
            isdoublestorage2:null,
          },
          {
            id3:null,
            packageid3:null,
            weight3:null,
            volume3:null,
            isscan3:null,
            isnextstorage3:null,
            isdoublestorage3:null,
          }],
        },
        RoleForm:[],//对话框值帮定
      }
    },
    methods: {
        /* 查询 */
        onSubmit:function(){
         // alert("查询");
          this.query();
        },
         /* 重置 */
        refresh:function(){
          //alert("重置");
          this.query();

        },
         /* 新增 */
        add:function(){

          this.title="出库新增";
  this.dialogFormVisible= false;
          this.EmpPoolForm.id=null,
          this.EmpPoolForm.handovertype=null,
          this.EmpPoolForm.line=null,
          this.EmpPoolForm.direction=null,
          this.EmpPoolForm.acceptperson=null,
          this.EmpPoolForm.carriers=null,
          this.EmpPoolForm.enterdate=null,
          this.EmpPoolForm.deliveryperson=null,
          this.EmpPoolForm.deliverycompany=null,
          this.EmpPoolForm.enterperson=null,
            this.EmpPoolForm.id1=null,
            this.EmpPoolForm.packageid1=null,
            this.EmpPoolForm.xx[0].weight1=null,
            this.EmpPoolForm.xx[0].volume1=null,
            this.EmpPoolForm.xx[0].isscan1=null,
            this.EmpPoolForm.xx[0].isnextstorage1=null,
            this.EmpPoolForm.xx[0].isdoublestorage1=null,
            this.EmpPoolForm.id2=null,
            this.EmpPoolForm.packageid2=null,
            this.EmpPoolForm.xx[1].weight2=null,
            this.EmpPoolForm.xx[1].volume2=null,
            this.EmpPoolForm.xx[1].isscan2=null,
            this.EmpPoolForm.xx[1].isnextstorage2=null,
            this.EmpPoolForm.xx[1].isdoublestorage2=null,
            this.EmpPoolForm.id3=null,
            this.EmpPoolForm.packageid3=null,
            this.EmpPoolForm.xx[2].weight3=null,
            this.EmpPoolForm.xx[2].volume3=null,
            this.EmpPoolForm.xx[2].isscan3=null,
            this.EmpPoolForm.xx[2].isnextstorage3=null,
            this.EmpPoolForm.xx[2].isdoublestorage3=null;
        this.dialogFormVisible= true;
        },
        /* 编辑 */
        handleEdit:function(row){
          this.title="出库编辑";
          this.EmpPoolForm.id=row.id,
          this.EmpPoolForm.handovertype=row.handovertype,
          this.EmpPoolForm.line=row.line,
          this.EmpPoolForm.direction=row.direction,
          this.EmpPoolForm.acceptperson=row.acceptperson,
          this.EmpPoolForm.carriers=row.carriers,
          this.EmpPoolForm.enterdate=row.enterdate,
          this.EmpPoolForm.deliveryperson=row.deliveryperson,
          this.EmpPoolForm.deliverycompany=row.deliverycompany,
          this.EmpPoolForm.enterperson=row.enterperson;



         let pages = {
            packageid:"CK-"+row.id,
         }
         let url = 'http://localhost/wuliuxm/FiillSorOutbounddetailsByid';
         axios.post(url,qs.stringify(pages)).then(resp => {
             console.log(resp.data);
             this.results = resp.data;

/* 赋值 */
                this.EmpPoolForm.id1=this.results[0].id;
                this.EmpPoolForm.packageid1=this.results[0].packageid;
                this.EmpPoolForm.xx[0].weight1=this.results[0].weight;
                this.EmpPoolForm.xx[0].volume1=this.results[0].volume;
                this.EmpPoolForm.xx[0].isscan1=this.results[0].isscan;
                this.EmpPoolForm.xx[0].isnextstorage1=this.results[0].isnextstorage;
                this.EmpPoolForm.xx[0].isdoublestorage1=this.results[0].isdoublestorage;
                this.EmpPoolForm.id2=this.results[1].id;
                this.EmpPoolForm.packageid2=this.results[1].packageid;
                this.EmpPoolForm.xx[1].weight2=this.results[1].weight;
                this.EmpPoolForm.xx[1].volume2=this.results[1].volume;
                this.EmpPoolForm.xx[1].isscan2=this.results[1].isscan;
                this.EmpPoolForm.xx[1].isnextstorage2=this.results[1].isnextstorage;
                this.EmpPoolForm.xx[1].isdoublestorage2=this.results[1].isdoublestorage;
                this.EmpPoolForm.id3=this.results[2].id;
                this.EmpPoolForm.packageid3=this.results[2].packageid;
                this.EmpPoolForm.xx[2].weight3=this.results[2].weight;
                this.EmpPoolForm.xx[2].volume3=this.results[2].volume;
                this.EmpPoolForm.xx[2].isscan3=this.results[2].isscan;
                this.EmpPoolForm.xx[2].isnextstorage3=this.results[2].isnextstorage;
                this.EmpPoolForm.xx[2].isdoublestorage3=this.results[2].isdoublestorage;
                this.dialogFormVisible= true;



          }).catch(error => {
            console.log(error);
          });




        },
        /* 删除 */
        handleDelete:function(row){
         // alert(row.id)
          let pages = {
              id:row.id,
           }
           let url = 'http://localhost/wuliuxm/deleteSorOutboundLx';
           axios.post(url,qs.stringify(pages)).then(resp => {
               console.log(resp.data);
               this.query();
             }).catch(error => {
               console.log(error);
             });
        },
        /* 查看明细 */
        handleMX:function(row){
          // alert(row.id)
                let pages = {
                 packageid:"CK-"+row.id,
              }
              let url = 'http://localhost/wuliuxm/FiillSorOutbounddetailsByid';
              axios.post(url,qs.stringify(pages)).then(resp => {
                  console.log(resp.data);
                  this.results = resp.data;
                }).catch(error => {
                  console.log(error);
                });
        this.dialogFormVisiblelist=true;
        },
        /* 点击分页*/
       change: function(r) {
          alert("点击分页");
       },
       /* 对话框 中确定 */
       doSubmit:function(){

    let pages = {
           id:this.EmpPoolForm.id,
           handovertype: this.EmpPoolForm.handovertype,
           line: this.EmpPoolForm.line,
           direction: this.wlfx,/* direction */
           acceptperson: this.EmpPoolForm.acceptperson,
           carriers: this.cys,/* deliveryccarriersompany */
          /* enterdate: this.EmpPoolForm.enterdate, */
           deliveryperson: this.EmpPoolForm.deliveryperson,
           deliverycompany: this.chdw,/* deliverycompany */
           enterperson: this.EmpPoolForm.enterperson,
           list:JSON.stringify([{

             id:this.EmpPoolForm.id1,
             packageid:this.EmpPoolForm.packageid1,
             weight:this.EmpPoolForm.xx[0].weight1,
             volume:this.EmpPoolForm.xx[0].volume1,
             isscan:this.EmpPoolForm.xx[0].isscan1,
             isnextstorage:this.EmpPoolForm.xx[0].isnextstorage1,
             isdoublestorage:this.EmpPoolForm.xx[0].isdoublestorage1,

           },
           {

            id:this.EmpPoolForm.id2,
            packageid:this.EmpPoolForm.packageid2,
            weight:this.EmpPoolForm.xx[1].weight2,
            volume:this.EmpPoolForm.xx[1].volume2,
            isscan:this.EmpPoolForm.xx[1].isscan2,
            isnextstorage:this.EmpPoolForm.xx[1].isnextstorage2,
            isdoublestorage:this.EmpPoolForm.xx[1].isdoublestorage2,

           },
           {

            id:this.EmpPoolForm.id3,
            packageid:this.EmpPoolForm.packageid3,
            weight:this.EmpPoolForm.xx[2].weight3,
            volume:this.EmpPoolForm.xx[2].volume3,
            isscan:this.EmpPoolForm.xx[2].isscan3,
            isnextstorage:this.EmpPoolForm.xx[2].isnextstorage3,
            isdoublestorage:this.EmpPoolForm.xx[2].isdoublestorage3,

           },
           ]),
         }
        alert(qs.stringify(pages))
         console.log(qs.stringify(pages))
                //  alert(qs.stringify(pages));
         let url = 'http://localhost/wuliuxm/insertSorOutboundLx';
         if(this.title=='出库编辑'){
             url = 'http://localhost/wuliuxm/updateSorOutboundLx';
         }
         axios.post(url,qs.stringify(pages)).then(resp => {
             console.log(resp.data);
             this.dialogFormVisible= false;
             this.EmpPoolForm.id=null,
             this.EmpPoolForm.handovertype=null,
             this.EmpPoolForm.line=null,
             this.EmpPoolForm.direction=null,
             this.EmpPoolForm.acceptperson=null,
             this.EmpPoolForm.carriers=null,
             this.EmpPoolForm.enterdate=null,
             this.EmpPoolForm.deliveryperson=null,
             this.EmpPoolForm.deliverycompany=null,
             this.EmpPoolForm.enterperson=null,
               this.EmpPoolForm.id1=null,
               this.EmpPoolForm.packageid1=null,
               this.EmpPoolForm.weight1=null,
               this.EmpPoolForm.volume1=null,
               this.EmpPoolForm.isscan1=null,
               this.EmpPoolForm.isnextstorage1=null,
               this.EmpPoolForm.isdoublestorage1=null,
               this.EmpPoolForm.id2=null,
               this.EmpPoolForm.packageid2=null,
               this.EmpPoolForm.weight2=null,
               this.EmpPoolForm.volume2=null,
               this.EmpPoolForm.isscan2=null,
               this.EmpPoolForm.isnextstorage2=null,
               this.EmpPoolForm.isdoublestorage2=null,
               this.EmpPoolForm.id3=null,
               this.EmpPoolForm.packageid3=null,
               this.EmpPoolForm.weight3=null,
               this.EmpPoolForm.volume3=null,
               this.EmpPoolForm.isscan3=null,
               this.EmpPoolForm.isnextstorage3=null,
               this.EmpPoolForm.isdoublestorage3=null,
             this.query();
           }).catch(error => {
             console.log(error);
           });



       },
       /* 下拉框值改变事件 */
       empchange0:function(r){
          let pages = {
            unid:r,
           }
           let url = 'http://localhost/wuliuxm/FillSyUnitsByidLx';
             axios.post(url,qs.stringify(pages)).then(resp => {
               console.log(resp.data);
               console.log(resp.data.name);
               this.EmpPoolForm.direction = resp.data.name;
               this.wlfx=resp.data.id;
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
               this.EmpPoolForm.carriers = resp.data.name;
               this.cys=resp.data.id;
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
                this.chdw=resp.data.id;
             }).catch(error => {
               console.log(error);
             });
       },
       /* 封装方法   初始化查询*/
      query:function(){
          let url = 'http://localhost/wuliuxm/FillSorOutboundLx';
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
      /* 员工下拉*/
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
