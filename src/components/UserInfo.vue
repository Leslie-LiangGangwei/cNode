<template>
	<div class="userinfo">
  	<div class="isLoading" v-if='isLoading'>
    	<img src='../assets/loading-buffering.gif'></img>
		</div>
		<div class="slidebar">
			<div class="authorInfo">
				<div class="header">个人信息</div>
				<div class="gird">
					<div class="authorPanel">
						<img :src="userData.avatar_url"/>
						<span class="authorName">{{ userData.loginname }}</span>
					</div>
					<div class="score">积分：{{ userData.score }}</div>
					<div class="signature">“ 这家伙很懒，什么个性签名都没有留下。 ”</div>
				</div>
				<div class="header">友情社区</div>
				<div class="gird">
					<a href="https://ruby-china.org/" class="inner">
						<img src="../assets/ruby-china-20150529.png">
					</a>
					<a href="https://golangtc.com/" class="inner">
						<img src="../assets/golangtc-logo.png">
					</a>
					<a href="https://learnku.com/laravel" class="inner">
						<img src="../assets/phphub-logo.png">
					</a>
				</div>
				<div class="header">客户端二维码</div>
				<div class="gird">
					<div class="inner qrcode">
						<img src="../assets/FtG0YVgQ6iginiLpf9W4_ShjiLfU.png" alt="">
						<a href="https://github.com/soliury/noder-react-native">客户端源码地址</a>
					</div>
				</div>
    	</div>
  	</div>
		<div class="content">
			<div class="header">
				<router-link :to="{
					name: 'root',
				}">
					主页 /
				</router-link>
			</div>
			<div class="panel">
				<div class="uesrPanel">
					<img :src="userData.avatar_url" >
					<span>{{userData.loginname}}</span>
				</div>
				<div class="score">{{userData.score}} 积分</div>
				<a class="git-link" :href="'https://github.com/' + userData.githubUsername">
					<div>
						<svg class="icon" aria-hidden="true">
							<use xlink:href="#icon-github"></use>
						</svg> 
					</div>
					<div class="gitUse">@{{userData.githubUsername}}</div>
				</a>
				<div class="createTime">注册时间 {{userData.create_at | createNow }}</div>
			</div>
			<div class="header">最近创建的话题</div>
			<div class="recent" v-for="item in userData.recent_replies">
				<div class='postlist_left'>
				<router-link :to="{
					name: 'user_info',
					params: {
						loginname: item.author.loginname
					} 
				}">
					<img :src="item.author.avatar_url"></img>
				</router-link>
				<div class='reply_grid'>
					<span class='reply_count'>{{item.reply_count}}</span>
					<span class='divider'>/</span>
					<span class='visit_count'>{{item.visit_count}}</span>
				</div>
				<span :class="[{tab_good: (item.good == true), tab_top: (item.top == true), tab_normal: (item.good != true && item.top != true)}]">
					{{item | tabFormatTop}}
				</span>
				<router-link class='title' :to="{
					name: 'post_content',
					params: {
						id: item.id,
						name: item.author.loginname
					}
				}">
				<span>{{item.title}}</span>
				</router-link>        
				</div>
				<div class='postlist_right'>
				<router-link :to="{
					name: 'post_content',
					params: {
						id: item.id,
						name: item.author.loginname
					}
				}">
					<div v-show="(item.replyUseShow) === true">
						<img :src='item.replyUseImg'></img>
					</div>
					<span class='create_at'>{{item.last_reply_at | createNow}}</span>
				</router-link>
				</div>
			</div>
			<div class="lastrecent">查看更多»</div>
			<div class="header">最近参与的话题</div>
			<div class="recent" v-for="item in userData.recent_topics">
				<div class='postlist_left'>
				<router-link :to="{
					name: 'user_info',
					params: {
						loginname: item.author.loginname
					} 
				}">
					<img :src="item.author.avatar_url"></img>
				</router-link>
				<div class='reply_grid'>
					<span class='reply_count'>{{item.reply_count}}</span>
					<span class='divider'>/</span>
					<span class='visit_count'>{{item.visit_count}}</span>
				</div>
				<span :class="[{tab_good: (item.good == true), tab_top: (item.top == true), tab_normal: (item.good != true && item.top != true)}]">
					{{item | tabFormatTop}}
				</span>
				<router-link class="title" :to="{
					name: 'post_content',
					params: {
						id: item.id,
						name: item.author.loginname
					}
				}">
					<span>{{item.title}}</span>
				</router-link>        
				</div>
				<div class='postlist_right'>
				<router-link :to="{
					name: 'post_content',
					params: {
						id: item.id,
						name: item.author.loginname
					}
				}">
					<div v-show="(item.recentUseShow) === true">
						<img :src='item.recentUseImg'></img>
					</div>
					<span class='create_at'>{{item.last_reply_at | createNow}}</span>
				</router-link>
				</div>
			</div>
			<div class="lastrecent">查看更多»</div>
  	</div>
	</div>
</template>

<script>
export default {
  name: "UserInfo",
  data() {
    return {
			isLoading: true,
      userData: {}
    };
  },
  methods: {
    getAuthor() {
      this.$http.get("https://cnodejs.org/api/v1/user/" + this.$route.params.loginname)
        .then(res => {
          if (res.data.success == true) {
            this.isLoading =false;
            this.userData = res.data.data;
            // console.log(this.userData);
						var maxTopicsReply = this.getMax(this.userData.recent_replies)
						var maxTopicsRecent = this.getMax(this.userData.recent_topics)
						this.getTopicsReply(maxTopicsReply)
						this.getTopicsRecent(maxTopicsRecent)
						// console.log(this.userData.recent_topics.length)
						console.log(this.userData);
          }
        })
        .catch();
    },
		getMax(num){
			if(num.length > 5){
				num.splice(5)
				return num.length
			}else{
				return num.length
			}
		},
		getTopicsReply(max){
			for(let i = 0; i < max; i++){
				let id = this.userData.recent_replies[i].id
				this.$http.get('https://cnodejs.org/api/v1/topic/' + id)
				.then(res=>{
					let ReplyData = res.data.data
					let LastreplyData = res.data.data.replies.pop()
					if(!LastreplyData){
						this.$set(this.userData.recent_replies[i], 'replyUseShow', false)
					}else{
						this.$set(this.userData.recent_replies[i], 'replyUseShow', true)
						this.$set(this.userData.recent_replies[i], 'replyUseImg', ReplyData.author.avatar_url)
					}
					this.$set(this.userData.recent_replies[i], 'good', ReplyData.good)
					this.$set(this.userData.recent_replies[i], 'top', ReplyData.top)
					this.$set(this.userData.recent_replies[i], 'reply_count', ReplyData.reply_count)
					this.$set(this.userData.recent_replies[i], 'visit_count', ReplyData.visit_count)
				})
				.catch(err=>{
					console.log(err)
				})
			}
		},
		getTopicsRecent(max){
			for(let i = 0; i < max; i++){
				let id = this.userData.recent_topics[i].id
				this.$http.get('https://cnodejs.org/api/v1/topic/' + id)
				.then(res=>{
					let RecentData = res.data.data
					let LastRecentData = res.data.data.replies.pop()
					if(!LastRecentData){
						this.$set(this.userData.recent_topics[i], 'recentUseShow', false)
					}else{
						this.$set(this.userData.recent_topics[i], 'recentUseShow', true)
						this.$set(this.userData.recent_topics[i], 'recentUseImg', LastRecentData.author.avatar_url)
					}
					this.$set(this.userData.recent_topics[i], 'good', RecentData.good)
					this.$set(this.userData.recent_topics[i], 'top', RecentData.top)
					this.$set(this.userData.recent_topics[i], 'reply_count', RecentData.reply_count)
					this.$set(this.userData.recent_topics[i], 'visit_count', RecentData.visit_count)
				})
				.catch(err=>{
					console.log(err)
				})
			}
		}
  },
  beforeMount() {
    this.getAuthor();
  },
  watch: {
    '$route'(to, from){
      this.getAuthor();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  margin: 0px;
  padding: 0px;
  line-height: 20p;
	text-decoration: none;
}

.isLoading {
    display: flex;
    justify-content: center;
    height: 30px;
}

.userinfo {
	width: 90%;
	max-width: 1400px;
	min-width: 960px;
	margin: 15px auto;
	min-height: 400px;
}

.userinfo .content {
	margin-right: 305px;
}

.header{
	padding: 10px;
  background-color: #f6f6f6;
  border-radius: 3px 3px 0 0;
  color: #444;
  font-size: 14px;
}

.userinfo .header a{
  color: #80bd01;
}

.userinfo .panel {
	padding: 10px;
  border-top: 1px solid #e5e5e5;
	border-radius: 3px;
  background-color: #fff;
  margin-bottom: 16px;
	padding-bottom: 24px;
}

.userinfo .uesrPanel {
	display: flex;
	font-size: 14px;
	color: #778087;
}

.userinfo .panel img {
	border-radius: 3px;
	margin-right: 10px;
	width: 40px;
	height: 40px;
}

.userinfo .panel span {
	display: flex;
	padding-top: 6px;
}

.userinfo .panel .score {
	margin-top: 12px;
	font-size: 14px;
	color: #333;
}

.userinfo .panel .git-link {
	display: flex;
	align-items: center;
	margin-top: 12px;
	color: #778087;
  text-decoration: none;
	width: 16px;
	height: 16px;
}

.userinfo .panel .git-link:hover{
	color: #08c;
}

.userinfo .panel .git-link .icon {
	width: 20px;
	height: 20px;
}

.userinfo .panel .gitUse {
		white-space: nowrap !important;
	margin-left: 4px;
}

.userinfo .panel .createTime {
	color: #ababab;
	font-size: 14px;
	margin-top: 12px;
}

.userinfo .recent{
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

.userinfo .recent:hover {
    background-color: #f6f6f6;
		color: #005880;
}

.userinfo .recent .postlist_left {
    display: flex;
    align-items: center;
    width:  70%;
}

.userinfo .recent .postlist_left img{
		height: 30px;
    width: 30px;
    border-radius: 3px;
}

.userinfo .recent .postlist_left .reply_grid {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 70px !important;
    font-size: 14px;
}

.userinfo .recent .postlist_left .reply_count{
    color: #9e78c0;
}

.userinfo .recent .postlist_left .divider{
    color: #333;
    font-size: 10px;
    margin: 0 1px;
}

.userinfo .recent .postlist_left .visit_count{
    font-size: 10px;
    color: #b4b4b4;
}

.userinfo .recent .postlist_left .title{
		white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    max-width: 90%;
    font-size: 16px;
    color: #08c;
}

.userinfo .recent .postlist_left .title:hover {
    color: #005880;
    text-decoration:underline;
}

.userinfo .recent .postlist_left .tab_good{
    background: #80bd01;
    margin-right: 8px;
    padding: 2px 4px;
    border-radius: 3px;
    color: #fff;
    font-size: 12px;
}

.userinfo .recent .postlist_left .tab_top{
    background: #80bd01;
    margin-right: 8px;
    padding: 2px 4px;
    border-radius: 3px;
    color: #fff;
    font-size: 12px;
}

.userinfo .recent .postlist_right {
    display: flex;
    align-items: center;
}

.userinfo .recent .postlist_right a {
	display: flex;
	flex-direction: row;
}

.userinfo .recent .postlist_right a :hover{
	color: #08c;
}

.userinfo .recent .postlist_right img {
    margin-right: 20px;
    height: 18px;
    width: 18px;
    border-radius: 3px;
}

.userinfo .recent .postlist_right .create_at{
    min-width: 50px;
    text-align: center;
    font-size: 11px;
    color: #778087;
}

.userinfo .lastrecent{
	border-radius:  0 0 3px 3px;
	border-top: 1px solid #f0f0f0;
	font-size: 14px;
	color: #666;
	background-color: #fff;
	padding: 10px;
	margin-bottom: 16px;
}

.userinfo .lastrecent:hover{
	color: #08c;
}

.slidebar {
  float: right;
  width: 290px;
  font-size: 14px;
  margin-bottom: 20px;
}

.slidebar .gird {
  padding: 10px;
  margin-bottom: 16px;
  background-color: #fff;
  border-radius: 0 0 3px 3px;
}

.slidebar .gird .authorPanel {
  display: flex;
  align-items: center;
}

.slidebar .gird .authorPanel img {
  width: 48px;
  height: 48px;
  border-radius: 3px;
}

.slidebar .gird .inner {
	display: flex;
	flex-direction: column;
	padding-bottom: 10px;
}

.qrcode {
	align-items: center;
}

.qrcode a{
	padding-top: 10px;
	text-decoration: none;
	color: #778087;
	font-size: 13px;
}

.qrcode a:hover {
	text-decoration: underline;
	color: #08c;
}

.slidebar .gird .inner img {
	width: 150px;	
}

.slidebar .gird .authorName {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-decoration: none;
  color: #778087;
  margin-left: 12px;
  font-size: 16px;
}

.slidebar .gird .score {
  margin-top: 10px;
  font-size: 14px;
  color: #333;
}

.slidebar .gird .signature {
	font-size: 13px;
  margin-top: 8px;
  font-style: italic;
}

.slidebar .gird .title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 270px;
  font-size: 14px;
  color: #51585c;
  line-height: 30px;
}
</style>
