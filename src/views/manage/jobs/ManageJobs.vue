<template>
  <div class="manage-jobs">
    <div class="row">
      <div class="col-12">
        <ul class="manage-jobs-nav list-unstyled">
          <li class="float-left pl-0">
            <div class="input-group mb-3">
              <v-select label="name"
                        :filterable="false"
                        :options="searchedJobs"
                        @search="onSearch"
                        id="startup-name">
                <template slot="no-options">
                  Search Jobs
                </template>
                <template slot="option" slot-scope="job">
                  <div class="d-center">
                    {{ job.title }}
                    </div>
                </template>
                <template slot="selected-option" scope="job">
                  <i class="fas fa-search"></i>
                  <div class="selected d-center">
                    {{ job.title }}
                  </div>
                </template>
              </v-select>
              <div class="input-group-append">
                <button class="input-group-text">
                  <i class="fas fa-search mx-0"></i>
                </button>
              </div>
            </div>
          </li>
          <li>
            <router-link :to="{ name: 'manage-jobs-new', params: { startup_id: startupId }}">
              <button class="btn btn-primary" type="button">
                <i class="fas fa-plus"></i>
                Post Job
              </button>
            </router-link>
          </li>
          <li class="pr-0">
            <button class="btn btn-light" type="button" id="manage-jobs-sort" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i class="fas fa-align-right"></i>
              Sort
            </button>
            <div class="dropdown-menu" aria-labelledby="manage-jobs-sort">
              <a class="dropdown-item active" href="#">None</a>
              <a class="dropdown-item" href="#">Date Created</a>
              <a class="dropdown-item" href="#">Title</a>
            </div>
          </li>
        </ul>
        <table class="table table-hover" id="table-startups">
          <thead>
            <tr>
              <th v-for="(header, index) in tableHeaders" :key="index">
                {{ header }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(job, index) in jobs" :key="index" data-toggle="side-view">
              <td>{{ job.id }}</td>
              <td>{{ job.created_at | moment("dddd, MMMM Do YYYY") }}</td>
              <td>
                <router-link :to="{ name: 'jobs-show', params: { startup_id: startupId, id: job.id }}">{{ job.title }}</router-link>
              </td>
              <td>{{ job.applications }}</td>
              <td>
                <button class="btn btn-success" v-if="job.is_active" @click="updateActive(job)">Activate</button>
                <button class="btn btn-danger" v-if="!job.is_active" @click="updateActive(job)">Deactivate</button>
              </td>
              <td>
                <button class="btn btn-danger" v-if="job.is_sponsored" @click="updateSponsored(job)">Unsponsor</button>
                <button class="btn btn-success" v-if="!job.is_sponsored" @click="updateSponsored(job)">Sponsor</button>
              </td>
              <td>
                <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown">Actions</button>
                <div class="dropdown-menu">
                  <router-link :to="{ name: 'manage-jobs-edit', params: { startup_id: startupId, baseUrl: baseUrl, id: job.id }}" class="dropdown-item" v-show="job !== expireLink">Edit</router-link>
                  <a href="javascript:;" @click="expire(job)" class="dropdown-item">
                    Expire
                  </a>
                  <a href="javascript:;" @click="deleteRow(job)" class="dropdown-item">
                    Delete
                  </a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'manage-jobs',
  mounted() {
    this.getJobs();
  },
  data() {
    return {
      tableHeaders: ['Views', 'Date Created', 'Job Title', '# of Applications', 'Active', 'Sponsor', 'Actions'],
      baseUrl: '',
      jobs: [],
      startupId: this.$route.params.startup_id,
      expireLink: null,
      searchedJobs: [],
    };
  },
  computed: {
    currentJobs() {
      return this.$store.getters.currentJobs;
    },
  },
  watch: {
    currentJobs: {
      handler(n) {
        this.jobs = n;
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    getJobs() {
      this.$store.dispatch('getStartupJobs', { id: this.$route.params.startup_id, url: this.baseUrl, resource: 'jobs', resourceName: 'currentJobs' });
    },
    update(job) {
      axios({
        method: 'PUT',
        data: job,
        url: `${this.baseUrl}/${this.$route.params.startup_id}/jobs/${job.id}`,
      }).then((response) => {
        this.$store.dispatch('updateData', { data: response.data.data, resourceName: 'currentJobs' });
      });
    },
    updateActive(job) {
      job.is_active = !job.is_active;
      this.update(job);
    },
    updateSponsored(job) {
      job.is_sponsored = !job.is_sponsored;
      this.update(job);
    },
    deleteRow(j) {
      axios({
        method: 'DELETE',
        url: `${this.baseUrl}/${this.$route.params.startup_id}/jobs/${j.id}`,
      });
    },
    expire(j) {
      this.expireLink = j;
    },
    searchByJobs(loading, query) {
      axios({
        method: 'GET',
        url: `url not shown?q=${query}`,
      }).then((response) => {
        this.searchedStartups = response.data.data.startups;
        loading(false);
      });
    },
    onSearch(search, loading) {
      loading(true);
      this.searchByJobs(loading, search);
    },
  },
};
</script>
