import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import resign from '@/components/resign'
import Main from '@/components/Main'
import SystemColumn from '@/views/system/SystemColumn'
import SystemStaff from '@/views/system/SystemStaff'
import Home from '@/views/system/Home'

Vue.use(Router)
//哈哈
export default new Router({
 routes: [
   {
     /*登录*/
     path: '/',
     name: 'Login',
     component: Login
   },
   /* 注册没用页面*/
   {path:'/resign',name:'resign',component:resign},
   {/*首页*/
     path:'/Main',name:'Main',component:Main,
    /*首页下的字页面*/
     children:[
       /*首页显示*/
        {path: '/Home', name: 'Home', component: Home},
       /*系统管理 *//*栏目管理lx*/
        {path:'/system/SystemColumn',name:'SystemColumn',component:SystemColumn},
         /*系统管理 *//*员工管理lx*/
        {path:'/system/SystemStaff',name:'SystemStaff',component:SystemStaff},

     ]
   }
 ],

})
