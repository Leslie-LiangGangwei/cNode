<template>
  <div class="acticle">
    <div class="isLoading" v-if='isLoading'>
        <img src='../assets/loading-buffering.gif'></img>
    </div>
    <SlideBar/>
    <div class="content">
      <div class="panel">
        <div class='panel_content'>
          <div class="tilte_panel">
            <div :class="{tab_good: (topicData.good == true), tab_top: (topicData.top == true), tab_normal: (topicData.good != true && topicData.top != true)}"">{{topicData | tabFormatter}}</div>
            <div class="title">{{ topicData.title }}</div>
          </div>
          <div class="change">
            <span>• 发布于 {{ topicData.create_at | createNow }} </span>
            <router-link :to="{
              name: 'user_info',
              params: {
                loginname: topicData.author.loginname
              }
            }">
              <span>• 作者 {{ topicData.author.loginname }}</span>
            </router-link>
            <span>• {{ topicData.visit_count }} 次浏览</span>
            <span>• 最后一次编辑是 {{ topicData.last_reply_at | createNow }} </span>
            <span>• 来自 {{ topicData | tabFormat }} </span>
          </div>
          <div class="topic_content markdown-body" v-html='topicData.content'></div>
        </div>
      </div>
      <div class="panel" v-if='(topicData.reply_count)>0'>
        <div class="header">{{topicData.reply_count}} 回复</div>
        <div class="replies-use" v-for='(reply, index) in topicData.replies'>
          <router-link :to="{
            name: 'user_info',
            params: {
              loginname: reply.author.loginname
            }
          }"> 
            <img class='useImg' :src='reply.author.avatar_url'>
          </router-link>
          <div class="useDetail">
            <div class="useName">
              <div>
                <router-link :to="{
                  name: 'user_info',
                  params: {
                    loginname: reply.author.loginname
                  }
                }"> 
                  <span>{{reply.author.loginname}}</span>
                </router-link>
                <span class='replyIndex'>{{index + 1}}楼 • {{reply.create_at | createNow}}</span>
              </div>
              <div class="ups" v-if="reply.ups.length>0">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-zan"></use>
                </svg>
                {{reply.ups.length}}
              </div>
            </div>
            <div class="useContent markdown-body" v-html='reply.content'></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
import 'github-markdown-css/github-markdown.css'
import SlideBar from './SlideBar.vue'
export default {
  name: "Acticle",
  data() {
    return {
      topicData: {
        author:{
          loginname: {},
          avatar_url: {}
        }
      },
      isLoading: true,
    }
  },
  components: {
    SlideBar
  },
  methods: {
    gettopicData(){
      this.$http
        .get("https://cnodejs.org/api/v1/topic/" + this.$route.params.id)
        .then(res => {
          if(res.data.success == true){
            this.isLoading =false;
            this.topicData = res.data.data;
            console.log(res.data.data)
          }
        })
        .catch(err => {
          console.log(err);
        });
      }
  },
  beforeMount() {
    this.isLoading = true
    this.gettopicData()
  },
  watch: {
    '$route'(to, from){
      this.gettopicData()
    }
  }
};
</script>

<style>
.markdown-body {
    line-height: 30px  !important;
    margin: 0 auto;
    padding: 10px;
    font-size: 14px;
    color: #333;
}

.markdown-body li {
    margin-top: .35em !important;
  }

* {
  margin: 0px;
  padding: 0px;
  line-height: 20px;
  text-decoration: none;

}

.isLoading {
    display: flex;
    justify-content: center;
    height: 30px;
}

.acticle .tab_good{
    float: left;
    margin-top: 4px;
    height: 20px;
    background: #80bd01;
    margin-right: 8px;
    padding: 2px 4px;
    border-radius: 3px;
    color: #fff;
    font-size: 12px;
}

.acticle .tab_top{
    float: left;
    margin-top: 4px;
    height: 20px;
    background: #80bd01;
    margin-right: 8px;
    padding: 2px 4px;
    border-radius: 3px;
    color: #fff;
    font-size: 12px;
}

.acticle .tab_normal{
    float: left;
    margin-top: 4px;
    height: 20px;
    background: #e5e5e5;
    margin-right: 8px;
    padding: 2px 4px;
    border-radius: 3px;
    color: #999;
    font-size: 12px;    
}

.acticle {
    width: 90%;
    max-width: 1400px;
    min-width: 960px;
    margin: 15px auto;
    min-height: 400px;
}

.acticle .content {
    margin-right: 305px;
}

.panel {
  border-radius: 3px;
  background-color: #fff;
  margin-bottom: 15px;
}

.panel_content {
  padding: 10px;
}

.panel .tilte_panel {
  display: inline-block;
  margin: 8px 0;
}

.panel .title {
  display: inline;
  font-size: 22px;
  font-weight: 700;
  width: 100%;
  line-height: 130%;
}

.panel .change {
  font-size: 12px;
  color: #838383;
  margin-bottom: 10px;
}

.panel .change a {
  color: #838383
}

.panel .change a:hover{
  color: #08c;
}

.panel .topic_content {
  border-top: 1px solid #e5e5e5;
}

.header {
  padding: 10px;
  background-color: #f6f6f6;
  border-radius: 3px 3px 0 0;
  color: #444;
  font-size: 14px;
}

.panel .replies-use {
  display: flex;
  padding: 10px;
  border-top: 1px solid #f0f0f0;
}

.panel .replies-use .useImg {
  border-radius: 3px;
  height: 30px;
  width: 30px;
}

.panel .useDetail {
  width: 100%;
}

.panel .replies-use .useName {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 10px;
  color: #666;
  font-size: 12px;
}

.panel .replies-use .useName a{
  color: #666;
  font-size: 12px;
  font-weight: 700;
}


.panel .replies-use .replyIndex {
  font-size: 11px;
  color: #08c;
  font-weight: 400;
}

.panel .replies-use .ups {
  display: flex;
  align-items: center;
  color: gray;
  font-size: 15px;
  font-weight: 400;
}

.panel .icon{
  margin-right: 6px;
}

.panel .icon:hover{
  fill: #08c;
}
</style>
