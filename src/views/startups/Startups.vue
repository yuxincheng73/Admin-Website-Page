<template>
  <div class="startups-index">
    <div class="row">
      <div class="col-12">
        <h1 class="page-header">Startups</h1>
        <div class="row">
          <div class="col-8">
            <pagination-index :pagination="pagination"/>
          </div>
          <div class="col-4">
            <div class="row">
              <div class="input-group mb-3">
                <div class="col-10 px-0">
                  <v-select label="name"
                            :filterable="false"
                            :options="searchedStartups"
                            @search="onSearch"
                            id="startup-name">
                    <template slot="no-options">
                      Find Startup Name or Slug
                    </template>
                    <template slot="option" slot-scope="startup">
                      <div class="d-center">
                        {{ startup.name }}
                        </div>
                    </template>
                    <template slot="selected-option" scope="startup">
                      <div class="selected d-center">
                        {{ startup.name }}
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
        <table class="table table-hover" id="table-startups">
          <thead>
            <tr>
              <th v-for="(header, index) in tableHeaders" :key="index">
                {{ header }}
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(startup, index) in startups" :key="index" data-toggle="side-view" :data-id="`#${startup.id}`">
              <td>{{ startup.ranking }}</td>
              <td>{{ startup.created_at | moment("dddd, MMMM Do YYYY") }}</td>
              <td>{{ startup.name }}</td>
              <td>{{ startup.user.email }}</td>
              <td>{{ startup.jobs_count }}</td>
              <td class="actions">
                <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown">Actions</button>
                <div class="dropdown-menu">
                  <a href="javascript:;" data-toggle="modal" data-target="#modal-startups" @click="openModal(startup.id)" class="dropdown-item">Edit</a>
                  <a href="javascript:;" @click="deleteRow(startup)" class="dropdown-item">Delete</a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <startups-edit :passId="passId" :pagination="pagination" :baseUrl="baseUrl"/>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { query } from '../../services/query';
import Pagination from '../Pagination.vue';
import StartupsEdit from './Edit.vue';

export default {
  name: 'startups',
  components: {
    'pagination-index': Pagination,
    'startups-edit': StartupsEdit,
  },
  mounted() {
    query();
    this.setPageNumber(query);
    this.getStartups();
  },
  beforeRouteUpdate(to, from, next) {
    this.setPageNumber(to.query);
    this.getStartups();
    next();
  },
  data() {
    return {
      tableHeaders: ['Ranking', 'Created At', 'Company', 'Owner', 'Active Jobs'],
      baseUrl: '',
      searchedStartups: [],
      pagination: { currentPage: '', lastPage: '', nextPage: '', previousPage: '', routerUrl: '/admins/startups?page=' },
      passId: { id: '' },
    };
  },
  computed: {
    startups() {
      return this.$store.getters.startups;
    },
  },
  methods: {
    setPageNumber(query) {
      const currentPage = parseInt(query.page, 10) || 1;
      this.pagination.currentPage = currentPage;
      this.pagination.nextPage = currentPage + 1;
      this.pagination.previousPage = currentPage - 1;
      this.$store.dispatch('getPagination', this.pagination);
      // this.getStartups();
    },
    getStartups() {
      this.$store.dispatch('getData', { url: this.baseUrl, resourceName: 'startups' });
    },
    // getStartups() {
    //   axios({
    //     method: 'GET',
    //     url: this.baseUrl + '?page=' + this.pagination.currentPage,
    //   }).then((response) => {
    //     this.startups = response.data.data.startups;
    //     const splitLastPage = response.data.links.last.split('=');
    //     this.pagination.lastPage = splitLastPage[1];
    //   });
    // },
    openModal(id) {
      this.passId.id = id;
      // this.getStartup(id);
    },
    deleteRow(s) {
      axios({
        method: 'DELETE',
        url: `url not shown/${s.id}`,
      });
    },
    searchByStartup(loading, query) {
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
      this.searchByStartup(loading, search);
    },
  },
};
</script>
