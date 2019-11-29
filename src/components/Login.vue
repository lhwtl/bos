<template>

  <el-form class="login-container" >
    <h2>表单登录测试</h2>
    <el-form-item label="用户名" prop="pass">
      <el-input type="text" v-model="empno" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="checkPass">
      <el-input type="password" v-model="pwd" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :plain="true" style="width: 100%;" @click="submitForm()">提交</el-button>
    </el-form-item>
  </el-form>
</template>
<script>

  import axios from 'axios'
  import qs from 'qs'
  var _this={};

  export default {
    //TOemp:'大海s',
    name: 'Login',
    data() {
      return {
        empno: "TO1001",
        pwd: "123",

      }
    },

    beforeCreate(){
      _this=this;
    },
    methods: {
      submitForm: function() {
      this.$session.set("key",this.empno);

        let params = {
          empno: this.empno,
          pwd: this.pwd
        }
        console.log(params)
        //  阿贾克斯  GET提交
        var url="http://localhost/wuliuxm/LoginSyEmp";

          /* 登入成功进入页面*/
            var str = qs.stringify(params);
            console.log(str);
           axios.post(url,str).then(response => {
                   if(response.data!=null){
                    this.$router.push({
                      path:'/Main'
                    }),
                    this.$nextTick(()=>{
                      this.$bus.$emit('my',response.data);
                      console.log(response.data)
                    });
                    this.$cookies.set("gxr",this.empno);
                    /* 传值下去*/
                  /*  this.$nextTick(()=>{
                       this.$bus.$emit('ss',this.empno);
                     });
 */

                   }else{
                      this.$message({
                            showClose: true,
                            message: '账号密码错误',
                            type: 'success'
                          });
                   }
                }).catch(function (error) {
                  console.log(404);
                });


      }
    }
  }
     const empTOs=this.empno;
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
  }

  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
</style>
