<template>
  <div>

    <div class="block">
      <span class="demonstration"></span>
      <el-cascader
        v-model="value"
        :options="options"
        :props="{checkStrictly:true}"
        clearable
        filterable
        @change="handleChange"></el-cascader>
    </div>

  </div>
</template>

<script>
import area from '../../../config/area.js'

export default {
  data(){
    return {
      value: [],
/*      shengObj:[],//省
      shiObj:[],//市
      xianObj:[],//省 */
      options:area.options,
    }
  },
  methods:{
    handleChange(value) {
      console.log(value);
    }
  }
}
</script>
