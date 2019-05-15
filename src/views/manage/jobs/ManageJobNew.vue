<template>
  <div class="manage-jobs-new">
    <div class="row">
      <transition name="slide-sidebar" mode="out-in">
        <sidebar-jobs v-if="sidebarOpen" :sidebarOpen="sidebarOpen" @toggleSidebar="toggleSidebar" @updateColor="updateColor" />
      </transition>
      <div class="col-12 px-0">
        <div class="manage-jobs-new-header" >
          <div class="form-group col-8">
            <input type="text" v-model="editableText.title" class="form-control job-title" placeholder="Job Title">
          </div>
          <div class="col-9">
            <div class="form-inline">
              <div class="form-group col-6 pl-0">
                <i class="fas fa-map-pin"></i>
                <input type="text" v-model="editableText.location" class="form-control" placeholder="District, City, Province/State, Country">
              </div>
              <div class="form-group col-3">
                <i class="fas fa-file-signature"></i>
                <input type="text" v-model="editableText.job_type" class="form-control" placeholder="Job Type">
              </div>
              <div class="form-group col-3">
                <i class="fas fa-calendar-alt"></i>
                <input type="text" v-model="editableText.created_at" class="form-control" placeholder="Start Date">
              </div>
            </div>
          </div>
          <div class="form-group col-3">
            <button class="btn btn-danger apply">Apply Now</button>
          </div>
        </div>
        <div class="manage-jobs-new-sidebar">
          <a href="javascript:;" @click="sidebarOpen = !sidebarOpen"><i class="fas fa-palette"></i></a>
        </div>
        <div class="manage-jobs-new-body">
          <div class="col-9 mx-auto">
            <div class="card">
              <div class="card-body">
                <form>
                  <div class="row">
                    <div class="col-6">
                      <div class="row">
                        <div class="col-2">
                          <div class="text-center">
                            <div class="circle-border">
                              <i class="fas fa-briefcase"></i>
                            </div>
                          </div>
                        </div>
                        <div class="form-group col-10">
                          <label for="">Job Role</label>
                          <input type="text" class="form-control mx-auto" v-model="editableText.role" placeholder="Type here">
                        </div>
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="row">
                        <div class="col-2">
                          <div class="text-center">
                            <div class="circle-border">
                              <i class="fas fa-user-tie"></i>
                            </div>
                          </div>
                        </div>
                        <div class="form-group col-10">
                          <label for="">Employer</label>
                          <input type="text" class="form-control mx-auto" v-model="editableText.fullname_title" placeholder="Type here">
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-6">
                      <div class="row">
                        <div class="col-2">
                          <div class="text-center">
                            <div class="circle-border">
                              <i class="fas fa-dollar-sign"></i>
                            </div>
                          </div>
                        </div>
                        <div class="form-group col-10">
                          <label for="">Salary</label>
                          <input type="text" class="form-control mx-auto" v-model="editableText.monthlysalary" placeholder="Type here">
                        </div>
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="row">
                        <div class="col-2">
                          <div class="text-center">
                            <div class="circle-border">
                              <i class="fas fa-coins"></i>
                            </div>
                          </div>
                        </div>
                        <div class="form-group col-10">
                          <label for="">Equity</label>
                          <input type="text" class="form-control mx-auto" v-model="editableText.equity" placeholder="Type here">
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div class="card">
              <div class="card-body">
                <div class="form-group">
                  <label for="">Job Description</label>
                  <textarea name="" id="" cols="30" rows="10" class="form-control mx-auto" placeholder="Write your job description here..."></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="manage-jobs-post">
          <button @click="postJob" class="btn btn-danger">Post Job</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import DatePicker from 'vue2-datepicker';
import Sidebar from './Sidebar-JobNew.vue';

export default {
  name: 'manage-jobs-new',
  components: {
    'sidebar-jobs': Sidebar,
  },
  data() {
    return {
      editableText: { background_color: '', title: '', location: '', job_type: '', created_at: '', description: '' },
      sidebarOpen: false,
    };
  },
  methods: {
    toggleSidebar(data) {
      this.sidebarOpen = data;
    },
    updateColor(data) {
      this.editableText.background_color = data;
      window.$('.manage-jobs-new-header').css('background-color', data);
    },
    postJob() {
      axios({
        method: 'POST',
        data: {
          ...this.editableText,
        },
        url: `url not shown/${this.$route.params.startup_id}/jobs`,
      }).then((response) => {
        this.$store.dispatch('postData', { data: response.data.data, resourceName: 'currentJob' });
        this.$router.push(`/manage/startups/${this.$route.params.startup_id}/jobs/${response.data.data.id}`);
      });
    },
  },
};
</script>
