<template>
  <div class="hello">
    这是通过 this.$store.state.num 拿到的数据---{{this.$store.state.num}}
    <br>
    这是通过 this.$store.getters.getNum 拿到的数据---{{this.$store.getters.getNum}}
    <br>
    <button @click='add'>增加从 vuex 拿到的数据</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'HelloWorld'
    }
  },
  methods: {
    add(){
      this.$store.dispatch('increaseAction')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
* {
  color:  red;
}
</style>
