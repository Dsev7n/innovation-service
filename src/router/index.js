import Vue from 'vue'
import Router from 'vue-router'
import Project from '../components/company/project/project.vue'
import ProjectPublish from '../components/company/project/project-publish.vue'
import ProjectMy from '../components/company/project/project-my.vue'
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
    {path: '/project/company/publish', component: ProjectPublish},
    {path: '/project/my', component: ProjectMy},
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
