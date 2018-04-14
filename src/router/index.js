import Vue from 'vue'
import Router from 'vue-router'

import ProjectCompany from '../components/company/project/project-company.vue'
import ProjectCompanyPublish from '../components/company/project/project-company-publish.vue'
import ProjectCompanyCheckout from '../components/company/project/project-company-checkout.vue'
import ProjectStage from '../components/company/project/project-stage.vue'
import ProjectFile from '../components/company/project/project-file.vue'

import Project from '../components/company/project.vue'

import Patent from '../components/company/patent.vue'
import Resume from '../components/company/resume.vue'

import patentApply from '@/components/patentApply/patentApply'
import login from '@/components/login/login'
import forgetPassword from '@/components/login/forgetPassword'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {path: '/project/company', component: ProjectCompany, alias: '/'},
    {path: '/project/company/publish', component: ProjectCompanyPublish},
    {path: '/project/user/checkout', component: ProjectCompanyCheckout},
    {path: '/project/stage', component: ProjectStage},
    {path: '/project/file', component: ProjectFile},
    {
      path: '/patent',
      name: 'patent',
      component: Patent
    },
    {
      path: '/resume',
      name: 'resume',
      component: Resume
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
    }
  ]
})
