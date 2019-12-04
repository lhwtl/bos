<template>
  <div class="divClass">
    <!--面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/Main' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a>提货管理</a></el-breadcrumb-item>
    </el-breadcrumb>
    <!--搜索框-->
    <el-form :inline="true" class="demo-form-inline" style="margin-top: 10px;">
      <el-form-item label="航班车次">
        <el-input v-model="vehicleint" placeholder="请输入航班车次"></el-input>
      </el-form-item>
      <el-form-item label="出港单位">
        <el-input v-model="id" placeholder="请输入出港单位"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-refresh-left" @click="empty">清空</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-more" @click="more">更多</el-button>
      </el-form-item>
      <br>
      <vue v-show="morekai">
        <el-form-item label="配载方式">
          <el-select v-model="cargon" placeholder="全部">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="货票号">
          <el-input v-model="waybillid" placeholder="请输入货票号"></el-input>
        </el-form-item>
        <el-form-item label="到港时间">
          <el-input v-model="estimatedate" placeholder="请输入到港时间"></el-input>
        </el-form-item>
      </vue>
    </el-form>

    <!--数据表格-->
    <el-table :data="data1" style="width: 100%;" :border="true" max-height="550">
      <el-table-column prop="id" label="出港单位" min-width="70" align="center"></el-table-column>
      <el-table-column prop="vehicleint" label="航班车次" min-width="80" align="center"></el-table-column>
      <el-table-column prop="transportway" label="运输方式" min-width="80" align="center"></el-table-column>
      <el-table-column prop="waybillid" label="货票号" min-width="70" align="center"></el-table-column>
      <el-table-column prop="estimatedate" label="预计到港时间" min-width="100" align="center"></el-table-column>
      <el-table-column prop="cargon" label="件数" min-width="70" align="center"></el-table-column>
      <el-table-column prop="importanthints" label="重要提示" min-width="100" align="center"></el-table-column>

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
     name: 'IaeExtract',
     data: function() {
       return {
         port: null,
         result: [],
         data1: [],
         total: 2,
         page: 1,
         rows: 2,
         morekai: false,
         id: null,
         vehicleint: null,
         transportway: null,
        // vehicleint: null,
         waybillid: null,
         estimatedate: null,
         cargon: null,
         importanthints: null,
         LineresForm: {
           id: null,
           vehicleint: null,
           transportway: null,
           vehicleint: null,
           waybillid: null,
           estimatedate: null,
           cargon: null,
           importanthints: null
         },
         options: [{
           value: '选项1',
           label: '航空'
         }, {
           value: '选项2',
           label: '铁路'
         }, {
           value: '选项3',
           label: '水路'
         }]

       }
     },
     methods: {
       onSubmit: function() {
         this.data1 = this.result;
         if (this.id == null && this.vehicleint == null && this.waybillid == null && this.estimatedate ==
           null) {
           this.findAll();
         }
         if (this.waybillid != null && this.waybillid != "") {
           this.data1 = this.data1.filter(c => c.waybillid.indexOf(this.waybillid) != -1);

         }
         if (this.id != null && this.id != "") {
           this.data1 = this.data1.filter(f => f.id.indexOf(this.id) != -1);
         }
         if (this.vehicleint != null && this.vehicleint != "") {
           this.data1 = this.data1.filter(a => a.vehicleint.indexOf(this.vehicleint) != -1);
         }
         if (this.estimatedate != null && this.estimatedate != "") {
           this.data1 = this.data1.filter(e => e.estimatedate.indexOf(this.estimatedate) != -1);
         }

       },
       more: function() {
         this.morekai = !this.morekai
       },
       add: function() {

       }
     },
     created: function() {
      let url = 'http://localhost/wuliuxm/FillIaeExtractLX';
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
