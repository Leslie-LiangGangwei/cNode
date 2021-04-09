<template>
  <div class="pagination">
    <button class="panel" @click="changePage"><</button>
    <button class="panel" v-if="hidePage" @click="changePage(1)">1</button>
    <button class="panel" v-if="hidePage">...</button>
    <button class="panel" v-for="items in pageData" @click="changePage(items)" :class="{active: (items == currentPage)}">
        {{items}}
    </button>
    <button class="panel" @click="changePage">></button>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'Pagination',
  data(){
      return {
          pageData: [1, 2, 3, 4, 5, '...'],
          currentPage: 1,
          hidePage: false
      }
  },
  methods:{
      changePage(page){
        if(typeof page != 'number'){
            switch(page.target.innerText){
                case '<':
                    $('button.active').prev().click()
                break;
                case '>':
                    $('button.active').next().click()
                break;
            default:
            break
            }
            return
        }  
        this.currentPage = page
          if(page == this.pageData[3]){
              this.hidePage = true
              // 先把第一个元素移除
              this.pageData.shift()
              this.pageData.splice(4, 0, this.pageData[3]+1)
          }else if(page == this.pageData[4]){
              this.hidePage = true
              this.pageData.splice(5, 0, this.pageData[4]+1, this.pageData[4]+2)
              this.pageData.splice(0, 2)
          }else if(page == this.pageData[0] && page != 1 && page != 2){
              this.pageData.unshift(this.pageData[0]-1)
              this.pageData.splice(5, 1)
          }else if(page == 2){
              this.hidePage = false;
              this.pageData = [1, 2, 3, 4, 5, '...']
          }else if(page == 1){
              this.hidePage = false;
              this.pageData = [1, 2, 3, 4, 5, '...']
          }
        this.$emit('changePgae', this.currentPage)
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  font-size: 13px;
  list-style: none;
  text-decoration: none;
  color: #778087;
  outline: none; 
}

.pagination {
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px 32px 32px 16px;
}

.pagination .panel {
    margin-left: 16px;
    padding: 4px 10px; 
    border: 1px solid #e5e5e5;
    border-radius: 3px;
    background-color: #f4f4f5;
}

.pagination .panel:hover{
    background-color: #e5e5e5;
}

.pagination .active{
    background-color: #fff;
    color: #80bd01;
    font-weight: 800;
    border: 1.8px solid ;
}

.pagination .active:hover{
    background-color: #fff;
    color: #80bd01;
    font-weight: 800;
    border: 1.8px solid ;
}
</style>