<template>
  <div class="wizard-step-5">
    <div class="form-group">
      <label for="">Your Startup Tagline / in short</label>
      <input type="text" v-model="copyStartup.tagline" class="form-control" placeholder="Describe your products/services in less than a tweet! - max 120 characters">
    </div>
    <div class="form-group">
      <div>Passion</div>
      <textarea v-model="copyStartup.mission" name="" id="" cols="30" rows="10" placeholder="Your mission & beliefs, tell the whubbers your story..."></textarea>
    </div>
  </div>
</template>

<script>
export default {
  name: 'wizard-step-5',
  props: ['startup'],
  data() {
    return {
      copyStartup: { ...this.startup },
    };
  },
  watch: {
    copyStartup: {
      handler(n) {
        this.copyStartup = n;
        this.updateWizard();
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    updateWizard() {
      this.$emit('updateWizard', this.copyStartup);
    },
  },
};
</script>
