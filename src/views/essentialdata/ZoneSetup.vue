<template>
<div class="divClass">
    <!--面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/Home' }">基础数据</el-breadcrumb-item>
      <el-breadcrumb-item><a>区域设置</a></el-breadcrumb-item>
    </el-breadcrumb>
    <!--搜索框-->
    <el-form :inline="true" class="demo-form-inline" style="margin-top: 10px;">
      <el-form-item label="省份:">
        <el-input v-model="bhid" placeholder="请输入省份"></el-input>
      </el-form-item>
      <el-form-item label="城市:">
        <el-input v-model="bhname" placeholder="请输入城市"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button @click="moreGet">更多</el-button>
      </el-form-item>
      <el-row style="text-align: left;;">
        <el-button type="primary" icon="el-icon-plus" @click="onadd">添加</el-button>
      </el-row>
      </el-form-item>
    </el-form>
  <!--数据表格-->
   <el-table :data="result" style="width: 100%;" :border="true" max-height="550">
     <el-table-column prop="id" label="序号" min-width="30" align="center"></el-table-column>
     <el-table-column prop="province" label="省份" min-width="80"></el-table-column>
     <el-table-column prop="city" label="城市" min-width="60"></el-table-column>
     <el-table-column prop="county"  label="区(县)" min-width="60"></el-table-column>
     <el-table-column prop="postalcode" label="邮政编码" min-width="50"></el-table-column>
     <el-table-column prop="simplecode" label="简码" min-width="70"></el-table-column>
     <el-table-column prop="citycode" label="城市编码" min-width="80"></el-table-column>
     <el-table-column prop="syUnits.syEmp.empname" label="操作人员" min-width="50"></el-table-column>
     <el-table-column prop="syUnits.name" label="操作单位" min-width="70"></el-table-column>
     <el-table-column prop="syUnits.operationtime" label="操作时间" min-width="70"></el-table-column>
     <el-table-column label="操作">
       <template slot-scope="scope">
         <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
         <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
       </template>
     </el-table-column>
   </el-table>

   <!-- 添加的弹出框-->
         <el-dialog :title="title" :visible.sync="dialogFormVisible">
            <el-form :model="BasAreaForm" ref="BasAreaForm" :rules="rules">
              <el-form-item label="编号" :label-width="formLabelWidth" v-show="false">
                <el-input v-model="BasAreaForm.id" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="省份" prop="province" :label-width="formLabelWidth">
                <el-input v-model="BasAreaForm.province" autocomplete="off" ></el-input>
              </el-form-item>
              <el-form-item label="城市" prop="city" :label-width="formLabelWidth">
                <el-input v-model="BasAreaForm.city" autocomplete="off" ></el-input>
              </el-form-item>
              <el-form-item label="区(县)" prop="county" :label-width="formLabelWidth">
                <el-input v-model="BasAreaForm.county" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="邮政编码" prop="postalcode" :label-width="formLabelWidth">
                <el-input v-model="BasAreaForm.postalcode" autocomplete="off" ></el-input>
              </el-form-item>
              <el-form-item label="简码" prop="simplecode" :label-width="formLabelWidth" >
                <el-input v-model="BasAreaForm.simplecode" autocomplete="off" ></el-input>

              </el-form-item>
              <el-form-item label="城市编码" prop="citycode" :label-width="formLabelWidth">
                <el-input v-model="BasAreaForm.citycode" autocomplete="off" ></el-input>
              </el-form-item>
              <el-form-item label="进港单位" prop="entryunitid" :label-width="formLabelWidth"  v-show="false">
                <el-input v-model="BasAreaForm.entryunitid" autocomplete="off" ></el-input>
              </el-form-item>
              <el-form-item label="补码单位" prop="complementunitid" :label-width="formLabelWidth">
                <el-select  v-model="BasAreaForm.complementunitid" placeholder="--请选择--" style="width: 100%;">
                   <el-option v-for="u1 in units" :key="u1.name"  :value="u1.name" :label="u1.name" ></el-option>
                </el-select>
               <!-- <el-input v-model="BasAreaForm.complementunitid" autocomplete="off" ></el-input> -->
              </el-form-item>
              <el-form-item label="性质" prop="nature" :label-width="formLabelWidth">
                <el-select v-model="BasAreaForm.nature" placeholder="--请选择--" style="width: 100%;">
                  <el-option   value="全部"  label="全部"  ></el-option>
                  <el-option :value="1" label="省级"></el-option>
                  <el-option :value="2" label="直辖市  "></el-option>
                  <el-option :value="3" label="市辖市"></el-option>
                  <el-option :value="4" label="县级 "></el-option>
                  <el-option :value="5" label="地级"></el-option>
                  <el-option :value="6" label="省会 "></el-option>
                </el-select>
                <!-- <el-input v-model="BasAreaForm.nature" autocomplete="off"></el-input> -->
              </el-form-item>
              <el-form-item label="所属区域" prop="thearea" :label-width="formLabelWidth">
                 <el-select v-model="BasAreaForm.thearea" placeholder="--请选择--" style="width: 100%;">
                   <el-option   value="全部"  label="全部"  ></el-option>
                   <el-option :value="1" label="东北区"></el-option>
                   <el-option :value="2" label="华东区 "></el-option>
                   <el-option :value="3" label="华南区"></el-option>
                   <el-option :value="4" label="西北区 "></el-option>
                   <el-option :value="5" label="华中区"></el-option>
                   <el-option :value="6" label="西南区 "></el-option>
                   <el-option :value="6" label="华北区 "></el-option>
                 </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="doSubmit">确 定</el-button>
            </div>
          </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
    export default {
    name:"ZoneSetup",
      data:function(){
       return{
       result:[],
       bhid:null,
       bhname:null,
       abc:[],
       units:[],
       dialogFormVisible:false,
       formLabelWidth: "120px",
       title: '区域添加',
       BasAreaForm:{
         id:0,
         province:null,
         city:null,
         county:null,
         postalcode:null,
         simplecode:null,
         citycode:null,
         entryunitid:null,
         complementunitid:null,
         nature:null,
         thearea:null,
        },
       }
      },
      methods:{
        /* 添加方法 */
        onadd: function() {
          this.title="区域添加";
          this.BasAreaForm.province=null;
          this.BasAreaForm.city=null;
          this.BasAreaForm.county=null;
          this.BasAreaForm.postalcode=null;
          this.BasAreaForm.simplecode=null;
          this.BasAreaForm.citycode=null;
          this.BasAreaForm.entryunitid=null;
          this.BasAreaForm.complementunitid=null;
          this.BasAreaForm.nature=null;
          this.BasAreaForm.thearea=null,
          this.dialogFormVisible = true;

        },
        /*编辑修改 */
        handleEdit: function(row) {
          this.title="区域编辑";
          this.BasAreaForm.id=row.id;
          this.BasAreaForm.province=row.province;
          this.BasAreaForm.city=row.city;
          this.BasAreaForm.county=row.county;
          this.BasAreaForm.postalcode=row.postalcode;
          this.BasAreaForm.simplecode=row.simplecode;
          this.BasAreaForm.citycode=row.citycode;
          this.BasAreaForm.entryunitid=row.entryunitid;
          this.BasAreaForm.complementunitid=row.complementunitid;
          this.BasAreaForm.nature=row.nature;
          this.dialogFormVisible = true;
        },
        /* //新增修改提交的方法 */
            doSubmit: function() {
              /* alert(this.BasAreaForm.carrier) */
              this.$refs['BasAreaForm'].validate((valid) => {
                console.log(valid);
                alert(valid)
                if (valid) {
                  console.log("........");
                  let url = 'http://localhost/wuliuxm/insert_BasAreats';
                 if (this.title == '区域编辑') {
                    console.log(this.title)
                    url = 'http://localhost/wuliuxm/update_BasAreats';
                  }
                  let pages = {
                   id:this.BasAreaForm.id,
                   province: this.BasAreaForm.province,
                   city:this.BasAreaForm.city,
                   county:this.BasAreaForm.county,
                   postalcode:this.BasAreaForm.postalcode,
                   simplecode:this.BasAreaForm.simplecode,
                   citycode:this.BasAreaForm.citycode,
                   entryunitid:this.abc.syUnits.name,
                   complementunitid:this.BasAreaForm.complementunitid,
                   nature:this.BasAreaForm.nature,
                   thearea:this.BasAreaForm.thearea,
                  }
                  alert(qs.stringify(pages))
                  axios.post(url, qs.stringify(pages)).then(resp => {
                    console.log(resp)
                     alert(this.dialogFormVisible)
                    this.dialogFormVisible=false; //隐藏
                    alert(this.dialogFormVisible)
                  this.query();
                  }).catch(error => {
                    console.log("失败");
                  });
                } else {
                  console.log('error submit!!提交失败');
                  return false;
                }
              });
          },
        query:function(){
          let url = 'http://localhost/wuliuxm/select_BasArea';
          axios.post(url, null).then(resp => {
            console.log(resp)
            this.result = resp.data;
          }).catch(error => {
            console.log(error);
          });
        },
        handleDelete: function(row) {
         // alert(row.id);

          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let url = 'http://localhost/wuliuxm/delete_BasArea';
            let pages = {
              id: row.id,
            }
            axios.post(url, qs.stringify(pages)).then(resp => {
              console.log(resp)
              this.query();
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }).catch(error => {
              console.log("删除失败");
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
          });
         }
      },
    created:function(){
      this.query();
      let url = 'http://localhost/wuliuxm/selectSyUnitsHlp';
      axios.post(url, null).then(resp => {
        console.log(resp)
        this.units = resp.data;
        }).catch(error => {
        alert(utils.name)
        console.log(error);
         });

       this.abc=this.$session.get("emplist");
       alert( this.abc.syUnits.name)
    }

    }
</script>

<style>

  .divClass {
    margin-top: 10px;
    margin-left: 10px;
    }

</style>
