import Vue from 'vue'
import Router from 'vue-router'
import patentApply from '@/components/patentApply/patentApply'
import login from '@/components/login/login'
import forgetPassword from '@/components/login/forgetPassword'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
    },
    {
      path: '/patentApply',
      name:'patent-apply',
      component:patentApply
    },
    {
      path: '/login',
      name:'login',
      component:login
    },
    {
      path: '/forgetPassword',
      name:'forget_password',
      component:forgetPassword
    },
  ]
})
