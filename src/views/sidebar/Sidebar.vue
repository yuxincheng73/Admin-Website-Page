<template>
  <div class="nav-sidebar" >
    <nav class="sidebar">
      <div class="profile-wrapper">
        <div class="profile-user">
          <div class="profile-userimage">
            <img src="../../../public/fb.jpg" alt="">
          </div>
          <div class="profile-userinformation">
            <span>
              <p style="font-weight: bold; display: inline-block;">{{ user[0].name }}</p>
              <a
              href="javascript:;"
              style="color: #fff;"
              @click="showUserInformation"
              data-toggle="collapse"
              data-target=".profile-content">
                <i class="fas fa-chevron-right"></i>
              </a>
            </span>
            <p>{{ user[0].job }}</p>
          </div>
        </div>
        <div class="profile-content collapse">
          <div class="profile-content-overview">
            <router-link to="#" class="nav-link" @click="$event.target.classList.toggle('active')">Overview</router-link>
          </div>
          <div class="profile-content-settings">
            <router-link to="#" class="nav-link" @click="$event.target.classList.toggle('active')">Settings</router-link>
          </div>
          <div class="profile-content-help">
            <router-link to="#" class="nav-link" @click="$event.target.classList.toggle('active')">Help</router-link>
          </div>
        </div>
      </div>
      <ul class="nav flex-column list-unstyled">
        <helper-sidebar v-for="(menuItem, index) in mainMenu" :key="index" :menuItem="menuItem" />
      </ul>
    </nav>
  </div>
</template>

<script>
import HelperSidebar from './Helper-Sidebar.vue';

export default {
  name: 'sidebar',
  components: {
    'helper-sidebar': HelperSidebar,
  },
  data() {
    return {
      mainMenu: [
        { id: 'dashboard', name: 'Dashboard', url: '/admins/dashboard' },
        { id: 'to-be-continued', name: 'To Be Checked', url: '/admins/to-be-checked' },
        { id: 'startups', name: 'Startups', url: '/admins/startups' },
        { id: 'events', name: 'Events', url: '/admins/events' },
        {
          id: 'Manage-users',
          name: 'ManageUsers',
          url: '#',
          children: [
            { id: 'users', name: 'Users', url: '/admins/users' },
            { id: 'talents', name: 'Talents', url: '/admins/users?type=talents' },
            { id: 'admins', name: 'admins', url: '/admins/users?type=admin' },
          ],
        },
        {
          id: 'Social',
          name: 'Social',
          url: '#',
          children: [
            { id: 'impressions', name: 'Impressions', url: '/admins/impressions' },
            { id: 'email-ads', name: 'Email Ads', url: '/admins/email-ads' },
            { id: 'edms', name: 'Edms', url: '/admins/edms' },
          ],
        },
      ],
      user: [{ id: 'bobby-lo', name: 'Bobby Lo', job: 'Frontend Developer' }],
      isUserInformationShown: false,
    };
  },
  methods: {
    showUserInformation() {
      this.isUserInformationShown = !this.isUserInformationShown;
      if (this.isUserInformationShown) {
        window.$('.fa-chevron-right').addClass('fa-chevron-rotate');
      } else {
        window.$('.fa-chevron-right').removeClass('fa-chevron-rotate');
      }
    },
  },
};
</script>

