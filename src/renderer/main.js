import Vue from 'vue';
import axios from 'axios';
import VueElectron from 'vue-electron';

import App from './App';
import router from './router';
import store from './store';

Vue.use(VueElectron);
// if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
}).$mount('#app');
