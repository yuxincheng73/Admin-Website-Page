import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import vSelect from 'vue-select';
import wysiwyg from "vue-wysiwyg";


import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.component('v-select', vSelect);
Vue.use(wysiwyg, {});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');


Vue.watch_log = function(message) {
  if (!Vue.config.productionTip) {
    console.log(message);
  }
}

// Example of global search, need fixing
// Vue.search: function(loading, search, resource, vm) => {
//   fetch(
//     `url not shown/${resource}?q=${escape(search)}`
//   ).then(res => {
//     res.json().then(json => (vm.options = json.items));
//     loading(false);
//   });
// }