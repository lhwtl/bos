import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import resign from '@/components/resign'
import Main from '@/components/Main'
import SystemColumn from '@/views/system/SystemColumn'
import Home from '@/views/system/Home'
import Bleacherstransfer from '@/views/dispatch/Bleacherstransfer'
import Manualscheduling from '@/views/dispatch/Manualscheduling'


Vue.use(Router)
//哈哈
export default new Router({
 routes: [
   {
     path: '/',
     name: 'Login',
     component: Login
   },
   {path:'/resign',name:'resign',component:resign},
   {
     path:'/Main',name:'Main',component:Main,

     children:[
        {path:'/system/SystemColumn',name:'SystemColumn',component:SystemColumn},
        {
            path: '/Home',
            name: 'Home',
            component: Home
       },
       {
            path: '/dispatcher/Bleacherstransfer',
            name: 'Bleacherstransfer',
            component: Bleacherstransfer
       },
       {
            path: '/dispatch/Manualscheduling',
            name: 'Manualscheduling',
            component: Manualscheduling
       }

     ]
   }
 ],

})
