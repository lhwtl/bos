<template>
  <div>
    首页
   <el-tree
     :data="qxtext"
     show-checkbox
     default-expand-all
     node-key="id"
     ref="tree"
     highlight-current
     :props="defaultProps"
     >
   </el-tree>


  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
  export default {
    name:'Home',
    methods: {

      resetChecked() {
        this.$refs.tree.setCheckedKeys([]);
      }
    },
    created: function() { /* 初始化 */
      //初始化分页查询
         let url = 'http://localhost/wuliuxm/FillAllOneTwoColumnSyMenus';
          axios.post(url, null).then(resps => {
            console.log("abc" + resps)
            console.log(resps.data)
            this.qxtext = resps.data;
          }).catch(error => {
            console.log(error);
          });


    },

    data:function() {
      return {
        qxtext:[],
          children: null,
          label: null,
          defaultProps: {
            children: 'symbols',
            label: 'text'
        }
      };
    }
  };
</script>
