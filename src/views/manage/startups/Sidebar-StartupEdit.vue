<template>
  <div class="manage-startup-sidebar">
    <div class="button-wrapper">
      <a href="javascript:;" @click="toggleSidebar" class="text-center">
        <i class="fas fa-angle-double-right"></i>
      </a>
    </div>
    <div class="col-12">
      <div class="text-center">
        <h5>Color Palette</h5>
      </div>
      <div class="text-center">
        <chrome-picker v-model="color" @input="updateColor" class="mx-auto"/>
      </div>
    </div>
  </div>
</template>

<script>
import { Chrome } from 'vue-color';

export default {
  name: 'manage-jobs-sidebar',
  props: ['sidebarOpen'],
  components: {
    'chrome-picker': Chrome,
  },
  data() {
    return {
      copySidebarOpen: this.sidebarOpen,
      color: {},
    };
  },
  methods: {
    toggleSidebar() {
      this.copySidebarOpen = !this.copySidebarOpen;
      this.$emit('toggleSidebar', this.copySidebarOpen);
    },
    updateColor() {
      this.$emit('updateColor', this.color.hex);
    },
  },
};
</script>
