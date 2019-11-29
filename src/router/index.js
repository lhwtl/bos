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
import instorage from '@/views/materials/instorage'
import logistics from '@/views/materials/logistics'
import Materialgoods from '@/views/materials/Materialgoods'
import inventory from '@/views/materials/inventory'
import information from '@/views/materials/information'
import Warehouse from '@/views/materials/Warehouse'
import Packagingquery from '@/views/materials/Packagingquery'
/* import Home1 from wertyuixcvghj'@/views/system/Home1'
import Home2 from '@/views/system/Home2'
import Home3 from '@/views/system/Home3'
 ；啦啦啦啦啦啦 1*/
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
        {path:'/materials/Materialgoods',name:'Materialgoods',component:Materialgoods},
				{path:'/materials/instorage',name:'instorage',component:instorage},
				{path:'/materials/logistics',name:'logistics',component:logistics},
				{path:'/materials/inventory',name:'inventory',component:inventory},
				{path:'/materials/information',name:'information',component:information},
				{path:'/materials/Warehouse',name:'Warehouse',component:Warehouse},
				{path:'/materials/Packagingquery',name:'Packagingquery',component:Packagingquery},
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
/*      {path:'/system/Home1',name:'Home1',component:Home1},
       {path:'/system/Home2',name:'Home2',component:Home2},
       {path:'/system/Home3',name:'Home3',component:Home3}, */
     ]
   }
 ],

})
