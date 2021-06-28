// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import "./assets/icon/iconfont.js";
import * as filters from "./filters";
import router from "./router";
import axios from "axios";
Vue.prototype.$http = axios;

Vue.config.productionTip = false;

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]); // 通过循环添加全局过滤器
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
