<template>
  <div class="hello">
    <button @click='getData'>点击获取数据</button>
    <ul>
      <li v-for='item in items'>{{item.title}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloEarth',
  data () {
    return {
      msg: 'HelloEarth',
      items: '[]'
    }
  },
  methods: { 
    getData: function(){
      this.$http.get('https://cnodejs.org/api/v1/topics',{
        params:{
          page: 1,
          limit: 20
      }})
      // 成功后，如何处理 res（数据）
      .then(res=>{
        this.items = res.data.data
        console.log(res.data.data)
      })
      // 失败后，如何处理
      .catch(err=>{
        console.log(err)
      })
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
  color:  blue;
}
</style>
