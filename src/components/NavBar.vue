<template>
  <div class="navbar"> 
    <div class="navbar-inner">
      <a class="logo" href="/">
        <img src="../assets/download.svg" alt="">
      </a>
      <ul>
        <li><a href="/">首页</a></li>
        <li><a href="/">新手入门</a></li>
        <li><a href="/">API</a></li>
        <li><a href="/">关于</a></li>
        <li><a href="/">注册</a></li>
        <li><a href="/">登录</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  font-size: 13px;
  list-style: none;
  text-decoration: none;
  color: #ccc;
}

.navbar{
  display: flex;
  align-content: center;
  background-color: #444;
  height: 50px;
}

.navbar-inner{
  display: flex;
  justify-content: space-between;
  margin: auto;
  width: 90%;
}

.logo {
  width: 120px;
  padding: 3px 20px;
  height: 34px;
  margin-left: -20px;
}

img{
  max-width: 120px;
  height: 100%
}

ul{
  display: flex;
  margin-right: -10px
}

li{
  padding: 10px 15px;
}
</style>