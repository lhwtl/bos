<template>
  <div class="divClass">
    <!--面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/Main' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a>出港配载</a></el-breadcrumb-item>
    </el-breadcrumb>
    <!--搜索框-->
    <el-form :inline="true" class="demo-form-inline" style="margin-top: 10px;">
      <el-form-item label="工作单号">
        <el-input v-model="id" placeholder="请输入工作单号"></el-input>
      </el-form-item>
      <el-form-item label="合包号">
        <el-input v-model="packingid" placeholder="请输入合包号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
      </el-form-item>

     <!-- <el-form-item>
        <el-button type="primary" icon="el-icon-refresh-left" @click="empty">清空</el-button>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" icon="el-icon-more" @click="more">更多</el-button>
      </el-form-item>
      <br>
      <vue v-show="morekai">
        <el-form-item label="收货地址">
          <el-input v-model="tackcargoaddress" placeholder="请输入收货地址"></el-input>
        </el-form-item>
        <el-form-item label="到达地">
          <el-input v-model="destination" placeholder="请输入到达地"></el-input>
        </el-form-item>
        <el-form-item label="重量">
          <el-input v-model="weight" placeholder="请输入重量"></el-input>
        </el-form-item>
      </vue>
    </el-form>
    <!--数据表格-->
    <el-table :data="data1" style="width: 100%;" :border="true" max-height="550">
      <el-table-column prop="id" label="工作单号" min-width="50" align="center"></el-table-column>
      <el-table-column prop="packingid" label="合包号" min-width="50" align="center"></el-table-column>
      <el-table-column prop="transfer" label="中转" min-width="50" align="center"></el-table-column>
      <el-table-column prop="actualcount" label="实际数量" min-width="50" align="center"></el-table-column>
      <el-table-column prop="destination" label="到达地" min-width="50" align="center"></el-table-column>
      <el-table-column prop="entrustcompany" label="受理单位" min-width="70" align="center"></el-table-column>
      <el-table-column prop="tackcargoaddress" label="收货地址" min-width="70" align="center"></el-table-column>
      <el-table-column prop="cargocount" label="在库件数" min-width="50" align="center"></el-table-column>
      <el-table-column prop="cargocount" label="实际件数" min-width="50" align="center"></el-table-column>
      <el-table-column prop="weight" label="重量" min-width="50" align="center"></el-table-column>
      <el-table-column prop="surplustime" label="送达时限" min-width="70" align="center"></el-table-column>

    </el-table>
    <el-pagination background style="margin-top: 20px;"
      :current-page="page" :page-sizes="[1, 2, 3, 4]" :page-size="rows" layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </el-dialog>

  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
  export default {
    name: 'IaeDeparture',
    data: function() {
      return {
        port: null,
        result: [],
        data1: [],
        total: 3,
        page: 1,
        rows: 3,
        morekai: false,
        id: null,
        packingid: null,
        transfer: null,
        actualcount: null,
        destination: null,
        entrustcompany: null,
        tackcargoaddress: null,
        cargocount: null,
        weight: null,
        surplustime: null,
        LineresForm: {
          id: null,
          packingid: null,
          transfer: null,
          actualcount: null,
          destination: null,
          entrustcompany: null,
          tackcargoaddress: null,
          cargocount: null,
          weight: null,
          surplustime: null
        }

      }
    },
    methods: {
      onSubmit: function() {
        /* let {result,id,packingid}=this
        let fperson;

        if (id != null||id!="") {
          fperson = result.filter(p=>p.id.indexOf(id)!=-1);
        }
        if (packingid != null||packingid!="") {
          fperson = fperson.filter(p=>p.packingid.indexOf(packingid)!=-1);
        } */
        this.data1 = this.result;
        if (this.id == null && this.packingid == null && this.tackcargoaddress == null && this.destination ==
          null && weight == null) {
          this.findAll();
        }
        if (this.weight != null && this.weight != "") {
          this.data1 = this.data1.filter(c => c.weight.indexOf(this.weight) != -1);

        }
        if (this.id != null && this.id != "") {
          this.data1 = this.data1.filter(f => f.id.indexOf(this.id) != -1);
        }
        if (this.packingid != null && this.packingid != "") {
          this.data1 = this.data1.filter(a => a.packingid.indexOf(this.packingid) != -1);
        }
        if (this.tackcargoaddress != null && this.tackcargoaddress != "") {
          this.data1 = this.data1.filter(b => b.tackcargoaddress.indexOf(this.tackcargoaddress) != -1);
        }
        if (this.destination != null && this.destination != "") {
          this.data1 = this.data1.filter(e => e.destination.indexOf(this.destination) != -1);
        }

        /* return this.data1; */
      },
      more: function() {
        this.morekai = !this.morekai
        /* let {result,tackcargoaddress}=this
        let fperson;
        if (tackcargoaddress != null||tackcargoaddress!="") {
          fperson = fperson.filter(p=>p.tackcargoaddress.indexOf(tackcargoaddress)!=-1);
        }

        this.result1=fperson; */
      },
      add: function() {

      }
    },
    created: function() {
       let url = 'http://localhost/wuliuxm/FillIaeDepartureLX';
      axios.post(url, null).then(resp => {
         this.result = resp.data
        this.data1 = resp.data
      }).catch(error => {
        console.log(error);
      });
    }
  }
</script>

<style>
  .divClass {
    margin-top: 15px;
    margin-left: 15px;
  }
</style>
