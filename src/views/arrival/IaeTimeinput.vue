<template>
  <div class="divClass">
    <!--面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/Main' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a>到达时间录入</a></el-breadcrumb-item>
    </el-breadcrumb>
    <!--搜索框-->
    <el-form :inline="true" class="demo-form-inline" style="margin-top: 10px;">
      <el-form-item label="出库交接单号">
        <el-input v-model="id" placeholder="请输入出库交接单号"></el-input>
      </el-form-item>
      <el-form-item label="实际到港时间">
        <el-input v-model="actualarrivaldate" placeholder="请输入实际到港时间"></el-input>
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
        <el-form-item label="到达口岸">
          <el-input v-model="port" placeholder="请输入到达口岸"></el-input>
        </el-form-item>
        <el-form-item label="承运商">
          <el-input v-model="carriers" placeholder="请输入承运商"></el-input>
        </el-form-item>
        <el-form-item label="配载方式">
          <el-select v-model="inputperson" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="航班车次">
          <el-input v-model="entrustcompany" placeholder="请输入航班车次"></el-input>
        </el-form-item>
        <el-form-item label="货票号">
          <el-input v-model="entrustcompany" placeholder="请输入货票号"></el-input>
        </el-form-item>

        <el-form-item label="录入状态">
          <el-select v-model="entrustcompany" placeholder="请选择">
            <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="始发站">
          <el-input v-model="entrustcompany" placeholder="请输入始发站"></el-input>
        </el-form-item>

      </vue>
    </el-form>

    <!--数据表格-->
    <el-table :data="data1" style="width: 100%;" :border="true" max-height="550">
      <el-table-column prop="id" label="出库交接单号" min-width="55" align="center"></el-table-column>
      <el-table-column prop="inputtype" label="状态" min-width="50" align="center"></el-table-column>
      <el-table-column prop="port" label="到达口岸" min-width="70" align="center"></el-table-column>
      <el-table-column prop="carriers" label="承运商" min-width="50" align="center"></el-table-column>
      <el-table-column prop="expectdeparturedate" label="预计离港时间" min-width="80" align="center"></el-table-column>
      <el-table-column prop="expectarrivaldate" label="预计到港时间" min-width="80" align="center"></el-table-column>
      <el-table-column prop="actualdeparturedate" label="实际离港时间" min-width="80" align="center"></el-table-column>
      <el-table-column prop="actualarrivaldate" label="实际到港时间" min-width="80" align="center"></el-table-column>
      <el-table-column prop="inputperson" label="处理人" min-width="50" align="center"></el-table-column>

    </el-table>
    <el-pagination background style="margin-top: 20px;" @size-change="handleSizeChange" @current-change="handleCurrentChange"
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
    name: 'IaeTimeinput',
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
        inputtype: null,
        carriers: null,
        expectdeparturedate: null,
        expectarrivaldate: null,
        actualdeparturedate: null,
        actualarrivaldate: null,
        inputperson: null,
        LineresForm: {
          id: null,
          inputtype: null,
          port: null,
          carriers: null,
          expectdeparturedate: null,
          expectarrivaldate: null,
          actualdeparturedate: null,
          actualarrivaldate: null,
          inputperson: null
        },
        options: [{
            value: '选项1',
            label: '航空'
          }, {
            value: '选项2',
            label: '铁路'
          }, {
            value: '选项3',
            label: '大巴'
          },
          {
            value: '选项4',
            label: '临时发车'
          }, {
            value: '选项5',
            label: '班车'
          },
          {
            value: '选项6',
            label: '海运'
          }
        ],
        options1: [{
          value: '选项1',
          label: '未录入'
        }, {
          value: '选项2',
          label: '已录入'
        }]

      }
    },
    methods: {
      onSubmit: function() {

      this.data1 = this.result;
      if (this.id == null && this.actualarrivaldate == null && this.port == null && this.carriers == null) {
        this.findAll();
      }
      if (this.carriers != null && this.carriers != "") {
        this.data1 = this.data1.filter(c => c.carriers.indexOf(this.carriers) != -1);

      }
      if (this.id != null && this.id != "") {
        this.data1 = this.data1.filter(f => f.id.indexOf(this.id) != -1);
      }
      if (this.actualarrivaldate != null && this.actualarrivaldate != "") {
        this.data1 = this.data1.filter(a => a.actualarrivaldate.indexOf(this.actualarrivaldate) != -1);
      }
      if (this.port != null && this.port != "") {
        this.data1 = this.data1.filter(b => b.port.indexOf(this.port) != -1);
      }
      },
      more: function() {
        this.morekai = !this.morekai
      },
      add: function() {

      }
    },
    created: function() {
    let url = 'http://localhost/wuliuxm/FillIaeTimeinputLX';
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
