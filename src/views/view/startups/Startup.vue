<template>
  <div class="view-startup-edit">
    <div class="row">
      <div class="col-12">
        <div class="row">
          <div class="startup-background">
            <div class="startup-background-image">
              <img :src="startup.background_image" alt="">
              <div class="startup-logo text-center">
                <img :src="startup.logo" alt="">
              </div>
              <div class="startup-intro mx-auto">
                <div class="text-center">
                  <h2>WHub</h2>
                  <div style="font-size: 12px;">Hong Kong's Startup Community</div>
                </div>
                <div class="text-center">
                  <ul class="social-icons list-unstyled">
                    <li>
                      <a href="javascript:;" class="mx-3"><i class="fab fa-instagram"></i></a>
                    </li>
                    <li>
                      <a href="javascript:;" class="mx-3"><i class="fab fa-twitter"></i></a>
                    </li>
                    <li>
                      <a href="javascript:;" class="mx-3"><i class="fab fa-facebook-f"></i></a>
                    </li>
                    <li>
                      <a href="javascript:;" class="mx-3"><i class="fab fa-linkedin"></i></a>
                    </li>
                    <li>
                      <a href="javascript:;" class="mx-3"><i class="fab fa-youtube"></i></a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="startup-stage">

        </div>
        <div class="startup-body">
          <div class="startup-mission">
            <div class="row">
              <div class="col-4">
                <div class="section-header"></div>
                <h3>Passion</h3>
              </div>
              <div class="col-8">
                <p>{{ startup.mission }}</p>
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
                <p>{{ startup.description }}</p>
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
                    <div class="material-card Red">
                      <h2>
                        <div>My Guy</div>
                        <div>Co-Founder</div>
                      </h2>
                      <div class="mc-content">
                        <div class="img-container">
                          <img class="img-responsive" src="http://u.lorenzoferrara.net/marlenesco/material-card/thumb-christopher-walken.jpg">
                        </div>
                        <div class="mc-description">
                            He has appeared in more than 100 films and television shows, including The Deer Hunter, Annie Hall, The Prophecy trilogy, The Dogs of War ...
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
                <p>Location</p>
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
                <p>Next</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'manage-startup-edit',
  mounted() {
    this.getStartup();
  },
  data() {
    return {
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
  },
};
</script>
