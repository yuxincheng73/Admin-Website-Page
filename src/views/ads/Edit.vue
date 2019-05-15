<template>
  <div class="modal fade" id="modal-ads" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Edit Ad</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form id="edit-ad" @submit.prevent="postEditAd">
            <div class="form-group">
              <label for="Company Name">Company Name</label>
              <input type="text" v-model="ad.name" class="form-control" placeholder="Company name" id="ad-company-name" name="ad-company-name">
            </div>
            <div class="form-group">
              <div class="row">
                <div class="col-6">
                  <div for="Start Date">Start Date</div>
                  <date-picker class="date-picker" v-model="ad.start" lang="en" type="datetime" format="YYYY-MM-DD hh:mm:ss a" :minute-step="5" name="ad-start"></date-picker>
                </div>
                <div class="col-6">
                  <div for="End Date">End Date</div>
                  <date-picker class="date-picker" v-model="ad.end" lang="en" type="datetime" format="YYYY-MM-DD hh:mm:ss a" :minute-step="5" name="ad-end"></date-picker>
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
              <input type="text" v-model="ad.original" class="form-control" placeholder="Original" id="ad-original" name="ad-original">
            </div>
            <div class="form-group">
              <label for="Start Date">Short Url</label>
              <input type="text" v-model="ad.short" class="form-control" placeholder="Short Url" id="ad-shorturl" name="ad-shorturl">
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary modal-submit" data-dismiss="">Save changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import DatePicker from 'vue2-datepicker';

export default {
  name: 'edit-ads',
  components: {
    DatePicker,
  },
  props: ['ad', 'pagination'],
  data() {
    return {
      search: '',
      imagePreview: '',
    };
  },
  methods: {
    postEditAd() {
      let editAd = document.getElementById('edit-ad');
      let formData = new FormData(editAd);

      axios({
        method: 'PUT',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
        url: `url not shown/${this.ad.id}`,
      }).then((response) => {
        this.$store.dispatch('updateData', { data: response.data.data, resourceName: 'ad_banners' });
        this.$router.push(`/admins/ad_banners?page=${this.pagination.currentPage}`);
      });
      window.$('.modal-submit').attr('data-dismiss', 'modal');
    },
    handFileUpload() {
      this.ad.file = this.$refs.file.files[0];
      let reader = new FileReader();

      reader.addEventListener('load', () => {
        this.imagePreview = reader.result;
        console.log(this.imagePreview);
      });

      if (this.file) {
        if (/\.(jpe?g|png|gif)$/i.test(this.ad.file.name)) {
          reader.readAsDataURL(this.ad.file);
        }
      }
    },
  },
};
</script>
