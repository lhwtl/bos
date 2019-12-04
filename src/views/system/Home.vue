<template>
  <div>
    <h2 align="left">宅急送物流管理系统</h2>
    <hr />

收货百分比：
<br />
<br />
<el-progress :text-inside="true" :stroke-width="26" :percentage="70"></el-progress>
<br />
送货百分比：
<br />
<el-progress :text-inside="true" :stroke-width="24" :percentage="100" status="success"></el-progress>
<br />
退货百分比：
<br />
<el-progress :text-inside="true" :stroke-width="22" :percentage="20" status="warning"></el-progress>
<br />
转单百分比：
<br />
<el-progress :text-inside="true" :stroke-width="20" :percentage="1" status="exception"></el-progress>
 <br />
<el-calendar v-model="value">
</el-calendar>
  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
  export default {
    name: 'Home',
    data:function(){
      return{
       value:new Date
      }
    }


    }

</script>
<style>

</style>
