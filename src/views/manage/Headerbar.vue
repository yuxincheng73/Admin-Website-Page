<template>
  <div class="manage-headerbar">
    <nav class="navbar navbar-light bg-light navbar-expand-lg">
      <router-link to="/" class="navbar-brand">
        <img src="../../../public/whub.png" alt="" width="125">
      </router-link>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="#">Startups</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="#">Jobs</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="#">Talent</router-link>
          </li>
          <li class="nav-item dropdown">
            <router-link class="nav-link dropdown-toggle" to="#" id="navbar-jobfairs" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Job Fairs
            </router-link>
            <div class="dropdown-menu" aria-labelledby="navbar-jobfairs">
              <router-link class="dropdown-item" to="#">May 2018</router-link>
            </div>
          </li>
          <li class="nav-item dropdown">
            <router-link class="nav-link dropdown-toggle" to="#" id="navbar-events" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Job Fairs
            </router-link>
            <div class="dropdown-menu" aria-labelledby="navbar-events">
              <router-link class="dropdown-item" to="#">Full Calendar</router-link>
              <router-link class="dropdown-item" to="#">RISEConf 2018</router-link>
            </div>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="#">Resources</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="#">Blog</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'manage-headerbar',
};
</script>
