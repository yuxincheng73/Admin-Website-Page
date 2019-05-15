<template>
  <div class="manage-jobs-edit">
    <div class="row wizard-center">
      <div class="col-9">
        <div class="card card-body">
          <div class="wizard-header">
            <div class="row">
              <ul class="wizard-header-list">
                <li class="wizard-header-first active">
                  <div>Job Prospects</div>
                </li>
                <li class="wizard-header-second">
                  <div>Job Details</div>
                </li>
                <li class="wizard-header-third">
                  <div>WHubber Factors</div>
                </li>
              </ul>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="wizard-body">
                <button @click="lol">TEST</button>
                <transition name="fade">
                  <component :is="nextComponent" :wizardData="wizardData" @updateWizard="updateWizard" />
                </transition>
                <button class="btn btn-danger float-left" @click="back">Back</button>
                <button class="btn btn-danger float-right" @click="next">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'manage-jobs-edit',
  mounted() {
    this.getJob();
  },
  data() {
    return {
      step: 1,
      lastStep: 3,
      wizardData: {},
    };
  },
  computed: {
    currentJob() {
      return this.$store.getters.currentJob;
    },
    nextComponent() {
      this.step;
      return () => import(`./WizardStep${this.step}.vue`);
    },
  },
  watch: {
    currentJob: {
      handler(n) {
        this.wizardData = n;
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    next() {
      this.step++;
      window.$(`li:nth-child(${this.step})`).addClass('active');

      if (this.step === this.lastStep) {
        this.submit();
      }
    },
    back() {
      window.$(`li:nth-child(${this.step})`).removeClass('active');
      this.step--;
    },
    getJob() {
      this.$store.dispatch('getStartupJob', { startup_id: this.$route.params.startup_id, url: this.$route.params.baseUrl, resourceName: 'currentJob', id: this.$route.params.id });
    },
    submit() {
      axios({
        method: 'PUT',
        data: {
          ...this.wizardData,
        },
        url: `url not shown/${this.$route.params.startup_id}/jobs/${this.$route.params.id}`,
      }).then((response) => {
        this.$store.dispatch('updateData', { data: response.data.data, resourceName: 'currentJob' });
        this.$router.push(`/manage/startups/${this.$route.params.startup_id}/jobs/${this.$route.params.id}`);
      });
    },
    updateWizard(data) {
      this.wizardData = data;
      console.log(this.wizardData);
    },
    lol() {
      console.log(this.wizardData);
    },
  },
};
</script>
