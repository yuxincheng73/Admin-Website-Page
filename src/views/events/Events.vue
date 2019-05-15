<template>
  <div class="events">
    <div class="row">
      <div class="col-12">
        <h1 class="page-header">Events</h1>
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
                            :options="searchedEvent"
                            @search="onSearch"
                            id="event-name">
                    <template slot="no-options">
                      Find Event Name, Startup Slug or Event ID
                    </template>
                    <template slot="option" slot-scope="event">
                      <div class="d-center">
                        {{ event.name }}
                        </div>
                    </template>
                    <template slot="selected-option" scope="event">
                      <div class="selected d-center">
                        {{ event.name }}
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
        <div class="row sort">
          <div class="col-4">
            <span class="sort-left">
              <span><router-link to="/admins/events/new" class="new-button">New</router-link></span>
              <span>Newsletters</span>
            </span>
          </div>
          <div class="col-8 text-right">
            <span><i class="fas fa-filter"></i></span>
            <span class="sort-right" v-for="(sort, index) in sortings" :key="index">
              <span>{{ sort }}</span>
              <span>|</span>
            </span>
          </div>
        </div>
        <hr>
        <table class="table table-hover" id="table-events">
          <thead>
            <tr>
              <th v-for="(header, index) in tableHeaders" :key="index">
                {{ header }}
              </th>
            </tr>
          </thead>
          <tbody class="table-bordered">
            <tr v-for="(event, index) in events" :key="index" data-toggle="side-view" :data-id="`#${event.id}`">
              <td>{{ event.name }}</td>
              <td>{{ event.title }}</td>
              <td><span>{{ event.start | moment("dddd, MMMM Do YYYY") }}</span></td>
              <td><span>{{ event.end | moment("dddd, MMMM Do YYYY") }}</span></td>
              <td align="center">
                <i class="fas fa-check" v-if="event.active" style="color: green;"></i>
                <i class="fas fa-times" v-if="!event.active" style="color: red;"></i>
              </td>
              <td>
                <button class="btn btn-danger" v-if="event.is_active" @click="updateActive(event)">Deactivate</button>
                <button class="btn btn-success" v-if="!event.is_active" @click="updateActive(event)">Activate</button>
              </td>
              <td>
                <button class="btn btn-danger" v-if="event.is_featured" @click="updateFeatured(event)">Unfeature</button>
                <button class="btn btn-success" v-if="!event.is_featured" @click="updateFeatured(event)">Feature</button>
              </td>
              <td>
                <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown">Actions</button>
                <div class="dropdown-menu">
                  <a href="javascript:;" data-toggle="modal" data-target="#modal-events" v-if="!event.startup" @click="openModal(event)" class="dropdown-item">Edit</a>
                  <a href="javascript:;" @click="deleteRow(event)" class="dropdown-item">Delete</a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <events-edit :event="event" :pagination="pagination" />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import VueMoment from 'vue-moment';
import Pagination from '../Pagination.vue';
import { query } from '../../services/query';
import EventsEdit from './Edit.vue';

Vue.use(require('vue-moment'));

export default {
  name: 'events',
  components: {
    'pagination-index': Pagination,
    'events-edit': EventsEdit,
  },
  mounted() {
    query();
    this.setPageNumber(query);
    this.getEvents();
  },
  beforeRouteUpdate(to, from, next) {
    this.setPageNumber(to.query);
    this.getEvents();
    next();
  },
  data() {
    return {
      tableHeaders: ['Startup', 'Title', 'Start Date', 'End Date', 'Status', 'Approved', 'Featured', 'Actions'],
      baseUrl: '',
      pagination: { currentPage: '', lastPage: '', nextPage: '', previousPage: '', routerUrl: '/admins/events?page=' },
      searchedEvent: [],
      event: {},
      sortings: ['To Be Checked', 'Upcoming Events', 'Past Events', 'Non-free Events'],
    };
  },
  computed: {
    events() {
      return this.$store.getters.events;
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
    getEvents() {
      this.$store.dispatch('getData', { url: this.baseUrl, resourceName: 'events' });
    },
    // getEvents() {
    //   axios({
    //     method: 'GET',
    //     url: this.baseUrl + '?page=' + this.pagination.currentPage,
    //   }).then((response) => {
    //     console.log(response);
    //     this.events = response.data.data.events;
    //     const splitLastPage = response.data.links.last.split('=');
    //     this.pagination.lastPage = splitLastPage[1];
    //   });
    // },
    openModal(e) {
      this.event = e;
    },
    update(event) {
      axios({
        method: 'PUT',
        data: event,
        url: `${this.baseUrl}/${event.id}`,
      }).then((response) => {
        this.$store.dispatch('updateEvent', response.data.data);
      });
    },
    updateFeatured(event) {
      event.is_featured = !event.is_featured;
      this.update(event);
    },
    updateActive(event) {
      event.is_active = !event.is_active;
      this.update(event);
    },
    deleteRow(e) {
      axios({
        method: 'DELETE',
        url: `url not shown/${e.id}`,
      });
    },
    searchByEvent(loading, query) {
      axios({
        method: 'GET',
        url: `url not shown?q=${query}`,
      }).then((response) => {
        this.searchedEvent = response.data.data.events;
        loading(false);
      });
    },
    onSearch(search, loading) {
      loading(true);
      this.searchByEvent(loading, search);
    },
  },
};
</script>
