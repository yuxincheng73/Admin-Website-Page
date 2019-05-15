<template>
  <div class="modal fade" id="modal-events" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Edit Event</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="formGroupExampleInput2">Startup</label>
              <v-select label="name"
                        :filterable="false"
                        :options="searchedStartup"
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
              <label for="formGroupExampleInput2">Title</label>
              <input type="text" v-model="event.title" class="form-control" id="formGroupExampleInput2" placeholder="Event title">
            </div>
            <div class="form-group">
              <div class="row">
                <div class="col-6">
                  <div for="Start Date">Start Date</div>
                  <date-picker class="date-picker" v-model="event.start" lang="en" type="datetime" format="YYYY-MM-DD hh:mm:ss a" :minute-step="5" ></date-picker>
                </div>
                <div class="col-6">
                  <div for="End Date">End Date</div>
                  <date-picker class="date-picker" v-model="event.end" lang="en" type="datetime" format="YYYY-MM-DD hh:mm:ss a" :minute-step="5" ></date-picker>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label for="formGroupExampleInput4">Location</label>
              <input type="text" v-model="event.location" class="form-control" id="formGroupExampleInput4" placeholder="Event location">
            </div>
            <div class="form-group">
              <label for="formGroupExampleInput5">Event Description</label>
              <input type="text" v-model="event.description" class="form-control" id="formGroupExampleInput5" placeholder="Event description">
            </div>
            <div class="input-group mb-3">
              <div class="input-group-prepend modal-checkbox">
                <div class="input-group-text col-4">
                  <div>Private Registration</div>
                  <input type="checkbox" :checked="event.is_private" @click="event.is_private = !event.is_private" aria-label="Checkbox for following text input">
                </div>
                <div class="input-group-text col-4">
                  <div>Online</div>
                  <input type="checkbox" :checked="event.is_online" @click="event.is_online = !event.is_online" aria-label="Checkbox for following text input">
                </div>
                <div class="input-group-text col-4">
                  <div>Free</div>
                  <input type="checkbox" :checked="event.is_free" @click="event.is_free = !event.is_free" aria-label="Checkbox for following text input">
                </div>
              </div>
            </div>
            <div class="form-group">
              <label for="formGroupExampleInput9">Offer</label>
              <input type="text" v-model="event.offer" class="form-control" id="formGroupExampleInput9" placeholder="Offer">
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary modal-submit" data-dismiss="" @click="postEditEvent">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import DatePicker from 'vue2-datepicker';

export default {
  name: 'events-edit',
  components: {
    DatePicker,
  },
  props: ['event', 'pagination'],
  data() {
    return {
      search: '',
      searchedStartup: '',
    };
  },
  methods: {
    postEditEvent() {
      axios({
        method: 'PUT',
        data: this.event,
        url: `url not shown/${this.event.id}`,
      }).then((response) => {
        this.$store.dispatch('updateData', { data: response.data.data, resourceName: 'events' });
        this.$router.push(`/admins/events?page=${this.pagination.currentPage}`);
      });
      window.$('.modal-submit').attr('data-dismiss', 'modal');
    },
    searchByStartup(loading, query) {
      axios({
        method: 'GET',
        url: `url not shown?q=${query}`,
      }).then((response) => {
        this.searchedStartup = response.data.data.startups;
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
