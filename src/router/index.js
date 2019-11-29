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
//调度
import Bleacherstransfer from '@/views/dispatch/Bleacherstransfer'
import Manualscheduling from '@/views/dispatch/Manualscheduling'
import Cancelsigninapplication from '@/views/dispatch/Cancelsigninapplication'
import Signinandinput from '@/views/dispatch/Signinandinput'
import Propagandatask from '@/views/dispatch/Propagandatask'
import BasisFiles from '@/views/essentialdata/BasisFiles'
import DispatchTime from '@/views/essentialdata/DispatchTime'
import ManagementArea from '@/views/essentialdata/ManagementArea'
import PickAStandard from '@/views/essentialdata/PickAStandard'
import TrainSet from '@/views/essentialdata/TrainSet'
import instorage from '@/views/materials/instorage'
import logistics from '@/views/materials/logistics'
import Materialgoods from '@/views/materials/Materialgoods'
import SystemRole from '@/views/system/SystemRole'
import SystemStaff from '@/views/system/SystemStaff'
import SystemUnit from '@/views/system/SystemUnit'
import BookList from '@/views/book/BookList'
//返货
import Returnapplication from '@/views/returngoods/Returnapplication'
import Returnapplicationconfirmation from '@/views/returngoods/Returnapplicationconfirmation'
import Generatereturnorder from '@/views/returngoods/Generatereturnorder'
//物流管理
import Trackingformregistration from '@/views/physicaldistributionmanagement/Trackingformregistration'
import Tracetablequery from '@/views/physicaldistributionmanagement/Tracetablequery'
import Logisticsdeliveryorderquery from '@/views/physicaldistributionmanagement/Logisticsdeliveryorderquery'
import Timestatistics from '@/views/physicaldistributionmanagement/Timestatistics'
import Volumestatistics from '@/views/physicaldistributionmanagement/Volumestatistics'




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
       {
            path: '/dispatch/Propagandatask',
            name: 'Propagandatask',
            component: Propagandatask
       },
       {
            path: '/returngoods/Returnapplication',
            name: 'Returnapplication',
            component: Returnapplication
       },
       {
            path: '/returngoods/Returnapplicationconfirmation',
            name: 'Returnapplicationconfirmation',
            component: Returnapplicationconfirmation
       },
       {
            path: '/returngoods/Generatereturnorder',
            name: 'Generatereturnorder',
            component: Generatereturnorder
       },
       {
            path: '/physicaldistributionmanagement/Trackingformregistration',
            name: 'Trackingformregistration',
            component: Trackingformregistration
       },
       {
            path: '/physicaldistributionmanagement/Tracetablequery',
            name: 'Tracetablequery',
            component: Tracetablequery
       },
       {
            path: '/physicaldistributionmanagement/Logisticsdeliveryorderquery',
            name: 'Logisticsdeliveryorderquery',
            component: Logisticsdeliveryorderquery
       },
       {
            path: '/physicaldistributionmanagement/Timestatistics',
            name: 'Timestatistics',
            component: Timestatistics
       },
       {
            path: '/physicaldistributionmanagement/Volumestatistics',
            name: 'Volumestatistics',
            component: Volumestatistics
       }







/*      {path:'/system/Home1',name:'Home1',component:Home1},
       {path:'/system/Home2',name:'Home2',component:Home2},
       {path:'/system/Home3',name:'Home3',component:Home3}, */
     ]
   }
 ],

})
