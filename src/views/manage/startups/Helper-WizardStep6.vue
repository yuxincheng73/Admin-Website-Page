<template>
  <div class="helper-wizard-step-6">
    <div class="form-group">
      <div>What does your product solve?</div>
      <textarea v-model="copyProduct.description" name="" id="" cols="30" rows="10" placeholder="What is the problem(s) that you are trying to solve? What makes your offering special"></textarea>
    </div>
  </div>
</template>

<script>
export default {
  name: 'helper-wizard-step-6',
  props: ['product'],
  data() {
    return {
      copyProduct: { ...this.product },
    };
  },
  beforeDestroy() {
    this.$emit('updateProduct', this.copyProduct);
  },
};
</script>
