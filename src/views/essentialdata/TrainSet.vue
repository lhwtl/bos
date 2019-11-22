  <template>
     <div class="divClass">
       <!--面包屑-->
       <el-breadcrumb separator="/">
         <el-breadcrumb-item :to="{ path: '/Home' }">基础数据</el-breadcrumb-item>
         <el-breadcrumb-item><a>班车设置</a></el-breadcrumb-item>
       </el-breadcrumb>
       <!--搜索框-->
       <el-form :inline="true" class="demo-form-inline" style="margin-top: 10px;">
             <el-form-item label="路线名称:">
               <el-input v-model="bhid" placeholder="请输入路线名称"></el-input>
             </el-form-item>
             <el-form-item label="线路类型:">
               <el-input v-model="bhname" placeholder="请输入线路类型"></el-input>
             </el-form-item>

             <el-form-item>
               <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
             </el-form-item>
             <el-form-item>
               <el-button type="primary" icon="el-icon-plus" @click="onadd">添加</el-button>
             </el-form-item>
           </el-form> -->
     <!--数据表格-->
      <el-table :data="result" style="width: 100%;" :border="true" max-height="550">
           <el-table-column prop="id" label="序号" min-width="30" align="center"></el-table-column>
           <el-table-column prop="linetype" label="线路类型" min-width="50"></el-table-column>
           <el-table-column prop="lineid" label="路线名称" min-width="50"></el-table-column>
           <el-table-column prop="licenseplateint"  label="车牌号" min-width="50"></el-table-column>
           <el-table-column prop="carrier" label="承运商" min-width="50"></el-table-column>
           <el-table-column prop="models" label="车型" min-width="50"></el-table-column>
           <el-table-column prop="driver" label="司机" min-width="50"></el-table-column>
           <el-table-column prop="telephone" label="电话" min-width="50"></el-table-column>
           <el-table-column prop="ton" label="吨控" min-width="50"></el-table-column>
           <el-table-column prop="syEmp.empname" label="操作人员" min-width="50"></el-table-column>
           <el-table-column prop="syUnits.name" label="操作单位" min-width="50"></el-table-column>
           <el-table-column prop="time" label="操作时间" min-width="70"></el-table-column>
                <el-table-column label="操作">
                   <template slot-scope="scope">
                     <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                     <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                   </template>
                 </el-table-column>
         </el-table>
     </div>
   </template>

   <script>
     import axios from 'axios'
     export default {
     name:"TrainSet",
     data:function(){
       return{
       result:[],
       bhid:null,
       bhname:null

       }

     },
     created:function(){
       let url = 'http://localhost/wuliuxm/select_BasShuttlebus';
       axios.post(url, null).then(resp => {
         console.log(resp)
         this.result = resp.data;

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
   </style>
