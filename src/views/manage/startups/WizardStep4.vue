<template>
  <div class="wizard-step-4">
    <div class="main-timeline">
      <a href="javascript:;" class="timeline" @click="selectStage">
        <div class="timeline-icon"><i @click="selectStage" class="fas fa-lightbulb"></i></div>
        <div class="timeline-content">
          <h3 class="title">Idea</h3>
          <p class="description">Concept And Business Plan, Team May Be Incomplete</p>
        </div>
      </a>
      <a href="javascript:;" class="timeline" @click="selectStage">
        <div class="timeline-icon"><i class="fas fa-address-book"></i></div>
        <div class="timeline-content">
          <h3 class="title flip">Validation</h3>
          <p class="description flip">Idea Is Formed, Project Read To Launch</p>
        </div>
      </a>
      <a href="javascript:;" class="timeline" @click="selectStage">
        <div class="timeline-icon"><i class="fas fa-wrench"></i></div>
        <div class="timeline-content">
          <h3 class="title">Adoption</h3>
          <p class="description">Have Paying Customers, Adapt to Market</p>
        </div>
      </a>
      <a href="javascript:;" class="timeline" @click="selectStage">
        <div class="timeline-icon"><i class="fas fa-level-up-alt"></i></div>
        <div class="timeline-content">
          <h3 class="title flip">&nbsp;&nbsp;&nbsp;Growing</h3>
          <p class="description flip">Growing Company And Users</p>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'wizard-step-4',
  props: ['startup'],
  data() {
    return {
      copyStartup: { ...this.startup },
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
    highlightElement(element) {
      element.classList.toggle('active');
      if (element.previousSibling) {
        this.highlightElement(element.previousSibling);
      }
    },
    removeAllHighlights(target, parent) {
      for (let i = parent.childNodes.length - 1; i >= 0; i--) {
        parent.childNodes[i].classList.remove('active');
      }
    },
    selectStage(evt) {
      console.log(evt);
      console.log(evt.target.parentNode)
      this.copyStartup = Object.assign({}, this.copyStartup, )
      this.removeAllHighlights(evt.target, evt.target.parentNode);
      this.highlightElement(evt.target);
    },
  },
};
</script>
