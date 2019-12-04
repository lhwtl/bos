<template>
  <div class="divClass" v-loading="loading"
    element-loading-text="此页面正在维护当中请联系管理员999"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    :data="tableData"
    style="width: 100%">
    <!--面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a>合包管理</a></el-breadcrumb-item>
    </el-breadcrumb>


      <el-form :inline="true" class="demo-form-inline" style="margin-top: 10px;text-align: left;margin-left: 30px;">
        <el-form-item>
          <el-button type="primary"  @click="add">拆包</el-button>
        </el-form-item>
      </el-form>




    <el-form :model="EmpPoolForm">
      <table>
        <tr>
          <td width="85px"><label>拆包号</label></td>
          <td>
            <el-input v-model="EmpPoolForm" placeholder="拆包号" :readonly="true" ></el-input>
          </td>
          <td width="85px"><label>拆包人</label></td>
          <td>
            <el-input v-model="EmpPoolForm" placeholder="拆包人" :readonly="true" ></el-input>
          </td>
          <td width="85px"><label>封签号</label></td>
          <td>
            <el-input v-model="EmpPoolForm" placeholder="封签号" :readonly="true"></el-input>
          </td>
          <td width="85px"><label>到达地</label></td>
          <td>
            <el-input v-model="EmpPoolForm" placeholder="到达地" :readonly="true" ></el-input>
          </td>
        </tr><br />
        <tr>
          <td  width="85px"><label>计算到达时间</label></td>
          <td>
            <el-input v-model="EmpPoolForm" placeholder="计算到达时间" :readonly="true" ></el-input>
          </td>
          <td width="85px"><label>送达时限</label></td>
          <td>
            <el-input v-model="EmpPoolForm" placeholder="送达时限" :readonly="true" ></el-input>
          </td>
          <td width="85px"><label>总票数</label></td>
          <td>
            <el-input v-model="EmpPoolForm" placeholder="总票数" :readonly="true" ></el-input>
          </td>
          <td width="85px"><label>总件数</label></td>
          <td>
            <el-input v-model="EmpPoolForm" placeholder="总件数" :readonly="true" ></el-input>
          </td>
        </tr><br />
        <tr>
          <td  width="85px"><label>总重量</label></td>
          <td>
            <el-input v-model="EmpPoolForm" placeholder="总重量" :readonly="true" ></el-input>
          </td>
          <td width="85px"><label>总体积</label></td>
          <td>
            <el-input v-model="EmpPoolForm" placeholder="总体积" :readonly="true" ></el-input>
          </td>
          <td width="85px"><label>状态</label></td>
          <td>
            <el-input v-model="EmpPoolForm" placeholder="状态" :readonly="true" ></el-input>
          </td>
          <td width="85px"><label>配载要求</label></td>
          <td>
            <el-input v-model="EmpPoolForm" placeholder="配载要求" :readonly="true" ></el-input>
          </td>
        </tr><br />
      </table>
    </el-form>
    <br />



    <el-form :model="EmpPoolForm">
      <table  style="text-align: left;"  >
        <tr>
          <td><label style="padding:0px;font-size: 14px;">调节号</label></td>
          <td><label style="padding:0px;font-size: 14px;">品名</label></td>
          <td><label style="padding:0px;font-size: 14px;">到达地</label></td>
          <td><label style="padding:0px;font-size: 14px;">票数</label></td>
          <td><label style="padding:0px;font-size: 14px;">件数</label></td>
          <td><label style="padding:0px;font-size: 14px;">实际件数</label></td>
          <td><label style="padding:0px;font-size: 14px;">重量</label></td>
          <td><label style="padding:0px;font-size: 14px;">体积</label></td>
          <td><label style="padding:0px;font-size: 14px;">到达时限</label></td>
          <td><label style="padding:0px;font-size: 14px;">重要提示</label></td>
          <td><label style="padding:0px;font-size: 14px;">配载要求</label></td>
        </tr>
        <tr>
          <td>
            <el-input v-model="EmpPoolForm" placeholder="调节号" :readonly="true" ></el-input>
          </td>
          <td>
            <el-input v-model="EmpPoolForm" placeholder="品名" :readonly="true" ></el-input>
          </td>
          <td>
            <el-input v-model="EmpPoolForm" placeholder="到达地" :readonly="true"></el-input>
          </td>
          <td>
            <el-input v-model="EmpPoolForm" placeholder="票数" :readonly="true" ></el-input>
          </td>
          <td>
            <el-input v-model="EmpPoolForm" placeholder="件数" :readonly="true" ></el-input>
          </td>
          <td>
            <el-input v-model="EmpPoolForm" placeholder="实际件数" :readonly="true" ></el-input>
          </td>
          <td>
            <el-input v-model="EmpPoolForm" placeholder="重量" :readonly="true" ></el-input>
          </td>
          <td>
            <el-input v-model="EmpPoolForm" placeholder="体积" :readonly="true" ></el-input>
          </td>
          <td>
            <el-input v-model="EmpPoolForm" placeholder="到达时限" :readonly="true" ></el-input>
          </td>
          <td>
            <el-input v-model="EmpPoolForm" placeholder="重要提示" :readonly="true" ></el-input>
          </td>
          <td>
            <el-input v-model="EmpPoolForm" placeholder="配载要求" :readonly="true" ></el-input>
          </td>
        </tr>
        <tr>
          <td><label style="padding:0px;font-size: 14px;">调节号</label></td>
          <td><label style="padding:0px;font-size: 14px;">品名</label></td>
          <td><label style="padding:0px;font-size: 14px;">到达地</label></td>
          <td><label style="padding:0px;font-size: 14px;">票数</label></td>
          <td><label style="padding:0px;font-size: 14px;">件数</label></td>
          <td><label style="padding:0px;font-size: 14px;">实际件数</label></td>
          <td><label style="padding:0px;font-size: 14px;">重量</label></td>
          <td><label style="padding:0px;font-size: 14px;">体积</label></td>
          <td><label style="padding:0px;font-size: 14px;">到达时限</label></td>
          <td><label style="padding:0px;font-size: 14px;">重要提示</label></td>
          <td><label style="padding:0px;font-size: 14px;">配载要求</label></td>
        </tr>
        <tr>
          <td>
            <el-input v-model="EmpPoolForm" placeholder="调节号" :readonly="true" ></el-input>
          </td>
          <td>
            <el-input v-model="EmpPoolForm" placeholder="品名" :readonly="true" ></el-input>
          </td>
          <td>
            <el-input v-model="EmpPoolForm" placeholder="到达地" :readonly="true"></el-input>
          </td>
          <td>
            <el-input v-model="EmpPoolForm" placeholder="票数" :readonly="true" ></el-input>
          </td>
          <td>
            <el-input v-model="EmpPoolForm" placeholder="件数" :readonly="true" ></el-input>
          </td>
          <td>
            <el-input v-model="EmpPoolForm" placeholder="实际件数" :readonly="true" ></el-input>
          </td>
          <td>
            <el-input v-model="EmpPoolForm" placeholder="重量" :readonly="true" ></el-input>
          </td>
          <td>
            <el-input v-model="EmpPoolForm" placeholder="体积" :readonly="true" ></el-input>
          </td>
          <td>
            <el-input v-model="EmpPoolForm" placeholder="到达时限" :readonly="true" ></el-input>
          </td>
          <td>
            <el-input v-model="EmpPoolForm" placeholder="重要提示" :readonly="true" ></el-input>
          </td>
          <td>
            <el-input v-model="EmpPoolForm" placeholder="配载要求" :readonly="true" ></el-input>
          </td>
        </tr>
        <tr>
          <td><label style="padding:0px;font-size: 14px;">调节号</label></td>
          <td><label style="padding:0px;font-size: 14px;">品名</label></td>
          <td><label style="padding:0px;font-size: 14px;">到达地</label></td>
          <td><label style="padding:0px;font-size: 14px;">票数</label></td>
          <td><label style="padding:0px;font-size: 14px;">件数</label></td>
          <td><label style="padding:0px;font-size: 14px;">实际件数</label></td>
          <td><label style="padding:0px;font-size: 14px;">重量</label></td>
          <td><label style="padding:0px;font-size: 14px;">体积</label></td>
          <td><label style="padding:0px;font-size: 14px;">到达时限</label></td>
          <td><label style="padding:0px;font-size: 14px;">重要提示</label></td>
          <td><label style="padding:0px;font-size: 14px;">配载要求</label></td>
        </tr>
        <tr>
          <td>
            <el-input v-model="EmpPoolForm" placeholder="调节号" :readonly="true" ></el-input>
          </td>
          <td>
            <el-input v-model="EmpPoolForm" placeholder="品名" :readonly="true" ></el-input>
          </td>
          <td>
            <el-input v-model="EmpPoolForm" placeholder="到达地" :readonly="true"></el-input>
          </td>
          <td>
            <el-input v-model="EmpPoolForm" placeholder="票数" :readonly="true" ></el-input>
          </td>
          <td>
            <el-input v-model="EmpPoolForm" placeholder="件数" :readonly="true" ></el-input>
          </td>
          <td>
            <el-input v-model="EmpPoolForm" placeholder="实际件数" :readonly="true" ></el-input>
          </td>
          <td>
            <el-input v-model="EmpPoolForm" placeholder="重量" :readonly="true" ></el-input>
          </td>
          <td>
            <el-input v-model="EmpPoolForm" placeholder="体积" :readonly="true" ></el-input>
          </td>
          <td>
            <el-input v-model="EmpPoolForm" placeholder="到达时限" :readonly="true" ></el-input>
          </td>
          <td>
            <el-input v-model="EmpPoolForm" placeholder="重要提示" :readonly="true" ></el-input>
          </td>
          <td>
            <el-input v-model="EmpPoolForm" placeholder="配载要求" :readonly="true" ></el-input>
          </td>
        </tr>
      </table>
    </el-form>





  </div>
</template>
<script>
  import axios from 'axios'
  import qs from 'qs'
  export default {
    name: 'SortUnpack',
    data: function() {
      return {
         loading: true,
        navigation1: null, //导航栏查询。。
        navigation2: null, //导航栏查询查询。。
        result: [], //主显示集合
        total: 7,
        size: 7, //条数
        pag: 1, //页数
        dialogFormVisible: false,
        formLabelWidth: "120px",
        title: 'title',
        RoleForm: [], //对话框值帮定
      }
    },
    methods: {

      /* 新增 */
      add: function() {
        alert("新增");
        this.dialogFormVisible = true;
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
      /* 对话框 中确定 */
      doSubmit: function() {

      },
      /* 封装方法 初始化查询*/
      query: function() {

      },
      /* 封装方法 初始化最大值*/
      max: function() {

      }
    },
    /* -----------------万恶的分割线------------------ */
    /* 初始化 */
    created: function() {

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
