<template>
  <div class="manage-startup-new">
    <div class="row">
      <div class="col-12">
        <div class="wizard-center">
          <div class="col-9">
            <div class="wizard-header">
              <div class="row">
                <ul class="wizard-header-list">
                  <li class="wizard-header-first active">
                    <div>Startup Name</div>
                  </li>
                  <li class="wizard-header-second">
                    <div>Startup Logo</div>
                  </li>
                  <li class="wizard-header-third">
                    <div>Startup Basic Information</div>
                  </li>
                  <li class="wizard-header-fourth">
                    <div>Startup Stage</div>
                  </li>
                  <li class="wizard-header-fifth">
                    <div>Startup Description</div>
                  </li>
                  <li class="wizard-header-sixth">
                    <div>Startup Product</div>
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
                    <component :is="currentComponent" :startup="startup" @updateWizard="updateWizard" />
                  </transition>
                  <transition name="fade">
                    <button class="wizard-back btn btn-danger float-left" @click="back" v-if="step > 1">Back</button>
                  </transition>
                  <transition name="fade">
                    <button class="wizard-next btn btn-danger float-right" @click="next" v-if="step < lastStep">Next</button>
                  </transition>
                  <transition name="fade">
                    <button class="wizard-submit btn btn-danger float-right" @click="postStartup" v-if="step >= lastStep">Submit</button>
                  </transition>
                </div>
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
  name: 'manage-startup-new',
  data() {
    return {
      step: 1,
      lastStep: 6,
      startup: {},
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
      window.$(`.wizard-header-list li:nth-child(${this.step})`).addClass('active');

      if (this.step === this.lastStep) {
        this.step = this.lastStep;
      }
    },
    back() {
      this.step--;
      window.$(`.wizard-header-list li:nth-child(${this.step})`).removeClass('active');

      if (this.step < 1) {
        this.step = 1;
      }
    },
    postStartup() {
      axios({
        method: 'POST',
        data: {
          ...this.startup,
        },
        url: '',
      }).then((response) => {
        this.$store.dispatch('postData', { data: response.data.data, resourceName: 'currentStartup' });
        this.$router.push(`/manage/startups/${response.data.data.id}`);
      });
    },
    updateWizard(data) {
      this.startup = data;
    },
  },
};
</script>
