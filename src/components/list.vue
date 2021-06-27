<template>
  <div>
    <ul>
        <li>
            <router-link :to ="{name: 'HelloWorld', query:{worldmsg: '你好世界!'}}">HelloWorld</router-link>
        </li>
        <li>
            <router-link to ='/HelloEarth'>HelloEarth</router-link>
        </li>
    </ul>    
  </div>
</template>

<script>
export default {
  name: 'list',
  data () {
    return {
      msg: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  list-style: none;
}
</style>
