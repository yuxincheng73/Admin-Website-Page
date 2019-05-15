<template>
  <div class="jobs">
    <div class="row">
      <div class="col-12">
        <h1 class="page-header">Jobs</h1>
        <div class="row">
          <div class="col-8">
            <pagination-index :pagination="pagination"/>
          </div>
          <div class="col-4">
            <div class="row">
              <div class="input-group mb-3">
                <div class="col-10 px-0">
                  <v-select label="title"
                            :filterable="false"
                            :options="searchedJobs"
                            @search="onSearch"
                            id="job-title">
                    <template slot="no-options">
                      Find Job Title and Slug
                    </template>
                    <template slot="option" slot-scope="job">
                      <div class="d-center">
                        {{ job.title }}
                        </div>
                    </template>
                    <template slot="selected-option" scope="job">
                      <div class="selected d-center">
                        {{ job.title }}
                      </div>
                    </template>
                  </v-select>
                </div>
                <div class="input-group-append col-2 pl-0">
                  <button class="input-group-text w-100">
                    <i class="fas fa-search"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <table class="table table-hover" id="table-jobs">
          <thead>
            <tr>
              <th v-for="(header, index) in tableHeaders" :key="index">
                {{ header }}
              </th>
            </tr>
          </thead>
          <tbody class="table-bordered">
            <tr v-for="(job, index) in jobs" :key="index" data-toggle="side-view" :data-id="`#${job.id}`">
              <td>{{ job.ranking }}</td>
              <td>{{ job.created_at | moment("dddd, MMMM Do YYYY") }}</td>
              <td>{{ job.startup.name }}</td>
              <td>{{ job.title }}</td>
              <td>{{ job.applications }}</td>
              <td>
                <button class="btn btn-success" v-if="job.is_active" @click="updateActive(job)">Activate</button>
                <button class="btn btn-danger" v-if="!job.is_active" @click="updateActive(job)">Deactivate</button>
              </td>
              <td>
                <button class="btn btn-success" v-if="job.is_hidden" @click="updateHidden(job)">Show</button>
                <button class="btn btn-danger" v-if="!job.is_hidden" @click="updateHidden(job)">Hide</button>
              </td>
              <td>
                <button class="btn btn-danger" v-if="job.is_sponsored" @click="updateSponsored(job)">Unsponsor</button>
                <button class="btn btn-success" v-if="!job.is_sponsored" @click="updateSponsored(job)">Sponsor</button>
              </td>
              <td>
                <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown">Actions</button>
                <div class="dropdown-menu">
                  <a href="javascript:;" data-toggle="modal" data-target="#modal-jobs" @click="openModal(job)" class="dropdown-item">
                    Edit
                  </a>
                  <a href="javascript:;" @click="deleteRow(job)" class="dropdown-item">
                    Delete
                  </a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <jobs-edit :job="job" :pagination="pagination" />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import VueMoment from 'vue-moment';
import { query } from '../../services/query';
import Pagination from '../Pagination.vue';
import JobsEdit from './Edit.vue';

Vue.use(require('vue-moment'));

export default {
  name: 'jobs',
  components: {
    'pagination-index': Pagination,
    'jobs-edit': JobsEdit,
  },
  mounted() {
    query();
    this.setPageNumber(query);
    this.getJobs();
  },
  beforeRouteUpdate(to, from, next) {
    this.setPageNumber(to.query);
    this.getJobs();
    next();
  },
  data() {
    return {
      tableHeaders: ['Ranking', 'Date Created', 'Startup', 'Title', 'Applications', 'Active', 'Hidden', 'Sponsored', 'Actions'],
      baseUrl: '',
      pagination: { currentPage: '', lastPage: '', nextPage: '', previousPage: '', routerUrl: '/admins/jobs?page=' },
      searchedJobs: [],
      job: {},
    };
  },
  computed: {
    jobs() {
      return this.$store.getters.jobs;
    },
  },
  methods: {
    update(job) {
      axios({
        method: 'PUT',
        url: `${this.baseUrl}/${job.id}`,
        data: job,
      }).then((response) => {
        this.$store.dispatch('updateJob', response.data.data);
      });
    },
    setPageNumber(query) {
      const currentPage = parseInt(query.page, 10) || 1;
      this.pagination.currentPage = currentPage;
      this.pagination.nextPage = currentPage + 1;
      this.pagination.previousPage = currentPage - 1;
      this.$store.dispatch('getPagination', this.pagination);
    },
    getJobs() {
      this.$store.dispatch('getData', { url: this.baseUrl, resourceName: 'jobs' });
    },
    // getJobs() {
    //   axios({
    //     method: 'GET',
    //     url: `${this.baseUrl}?page=${this.pagination.currentPage}`,
    //   }).then((response) => {
    //     console.log(response.data.data);
    //     this.jobs = response.data.data.jobs;
    //     const splitLastPage = response.data.links.last.split('=');
    //     this.pagination.lastPage = splitLastPage[1];
    //   });
    // },
    openModal(j) {
      this.job = j;
      console.log(this.job);
    },
    deleteRow(j) {
      axios({
        method: 'DELETE',
        url: `url not shown/${j.id}`,
      });
    },
    updateActive(job) {
      job.is_active = !job.is_active;
      this.update(job);
    },
    updateHidden(job) {
      job.is_hidden = !job.is_hidden;
      this.update(job);
    },
    updateSponsored(job) {
      job.is_sponsored = !job.is_sponsored;
      this.update(job);
    },
    searchByJob(loading, query) {
      axios({
        method: 'GET',
        url: `url not shown?q=${query}`,
      }).then((response) => {
        this.searchedJobs = response.data.data.jobs;
        loading(false);
      });
    },
    onSearch(search, loading) {
      loading(true);
      this.searchByJob(loading, search);
    },
  },
};
</script>
