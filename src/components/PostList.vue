<template>
    <div class='content'>
        <div class="isLoading" v-if='isLoading'>
            <img src='../assets/loading-buffering.gif'></img>
        </div>
          <div class="header"> 
            <a href="" class='header_a selected'>全部</a>
            <a href="" class='header_a'>精华</a>
            <a href="" class='header_a'>分享</a>
            <a href="" class='header_a'>问答</a>
            <a href="" class='header_a'>招聘</a>
            <a href="" class='header_a'>客服端测试</a>
        </div>
        <div class="postlist">
            <ul>
                <li v-for="post in postData">
                    <div class='postlist_left'>
                        <router-link :to="{
                            name: 'user_info',
                            params: {
                                loginname: post.author.loginname
                            }
                        }">
                            <img :src="post.author.avatar_url"></img>
                        </router-link>
                        <div class='reply_grid'>
                            <span class='reply_count'>{{post.reply_count}}</span>
                            <span class='divider'>/</span>
                            <span class='visit_count'>{{post.visit_count}}</span>
                        </div>
                        <span :class="[{tab_good: (post.good == true), tab_top: (post.top == true), tab_normal: (post.good != true && post.top != true)}]">
                        {{post | tabFormatter}}
                        </span>
                        <router-link :to="{
                            name: 'post_content',
                            params: {
                                id: post.id,
                                name: post.author.loginname
                            }
                        }">
                            <span class='title'>{{post.title}}</span>
                        </router-link>        
                    </div>
                    <div class='postlist_right'>
                        <div v-show="(post.replyUseShow) === true">
                            <img :src='post.replyUse'></img>
                        </div>
                        <span class='create_at'>{{post.create_at | createNow}}</span>
                    </div>
                </li>
            </ul>
        </div>
        <Pagination @changePgae = "renderPage"></Pagination>

    </div>
</template>

<script>
import Pagination from './Pagination.vue'
export default {
  name: 'PostList',
  components: {Pagination},
  data(){
    return {
        isLoading: true,
        postData: '',
        replyData: '',
        getLimit: 20,
        getPage: 1,
    }
  },
  methods: {
    getpostData(){
        this.$http
        .get('https://cnodejs.org/api/v1/topics', {
            params:{
                limit: this.getLimit,
                page: this.getPage,
            }
        })
        .then(res=>{  
            if(res.data.success == true){
                this.isLoading =false;
                this.postData = res.data.data
            }
            this.getReply(this.getLimit)
            console.log(this.postData)
        })
        .catch(err=>{
            console.log(err)
        })
    },
    getReply(getLimit){
        for(let i = 0; i < getLimit; i++){
            let id = this.postData[i].id
            this.$http.get('https://cnodejs.org/api/v1/topic/' + id)
                .then(res=>{  
                    let lastUser = res.data.data.replies.pop()
                    if(!lastUser){
                        // this.postData[i].replyUseShow = false
                        this.$set(this.postData[i], 'replyUseShow', false)
                    }else{
                        // this.postData[i].replyUseShow = true
                        // this.postData[i].replyUse = lastUser.author.avatar_url
                        this.$set(this.postData[i], 'replyUseShow', true)
                        this.$set(this.postData[i], 'replyUse', lastUser.author.avatar_url)
                    }                    
                })
                .catch(err=>{
                    console.log(err)
                })
        }
    },
    renderPage(value){
        this.getPage = value
        this.getpostData()
    }
 },
    beforeMount(){
        this.isLoading = false
        this.getpostData()
    }, 
    watch: {
      '$route'(to, from){
          this.getpostData()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
    font-size: 16px;
    list-style: none;
    text-decoration: none;
    color: #333;
}

.content {
    margin: 15px auto;
    width: 90%;
}

.isLoading {
    display: flex;
    justify-content: center;
    height: 30px;
}

.header {
    margin: auto;
    padding: 10px;
    border-radius: 3px 3px 0 0;
    background-color: #f6f6f6;
}

.header .header_a{
    font-size: 14px;
    margin: auto 10px;
    color: #80bd01;
    line-height: 20px;
}

.header .header_a:hover{
    color: #08c;
}

.header .selected:hover{
    color: #fff;
}

.header .selected{
    padding: 2px 6px;
    border-radius: 3px;
    background-color: #80bd01;
    color: #fff;
}

.postlist li{
    display: flex;
    justify-content: space-between;
    margin: auto;
    border-top: 1px solid #f0f0f0;
    padding: 10px;
    background-color: #fff;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
}

.postlist li:hover {
    background-color: #f6f6f6;
}

.postlist a:hover {
    color: #333;
    text-decoration:underline;
}

.postlist_left {
    display: flex;
    align-items: center;
    width:  70%;
}

.postlist_left img {
    height: 30px;
    width: 30px;
    border-radius: 3px;
}

.postlist_left .reply_grid {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 70px !important;
    font-size: 14px;
}

.postlist_left .reply_count{
    color: #9e78c0;
}

.postlist_left .divider{
    color: #333;
    font-size: 10px;
    margin: 0 1px;
}

.postlist_left .visit_count{
    font-size: 10px;
    color: #b4b4b4;
}

.postlist_left a {
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
}

.postlist_left .title{
    max-width: 70%;
    font-size: 16px;
    color: #333;
}

.tab_good{
    background: #80bd01;
    margin-right: 8px;
    padding: 2px 4px;
    border-radius: 3px;
    color: #fff;
    font-size: 12px;
}

.tab_top{
    background: #80bd01;
    margin-right: 8px;
    padding: 2px 4px;
    border-radius: 3px;
    color: #fff;
    font-size: 12px;
}

.tab_normal{
    background: #e5e5e5;
    margin-right: 8px;
    padding: 2px 4px;
    border-radius: 3px;
    color: #999;
    font-size: 12px;    
}


.postlist_right {
    display: flex;
    align-items: center;
}

.postlist_right img {
    margin-right: 20px;
    height: 18px;
    width: 18px;
    border-radius: 3px;
}

.postlist_right .create_at{
    min-width: 50px;
    text-align: center;
    font-size: 11px;
    color: #778087;
}
</style>