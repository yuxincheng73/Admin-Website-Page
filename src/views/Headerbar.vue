<template>
  <nav class="navbar navbar-dark bg-dark navbar-expand-lg navbar-right">
    <div class="navbar-brand-wrapper mr-auto">
      <div id="menu-bar" class="navbar-brand" style="vertical-align: middle;" >
        <i class="fas fa-bars" @click="toggleSidebar" style="font-size: 30px; cursor: pointer;"></i>
      </div>
      <router-link to="/" class="navbar-brand" style="vertical-align: middle;">
        <img src="../../public/whub.png" alt="" width="125">
      </router-link>
    </div>
    <div class="searchbar">
      <form class="form-inline">
        <input type="search" class="form-control" placeholder="Search" @keyup.enter="search" >
        <button type="submit" class="btn" style="background-color: #343a40;">
          <i class="fas fa-search" style="color: #a52727; font-size: 20px;"></i>
        </button>
      </form>
    </div>
  </nav>
  <!-- </div> -->
</template>

<script>
export default {
  name: 'header-bar',
  props: ['isSidebarHidden'],
  mounted() {
    this.toggleSidebar();
  },
  data() {
    return {
      isSidebarHiddenClone: '',
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarHiddenClone = !this.isSidebarHidden;
      this.$emit('sidebarToggled', this.isSidebarHiddenClone);
    },
    search() {
    },
  },
};
</script>
