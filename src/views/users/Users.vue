<template>
  <div class="users">
    <div class="row">
      <div class="col-12">
        <h1 class="page-header">Users</h1>
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
                            :options="searchedUsers"
                            @search="onSearch"
                            id="user-name">
                    <template slot="no-options">
                      Find User by First, Last, Fullname or Email
                    </template>
                    <template slot="option" slot-scope="user">
                      <div class="d-center">
                        {{ user.email }}
                        </div>
                    </template>
                    <template slot="selected-option" scope="user">
                      <div class="selected d-center">
                        {{ user.email }}
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
            <tr v-for="(user, index) in users" :key="index" data-toggle="side-view">
              <td>{{ user.created_at | moment("dddd, MMMM Do YYYY") }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.first_name }}</td>
              <td>{{ user.last_name }}</td>
              <td></td>
              <td class="actions">
                <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown">Actions</button>
                <div class="dropdown-menu">
                  <a href="javascript:;" data-toggle="modal" data-target="#modal-users" @click="openModal(user)" class="dropdown-item">Edit</a>
                  <a href="javascript:;" @click="deleteRow(user)" class="dropdown-item">Delete</a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <users-edit :pagination="pagination" :user="user" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { query } from '../../services/query';
import Pagination from '../Pagination.vue';
import UsersEdit from './Edit.vue';

export default {
  name: 'users',
  components: {
    'pagination-index': Pagination,
    'users-edit': UsersEdit,
  },
  mounted() {
    query();
    this.setPageNumber(query);
    this.getUsers();
  },
  beforeRouteUpdate(to, from, next) {
    this.setPageNumber(to.query);
    this.getUsers();
    next();
  },
  data() {
    return {
      tableHeaders: ['Date Created', 'Email', 'Identities', 'Full Name', 'Startups', 'Actions'],
      baseUrl: '',
      pagination: { currentPage: '', lastPage: '', nextPage: '', previousPage: '', routerUrl: '/admins/users?page=' },
      searchedUser: [],
      user: {},
    };
  },
  computed: {
    users() {
      return this.$store.getters.users;
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
    getUsers() {
      this.$store.dispatch('getData', { url: this.baseUrl, resourceName: 'users' });
    },
    // getUsers() {
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
    openModal(u) {
      this.user = u;
    },
    deleteRow(u) {
      axios({
        method: 'DELETE',
        url: `url not shown/${u.id}`,
      });
    },
    searchByUser(loading, query) {
      axios({
        method: 'GET',
        url: `url not shown?q=${query}`,
      }).then((response) => {
        this.searchedUser = response.data.data.users;
        loading(false);
      });
    },
    onSearch(search, loading) {
      loading(true);
      this.searchByUser(loading, search);
    },
  },
};
</script>
