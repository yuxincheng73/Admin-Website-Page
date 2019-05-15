<template>
  <div class="wrapper-admin">
    <div class="overlay"></div>
    <div class="container-fluid px-0">
      <header-bar :isSidebarHidden="isSidebarHidden" @sidebarToggled="toggledSidebar"/>
    </div>
    <div class="container-fluid px-0">
      <div class="row">
        <div class="col-2 pr-0 sidebar-wrapper">
          <side-bar :isSidebarHidden="isSidebarHidden"/>
        </div>
        <div class="col-10 content-wrapper">
          <div class="container">
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Headerbar from './Headerbar.vue';
import Sidebar from './sidebar/Sidebar.vue';

export default {
  name: 'wrapperadmin',
  components: {
    'side-bar': Sidebar,
    'header-bar': Headerbar,
  },
  data() {
    return {
      isSidebarHidden: false,
    };
  },
  methods: {
    toggledSidebar(data) {
      this.isSidebarHidden = data;
      if (this.isSidebarHidden) {
        window.$('.sidebar-wrapper').toggleClass('toggle-sidebar');
        window.$('.overlay').hide();
        window.$('.content-wrapper').removeClass('col-10');
        window.$('.content-wrapper').addClass('col-12');
      } else {
        window.$('.sidebar-wrapper').toggleClass('toggle-sidebar');
        window.$('.overlay').show();
        window.$('.content-wrapper').removeClass('col-12');
        window.$('.content-wrapper').addClass('col-10');
      }
    },
  },
};
</script>
