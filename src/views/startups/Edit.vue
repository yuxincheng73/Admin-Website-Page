<template>
  <div class="modal fade" id="modal-startups" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Edit Startup</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="formGroupExampleInput">Startup</label>
            <input type="text" v-model="startup.name" class="form-control" placeholder="Company name" id="startup-company">
          </div>
          <div class="form-group">
            <label for="formGroupExampleInput2">Owner Email</label>
            <!-- TODO: this isn't saving properly on DB due to it saying user not user_attributes -->
            <v-select v-model="startup.user"
                      label="email"
                      :filterable="false"
                      :options="users"
                      :value="startup.user"
                      @search="onSearch"
                      id="startup-user">
              <template slot="no-options">
                Find User
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
          <div class="form-group">
            <label for="formGroupExampleInput3">Slug</label>
            <input type="text" v-model="startup.slug" class="form-control" id="formGroupExampleInput3" placeholder="slug">
          </div>
          <div class="text-center">
            <router-link v-if="startup.friendly_id && startup.id" :to="{ name: 'manage-jobs', params: { startup_id: startup.friendly_id }}" data-dismiss="modal"><button type="button" class="btn btn-danger">Manage Startup</button></router-link>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary modal-submit" data-dismiss="" @click="postEditStartup">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'startups-edit',
  props: ['passId', 'pagination', 'baseUrl'],
  mounted() {
    window.$('#modal-startups').on('show.bs.modal', this.getStartup);
  },
  data() {
    return {
      search: '',
      users: [],
      startup: {},
    };
  },
  computed: {
    currentStartup() {
      return this.$store.getters.currentStartup;
    },
  },
  watch: {
    currentStartup: {
      handler(n) {
        this.startup = n;
        console.log(this.startup.friendly_id);
      },
      deep: true,
    },
  },
  methods: {
    getStartup() {
      this.$store.dispatch('getSpecificData', { id: this.passId.id, url: this.baseUrl, resourceName: 'currentStartup' });
    },
    postEditStartup() {
      axios({
        method: 'PUT',
        data: { startup: this.currentStartup },
        url: `url not shown/${this.currentStartup.id}`,
      }).then((response) => {
        this.$store.dispatch('updateData', { data: response.data.data, resourceName: 'startups' });
        this.$router.push(`/admins/startups?page=${this.pagination.currentPage}`);
      });
      window.$('.modal-submit').attr('data-dismiss', 'modal');
    },
    searchByUsers(loading, query) {
      axios({
        method: 'GET',
        url: `url not shown?q=${query}`,
      }).then((response) => {
        this.users = response.data.data.users;
        loading(false);
      });
    },
    onSearch(search, loading) {
      loading(true);
      this.searchByUsers(loading, search);
    },
  },
};
</script>
