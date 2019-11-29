<template>

  <div class="divClass">

    <!--面包屑-->
    <el-breadcrumb separator="/" >
      <el-breadcrumb-item :to="{ path: '/Home' }">受理</el-breadcrumb-item>
      <el-breadcrumb-item><a>工作单快速录入</a></el-breadcrumb-item>
    </el-breadcrumb>

<!--    <el-row style="text-align: left;;" class="divClass">
      <el-button type="primary" icon="el-icon-plus" @click="doSubmit">保存</el-button>

    </el-row> -->

    <!-- 添加的弹出框-->
    <div>
       <el-form :model="AccWorksheetForm"  ref="AccWorksheetForm" :rules="rules"  class="divClass" >
         <el-form-item label="编号" :label-width="formLabelWidth" v-show="false">
           <el-input v-model="AccWorksheetForm.id" autocomplete="off"></el-input>
         </el-form-item>
         <el-form-item label="工作单号" prop="worksheetno" :label-width="formLabelWidth"  style="width:300px" >

           <el-input v-model="AccWorksheetForm.worksheetno"   placeholder="请输入工作单号" ></el-input>
         </el-form-item>
         <el-form-item label="到达地" prop="destination" :label-width="formLabelWidth" style="width:300px" >
           <el-input v-model="AccWorksheetForm.destination"  placeholder="请输入到达地"></el-input>
         </el-form-item>
         <el-form-item label="产品" prop="producttime" :label-width="formLabelWidth" style="width:300px">
           <el-input v-model="AccWorksheetForm.producttime"  placeholder="请输入产品"></el-input>
         </el-form-item>
         <el-form-item label="总件数" prop="total" :label-width="formLabelWidth" style="width:300px">
           <el-input v-model="AccWorksheetForm.total"  placeholder="请输入总件数"></el-input>
         </el-form-item>
         <el-form-item label="重量" prop="weight" :label-width="formLabelWidth" style="width:300px">
           <el-input v-model="AccWorksheetForm.weight"   placeholder="请输入重量"></el-input>
         </el-form-item>
         <el-form-item label="配载要求" prop="stowagerequirements" :label-width="formLabelWidth" style="width:300px">
           <el-input v-model="AccWorksheetForm.stowagerequirements" placeholder="请输入配载要求" ></el-input>
         </el-form-item>
       </el-form>
       <div slot="footer" class="dialog-footer">
         <el-button type="primary" @click="doSubmit">确 定</el-button>
       </div>
      </div>
  </div>
</template>

<script>
  import axios from 'axios'
    import qs from 'qs'
    export default {
    name:"FastInput",
    data:function(){
      return{
         result:[ ],
      /* dialogFormVisible:true, */
       formLabelWidth: "120px",
       /* title: '工作单快速录入', */
       AccWorksheetForm:{
         /* id:null, */
         worksheetno:null,
         destination:null,
         producttime:null,
         total:null,
         weight:null,
         stowagerequirements:null,
       },
       rules:{
       worksheetno:[{
           required:true,
           message:'请输入收派标准名称',
           trigger:'change'
         }],
         destination:[{
             required:true,
             message:'请输入最小重量',
             trigger:'blur'
           }],
         producttime:[{
             required:true,
             message:'请输入最大重量',
             trigger:'blur'
           }],
         total:[{
             required:true,
             message:'请选择',
             trigger:'blur'
           }],
         weight:[{
             required:true,
             message:'请输入',
             trigger:'blur'
           }],
         stowagerequirements:[{
             required:true,
             message:'请输入',
             trigger:'blur'
           }]
        }
      }
    },
    created:function(){
    },
    methods:{
      /* 添加方法 */
      onadd: function() {
        /* this.title="工作单快速录入"; */
        this.AccWorksheetForm.worksheetno=null;
        this.AccWorksheetForm.destination=null;
        this.AccWorksheetForm.producttime=null;
        this.AccWorksheetForm.total=null;
        this.AccWorksheetForm.weight=null;
        this.AccWorksheetForm.stowagerequirements=null;
      },

      /* //新增修改提交的方法 */
      doSubmit: function() {
        this.$refs['AccWorksheetForm'].validate((valid) => {
          console.log(valid);
          alert(valid)
          if (valid) {
            console.log("........");
            let url = 'http://localhost/wuliuxm/insert_AccWorksheet';
          if (this.title == '员工编辑') {
              console.log(this.title)
              url = 'http://localhost/wuliuxm/updateSyEmpLx';
            }
            let pages = {
             id:this.AccWorksheetForm.id,
             worksheetno: this.AccWorksheetForm.worksheetno,
             destination:this.AccWorksheetForm.destination,
             producttime:this.AccWorksheetForm.producttime,
             total:this.AccWorksheetForm.total,
             weight:this.AccWorksheetForm.weight,
             stowagerequirements:this.AccWorksheetForm.stowagerequirements,
            }

            alert(qs.stringify(pages))
            console.log(qs.stringify(pages))
            axios.post(url, qs.stringify(pages)).then(resp => {
              console.log(resp)
            }).catch(error => {
              console.log("失败");
            });
          } else {
            console.log('error submit!!提交失败');
            return false;
          }
        });
    }
  },
  }

</script>

<style>
  .divClass {
    margin-top: 10px;
    margin-left: 10px;
  }


</style>
