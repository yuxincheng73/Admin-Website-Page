<template>
  <div class="wizard-step-1">
    <div class="form-group">
      <label for="formGroupExampleInput">Startup Name</label>
      <input type="text" v-model="copyStartup.name" class="form-control" placeholder="Startup Name">
    </div>
    <div class="form-group">
      <label for="formGroupExampleInput">Website</label>
      <input type="text" v-model="copyStartup.website" class="form-control" placeholder="Startup Name">
    </div>
    <div class="form-group">
      <label for="formGroupExampleInput">Phone</label>
      <input type="text" v-model="copyStartup.phone" class="form-control" placeholder="Startup Name">
    </div>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';

export default {
  name: 'wizard-step-1',
  props: ['startup'],
  components: {
    DatePicker,
  },
  data() {
    return {
      copyStartup: { ...this.startup },
    };
  },
  watch: {
    copyStartup: {
      handler(n) {
        this.copyStartup = n;
        console.log(this.copyStartup);
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
