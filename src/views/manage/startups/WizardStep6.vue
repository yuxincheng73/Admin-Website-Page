<template>
  <div class="wizard-step-6">
    <helper-wizard :product="copyStartup.product_photos_attributes" @updateProduct="updateProduct"/>
    <div class="form-group">
      <div style="display: inline-block; margin-bottom: 20px;">Product Image</div>
      <div class="float-right" style="display: inline-block;">
        <a class="btn btn-danger" href="javascript:;" @click="addProduct">
          <i class="fas fa-plus"></i>
        </a>
      </div>
      <div class="product-group">
        <div class="product-file">
          <input type="file" accept="image/*" ref="file" id="startup-product" @change="handFileUpload()" name="startup-product" class="input-file">
          <p>Drag or Select Here</p>
          <a class="float-right" href="javascript:;" @click="removeProduct">
            <i class="fas fa-minus"></i>
          </a>
        </div>
        <div class="product-file dummy d-none">
          <input type="file" accept="image/*" ref="file" id="startup-product" @change="handFileUpload()" name="startup-product" class="input-file">
          <p>Drag or Select Here</p>
          <a class="float-right" href="javascript:;" @click="removeProduct">
            <i class="fas fa-minus"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Helper from './Helper-WizardStep6.vue';

export default {
  name: 'wizard-step-5',
  props: ['startup'],
  components: {
    'helper-wizard': Helper,
  },
  data() {
    return {
      copyStartup: { ...this.startup, product_photos_attributes: { description: 'blah' } },
    };
  },
  watch: {
    copyStartup: {
      handler(n) {
        if (n !== this.copyStartup) {
          this.copyStartup = n;
          this.updateWizard();
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    updateWizard() {
      this.copyStartup = Object.assign({}, this.copyStartup, this.product_photos_attributes);
      this.$emit('updateWizard', this.copyStartup);
    },
    updateProduct(data) {
      this.copyStartup.product_photos_attributes.description = data.description;
    },
    addProduct() {
      let newProduct = window.$('.product-file.dummy').clone();
      window.$('.product-group').append(newProduct.removeClass('dummy d-none'));
      window.$('.product-group').append(newProduct);
    },
    removeProduct(evt) {
      window.$(evt.target).closest('.product-file:not(.dummy)').remove();
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
  },
};
</script>
