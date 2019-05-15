<template>
  <div class="wizard-step-2">
    <div class="form-group">
      <div for="">Startup Logo</div>
      <div class="dropbox">
        <input type="file" accept="image/*" ref="file" id="startup-image" @change="handFileUpload()" name="startup-logo" class="input-file">
        <p v-if="!imagePreview">Drag your file</p>
        <img :src="imagePreview">
      </div>
    </div>
    <div class="form-group">
      <label for="">Background Color</label>
      <slider-picker v-model="color" @input="updateColor" />
      <label for="">Color Preview</label>
      <div class="show-background-color ">
        <div class="card card-body"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { Slider } from 'vue-color';

export default {
  name: 'wizard-step-2',
  props: ['startup'],
  components: {
    'slider-picker': Slider,
  },
  data() {
    return {
      copyStartup: { ...this.startup },
      imagePreview: '',
      color: '',
    };
  },
  watch: {
    copyStartup: {
      handler(n) {
        this.copyStartup = n;
        this.updateWizard();
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    updateWizard() {
      this.$emit('updateWizard', this.copyStartup);
    },
    handFileUpload() {
      this.copyStartup.logo = this.$refs.file.files[0];
      let reader = new FileReader();

      reader.addEventListener('load', () => {
        this.imagePreview = reader.result;
      });

      if (this.copyStartup.logo) {
        if (/\.(jpe?g|png|gif)$/i.test(this.copyStartup.logo.name)) {
          reader.readAsDataURL(this.copyStartup.logo);
        }
      }
    },
    updateColor() {
      this.copyStartup = Object.assign({}, this.copyStartup, { background_color: this.color.hex });
      window.$('.card-body').css('background-color', this.color.hex);
      console.log(this.copyStartup);
    },
  },
};
</script>
