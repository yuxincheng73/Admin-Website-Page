<template>
  <div class="talents">
    <div class="row">
      <div class="col-12">
        <h1 class="page-header">Talent</h1>
        <div class="row">
          <div class="col-8">
            <pagination-index :pagination="pagination"/>
          </div>
          <div class="col-4">
            <div class="row">
              <div class="input-group mb-3">
                <div class="col-10 px-0">
                  <v-select label="email"
                            :filterable="false"
                            :options="searchedTalent"
                            @search="onSearch"
                            id="talent-name">
                    <template slot="no-options">
                      Find Talent by First, Last, Fullname or Email
                    </template>
                    <template slot="option" slot-scope="talent">
                      <div class="d-center">
                        {{ talent.email }}
                        </div>
                    </template>
                    <template slot="selected-option" scope="talent">
                      <div class="selected d-center">
                        {{ talent.email }}
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
            <tr v-for="(talent, index) in talents" :key="index" data-toggle="side-view">
              <td>{{ talent.created_at | moment("dddd, MMMM Do YYYY") }}</td>
              <td>{{ talent.email }}</td>
              <td>{{ talent.first_name }}</td>
              <td>{{ talent.last_name }}</td>
              <td>{{ talent.approve }}</td>
              <td>{{ talent.complete }}</td>
              <td>{{ talent.link }}</td>
              <td class="actions">
                <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown">Actions</button>
                <div class="dropdown-menu">
                  <a href="javascript:;" data-toggle="modal" data-target="#modal-talents" @click="openModal(talent)" class="dropdown-item">Edit</a>
                  <a href="javascript:;" @click="deleteRow(talent)" class="dropdown-item">Delete</a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- <talents-edit :pagination="pagination" :talent="talent" /> -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { query } from '../../../services/query';
import Pagination from '../../Pagination.vue';
import TalentsEdit from './Edit.vue';

export default {
  name: 'talents',
  components: {
    'pagination-index': Pagination,
    'talents-edit': TalentsEdit,
  },
  mounted() {
    query();
    this.setPageNumber(query);
    this.getTalent();
  },
  beforeRouteUpdate(to, from, next) {
    this.setPageNumber(to.query);
    this.getTalent();
    next();
  },
  data() {
    return {
      tableHeaders: ['Ranking', 'Date Created', 'First Name', 'Last Name', 'Approve', 'Ask to Complete', 'View Profile', 'Actions'],
      baseUrl: '',
      searchedTalent: [],
      pagination: { currentPage: '', lastPage: '', nextPage: '', previousPage: '', routerUrl: '/admins/talent?page=' },
      talentEdit: {},
    };
  },
  computed: {
    talents() {
      return this.$store.getters.talent;
    },
  },
  methods: {
    setPageNumber(query) {
      const currentPage = parseInt(query.page, 10) || 1;
      this.pagination.currentPage = currentPage;
      this.pagination.nextPage = currentPage + 1;
      this.pagination.previousPage = currentPage - 1;
      this.$store.dispatch('getPagination', this.pagination);
    },
    getTalent() {
      this.$store.dispatch('getData', { url: this.baseUrl, resourceName: 'talent' });
    },
    // getTalents() {
    //   axios({
    //     method: 'GET',
    //     url: this.baseUrl + '?page=' + this.pagination.currentPage,
    //   }).then((response) => {
    //     this.users = response.data.data.users;
    //     console.log(response.data.data.users);
    //     const splitLastPage = response.data.links.last.split('=');
    //     this.pagination.lastPage = splitLastPage[1];
    //   });
    // },
    openModal(t) {
      this.talent = t;
    },
    deleteRow(t) {
      axios({
        method: 'DELETE',
        url: `url not shown/${t.id}`,
      });
    },
    searchByTalent(loading, query) {
      axios({
        method: 'GET',
        url: `url not shown?q=${query}`,
      }).then((response) => {
        this.searchedTalent = response.data.data.talent;
        loading(false);
      });
    },
    onSearch(search, loading) {
      loading(true);
      this.searchByTalent(loading, search);
    },
  },
};
</script>
