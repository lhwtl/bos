<template>
  <div class="login-wrap">
    <div class="content">
      <el-form class="login-container" >
          <h2 style="color: #FFFFFF;">物流管理系统</h2>
          <el-form-item label="用户名" prop="pass">
            <el-input type="text" v-model="empno" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="checkPass" style="color: #FFFFFF;">
            <el-input type="password" v-model="pwd" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :plain="true" style="width: 100%;" @click="submitForm()">登录</el-button>
          </el-form-item>
        </el-form>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import qs from 'qs'
  var _this = {};

  export default {
    //TOemp:'大海s',
    name: 'Login',
    data() {
      return {
        empno: "TO1001",
        pwd: "123",

      }
    },

    beforeCreate() {
      _this = this;
    },
    methods: {
      submitForm: function() {
        this.$session.set("key", this.empno);

        let params = {
          empno: this.empno,
          pwd: this.pwd
        }
        console.log(params)
        //  阿贾克斯  GET提交
        var url = "http://localhost/wuliuxm/LoginSyEmp";

        /* 登入成功进入页面*/
        var str = qs.stringify(params);
        console.log(str);
        axios.post(url, str).then(response => {
          if (response.data != null) {
            this.$router.push({
                path: '/Main'
              }),
              this.$nextTick(() => {
                this.$bus.$emit('my', response.data);
                console.log(response.data)
              });
            /* 传值下去*/
            /*  this.$nextTick(()=>{
                       this.$bus.$emit('ss',this.empno);
                     });
 */

          } else {
            this.$message({
              showClose: true,
              message: '账号密码错误',
              type: 'success'
            });
          }
        }).catch(function(error) {
          console.log(404);
        });


      }
    }
  }
  const empTOs = this.empno;
</script>

<style>
  .login-container {
    border-radius: 10px;
    margin: 0px auto;
    width: 350px;
    padding: 30px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    text-align: left;
    box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);
     position:absolute;
   /*定位方式绝对定位absolute*/
   top:50%;
   left:50%;
  /*顶和高同时设置50%实现的是同时水平垂直居中效果*/
   transform:translate(-50%,-50%);
     /*实现块元素百分比下居中*/
   width:450px;
   padding:50px;
   background: rgba(0,0,0,.8);
   /*背景颜色为黑色，透明度为0.8*/
   box-sizing:border-box;
   /*box-sizing设置盒子模型的解析模式为怪异盒模型，
    将border和padding划归到width范围内*/
   box-shadow: 0px 15px 25px rgba(0,0,0,.5);
   /*边框阴影  水平阴影0 垂直阴影15px 模糊25px 颜色黑色透明度0.5*/
    border-radius:15px;
     /*边框圆角，四个角均为15px*/
  }

  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

  .login-wrap {
    width: 100vw;
    height: 100vh;
    background: url('../assets/img/tp.jpg') no-repeat ;
    background-size: 100% 100%;
    background-position: left top -72px; //可以调整图片的位置
    position: relative;
}

</style>
