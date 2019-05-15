<template>
  <div class="adnew">
    <div class="row">
      <div class="col-12">
        <h1 class="page-header">New Ad</h1>
        <form id="new-ad" @submit.prevent="postAd">
          <div class="form-group">
            <label for="Company Name">Company Name</label>
            <input type="text" v-model="newAd.name" class="form-control" placeholder="Company name" id="ad-company-name" name="ad-company-name">
          </div>
          <div class="form-group">
            <div class="row">
              <div class="col-6">
                <div for="Start Date">Start Date</div>
                <date-picker class="date-picker" v-model="newAd.start" lang="en" type="datetime" format="YYYY-MM-DD hh:mm:ss a" :minute-step="5" name="ad-start"></date-picker>
              </div>
              <div class="col-6">
                <div for="End Date">End Date</div>
                <date-picker class="date-picker" v-model="newAd.end" lang="en" type="datetime" format="YYYY-MM-DD hh:mm:ss a" :minute-step="5" name="ad-end"></date-picker>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div for="Start Date">Image</div>
            <input type="file" accept="image/*" ref="file" id="ad-image" @change="handFileUpload()" name="ad-image">
            <img :src="imagePreview">
          </div>
          <div class="form-group">
            <label for="Start Date">Original </label>
            <input type="text" v-model="newAd.original" class="form-control" placeholder="Original" id="ad-original" name="ad-original">
          </div>
          <div class="form-group">
            <label for="Start Date">Short Url</label>
            <input type="text" v-model="newAd.short" class="form-control" placeholder="Short Url" id="ad-shorturl" name="ad-shorturl">
          </div>
          <div class="adnew-submit text-right">
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
  name: 'adnew',
  components: {
    DatePicker,
  },
  data() {
    return {
      baseUrl: '',
      newAd: { name: '', start: '', end: '', file: '', original: '', short: '' },
      imagePreview: '',
    };
  },
  methods: {
    postAd() {
      let newAd = document.getElementById('new-ad');
      let formData = new FormData(newAd);

      axios({
        method: 'POST',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
        url: `${this.baseUrl}`,
      }).then((response) => {
        this.$store.dispatch('postData', { data: response.data.data, resourceName: 'ad_banners' });
        // this.$emit('createAd', response.data.data);
        // // this.$emit('createAd', this.newAd);
        // this.$router.push('/admins/ads');
      });
    },
    handFileUpload() {
      this.newAd.file = this.$refs.file.files[0];
      let reader = new FileReader();
      console.log(this.newAd.file);
      console.log(reader);

      reader.addEventListener('load', () => {
        this.imagePreview = reader.result;
        console.log(this.imagePreview);
      });

      if (this.newAd.file) {
        if (/\.(jpe?g|png|gif)$/i.test(this.newAd.file.name)) {
          reader.readAsDataURL(this.newAd.file);
        }
      }
    },
  },
};
</script>
