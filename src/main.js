// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import rt from "./router/index";
import store from './state/index'
import axios from 'axios'

Vue.prototype.$http = axios;

Vue.config.productionTip = false;
/* eslint-disable no-new */

new Vue({
  el: "#app",
  router: rt,
  store,
  // store 为 es6语法，和 store: store 一样
  components: { App },
  template: "<App/>"
});
