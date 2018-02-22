import Vue from 'vue';
import App from './App.vue';
import Vuetify from 'vuetify';
import Vuelidate from 'vuelidate';

Vue.use(Vuetify);
Vue.use(Vuelidate);

new Vue({
  el: '#app',
  render: h => h(App)
})
