import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    startups: [],
    events: [],
    jobs: [],
    users: [],
    talent: [],
    ads: [],
    pagination: {},
    currentStartup: {},
    currentUser: {},
    currentEvent: {},
    currentJob: {},
    currentJobs: [],
    jobApplications: [],
  },
  getters: {
    startups: (state) => {
      return state.startups;
    },
    events: (state) => {
      return state.events;
    },
    jobs: (state) => {
      return state.jobs;
    },
    users: (state) => {
      return state.users;
    },
    talents: (state) => {
      return state.talent;
    },
    ads: (state) => {
      return state.ads;
    },
    currentStartup: (state) => {
      return state.currentStartup;
    },
    currentJobs: (state) => {
      return state.currentJobs;
    },
    currentJob: (state) => {
      return state.currentJob;
    },
    jobApplications: (state) => {
      return state.jobApplications;
    },
  },
  mutations: {
    SET_PAGINATION (state, payload) {
      state.pagination = payload;
    },
    SET_DATA (state, payload) {
      state[payload.resourceName] = payload.data;
    },
    SET_SPECIFICDATA (state, payload) {
      state[payload.resourceName] = payload.data;
    },
    UPDATE_DATA (state, payload) {
      let index = state[payload.resourceName].findIndex((element) => {
        return element.id === payload.data.id;
      });
      state[payload.resourceName][index] = payload.data;
    },
    POST_DATA (state, payload) {
      state[payload.resourceName].push(payload.data);
    },
    SET_STARTUPJOBS (state, payload) {
      state[payload.resourceName] = payload.data;
    },
    SET_STARTUPJOB (state, payload) {
      state[payload.resourceName] = payload.data;
    },
    SET_JOBAPPLICATIONS (state, payload) {
      state[payload.resourceName] = payload.data;
    },
    SET_STARTUP (state, payload) {
      state[payload.resourceName] = payload.data;
    },
  },
  actions: {
    getPagination ({commit}, payload) {
      commit('SET_PAGINATION', payload);
    },
    getData ({commit, state}, options) {
      let { url, resourceName } = options;
      axios({
        method: 'GET',
        url: `${url}?page=${state.pagination.currentPage}`,
      }).then((response) => {
        commit('SET_DATA', { data: response.data.data[resourceName], resourceName: resourceName });
        const splitLastPage = response.data.links.last.split('=');
        state.pagination.lastPage = splitLastPage[1];
      });
    },
    getSpecificData ({commit, state}, options) {
      let { id, url, resourceName } = options;
      axios({
        method: 'GET',
        url: `${url}/${id}`,
      }).then((response) => {
        console.log(response.data.data);
        commit('SET_SPECIFICDATA', { data: response.data.data, resourceName: resourceName });
      });
    },
    updateData ({commit, state}, payload) {
      commit('UPDATE_DATA', payload);
    },
    postData ({commit, state}, payload) {
      commit('POST_DATA', payload);
    },
    //Below are separate 'GET' methods for Manage Startup Page, HOWEVER, methods updateData and postData are still used for 'PUT' and 'POST'
    getStartupJobs ({commit, state}, options) {
      let { id, url, resource, resourceName } = options;
      axios({
        method: 'GET',
        headers: { 'X-AUTHORIZATION': '' },
        url: `${url}/${id}/jobs`,
      }).then((response) => {
        commit('SET_STARTUPJOBS', { data: response.data.data[resource], resourceName: resourceName });
      });
    },
    getStartupJob ({commit, state}, options) {
      let { startup_id, id, url, resourceName } = options;
      axios({
        method: 'GET',
        headers: { 'X-AUTHORIZATION': '' },
        url: `${url}/${startup_id}/jobs/${id}`,
      }).then((response) => {
        commit('SET_STARTUPJOB', { data: response.data.data, resourceName: resourceName });
      });
    },
    getJobApplications ({commit, state}, options) {
      let { startup_id, url, resource, resourceName } = options;
      axios({
        method: 'GET',
        headers: { 'X-AUTHORIZATION': '' },
        url: `${url}/${startup_id}/job_applications`,
      }).then((response) => {
        console.log(response.data.data);
        commit('SET_JOBAPPLICATIONS', { data: response.data.data, resourceName: resourceName });
      });
    },
    getStartup({commit, state}, options) {
      let { startup_id, url, resourceName } = options;
      axios({
        method: 'GET',
        headers: { 'X-AUTHORIZATION': '' },
        url: `${url}/${startup_id}`,
      }).then((response) => {
        console.log(response.data.data);
        commit('SET_STARTUP', { data: response.data.data, resourceName: resourceName });
      });
    },
  },
});
