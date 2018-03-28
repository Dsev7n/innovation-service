import Vue from 'vue'
import Router from 'vue-router'
import Project from '../components/company/project.vue'
import Patent from '../components/company/patent.vue'
import Resume from '../components/company/resume.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/project',
      name: 'project',
      component: Project,
      alias: '/'
    },
    {
      path: '/patent',
      name: 'patent',
      component: Patent
    },
    {
      path: '/resume',
      name: 'resume',
      component: Resume
    }
  ]
})
