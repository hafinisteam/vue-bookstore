import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "normalize.css";
// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "../src/assets/styles/main.scss";
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
Vue.config.productionTip = false;
import PortalVue from "portal-vue";
Vue.use(PortalVue);
import Vuelidate from "vuelidate";
Vue.use(Vuelidate);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
