<template>
  <div class="manage-jobs-applications">
    <div class="row">
      <div class="col-12">

        <div v-for="(header, index) in headers" :key="index" class="col-2" style="display: inline-block;">
          <div>
            <h5>{{ header }}</h5>
          </div>
          <draggable :options="{ group: 'applicants' }" @start="drag = true" @end="drag = false" >
            <div class="card">
              <div class="card-body">

              </div>
            </div>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  name: 'manage-jobs-applications',
  components: {
    draggable,
  },
  mounted() {
    this.getJobApplications();
  },
  data() {
    return {
      baseUrl: '',
      headers: ['New', 'Reviewed', 'Scheduled', 'Interviewing', 'Offer Made', 'Hired', 'rejected'],
      jobApps: [],
      new: [],
    };
  },
  computed: {
    jobApplications() {
      return this.$store.getters.jobApplications;
    },
  },
  watch: {
    jobApplications: {
      handler(n) {
        this.jobApps = n;
        this.new = window.$.map(this.jobApps, (element) => {
          if (element === 'new') {
            return element;
          }
        });
      },
      deep: true,
    },
  },
  methods: {
    getJobApplications() {
      this.$store.dispatch('getJobApplications', { startup_id: this.$route.params.startup_id, url: this.baseUrl, resourceName: 'jobApplications' });
    },
  },
};
</script>
