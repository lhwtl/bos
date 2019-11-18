<template>
  <div>
    <el-form ref="form" :model="form"  class="login-container">

      <el-form-item label="姓名"m>
        <el-input type="text" v-model="form.name" ></el-input>
      </el-form-item>


      <el-form-item label="性别">
        <template>
          <el-radio v-model="form.sex" label="男">男</el-radio>
          <el-radio v-model="form.sex" label="女">女</el-radio>
        </template>
      </el-form-item>

      <el-form-item label="年龄">
        <el-input type="text"  oninput="value=value.replace(/[^\d]/g, '')" v-model="form.age"></el-input>
      </el-form-item>

      <el-form-item label="地址">
        <el-select v-model="form.address" placeholder="请选择">
            <el-option v-model="form.address">湖南岳阳</el-option>
            <el-option v-model="form.address">湖南长沙</el-option>
            <el-option v-model="form.address">中国北京</el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="密码">
        <el-input type="password" v-model="form.pwd"></el-input>
      </el-form-item>


      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          sex: '男',
          age: '',
          address:'',
          pwd:''

        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
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
    font-size: 30px;
  }

  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
</style>
