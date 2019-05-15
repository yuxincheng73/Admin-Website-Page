<template>
  <div class="modal fade" id="modal-jobs" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Edit Job</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="formGroupExampleInput">Job Title</label>
            <input type="text" v-model="job.title" class="form-control" placeholder="Job title" id="job-title">
          </div>
          <div class="form-group">
            <label for="formGroupExampleInput">Slug</label>
            <input type="text" class="form-control" placeholder="Job slug" id="job-slug">
          </div>
          <div class="text-center">
            <router-link to="#"><button type="button" class="btn btn-danger">Manage Job</button></router-link>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary modal-submit" data-dismiss="" @click="postEditJob">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'jobs-edit',
  props: ['job', 'pagination'],
  data() {
    return {
      search: '',
    };
  },
  methods: {
    postEditJob() {
      axios({
        method: 'PUT',
        data: this.job,
        url: `url not shown/${this.job.id}`,
      }).then((response) => {
        this.$store.dispatch('updateData', { data: response.data.data, resourceName: 'jobs' });
        this.$router.push(`/admins/jobs?page=${this.pagination.currentPage}`);
      });
      window.$('.modal-submit').attr('data-dismiss', 'modal');
    },
  },
};
</script>
