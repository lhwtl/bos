
<template>
  <div class="divClass">
    <div v-show="zhu">
      <!--面包屑-->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/Main' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a>出港配载查询</a></el-breadcrumb-item>
      </el-breadcrumb>
      <!--搜索框-->
      <el-form :inline="true" class="demo-form-inline" style="margin-top: 10px;">
        <el-form-item label="工作单号">
          <el-input v-model="id" placeholder="请输入工作单号"></el-input>
        </el-form-item>
        <el-form-item label="到达口岸">
          <el-input v-model="port" placeholder="请输入到达口岸"></el-input>
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
            <el-select v-model="expectdeparturedate" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="航班车次">
            <el-input v-model="vehicleint" placeholder="请输入航班车次"></el-input>
          </el-form-item>
          <el-form-item label="承运商">
            <el-input v-model="carrier" placeholder="请输入承运商"></el-input>
          </el-form-item>
          <el-form-item label="货票号">
            <el-input v-model="warename" placeholder="请输入货票号"></el-input>
          </el-form-item>

          <el-form-item label="处理时间">
            <el-input v-model="warename" placeholder="请输入处理时间"></el-input>
          </el-form-item>
          <el-form-item label="确认时间">
            <el-input v-model="warename" placeholder="请输入确认时间"></el-input>
          </el-form-item>
          <el-form-item label="接收时间">
            <el-input v-model="warename" placeholder="请输入接收时间"></el-input>
          </el-form-item>

          <el-form-item label="离港时间">
            <el-input v-model="expectdeparturedate" placeholder="请输入离港时间"></el-input>
          </el-form-item>
          <el-form-item label="到港时间">
            <el-input v-model="expectarrivaldate" placeholder="请输入到港时间"></el-input>
          </el-form-item>
          <el-form-item label="处理人 ">
            <el-input v-model="handleperson" placeholder="请输入处理人 "></el-input>
          </el-form-item>
          <el-form-item label="确认人 ">
            <el-input v-model="warename" placeholder="请输入确认人 "></el-input>
          </el-form-item>
          <el-form-item label="接收人 ">
            <el-input v-model="warename" placeholder="请输入接收人 "></el-input>
          </el-form-item>
          <el-form-item label="处理单位">
            <el-input v-model="warename" placeholder="请输入处理单位"></el-input>
          </el-form-item>
          <el-form-item label="确认单位">
            <el-input v-model="warename" placeholder="请输入确认单位"></el-input>
          </el-form-item>
          <el-form-item label="接收单位">
            <el-input v-model="warename" placeholder="请输入接收单位"></el-input>
          </el-form-item>
          <el-form-item label="是否作废">
            <el-input v-model="warename" placeholder="请输入是否作废"></el-input>
          </el-form-item>
        </vue>
      </el-form>

      <!--数据表格-->
      <el-table :data="data1" style="width: 100%;" :border="true" max-height="550">
        <el-table-column prop="id" label="ID" min-width="60" align="center"></el-table-column>
        <el-table-column prop="port" label="到达口岸" min-width="50" align="center"></el-table-column>
        <el-table-column prop="demand" label="配载方式" min-width="50" align="center"></el-table-column>
        <el-table-column prop="vehicleint" label="航班车次" min-width="70" align="center"></el-table-column>
        <el-table-column prop="carrier" label="承运商" min-width="50" align="center"></el-table-column>
        <el-table-column prop="expectdeparturedate" label="预计离港时间" min-width="70" align="center"></el-table-column>
        <el-table-column prop="expectarrivaldate" label="预计到港时间" min-width="70" align="center"></el-table-column>
        <el-table-column prop="cargo" label="件数" min-width="70" align="center"></el-table-column>
        <el-table-column prop="handleperson" label="处理人" min-width="70" align="center"></el-table-column>

        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination background style="margin-top: 20px;"
        :current-page="page" :page-sizes="[1, 2, 3, 4]" :page-size="rows" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <el-row :gutter="20">

      <div v-show="xiangqing">
        <el-form :inline="true">
          <el-form-item>
            <el-button size="mini" @click="hand()">返回</el-button>
          </el-form-item>
          <br>
          <h1 align="center">详情列表</h1>
          <el-col :span="7">
            <el-form-item label="状态">
              <el-input v-model="findAll.resourcetype"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="到达口岸">
              <el-input v-model="findAll.port"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="配载方式">
              <el-input v-model="findAll.demand"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="航班车次">
              <el-input v-model="findAll.vehicleint"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="7">
            <el-form-item label="运力">
              <el-input v-model="findAll.capacity"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="货票号">
              <el-input v-model="findAll.waybillid"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="承运商">
              <el-input v-model="findAll.carrier"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="预计到港时间">
              <el-input v-model="findAll.expectarrivaldate"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="预计离港时间">
              <el-input v-model="findAll.expectdeparturedate"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="票数">
              <el-input v-model="findAll.ticket"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="件数">
              <el-input v-model="findAll.cargo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="重量">
              <el-input v-model="findAll.weight"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="7">
            <el-form-item label="体积">
              <el-input v-model="findAll.volume"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="处理人">
              <el-input v-model="findAll.handleperson"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="处理时间">
              <el-input v-model="findAll.handledate"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="确认单位">
              <el-input v-model="findAll.entercompany"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="接收单位">
              <el-input v-model="findAll.acceptcompany"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="异常备注">
              <el-input v-model="findAll.abnormalremarks"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="工作单号">
              <el-input v-model="findAll.workint"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="到达地">
              <el-input v-model="findAll.destination"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="7">
            <el-form-item label="配置要求">
              <el-input v-model="findAll.ask"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="收货人">
              <el-input v-model="findAll.takecargoperson"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="收货地址">
              <el-input v-model="findAll.tackcargoaddress"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="重要提示">
              <el-input v-model="findAll.importanthints"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
    </el-row>
  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
  export default {
    name: 'Lineresource',
    data: function() {
      return {
        port: null,
        result: [],
        data1: [],
        total: 2,
        page: 1,
        rows: 2,
        morekai: false,
        xiangqing: false,
        findAll: {},
        zhu: true,
        id: null,
        demand: null,
        vehicleint: null,
        carrier: null,
        expectdeparturedate: null,
        expectarrivaldate: null,
        cargo: null,
        handleperson: null,
        LineresForm: {
          id: null,
          port: null,
          demand: null,
          vehicleint: null,
          carrier: null,
          expectdeparturedate: null,
          expectarrivaldate: null,
          cargo: null,
          handleperson: null
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
        ]

      }
    },
    methods: {
      handleEdit: function(row) {
        console.log(row)
        this.findAll = row
        this.xiangqing = true
        this.zhu = false
      },
      hand: function() {
        this.zhu = true
        this.xiangqing = false
      },
      onSubmit: function() {
        this.data1 = this.result;
        if (this.id == null && this.port == null && this.vehicleint == null && carrier == null) {
          this.findAll();
        }
        if (this.port != null && this.port != "") {
          this.data1 = this.data1.filter(c => c.port.indexOf(this.port) != -1);

        }
        if (this.id != null && this.id != "") {
          this.data1 = this.data1.filter(f => f.id.indexOf(this.id) != -1);
        }
        if (this.vehicleint != null && this.vehicleint != "") {
          this.data1 = this.data1.filter(a => a.vehicleint.indexOf(this.vehicleint) != -1);
        }
        if (this.carrier != null && this.carrier != "") {
          this.data1 = this.data1.filter(b => b.carrier.indexOf(this.carrier) != -1);
        }

      },
      more: function() {
        this.morekai = !this.morekai
      },
      add: function() {

      }
    },
    created: function() {
   let url = 'http://localhost/wuliuxm/FillIaeLineresourceLX';
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

  .el-row {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
