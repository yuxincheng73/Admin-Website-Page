<template>
  <div class="manage-jobs-new">
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
              <!-- <div class="col-4 wizard-header-first">
                <div class="wizard-circle mx-auto text-center active">
                  <i class="fas fa-user fa-lg"></i>
                </div>
              </div>
              <div class="col-4 wizard-header-second">
                <div class="wizard-circle mx-auto text-center active">
                  <i class="fas fa-clipboard-list fa-lg"></i>
                </div>
              </div>
              <div class="col-4 wizard-header-third">
                <div class="wizard-circle mx-auto text-center">
                  <i class="fas fa-grin-alt fa-lg"></i>
                </div>
              </div> -->
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="wizard-body">
                <transition name="fade">
                  <component :is="currentComponent" :wizardData="wizardData" @updateWizard="updateWizard" />
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
  name: 'manage-jobs-new',
  data() {
    return {
      step: 1,
      lastStep: 3,
      wizardData: {},
      lol: false,
    };
  },
  computed: {
    currentComponent() {
      this.step;
      return () => import(`./WizardStep${this.step}.vue`);
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
    submit() {
      axios({
        method: 'POST',
        data: {
          ...this.wizardData,
        },
        url: `url not shown/${this.$route.params.startup_id}/jobs`,
      }).then((response) => {
        this.$store.dispatch('postData', { data: response.data.data, resourceName: 'currentJob' });
        this.$router.push(`/manage/startups/${this.$route.params.startup_id}/jobs/${response.data.data.id}`);
      });
    },
    updateWizard(data) {
      this.wizardData = data;
      console.log(this.wizardData);
    },
  },
};
</script>
