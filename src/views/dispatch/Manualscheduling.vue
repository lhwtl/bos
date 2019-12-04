<template>
  <div class="ktzd">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top: 20px;">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>调度</el-breadcrumb-item>
      <el-breadcrumb-item>人工调度</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="所属单位">
        <el-select v-model="processingunit" placeholder="请选择" style="width: 100px;">
          <el-option v-for=" item in options" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="通知单号">
        <el-input v-model="businessnoticeno" placeholder="请输入通知单号" style="width: 150px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <!--分配的弹框 -->
    <el-dialog title="分配" :visible.sync="dialogFormVisible" style="width: 500px;">
      <el-form>
        <el-form-item label="取件单位" :label-width="formLabelWidth">
          <el-select v-model="pickupunit" placeholder="请选择"">
             <el-option
               v-for=" item in
            options" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分拣编码">
          <el-select v-model="sortingcode" placeholder="请选择"">
             <el-option
               v-for=" item in
            fjbm" :key="item.id" :label="item.sortingcode" :value="item.sortingcode">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="qdSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 表格 -->
    <el-table :data="result" border style="width: 100%">

      <el-table-column type="selection" width="50">
      </el-table-column>
      <el-table-column prop="id" label="序号" width="50">
      </el-table-column>
      <el-table-column prop="businessnoticeno" label="通知单号" width="80">
      </el-table-column>
      <el-table-column prop="reservationtime" label="预约收件时间" width="80">
      </el-table-column>
      <el-table-column prop="customname" label="客户名称" width="80">
      </el-table-column>
      <el-table-column prop="pickupaddress" label="取件地址" width="100">
      </el-table-column>
      <el-table-column prop="customcode" label="客户编号" width="80">
      </el-table-column>
      <el-table-column prop="linkman" label="联系人" width="80">
      </el-table-column>
      <el-table-column prop="telphone" label="电话" width="80">
      </el-table-column>
      <el-table-column prop="weight" label="重量" width="80">
      </el-table-column>
      <el-table-column prop="volume" label="体积" width="80">
      </el-table-column>
      <el-table-column prop="importanthints" label="重要提示" width="80">
      </el-table-column>
      <el-table-column prop="arrivecity" label="到达城市" width="80">
      </el-table-column>
	  <el-table-column label="操作" width="250">
	    <template slot-scope="scope">
        <el-button size="mini" type="success" @click="fpOrder(scope.row)">分配</el-button>
        <el-button size="mini" type="success" @click="xdClick(scope.row)">销单</el-button>
	      <el-button size="mini" type="success" @click="handleDetail(scope.row)">详情</el-button>
	    </template>
	  </el-table-column>
    </el-table>
    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pages"
      :page-sizes="[1,3,5,8]" :page-size="rows" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
     <!-- 详情-->
     <el-dialog :title="人工调度详情" :visible.sync="dialogFormVisibledetail">
       <h3 style="text-align: left;">人工调度详情</h3>
        <hr />
        <template>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="业务通知单信息" name="first">
              <el-form :model="Returnapplication" ref="Returnapplication" :rules="rules">
                业务通知单号:<el-input v-model="Returnapplication.businessnoticeno" placeholder="请输入内容" readonly="true" style="width: 130px;"></el-input>
                预约收件时间:<el-input v-model="Returnapplication.reservationtimes" placeholder="请输入内容" readonly="true" style="width: 130px;"></el-input>
                取件地址:<el-input v-model="Returnapplication.pickupaddress" placeholder="请输入内容" readonly="true" style="width: 130px;"></el-input><br />
                客户编号:<el-input v-model="Returnapplication.customcode" placeholder="请输入内容" readonly="true" style="width: 160px;"></el-input>
                联系人:<el-input v-model="Returnapplication.linkman" placeholder="请输入内容" readonly="true" style="width: 160px;"></el-input>
                电话:<el-input v-model="Returnapplication.telphone" placeholder="请输入内容" readonly="true" style="width: 165px;"></el-input><br />
                重量:<el-input v-model="Returnapplication.weight" placeholder="请输入内容" readonly="true" style="width: 160px;"></el-input>
                 体积:<el-input v-model="Returnapplication.volume" placeholder="请输入内容" readonly="true" style="width: 170px;"></el-input>
                 重要提示:<el-input v-model="Returnapplication.importanthints" placeholder="请输入内容" readonly="true" style="width: 165px;"></el-input><br />
                 到达城市:<el-input v-model="Returnapplication.arrivecity" placeholder="请输入内容" readonly="true" style="width: 145px;"></el-input>
                 取货人员信息:<el-input v-model="Returnapplication.pickerinfo " placeholder="请输入内容" readonly="true" style="width: 140px;"></el-input>
                 派送地址:<el-input v-model="Returnapplication.sendaddress" placeholder="请输入内容" readonly="true" style="width: 130px;"></el-input><br />
                 处理单位:<el-input v-model="Returnapplication.processingunit" placeholder="请输入内容" readonly="true" style="width: 250px;"></el-input>
                 通知单来源:<el-input v-model="Returnapplication.notificationsource" placeholder="请输入内容" readonly="true" style="width: 240px;"></el-input>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="工单信息" name="second">
              <el-form :model="Ordermenage" ref="Ordermenage" :rules="rules">
                工单号:<el-input v-model="Ordermenage.jobno" placeholder="请输入内容" readonly="true" style="width: 150px;"></el-input>
                工单类型:<el-input v-model="Ordermenage.JobType" placeholder="请输入内容" readonly="true" style="width: 150px;"></el-input>
                取件状态:<el-input v-model="Ordermenage.PickupStatus" placeholder="请输入内容" readonly="true" style="width: 150px;"></el-input><br />
                短信序号:<el-input v-model="Ordermenage.ShortMessageInt" placeholder="请输入内容" readonly="true" style="width: 140px;"></el-input>
                联系人:<el-input v-model="Ordermenage.linkman" placeholder="请输入内容" readonly="true" style="width: 140px;"></el-input>
                工单生成时间:<el-input v-model="Ordermenage.WorkGenerationTime" placeholder="请输入内容" readonly="true" style="width: 140px;"></el-input><br />
                追单次数:<el-input v-model="Ordermenage.AfterSingleNum" placeholder="请输入内容" readonly="true" style="width: 140px;"></el-input>
                 小件员编号:<el-input v-model="Ordermenage.SmallMemberNum" placeholder="请输入内容" readonly="true" style="width: 140px;"></el-input>
                 取件单位:<el-input v-model="Ordermenage.PickupUnit" placeholder="请输入内容" readonly="true" style="width: 140px;"></el-input><br />
                 取件时间:<el-input v-model="Ordermenage.PickupTime" placeholder="请输入内容" readonly="true" style="width: 245px;"></el-input>
                 分拣编码:<el-input v-model="Ordermenage.SortingCode " placeholder="请输入内容" readonly="true" style="width: 250px;"></el-input>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="调度历史" name="third">
              <el-form :model="DdHistory" ref="DdHistory" :rules="rules">
                调度序号:<el-input v-model="DdHistory.dispatchsequence" placeholder="请输入内容" readonly="true" style="width: 150px;"></el-input>
                调度单位:<el-input v-model="DdHistory.transferredunit" placeholder="请输入内容" readonly="true" style="width: 150px;"></el-input>
                操作人:<el-input v-model="DdHistory.operatorid" placeholder="请输入内容" readonly="true" style="width: 150px;"></el-input><br />
                操作单位:<el-input v-model="DdHistory.operationunitid" placeholder="请输入内容" readonly="true" style="width: 150px;"></el-input>
                操作时间:<el-input v-model="DdHistory.operationtime" placeholder="请输入内容" readonly="true" style="width: 150px;"></el-input>
                状态:<el-input v-model="DdHistory.status" placeholder="请输入内容" readonly="true" style="width: 160px;"></el-input><br />
                备注:<el-input v-model="DdHistory.remark" placeholder="请输入内容" readonly="true" style="width: 580px;"></el-input><br />
                退回原因:<el-input v-model="DdHistory.reason" placeholder="请输入内容" readonly="true" style="width: 560px;"></el-input>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </template>

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
        dialogFormVisibledetail: false,
        result: [],
        processingunit: '',
        businessnoticeno:'',
        formInline: '',
        form: {
          name: '',
          region: ''
        },
        dialogFormVisible: false,
        total: 10,
        pages: 1,
        rows: 5,
        radio: 3,
        options: [],
        fjbm:[],
        Returnapplication:{
          businessnoticeno:null,
          reservationtimes:null,
          pickupaddress:null,
          customcode:null,
          linkman:null,
          telphone:null,
          weight:null,
          volume:null,
          importanthints:null,
          arrivecity:null,
          pickerinfo:null,
          sendaddress:null,
          processingunit:null,
          notificationsource:null,
        },
        Ordermenage:{
          jobno:null,
          JobType:null,
          PickupStatus:null,
          ShortMessageInt:null,
          linkman:null,
          WorkGenerationTime:null,
          AfterSingleNum:null,
          SmallMemberNum:null,
          PickupUnit:null,
          PickupTime:null,
          SortingCode:null

        },
        DdHistory:{
          dispatchsequence:null,
          transferredunit:null,
          operatorid:null,
          operationunitid:null,
          operationtime:null,
          status:null,
          remark:null,
          reason:null

        },
         activeName: 'first',
         id:0,
         sortingcode:null,
         pickupunit:null


      }
    },
    methods: {
      onSubmit: function() {
        let fy = {
          pages: this.pages,
          rows: this.rows,
          processingunit:this.processingunit,
          businessnoticeno:this.businessnoticeno
        }
        var str = qs.stringify(fy);
        let url = "http://localhost/wuliuxm/selectHlpAccBusinessadmissibilityRgdd"
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
      handleCurrentChange: function(pages) {
        this.pages=pages;
       let fy = {
         pages: this.pages,
         rows: this.rows,
       }
       var str = qs.stringify(fy);
       let url = "http://localhost/wuliuxm/selectHlpAccBusinessadmissibilityRgddfy"
       axios.post(url, str).then(response => {
         this.result = response.data.rows;
         this.total = response.data.total;
       }).catch(error => {
         console.log('erro')
       });
      },
      handleSizeChange: function(rows) {
       this.rows=rows
        let fy = {
          pages: this.pages,
          rows: this.rows,
        }
        var str = qs.stringify(fy);
        let url = "http://localhost/wuliuxm/selectHlpAccBusinessadmissibilityRgddfy"
        axios.post(url, str).then(response => {
          this.result = response.data.rows;
          this.total = response.data.total;
        }).catch(error => {
          console.log('erro')
        });
      },

       //详情
      handleDetail:function(row){
        //业务通知单信息
        this.dialogFormVisibledetail=true;
        this.Returnapplication.businessnoticeno=row.businessnoticeno;
        this.Returnapplication.reservationtimes=row.reservationtime;
        this.Returnapplication.pickupaddress=row.pickupaddress;
        this.Returnapplication.customcode=row.customcode;
        this.Returnapplication.linkman=row.linkman;
        this.Returnapplication.telphone=row.telphone;
        this.Returnapplication.weight=row.weight;
        this.Returnapplication.volume=row.volume;
        this.Returnapplication.importanthints=row.importanthints;
        this.Returnapplication.arrivecity=row.arrivecity;
        this.Returnapplication.pickerinfo=row.syEmp.empname;
        this.Returnapplication.sendaddress=row.sendaddress;
        this.Returnapplication.processingunit=row.syUnits.name;

        if(row.notificationsource==1){
          this.Returnapplication.notificationsource='手机';
        }
        if(row.notificationsource==2){
          this.Returnapplication.notificationsource='电脑';
        }


        //工单信息
        this.Ordermenage.jobno=row.accWorkorder.jobno;

         if (row.accWorkorder.jobtype==1) {
           this.Ordermenage.JobType='新';
         }
         if (row.accWorkorder.jobtype==2) {
           this.Ordermenage.JobType='追';
         }
         if (row.accWorkorder.jobtype==3) {
           this.Ordermenage.JobType='销';
         }

          if (row.accWorkorder.pickupstatus==1) {
            this.Ordermenage.PickupStatus='新单';
          }
          if (row.accWorkorder.pickupstatus==2) {
            this.Ordermenage.PickupStatus='已通知';
          }
          if (row.accWorkorder.pickupstatus==3) {
            this.Ordermenage.PickupStatus='已确认';
          }
          if (row.accWorkorder.pickupstatus==4) {
            this.Ordermenage.PickupStatus='已取件';
          }
          if (row.accWorkorder.pickupstatus==5) {
            this.Ordermenage.PickupStatus='已取消';
          }
           this.Ordermenage.ShortMessageInt=row.accWorkorder.shortmessageint;
            this.Ordermenage.linkman=row.linkman;
             this.Ordermenage.WorkGenerationTime=row.accWorkorder.workgenerationtime;
              this.Ordermenage.AfterSingleNum=row.accWorkorder.aftersinglenum;
                this.Ordermenage.SmallMemberNum=row.accWorkorder.smallmembernum;
                 this.Ordermenage.PickupUnit=row.syUnits.name;
                  this.Ordermenage.PickupTime=row.accWorkorder.pickuptime
                   this.Ordermenage.SortingCode=row.accWorkorder.sortingcode;

                   //调度历史
                   this.DdHistory.dispatchsequence=row.disDispatchhistory.dispatchsequence;
                   this.DdHistory.transferredunit=row.syUnits.name;
                   this.DdHistory.operatorid=row.syEmp.empname;
                   this.DdHistory.operationunitid=row.syUnits.name;
                   this.DdHistory.operationtime=row.disDispatchhistory.operationtime;
                   this.DdHistory.status=row.disDispatchhistory.status;
                    this.DdHistory.remark=row.disDispatchhistory.remark;
                     this.DdHistory.reason=row.disDispatchhistory.reason;

      },
      fpOrder:function(rows){
        this.dialogFormVisible=true;
        this.id=rows.id;
        this.sortingcode=rows.sortingcode;
        this.pickupunit=rows.pickupunit;
      },
      qdSubmit:function(){
        let fy = {
          id: this.id,
          sortingcode:this.sortingcode,
          pickupunit:this.pickupunit
        }
        var str = qs.stringify(fy);
        let url = "http://localhost/wuliuxm/updateSortingCodeByidFpHlp"
        axios.post(url, str).then(response => {
          this.onSubmit();
          this.dialogFormVisible=false;
        }).catch(error => {
          console.log('erro')
        });


        },
        xdClick:function(rows){
          this.id=rows.id;
          let fy = {
            id: this.id,
          }
          var str = qs.stringify(fy);
          let url = "http://localhost/wuliuxm/updateXdHlp"
          axios.post(url, str).then(response => {
            this.dialogFormVisible=false;
            this.onSubmit();
          }).catch(error => {
            console.log('erro')
          });

        }



    },
    //钩子函数
    created: function() {

      let fy = {
        pages: this.pages,
        rows: this.rows,
      }
      var str = qs.stringify(fy);
      let url = "http://localhost/wuliuxm/selectHlpAccBusinessadmissibilityRgddfy"
      axios.post(url, str).then(response => {
        this.result = response.data.rows;
        this.total = response.data.total;
      }).catch(error => {
        console.log('erro')
      });


     //查询所有单位
     let url1 = "http://localhost/wuliuxm/selectSyUnitsHlp"
     axios.post(url1, null).then(response => {
       this.options=response.data;
     }).catch(error => {
       console.log('erro')
     });

     //查询所有分拣编码
     let url2 = "http://localhost/wuliuxm/selectAllAccWorkorderHlp"
     axios.post(url2, null).then(response => {
       this.fjbm=response.data;
     }).catch(error => {
       console.log('erro')
     });

    }
  }
</script>

<style>
</style>
