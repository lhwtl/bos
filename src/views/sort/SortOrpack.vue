<template>
  <div class="divClass">
    <!--面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a>合包管理</a></el-breadcrumb-item>
    </el-breadcrumb>


    <el-form :inline="true" class="demo-form-inline" style="margin-top: 10px;text-align: left;margin-left: 30px;">
      <el-form-item>
        <el-button type="primary" @click="add">保存</el-button>
        <el-button type="primary" @click="adds">加入合包</el-button>
      </el-form-item>
    </el-form>




    <el-form :model="EmpPoolForm">
      <table>
        <tr>
          <td width="85px"><label>合包号</label></td>
          <td>
            <el-input v-model="EmpPoolForm.id" placeholder="合包号"></el-input>
          </td>
          <td width="85px"><label>合包人</label></td>
          <td><!-- {{EmpPoolForm.packageperson}} -->
          <div v-if="EmpPoolForm.packageperson==null"><el-input  v-model="EmpPoolForm.packageperson" placeholder="合包人" :readonly="true"></el-input></div>
           <div v-for="c in EmpList" :key="c.id">
                <div v-if="EmpPoolForm.packageperson==c.id">
                  <el-input  :value="c.empname" placeholder="合包人" :readonly="true"></el-input>
                </div>
           </div>

          </td>
          <td width="85px"><label>封签号</label></td>
          <td>
            <el-input v-model="EmpPoolForm.sealint" placeholder="封签号" :readonly="true"></el-input>
          </td>
          <td width="85px"><label>到达地</label></td>
          <td>
            <el-input v-model="EmpPoolForm.destination" placeholder="到达地" :readonly="true"></el-input>
          </td>
        </tr><br />
        <tr>
          <td width="85px"><label>计算到达时间</label></td>
          <td>
            <el-input v-model="EmpPoolForm.reckondes" placeholder="计算到达时间" :readonly="true"></el-input>
          </td>
          <td width="85px"><label>送达时限</label></td>
          <td>
            <el-input v-model="EmpPoolForm.timelimit" placeholder="送达时限" :readonly="true"></el-input>
          </td>
          <td width="85px"><label>总票数</label></td>
          <td>
            <el-input v-model="EmpPoolForm.ticketsum" placeholder="总票数" :readonly="true"></el-input>
          </td>
          <td width="85px"><label>总件数</label></td>
          <td>
            <el-input v-model="EmpPoolForm.cargosum" placeholder="总件数" :readonly="true"></el-input>
          </td>
        </tr><br />
        <tr>
          <td width="85px"><label>总重量</label></td>
          <td>
            <el-input v-model="EmpPoolForm.weightsum" placeholder="总重量" :readonly="true"></el-input>
          </td>
          <td width="85px"><label>总体积</label></td>
          <td>
            <el-input v-model="EmpPoolForm.volumesum" placeholder="总体积" :readonly="true"></el-input>
          </td>
          <td width="85px"><label>状态</label></td>
          <td>
            <el-input v-model="EmpPoolForm.state" placeholder="状态" :readonly="true"></el-input>
          </td>
          <td width="85px"><label>配载要求</label></td>
          <td>
            <el-input v-model="EmpPoolForm.ask" placeholder="配载要求" :readonly="true"></el-input>
          </td>
        </tr><br />
      </table>
    </el-form>
    <br />



    <el-form :model="result">
      <table style="text-align: left;">
        <tr>
          <td><label style="padding:0px;font-size: 14px;">条码号</label></td>
          <td><label style="padding:0px;font-size: 14px;">商品名</label></td>
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
            <el-input v-model="cctvid" placeholder="调节号" @blur="blurHB"></el-input>
          </td>
          <td>
            <el-input v-model="cargotype1" placeholder="品名">
              <template slot-scope="scope1">
                <p v-if="scope1.row.cargotype=='0'">电器类型</p>
                <p v-if="scope1.row.cargotype=='1'">食物类型</p>
                <p v-if="scope1.row.cargotype=='2'">家用类型</p>
                <p v-if="scope1.row.cargotype=='3'">玩具类型</p>
              </template>
            </el-input>
          </td>
          <td>
            <el-input v-model="direction" placeholder="到达地"></el-input>
          </td>
          <td>
            <el-input v-model="PS" placeholder="票数"></el-input>
          </td>
          <td>
            <el-input v-model="cargocount" placeholder="件数"></el-input>
          </td>
          <td>
            <el-input v-model="cargocount" placeholder="实际件数"></el-input>
          </td>
          <td>
            <el-input v-model="weight" placeholder="重量"></el-input>
          </td>
          <td>
            <el-input v-model="volume" placeholder="体积"></el-input>
          </td>
          <td>
            <el-input v-model="storagedate" placeholder="到达时限"></el-input>
          </td>
          <td>
            <el-input v-model="cargotype2" placeholder="重要提示">
              <template slot-scope="scope1">
                <p v-if="scope1.row.cargotype2=='0'">轻放轻拿</p>
                <p v-if="scope1.row.cargotype2=='1'">注意阳光直射</p>
                <p v-if="scope1.row.cargotype2=='2'">防雨防潮</p>
                <p v-if="scope1.row.cargotype2=='3'">严禁挤压</p>
              </template>
            </el-input>
          </td>
          <td>
            <el-input v-model="cargotype3" placeholder="配载要求">
              <template slot-scope="scope1">
                <p v-if="scope1.row.cargotype3=='0'">货满及走</p>
                <p v-if="scope1.row.cargotype3=='1'">优先运输</p>
                <p v-if="scope1.row.cargotype3=='2'">钱到位就走</p>
                <p v-if="scope1.row.cargotype3=='3'">货满及走</p>
              </template>
            </el-input>
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
    name: 'SortOrpack',
    data: function() {
      return {
        cctvid: 910377309,
        cargotype1: null,
        cargotype2: null,
        cargotype3: null,
        direction: null,
        cargocount: null,
        storagedate: null,
        weight: null,
        volume: null,
        PS: null,
        navigation1: null, //导航栏查询。。
        navigation2: null, //导航栏查询查询。。
        result: [], //主显示集合
        EmpList:[],
        total: 7,
        size: 7, //条数
        pag: 1, //页数
        dialogFormVisible: false,
        formLabelWidth: "120px",
        title: 'title',
        empkey: [],
        /* 登录的账号信息 */
        RoleForm: [], //对话框值帮定
        EmpPoolForm: {
          id: null,
          packageperson: null,
          sealint: null,
          destination: null,
          reckondes: null,
          timelimit: null,
          ticketsum: null,
          cargosum: null,
          weightsum: null,
          volumesum: null,
          state: null,
          ask: null,


        },


      }
    },
    methods: {
      /* 失焦事件  输出id 查值  赋值*/
      blurHB() {
        let pages = {
          id: this.cctvid,
        }
        let url = 'http://localhost/wuliuxm/FillSSorCheckbounddetailsByidLx';
        axios.post(url, qs.stringify(pages)).then(resp => {
          console.log(resp.data);
          this.cargotype1 = resp.data.cargotype;
          if (this.cargotype1 == 1) {
            this.cargotype1 = '食物类型'
          }
          if (this.cargotype1 == 2) {
            this.cargotype1 = '家具类型'
          }
          if (this.cargotype1 == 3) {
            this.cargotype1 = '玩具类型'
          }
          if (this.cargotype1 == 0) {
            this.cargotype1 = '电器类型'
          }
          this.cargotype2 = resp.data.cargotype;
          if (this.cargotype2 == 1) {
            this.cargotype2 = '注意阳光直射'
          }
          if (this.cargotype2 == 2) {
            this.cargotype2 = '防雨防潮'
          }
          if (this.cargotype2 == 3) {
            this.cargotype2 = '严禁挤压'
          }
          if (this.cargotype2 == 0) {
            this.cargotype2 = '轻放轻拿'
          }
          this.cargotype3 = resp.data.cargotype;
          if (this.cargotype3 == 1) {
            this.cargotype3 = '优先运输'
          }
          if (this.cargotype3 == 2) {
            this.cargotype3 = '钱到位就走'
          }
          if (this.cargotype3 == 3) {
            this.cargotype3 = '货满及走'
          }
          if (this.cargotype3 == 0) {
            this.cargotype3 = '满货及走'
          }
          this.direction = resp.data.direction;
          this.cargocount = resp.data.cargocount;
          this.weight = resp.data.weight;
          this.volume = resp.data.volume;
          this.storagedate = resp.data.storagedate;
          this.PS = 1;
          /* this.result = resp.data; */
        }).catch(error => {
          console.log(error);
        });
       /* 根据id查详情   根据详情的编号找到对应的合包对应的编号查出赋值*/
         let urls = 'http://localhost/wuliuxm/FillSorPackagedetailsOneByidLx';
        axios.post(urls,qs.stringify(pages)).then(resp => {
            console.log(resp.data);
            this.EmpPoolForm=resp.data;


          }).catch(error => {
            console.log(error);
          });

      },
      /* 新增 */
      add: function() { //FillSorPackagedetailsOneByidLxssss
        /* 判断当前id  有没有存在于当前 详情里面*/
       let pagess = {
          id: this.cctvid,
        }
        // alert(qs.stringify(pagess));
        let urls = 'http://localhost/wuliuxm/FillSorPackagedetailsOneByidLxssss';
        axios.post(urls, qs.stringify(pagess)).then(resp => {
          console.log(resp.data);
          //alert(resp.data);
          if (resp.data == 'ok') {
            this.$message({
              message: '此数据已在和包中',
              type: 'warning'
            });
            return;
          }




        let pages = {
          id:this.EmpPoolForm.id,
          packageperson: this.EmpPoolForm.packageperson,
          sealint: this.EmpPoolForm.sealint,
          destination: this.EmpPoolForm.destination,
          reckondes: this.EmpPoolForm.reckondes,
          timelimits: this.EmpPoolForm.timelimit,
          ticketsum: this.EmpPoolForm.ticketsum,
          cargosum: this.EmpPoolForm.cargosum,
          weightsum: this.EmpPoolForm.weightsum,
          volumesum: this.EmpPoolForm.volumesum,
          state: this.EmpPoolForm.state,
          ask: this.EmpPoolForm.ask,

          empids: this.empkey.id,
          /* 登入的id */


          cctvid: this.cctvid,
          cargotype1: this.cargotype1,
          cargotype2: this.cargotype2,
          cargotype3: this.cargotype3,
          direction: this.direction,
          cargocount: this.cargocount,
          storagedate: this.storagedate,
          weight: this.weight,
          volume: this.volume,
          PS: this.PS,
        }
       // alert(qs.stringify(pages));
        let url = 'http://localhost/wuliuxm/insertSorPackagedetailsLx';
        axios.post(url, qs.stringify(pages)).then(resp => {
          console.log(resp.data);
          this.EmpPoolForm = resp.data;

        }).catch(error => {
          console.log(error);
        });

        }).catch(error => {
          console.log(error);
        });

      },
      /* 加入合包*/
      adds: function() {

        if (this.EmpPoolForm.id == null) {
          this.$message({
            message: '请输入合包号',
            type: 'warning'
          });
          return;
        }



        //alert(this.EmpPoolForm.id)
        let pagest = {
          id: this.EmpPoolForm.id,
        }
        let urlt = 'http://localhost/wuliuxm/FillSorPackageByidLXs';
        axios.post(urlt, qs.stringify(pagest)).then(resp => {
          console.log(resp.data);
          if (resp.data != 'ok') {
            this.$message({
              message: '请输入正确合包号',
              type: 'warning'
            });
            return;
          }
          /* 判断当前id  有没有存在于当前 详情里面*/
          let pages = {
            id: this.cctvid,
          }
          //alert(qs.stringify(pages));
          let url = 'http://localhost/wuliuxm/FillSorPackagedetailsOneByidLxssss';
          axios.post(url, qs.stringify(pages)).then(resp => {
            console.log(resp.data);
            //alert(resp.data);
            if (resp.data == 'ok') {
              this.$message({
                message: '此数据已在和包中',
                type: 'warning'
              });
              return;
            }

            //alert("xxx");
            /* 新增和包   修改和包*/


            let pages = {
              hbid: this.EmpPoolForm.id,
              packageperson: this.EmpPoolForm.packageperson,
              sealint: this.EmpPoolForm.sealint,
              destination: this.EmpPoolForm.destination,
              reckondes: this.EmpPoolForm.reckondes,
              timelimits: this.EmpPoolForm.timelimit,
              ticketsum: this.EmpPoolForm.ticketsum,
              cargosum: this.EmpPoolForm.cargosum,
              weightsum: this.EmpPoolForm.weightsum,
              volumesum: this.EmpPoolForm.volumesum,
              state: this.EmpPoolForm.state,
              ask: this.EmpPoolForm.ask,

              cctvid: this.cctvid,
              cargotype1: this.cargotype1,
              cargotype2: this.cargotype2,
              cargotype3: this.cargotype3,
              direction: this.direction,
              cargocount: this.cargocount,
              storagedate: this.storagedate,
              weight: this.weight,
              volume: this.volume,
              PS: this.PS,
            }
            //alert(qs.stringify(pages));
            let url = 'http://localhost/wuliuxm/updateSorPackage';
            axios.post(url, qs.stringify(pages)).then(resp => {
              console.log(resp.data);
              this.EmpPoolForm = resp.data;

            }).catch(error => {
              console.log(error);
            });


          }).catch(error => {
            console.log(error);
          });

        }).catch(error => {
          console.log(error);
        });

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
      /* 获取登录的账号信息*/
   /*   alert("xxxx") */
      this.empkey = this.$session.get("emplistkey");
  /*    alert(this.empkey)
      alert(this.empkey.empname)
      alert(this.empkey.id)
 */
 let url = 'http://localhost/wuliuxm/FillAllSyEmpLx';
       axios.post(url,null).then(resp => {
           console.log(resp.data);
           this.EmpList = resp.data;
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

  .divClassqx {
    margin-top: 10px;
    margin-left: 60px;
  }

  .divClassqxs {
    margin-top: 10px;
    margin-left: 25px;
  }
</style>
