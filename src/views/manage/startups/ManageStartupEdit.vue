<template>
  <div class="manage-startup-edit">
    <div class="row">
      <transition name="slide-sidebar" mode="out-in">
        <sidebar-startup v-if="sidebarOpen" :sidebarOpen="sidebarOpen" @toggleSidebar="toggleSidebar" @updateColor="updateColor" />
      </transition>
      <div class="col-12">
        <div class="row">
          <div class="startup-background">
            <div class="startup-background-image" @click="editBackgroundImage">
              <img :src="startup.background_image" alt="">
              <div class="startup-logo text-center" @click="editLogo">
                <img :src="startup.logo" alt="">
              </div>
              <div class="startup-intro mx-auto">
                <div class="text-center">
                  <input v-model="startup.name" class="form-control mx-auto" placeholder="Startup name">
                  <input v-model="startup.tagline" class="form-control mx-auto" placeholder="Startup tagline" style="font-size: 12px;">
                </div>
                <div class="text-center">
                  <ul class="social-icons list-unstyled">
                    <li>
                      <a href="javascript:;" @click="editSocialLinks" class="mx-3"><i class="fab fa-instagram"></i></a>
                    </li>
                    <li>
                      <a href="javascript:;" @click="editSocialLinks" class="mx-3"><i class="fab fa-twitter"></i></a>
                    </li>
                    <li>
                      <a href="javascript:;" @click="editSocialLinks" class="mx-3"><i class="fab fa-facebook-f"></i></a>
                    </li>
                    <li>
                      <a href="javascript:;" @click="editSocialLinks" class="mx-3"><i class="fab fa-linkedin"></i></a>
                    </li>
                    <li>
                      <a href="javascript:;" @click="editSocialLinks" class="mx-3"><i class="fab fa-youtube"></i></a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="startup-stage" style="color: #444;">
          This is for the startup stage wizard
        </div>
        <div class="startup-body">
          <div class="startup-mission">
            <div class="row">
              <div class="col-4">
                <div class="section-header"></div>
                <h3>Passion</h3>
              </div>
              <div class="col-8">
                <textarea v-model="startup.mission" name="" id="" cols="30" rows="15"></textarea>
              </div>
            </div>
          </div>
          <div class="startup-product">
            <div class="row flip">
              <div class="col-4">
                <div class="section-header"></div>
                <h3>Product</h3>
              </div>
              <div class="col-8">
                <textarea v-model="startup.description" name="" id="" cols="30" rows="15"></textarea>
              </div>
            </div>
          </div>
          <div class="startup-team">
            <div class="row">
              <div class="col-4">
                <div class="section-header"></div>
                <h3>Team</h3>
              </div>
            </div>
            <div class="row" style="justify-content: center;">
              <div class="col-10">
                <div class="row">
                  <div class="col-4">
                    <div class="material-card Red" @click="editTeamMember">
                      <h2>
                        <div>My Guy</div>
                        <div>Co-Founder</div>
                      </h2>
                      <div class="mc-content">
                        <div class="img-container">
                          <img class="img-responsive" src="http://u.lorenzoferrara.net/marlenesco/material-card/thumb-christopher-walken.jpg">
                        </div>
                        <div class="mc-description">
                            He has appeared in more than 100 films and television shows, including The Deer Hunter, Annie Hall, The Prophecy trilogy, The Dogs of War ... LOLOLOLOLOLOLLOLOLOLOLOLOLLOLOLOLOLOLOL
                        </div>
                      </div>
                      <a class="mc-btn-action" @click="showTeamMember">
                          <i class="fa fa-bars"></i>
                      </a>
                      <div class="mc-footer">
                        <a class="fa fa-fw fa-facebook"></a>
                        <a class="fa fa-fw fa-twitter"></a>
                        <a class="fa fa-fw fa-linkedin"></a>
                        <a class="fa fa-fw fa-google-plus"></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="startup-office">
            <div class="row flip">
              <div class="col-4">
                <div class="section-header"></div>
                <h3>Office</h3>
              </div>
              <div class="col-8">
                <p>LAKJFKAFJFIOFUI</p>
              </div>
            </div>
          </div>
          <div class="startup-associates">
            <div class="row">
              <div class="col-4">
                <div class="section-header"></div>
                <h3>Associates</h3>
              </div>
            </div>
            <div class="row" style="justify-content: center;">
              <div class="col-9">
                <div class="row">
                  <div class="col-3">
                    <div class="card">
                      <div class="card-body">
                      </div>
                    </div>
                  </div>
                  <div class="col-3">
                    <div class="card">
                      <div class="card-body">
                      </div>
                    </div>
                  </div>
                  <div class="col-3">
                    <div class="card">
                      <div class="card-body">
                      </div>
                    </div>
                  </div>
                  <div class="col-3">
                    <div class="card">
                      <div class="card-body">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="startup-office">
            <div class="row flip">
              <div class="col-4">
                <div class="section-header"></div>
                <h3>Latest News</h3>
              </div>
              <div class="col-8">
                <p>LAKJFKAFJFIOFUI</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from './Sidebar-StartupEdit.vue';

export default {
  name: 'manage-startup-edit',
  components: {
    'sidebar-startup': Sidebar,
  },
  mounted() {
    this.getStartup();
  },
  data() {
    return {
      sidebarOpen: false,
      startup: {},
      baseUrl: '',
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
        if (n !== this.startup) {
          this.startup = n;
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    toggleSidebar(data) {
      this.sidebarOpen = data;
    },
    getStartup() {
      this.$store.dispatch('getStartup', { startup_id: this.$route.params.startup_id, url: this.baseUrl, resourceName: 'currentStartup' });
    },
    showTeamMember(evt) {
      const card = window.$(evt.target).parent('.material-card');
      const icon = window.$(evt.target).children('i');

      if (card.hasClass('mc-active')) {
        card.removeClass('mc-active');
        icon.removeClass('fa-arrow-left').addClass('fa-bars');
      } else {
        card.addClass('mc-active');
        icon.removeClass('fa-bars').addClass('fa-arrow-left');
      }
    },
    editBackgroundImage() {
      this.sidebarOpen = true;
      console.log(this.sidebarOpen);
    },
    editLogo() {
      this.sidebarOpen = true;
    },
    editSocialLinks(evt) {
      console.log(evt);
    },
    editTeamMember() {
      this.sidebarOpen = true;
    },
  },
};
</script>
