import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import resign from '@/components/resign'
import Main from '@/components/Main'
import LeftAside from '@/components/LeftAside'
import TopNav from '@/components/TopNav'

import Home from '@/views/system/Home'
import Bleacherstransfer from '@/views/dispatch/Bleacherstransfer'
import Manualscheduling from '@/views/dispatch/Manualscheduling'
import Cancelsigninapplication from '@/views/dispatch/Cancelsigninapplication'
import Signinandinput from '@/views/dispatch/Signinandinput'
import BasisFiles from '@/views/essentialdata/BasisFiles'
import DispatchTime from '@/views/essentialdata/DispatchTime'
import ManagementArea from '@/views/essentialdata/ManagementArea'
import PickAStandard from '@/views/essentialdata/PickAStandard'
import TrainSet from '@/views/essentialdata/TrainSet'
import instorage from '@/views/materials/instorage'
import logistics from '@/views/materials/logistics'
import Materialgoods from '@/views/materials/Materialgoods'
import SystemColumn from '@/views/system/SystemColumn'
import SystemRole from '@/views/system/SystemRole'
import SystemStaff from '@/views/system/SystemStaff'
import SystemUnit from '@/views/system/SystemUnit'
import BookList from '@/views/book/BookList'
import SortEnterPool from '@/views/sort/SortEnterPool'
import SortComePool from '@/views/sort/SortComePool'
import SortOrpack from '@/views/sort/SortOrpack'
import SortUnpack from '@/views/sort/SortUnpack'
import SortComeEnterPool from '@/views/sort/SortComeEnterPool'
import SortRepertory from '@/views/sort/SortRepertory'
import SortOrpackSelect from '@/views/sort/SortOrpackSelect'
import SortAbnormal from '@/views/sort/SortAbnormal'
import SortMake from '@/views/sort/SortMake'


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
            path: '/sort/SortEnterPool',
            name: 'SortEnterPool',
            component: SortEnterPool
       },
       {
            path: '/sort/SortComePool',
            name: 'SortComePool',
            component: SortComePool
       },
       {
            path: '/sort/SortOrpack',
            name: 'SortOrpack',
            component: SortOrpack
       },
       {
            path: '/sort/SortUnpack',
            name: 'SortUnpack',
            component: SortUnpack
       },
       {
            path: '/sort/SortComeEnterPool',
            name: 'SortComeEnterPool',
            component: SortComeEnterPool
       },
       {
            path: '/sort/SortRepertory',
            name: 'SortRepertory',
            component: SortRepertory
       },
       {
            path: '/sort/SortOrpackSelect',
            name: 'SortOrpackSelect',
            component: SortOrpackSelect
       },
       {
            path: '/sort/SortAbnormal',
            name: 'SortAbnormal',
            component: SortAbnormal
       },
       {
            path: '/sort/SortMake',
            name: 'SortMake',
            component: SortMake
       }

     ]
   }
 ],

})
