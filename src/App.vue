<template>
  <div id="app">
    <img src="./assets/logo.png"/>
    <list/>
    <router-view></router-view>
  </div>
</template>

<script>
import list from "./components/list.vue";
import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",
  components: {
    HelloWorld,
    list
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
