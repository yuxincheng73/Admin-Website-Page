<template>
  <div class="wizard-step-3">
    <div class="form-group">
      <label for="">Team Size</label>
      <select v-model="copyStartup.company_size" class="custom-select">
        <option selected>Select your team size</option>
        <option v-for="(teamSize, index) in teamSizes" :key="index">{{ teamSize }}</option>
      </select>
    </div>
    <div class="form-group">
      <label for="">Industry</label>
      <select v-model="copyStartup.industry" class="custom-select">
        <option selected>Select your startup industry</option>
        <option v-for="(industry, index) in industries" :key="index">{{ industry }}</option>
      </select>
    </div>
    <div class="form-group">
      <label for="">Year Founded In</label>
      <select v-model="copyStartup.year_founded" class="custom-select">
        <option selected>Select the year your startup was founded</option>
        <option v-for="(year, index) in years" :key="index">{{ year }}</option>
      </select>
    </div>
    <div class="form-group">
      <label for="">Country Founded In</label>
      <select v-model="copyStartup.country_founded" class="custom-select">
        <option selected>Select the country your startup was founded</option>
        <option v-for="(country, index) in countries" :key="index">{{ country }}</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'wizard-step-3',
  props: ['startup'],
  data() {
    return {
      copyStartup: {},
      teamSizes: ['1', '2-5', '6-10', '11-20', '21-50', '50+'],
      industries: ['Advertising, Content/Media', 'Big Data'],
      years: ['2018', '2017', '2016', '2015'],
      countries: ['Canada', 'China', 'Hong Kong'],
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
