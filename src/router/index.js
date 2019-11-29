
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import resign from '@/components/resign'
import Main from '@/components/Main'
import LeftAside from '@/components/LeftAside'
import TopNav from '@/components/TopNav'
import SystemColumn from '@/views/system/SystemColumn'
import Home from '@/views/system/Home'
import Bleacherstransfer from '@/views/dispatch/Bleacherstransfer'
import Manualscheduling from '@/views/dispatch/Manualscheduling'
import Cancelsigninapplication from '@/views/dispatch/Cancelsigninapplication'
import Signinandinput from '@/views/dispatch/Signinandinput'

//基础数据
import BasisFiles from '@/views/essentialdata/BasisFiles'
import DispatchTime from '@/views/essentialdata/DispatchTime'
import ManagementArea from '@/views/essentialdata/ManagementArea'
import PickAStandard from '@/views/essentialdata/PickAStandard'
import TrainSet from '@/views/essentialdata/TrainSet'
import PieSetup from '@/views/essentialdata/PieSetup'
import ZoneSetup from '@/views/essentialdata/ZoneSetup'
import ManagementZoning from '@/views/essentialdata/ManagementZoning'
/* import City from '@/views/essentialdata/City' */


//受理
import BusinessAccepted from '@/views/acceptance/BusinessAccepted'
import WorkOrderQuery from '@/views/acceptance/WorkOrderQuery'
import FastInput from '@/views/acceptance/FastInput'






import instorage from '@/views/materials/instorage'
import logistics from '@/views/materials/logistics'
import Materialgoods from '@/views/materials/Materialgoods'



/* import SystemColumn from '@/views/system/SystemColumn' */
import SystemRole from '@/views/system/SystemRole'
import SystemStaff from '@/views/system/SystemStaff'
import SystemUnit from '@/views/system/SystemUnit'
import BookList from '@/views/book/BookList'


/* import Home1 from wertyuixcvghj'@iews/system/Home1'
import Home2 from '@iews/system/Home2'
import Home3 from '@iews/system/Home3'
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
   {path:'/LeftAside',name:'LeftAside',component:LeftAside},
      {path:'/TopNav',name:'TopNav',component:TopNav},
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
       },
       {
            path: '/dispatch/Cancelsigninapplication',
            name: 'Cancelsigninapplication',
            component: Cancelsigninapplication
       },
       {
            path: '/dispatch/Signinandinput',
            name: 'Signinandinput',
            component: Signinandinput
       },
       {
            path: '/essentialdata/BasisFiles',
            name: 'BasisFiles',
            component: BasisFiles
       },
       {
            path: '/essentialdata/DispatchTime',
            name: 'DispatchTime',
            component: DispatchTime
       },
       {
            path: '/essentialdata/ManagementArea',
            name: 'ManagementArea',
            component: ManagementArea
       },
       {
            path: '/essentialdata/PickAStandard',
            name: 'PickAStandard',
            component: PickAStandard
       },
       {
            path: '/essentialdata/TrainSet',
            name: 'TrainSet',
            component: TrainSet
       },
       {//取派设置
            path: '/essentialdata/PieSetup',
            name: 'PieSetup',
            component: PieSetup
       } ,
       {//区域设置
            path: '/essentialdata/ZoneSetup',
            name: 'ZoneSetup',
            component: ZoneSetup
       } ,
       {//管理分区
            path: '/essentialdata/ManagementZoning',
            name: 'ManagementZoning',
            component: ManagementZoning
       },
       {//业务受理
            path: '/acceptance/BusinessAccepted',
            name: 'BusinessAccepted',
            component: BusinessAccepted
       },
       {//工作单快速录入
            path: '/acceptance/FastInput',
            name: 'FastInput',
            component: FastInput
       },
       {//工作单查询
            path: '/acceptance/WorkOrderQuery',
            name: 'WorkOrderQuery',
            component: WorkOrderQuery
       },
       {
            path: '/materials/instorage',
            name: 'instorage',
            component: instorage
       },
       {
            path: '/materials/logistics',
            name: 'logistics',
            component: logistics
       },
       {
            path: '/materials/Materialgoods',
            name: 'Materialgoods',
            component: Materialgoods
       },
       {
            path: '/system/SystemColumn',
            name: 'SystemColumn',
            component: SystemColumn
       },
       {
            path: '/system/SystemRole',
            name: 'SystemRole',
            component: SystemRole
       },
       {
            path: '/system/SystemStaff',
            name: 'SystemStaff',
            component: SystemStaff
       },
       {
            path: '/system/SystemUnit',
            name: 'SystemUnit',
            component: SystemUnit
       },
/*       {
            path: '/essentialdata/City',
            name: 'City',
            component: City
       } */

/*      {path:'/system/Home1',name:'Home1',component:Home1},
       {path:'/system/Home2',name:'Home2',component:Home2},
       {path:'/system/Home3',name:'Home3',component:Home3}, */
     ]
   }
 ],

})
