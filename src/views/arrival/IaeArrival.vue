<template>
  <div class="divClass">
    <!--面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/Main' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a>进港分单</a></el-breadcrumb-item>
    </el-breadcrumb>
    <!--搜索框-->
    <el-form :inline="true" class="demo-form-inline" style="margin-top: 10px;">
      <el-form-item label="工作单号">
        <el-input v-model="id" placeholder="请输入工作单号"></el-input>
      </el-form-item>
      <el-form-item label="货物地址">
        <el-input v-model="cargoaddress" placeholder="请输入货物地址"></el-input>
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
        <el-form-item label="派送单位">
          <el-input v-model="sendcompany" placeholder="请输入派送单位"></el-input>
        </el-form-item>
        <el-form-item label="送达时限">
          <el-input v-model="timelimit" placeholder="请输入送达时限"></el-input>
        </el-form-item>
        <el-form-item label="分拨批次">
          <el-input v-model="batch" placeholder="请输入分拨批次"></el-input>
        </el-form-item>
        <el-form-item label="货物状态">
          <el-select v-model="value" placeholder="请选择货物状态">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分单类型">
          <el-select v-model="value1" placeholder="请选择分单类型">
            <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分单人">
          <el-input v-model="issueperson" placeholder="请输入分单人"></el-input>
        </el-form-item>
        <el-form-item label="分单时间">
          <el-input v-model="issuedate" placeholder="请输入分单时间"></el-input>
        </el-form-item>
        <el-form-item label="入库时间">
          <el-input v-model="storagedate" placeholder="请输入入库时间"></el-input>
        </el-form-item>
      </vue>
    </el-form>
    <!--数据表格-->
    <el-table :data="data1" style="width: 100%;" :border="true" max-height="550">
      <el-table-column prop="id" label="工作单号" min-width="50" align="center"></el-table-column>
      <el-table-column prop="sendcompany" label="派送单位" min-width="50" align="center"></el-table-column>
      <el-table-column prop="cargoaddress" label="货物地址" min-width="60" align="center"></el-table-column>
      <el-table-column prop="issueperson" label="分单人" min-width="50" align="center"></el-table-column>
      <el-table-column prop="issuedate" label="分单时间" min-width="60" align="center"></el-table-column>
      <el-table-column prop="workaddress" label="入库中心" min-width="60" align="center"></el-table-column>
      <el-table-column prop="storagedate" label="入库时间" min-width="60" align="center"></el-table-column>
      <el-table-column prop="outbounddate" label="出库时间" min-width="60" align="center"></el-table-column>
      <el-table-column prop="timelimit" label="送达时限" min-width="60" align="center"></el-table-column>
      <el-table-column prop="batch" label="批次" min-width="60" align="center"></el-table-column>

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
    name: 'IaeArrival',
    /* data() {
      return {
        ,
        value: ''
      }
    }, */
    data: function() {
      return {
        port: null,
        result: [],
        data1:[],
        total: 3,
        page: 1,
        rows: 3,
        morekai: false,
        id: null,
        sendcompany: null,
        cargoaddress: null,
        issueperson: null,
        issuedate: null,
        workaddress: null,
        storagedate: null,
        outbounddate: null,
        timelimit: null,
        batch: null,
        LineresForm: {
          id: null,
          sendcompany: null,
          cargoaddress: null,
          issueperson: null,
          issuedate: null,
          workaddress: null,
          storagedate: null,
          outbounddate: null,
          timelimit: null,
          batch: null
        },
        options: [{
          value: '选项1',
          label: '运输中'
        }, {
          value: '选项2',
          label: '待认领'
        }, {
          value: '选项3',
          label: '已送达'
        }],
        options1: [{
          value: '选项1',
          label: '已分单'
        }, {
          value: '选项2',
          label: '未分单'
        }, {
          value: '选项3',
          label: '异常'
        }]

      }
    },

    methods: {
      onSubmit: function() {
        this.data1 = this.result;
        if (this.id == null && this.sendcompany == null && this.timelimit == null && this.batch ==
          null && workaddress == null  && issueperson == null && issuedate == null && storagedate== null && cargoaddress == null) {
          this.findAll();
        }
        if (this.workaddress != null && this.workaddress != "") {
          this.data1 = this.data1.filter(c => c.workaddress.indexOf(this.workaddress) != -1);

        }
        if (this.id != null && this.id != "") {
          this.data1 = this.data1.filter(f => f.id.indexOf(this.id) != -1);
        }
        if (this.sendcompany != null && this.sendcompany != "") {
          this.data1 = this.data1.filter(a => a.sendcompany.indexOf(this.sendcompany) != -1);
        }
        if (this.timelimit != null && this.timelimit != "") {
          this.data1 = this.data1.filter(b => b.timelimit.indexOf(this.timelimit) != -1);
        }
        if (this.batch != null && this.batch != "") {
          this.data1 = this.data1.filter(e => e.batch.indexOf(this.batch) != -1);
        }
        if (this.issueperson != null && this.issueperson != "") {
          this.data1 = this.data1.filter(g => g.issueperson.indexOf(this.issueperson) != -1);
        }
        if (this.issuedate != null && this.issuedate != "") {
          this.data1 = this.data1.filter(h => h.issuedate.indexOf(this.issuedate) != -1);
        }
        if (this.storagedate != null && this.storagedate != "") {
          this.data1 = this.data1.filter(i => i.storagedate.indexOf(this.storagedate) != -1);
        }
        if (this.cargoaddress != null && this.cargoaddress != "") {
          this.data1 = this.data1.filter(j => j.cargoaddress.indexOf(this.cargoaddress) != -1);
        }




      },
      more: function() {
        this.morekai = !this.morekai
      },
      add: function() {

      }
    },
    created: function() {
     let url = 'http://localhost/wuliuxm/FillIaeArrivalLX';
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
