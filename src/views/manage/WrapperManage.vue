<template>
  <div class="wrapper-manage">
    <div class="container-fluid px-0">
      <header-bar />
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Headerbar from './Headerbar.vue';

export default {
  name: 'wrapper-manage',
  components: {
    'header-bar': Headerbar,
  },
};
</script>
