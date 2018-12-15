import Vue from 'vue';
import App from './App';

// bootstrap
import 'bootstrap/scss/bootstrap.scss'
import 'bootstrap'

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
});
