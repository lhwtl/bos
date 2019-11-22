import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import resign from '@/components/resign'
import Main from '@/components/Main'
import SystemColumn from '@/views/system/SystemColumn'
import Home from '@/views/system/Home'

import BasisFiles from '@/views/essentialdata/BasisFiles'
import PickAStandard from '@/views/essentialdata/PickAStandard'
import TrainSet from '@/views/essentialdata/TrainSet'
import DispatchTime from '@/views/essentialdata/DispatchTime'

import ManagementArea from '@/views/essentialdata/ManagementArea'




/*ts*/





/* import Home1 from wertyuixcvghj'@/views/system/Home1'
import Home2 from '@/views/system/Home2'
import Home3 from '@/views/system/Home3' */
Vue.use(Router)

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
            path: '/essentialdata/BasisFiles',
            name: 'BasisFiles',
            component: BasisFiles
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
           path: '/essentialdata/DispatchTime',
           name: 'DispatchTime',
           component: DispatchTime
      },
      {
           path: '/essentialdata/ManagementArea',
           name: 'ManagementArea',
           component: ManagementArea
      }

/*      {path:'/system/Home1',name:'Home1',component:Home1},
       {path:'/system/Home2',name:'Home2',component:Home2},
       {path:'/system/Home3',name:'Home3',component:Home3}, */
     ]
   },

 ],

})
