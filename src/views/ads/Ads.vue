<template>
  <div class="ads">
    <div class="row">
      <div class="col-12">
        <h1 class="page-header">Ads</h1>
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
                            :options="searchedAd"
                            @search="onSearch"
                            id="ad-name">
                    <template slot="no-options">
                      Find Company Name
                    </template>
                    <template slot="option" slot-scope="ad">
                      <div class="d-center">
                        {{ ad.name }}
                        </div>
                    </template>
                    <template slot="selected-option" scope="ad">
                      <div class="selected d-center">
                        {{ ad.name }}
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
        <div class="row">
          <div class="col-12">
            <div class="sort">
              <div class="sort-left">
                <span><router-link to="/admins/ads/new" class="new-button">New</router-link></span>
              </div>
            </div>
          </div>
        </div>
        <hr>
        <table class="table table-hover" id="table-ads">
          <thead>
            <tr>
              <th v-for="(header, index) in tableHeaders" :key="index">
                {{ header }}
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(ad, index) in ads" :key="index" data-toggle="side-view">
              <td>{{ ad.created_at | moment("dddd, MMMM Do YYYY") }}</td>
              <td>{{ ad.end_at | moment("dddd, MMMM Do YYYY") }}</td>
              <td>{{ ad.aprove }}</td>
              <td>{{ ad.feature }}</td>
              <td>{{ ad.link }}</td>
              <td class="actions">
                <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown">Actions</button>
                <div class="dropdown-menu">
                  <a href="javascript:;" data-toggle="modal" data-target="#modal-ads" @click="openModal(ad)" class="dropdown-item">Edit</a>
                  <a href="javascript:;" @click="deleteRow(ad)" class="dropdown-item">Delete</a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <ads-edit :pagination="pagination" :ad="ad" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { query } from '../../services/query';
import Pagination from '../Pagination.vue';
import AdsEdit from './Edit.vue';

export default {
  name: 'ads',
  props: ['newAd'],
  components: {
    'pagination-index': Pagination,
    'ads-edit': AdsEdit,
  },
  mounted() {
    query();
    this.setPageNumber(query);
    this.getAds();
  },
  beforeRouteUpdate(to, from, next) {
    this.setPageNumber(to.query);
    this.getAds();
    next();
  },
  data() {
    return {
      tableHeaders: ['Date Started', 'Date End', 'Approve', 'Feature', 'View Ad', 'Actions'],
      baseUrl: '',
      searchedAd: [],
      pagination: { currentPage: '', lastPage: '', nextPage: '', previousPage: '', routerUrl: '/admins/ads?page=' },
      ad: {},
    };
  },
  computed: {
    ads() {
      return this.$store.getters.ads;
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
    getAds() {
      this.$store.dispatch('getData', { url: this.baseUrl, resourceName: 'ad_banners' });
    },
    // getAds() {
    //   axios({
    //     method: 'GET',
    //     url: this.baseUrl + '?page=' + this.pagination.currentPage,
    //   }).then((response) => {
    //     this.ads = response.data.data.ads;
    //     console.log(response.data.data.ads);
    //     const splitLastPage = response.data.links.last.split('=');
    //     this.pagination.lastPage = splitLastPage[1];
    //   });
    // },
    openModal(a) {
      this.ad = a;
    },
    deleteRow(a) {
      axios({
        method: 'DELETE',
        url: `${this.baseUrl}/${a.id}`,
      });
    },
    searchByAd(loading, query) {
      axios({
        method: 'GET',
        url: `https://whub-api.herokuapp.com/api/v1/admin/ad_banners?q=${query}`,
      }).then((response) => {
        this.searchedAd = response.data.data.ads;
        loading(false);
      });
    },
    onSearch(search, loading) {
      loading(true);
      this.searchByAd(loading, search);
    },
  },
};
</script>
