<template>
  <div id="app">
    <NavBar/>
    <router-view name='main'></router-view>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import PostList from './components/PostList.vue'
import Article from './components/Article.vue'
import SlideBar from './components/SlideBar.vue'

export default {
  name: 'App',
  components: { 
    NavBar, PostList, Article, SlideBar
  }
}
</script>

<style>
* {
  margin: 0px;
  padding: 0px;
  word-break: break-word;
  line-height: 20px;
  font-family: "Helvetica Neue","Luxi Sans","DejaVu Sans",Tahoma,"Hiragino Sans GB","sans-serif";
}

.icon {
  width: 14px;
  height: 14px;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

body {
  background-color: #e1e1e1;
}
</style>
