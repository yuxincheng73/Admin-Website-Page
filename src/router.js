import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import WrapperAdmin from './views/WrapperAdmin.vue';
import Dashboard from './views/Dashboard.vue';
import Startups from './views/startups/Startups.vue';
import Jobs from './views/jobs/Jobs.vue';
import Events from './views/events/Events.vue';
import EventNew from './views/events/New.vue';
import Users from './views/users/Users.vue';
import Talent from './views/users/talent/Talent.vue';
import Ads from './views/ads/Ads.vue';
import AdNew from './views/ads/New.vue';
import WrapperManage from './views/manage/WrapperManage.vue';
import ManageJobs from './views/manage/jobs/ManageJobs.vue';
import ManageJobNew from './views/manage/jobs/ManageJobNew.vue';
import ManageJobEdit from './views/manage/jobs/ManageJobEdit.vue';
import ManageJobApplications from './views/manage/jobs/ManageJobApplications.vue';
import ManageStartupEdit from './views/manage/startups/ManageStartupEdit.vue';
import ManageStartupNew from './views/manage/startups/ManageStartupNew.vue';
import ViewStartup from './views/view/startups/Startup.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/admins',
      component: WrapperAdmin,
      children: [
        {
          path: '',
          name: 'dashboard',
          component: Dashboard,
        },
        {
          path: 'startups',
          name: 'startups',
          component: Startups,
        },
        {
          path: 'jobs',
          name: 'jobs',
          component: Jobs,
        },
        {
          path: 'events',
          name: 'events',
          component: Events,
        },
        {
          path: 'events/new',
          name: 'events-new',
          component: EventNew,
        },
        {
          path: 'users',
          name: 'users',
          component: Users,
        },
        {
          path: 'talent',
          name: 'talent',
          component: Talent,
        },
        {
          path: 'ads',
          name: 'ads',
          component: Ads,
        },
        {
          path: 'ads/new',
          name: 'adnew',
          component: AdNew,
        },
      ],
    },
    {
      path: '/manage',
      component: WrapperManage,
      children: [
        {
          path: 'startups/new',
          name: 'manage-startup-new',
          component: ManageStartupNew,
        },
        {
          path: 'startups/:startup_id/edit',
          name: 'manage-startup-edit',
          component: ManageStartupEdit,
        },
        {
          path: 'startups/:startup_id/jobs',
          name: 'manage-jobs',
          component: ManageJobs,
        },
        {
          path: 'startups/:startup_id/jobs/new',
          name: 'manage-jobs-new',
          component: ManageJobNew,
        },
        {
          path: 'startups/:startup_id/jobs/:id/edit',
          name: 'manage-jobs-edit',
          component: ManageJobEdit,
        },
        {
          path: 'startups/:startup_id/job_applications',
          name: 'manage-jobs-applications',
          component: ManageJobApplications,
        },
      ],
    },
    {
      path: '/startups/:startup_id',
      name: 'view-startup',
      component: ViewStartup,
    },
  ],
});
