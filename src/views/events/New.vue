<template>
  <div class="event-new">
    <div class="row">
      <div class="col-12">
        <h1 class="page-header">New Event</h1>
        <form id="new-event" @submit.prevent="postEvent">
          <div class="form-group">
            <label for="formGroupExampleInput1">Startup</label>
            <v-select label="name"
                      :filterable="false"
                      :options="searchedStartups"
                      @search="onSearch"
                      id="event-startup">
              <template slot="no-options">
                Find Startup
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
          <div class="form-group">
            <label for="formGroupExampleInput3">Title</label>
            <!-- PASS DATA OF EVENT TO HERE VIA VUEX-->
            <input type="text" v-model="eventNew.title" class="form-control" id="formGroupExampleInput3" placeholder="slug">
          </div>
          <div class="form-group">
            <label for="formGroupExampleInput3">Link</label>
            <input type="text" v-model="eventNew.link" class="form-control" id="formGroupExampleInput3" placeholder="slug">
          </div>
          <div class="form-group">
            <label for="formGroupExampleInput3">Location</label>
            <input type="text" v-model="eventNew.location" class="form-control" id="formGroupExampleInput3" placeholder="slug">
          </div>
          <div class="form-group">
            <div class="row">
              <div class="col-6">
                <div for="Start Date">Start Date</div>
                <date-picker class="date-picker" v-model="eventNew.start" lang="en" type="datetime" format="YYYY-MM-DD hh:mm:ss a" :minute-step="5"></date-picker>
              </div>
              <div class="col-6">
                <div for="End Date">End Date</div>
                <date-picker class="date-picker" v-model="eventNew.end" lang="en" type="datetime" format="YYYY-MM-DD hh:mm:ss a" :minute-step="5" ></date-picker>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div for="Start Date">Image</div>
            <input type="file" accept="image/*" ref="file" id="event-image" @change="handFileUpload()" name="event-image">
            <img :src="imagePreview">
          </div>
           <div class="input-group mb-3">
            <div class="input-group-prepend newpage-checkbox">
              <div class="input-group-text col-4">
                <div>Private Registration</div>
                <input type="checkbox" :checked="eventNew.private" @click="eventNew.private = !eventNew.private" aria-label="Checkbox for following text input">
              </div>
              <div class="input-group-text col-4">
                <div>Online</div>
                <input type="checkbox" :checked="eventNew.online" @click="eventNew.online = !eventNew.online" aria-label="Checkbox for following text input">
              </div>
              <div class="input-group-text col-4">
                <div>Free</div>
                <input type="checkbox" :checked="eventNew.free" @click="eventNew.free = !eventNew.free" aria-label="Checkbox for following text input">
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="formGroupExampleInput3">Description</label>
            <wysiwyg v-model="eventNew.textarea" />
          </div>
          <div class="form-group">
            <label for="formGroupExampleInput3">Offer</label>
            <input type="text" v-model="eventNew.offer" class="form-control" id="formGroupExampleInput3" placeholder="slug">
          </div>
          <div class="event-new-submit text-right">
            <button type="submit" class="btn btn-danger">Save</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';
import DatePicker from 'vue2-datepicker';

export default {
  name: 'event-new',
  components: {
    DatePicker,
  },
  data() {
    return {
      eventNew: { title: '', link: '', location: '', start: '', end: '', file: '', private: '', online: '', free: '', textarea: '', offer: '' },
      searchedStartups: [],
      imagePreview: '',
    };
  },
  methods: {
    searchStartups(loading, query) {
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
      this.searchStartups(loading, search);
    },
    postEvent() {
      let newEvent = document.getElementById('new-event');
      let formData = new FormData(newEvent);

      axios({
        method: 'POST',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
        url: '',
      }).then((response) => {
        this.$store.dispatch('postData', { data: response.data.data, resourceName: 'events' });
        // this.$emit('createAd', response.data.data);
        // // this.$emit('createAd', this.newAd);
        // this.$router.push('/admins/events');
      });
    },
    handFileUpload() {
      this.eventNew.file = this.$refs.file.files[0];
      console.log(this.eventNew.file);
      let reader = new FileReader();

      reader.addEventListener('load', () => {
        this.imagePreview = reader.result;
        console.log(this.imagePreview);
      });

      if (this.eventNew.file) {
        if (/\.(jpe?g|png|gif)$/i.test(this.eventNew.file.name)) {
          reader.readAsDataURL(this.eventNew.file);
        }
      }
    },
  },
};
</script>
