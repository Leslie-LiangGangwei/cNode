import Vue from "vue";
import HelloWorld from '../components/HelloWorld'
import HelloEarth from '../components/HelloEarth'
import router from "vue-router";

Vue.use(router);

export default new router({
  routes: [
    {
      name:'HelloWorld',
      path: "/HelloWorld", // 指定要跳转的路径
      component: HelloWorld, // 指定要跳转的组件
      props: (route) => ({ query: route.query.worldmsg }) 
    },
    {
        path: "/HelloEarth", // 指定要跳转的路径
        component: HelloEarth // 指定要跳转的组件
    },
    // { path: '/search', component: HelloWorld, props: (route) => ({ query: route.query.q }) }
  ]
});