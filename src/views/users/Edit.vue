<template>
  <div class="modal fade" id="modal-users" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Edit User</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="Email">Email</label>
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
              <div class="input-group-text col-6">
                <div>Talent</div>
                <input type="checkbox" :checked="user.is_talent" @click="user.is_talent = !user.is_talent" aria-label="Checkbox for following text input">
              </div>
              <div class="input-group-text col-6">
                <div>Recruiter</div>
                <input type="checkbox" :checked="user.is_recruiter" @click="user.is_recruiter = !user.is_recruiter" aria-label="Checkbox for following text input">
              </div>
            </div>
          </div>
          <hr>
          <div class="modal-checkbox">
            <div class="form-check form-check-inline">
              <input class="form-check-input" :checked="user.subscribe_startup" @click="user.subscribe_startup = !user.subscribe_startup" type="checkbox" id="inlineCheckbox1" value="option1">
              <label class="form-check-label" for="inlineCheckbox1">Subscribe To Weekly Startup Talent Alerts</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" :checked="user.subscribe_event" @click="user.subscribe_event = !user.subscribe_event" type="checkbox" id="inlineCheckbox2" value="option1">
              <label class="form-check-label" for="inlineCheckbox2">Subscribe To Weekly Event Digest</label>
            </div>
          </div>
          <div class="modal-checkbox">
            <div class="form-check form-check-inline">
              <input class="form-check-input" :checked="user.subscribe_opt" @click="user.subscribe_opt = !user.subscribe_opt" type="checkbox" id="inlineCheckbox3" value="option1">
              <label class="form-check-label" for="inlineCheckbox3">Opt in</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" :checked="user.subscribe_notification" @click="user.subscribe_notification = !user.subscribe_notification" type="checkbox" id="inlineCheckbox4" value="option1">
              <label class="form-check-label" for="inlineCheckbox4">Subscribe To General Notifications</label>
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
  name: 'users-edit',
  props: ['user', 'pagination'],
  data() {
    return {
      search: '',
    };
  },
  methods: {
    postEditUser() {
      axios({
        method: 'PUT',
        data: this.user,
        url: `url not shown/${this.user.id}`,
      }).then((response) => {
        this.$store.dispatch('updateData', { data: response.data.data, resourceName: 'users' });
        this.$router.push(`/admins/users?page=${this.pagination.currentPage}`);
      });
      window.$('.modal-submit').attr('data-dismiss', 'modal');
    },
  },
};
</script>
