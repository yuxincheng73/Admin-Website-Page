<template>
  <div class="modal fade" id="modal-talents" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Edit Talent</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="Email">Slug</label>
            <input type="text" v-model="user.email" class="form-control" placeholder="Email" id="user-email">
          </div>
          <div class="form-group">
            <label for="First Name">First Name</label>
            <input type="text" v-model="user.first_name" class="form-control" id="user-firstname" placeholder="First name">
          </div>
          <div class="form-group">
            <label for="First Name">Last Name</label>
            <input type="text" v-model="user.last_name" class="form-control" id="user-lastname" placeholder="Last name">
          </div>
          <div class="input-group mb-3">
            <div class="input-group-prepend modal-checkbox">
              <div class="input-group-text col-4">
                <div>Active</div>
                <input type="checkbox" :checked="user.active" @click="user.active = !user.active" aria-label="Checkbox for following text input">
              </div>
              <div class="input-group-text col-4">
                <div>Checked</div>
                <input type="checkbox" :checked="user.checked" @click="user.checked = !user.checked" aria-label="Checkbox for following text input">
              </div>
              <div class="input-group-text col-4">
                <div>Visible</div>
                <input type="checkbox" :checked="user.visible" @click="user.visible = !user.visible" aria-label="Checkbox for following text input">
              </div>
            </div>
          </div>
          <hr>
          <div class="modal-checkbox">
            <div class="form-check form-check-inline">
              <input class="form-check-input" :checked="user.subscribe_job" @click="user.subscribe_job = !user.subscribe_job" type="checkbox" id="inlineCheckbox1" value="option1">
              <label class="form-check-label" for="inlineCheckbox1">Subscribe To Weekly Job Alerts</label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary modal-submit" data-dismiss="" @click="postEditUser">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'talents-edit',
  props: ['talent', 'pagination'],
  data() {
    return {
      search: '',
    };
  },
  methods: {
    postEditUser() {
      axios({
        method: 'PUT',
        data: this.talent,
        url: `url not shown/${this.user.id}`,
      }).then((response) => {
        this.$store.dispatch('updateData', { data: response.data.data, resourceName: 'talent' });
        this.$router.push(`/admins/talent?page=${this.pagination.currentPage}`);
      });
      window.$('.modal-submit').attr('data-dismiss', 'modal');
    },
  },
};
</script>
