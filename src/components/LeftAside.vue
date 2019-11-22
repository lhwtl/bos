<template>
  <el-menu router :default-active="this.$route.path" class="el-menu-vertical-demo" background-color="#334157" text-color="#fff"
    active-text-color="#ffd04b" :collapse="ifTfs">
    <!-- <el-menu default-active="2" :collapse="collapsed" collapse-transition router :default-active="$route.path" unique-opened class="el-menu-vertical-demo" background-color="#334157" text-color="#fff" active-text-color="#ffd04b"> -->
    <div class="logobox">
      <img class="logoimg" src="../assets/img/logo.png" alt="">
    </div>
    <el-submenu v-for="d in datamm.syMenus"   :index="'index'+d.id" :key="'key'+d.id">
        <template slot="title" ><!-- v-if="d.Parentid=='-1'" --><!-- v-if="d.type='功能模块'" -->
            <!-- <i :class="d.url"></i> -->
            <i></i>
            <span>{{d.text}}</span>
        </template>
        <el-menu-item-group >
           <el-menu-item  v-for="d1 in d.symbols"  :index="d1.url" :key="'key'+d1.id">{{d1.text}}</el-menu-item>
        </el-menu-item-group>

    </el-submenu>

  </el-menu>
</template>
<script>
  export default {
    name: 'LeftAside',
    props: ['getCollapsed'],
    data: function() {
      return {
        datamm:[]
      }
    },
    computed: {
      ifTfs: function() {
        return this.getCollapsed;

      }
    },
    created: function() { //钩子函数

    },
    mounted() {
      console.log(this.$listeners);

      this.$bus.$on("my", data => {//传值过来
        console.log(data);
        /* 接收赋值*/
        this.datamm=data;
      });

    /* this.$bus.$on("ss", data => {//传值过来
        //传值下去
        this.$nextTick(()=>{
          this.$bus.$emit('empgh',data);
        });
      }); */
       this.$router.push({
              path: '/Home'
            })
    },

  }
</script>
<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 240px;
    min-height: 400px;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    border: none;
    text-align: left;
  }

  .el-menu-item-group__title {
    padding: 0px;
  }

  .el-menu-bg {
    background-color: #1f2d3d !important;
  }

  .el-menu {
    border: none;
  }

  .logobox {
    height: 40px;
    line-height: 40px;
    color: #9d9d9d;
    font-size: 20px;
    text-align: center;
    padding: 20px 0px;
  }

  .logoimg {
    height: 40px;
  }
</style>
