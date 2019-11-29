// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
 import ElementUI from 'element-ui' //导入element-ui模块
import 'element-ui/lib/theme-chalk/index.css' //新添加2，避免后期打包样式不同，
import App from './App'
import router from './router'
import VueCookies from 'vue-cookies'
import VueSession from 'vue-session'
import global_ from './components/Login'//引用文件
//import global_ from './components/Global'//引用文件
Vue.prototype.GLOBAL = global_//挂载到Vue实例上面复制代码
Vue.use(VueSession)
Vue.use(VueCookies);

//process.env.MOCK && require('@/mock')  //测试模式

Vue.use(ElementUI)   //新添加3添加Element-UI
Vue.config.productionTip = false
Vue.prototype.$bus=new Vue();//挂在同一个bus上


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
