<template>
  <div class="slidebar">
    <div class="authorInfo">
      <div class="header">作者</div>
      <div class="gird">
        <div class="authorPanel">
          <img :src="authorData.avatar_url" />
          <span class="authorName">{{ authorData.loginname }}</span>
        </div>
        <div class="score">积分：{{ authorData.score }}</div>
        <div class="signature">“ 这家伙很懒，什么个性签名都没有留下。 ”</div>
      </div>
    </div>
    <div class="header">作者其它话题</div>
    <div class="gird">
      <div class="title" v-for="item in getTopics">
        <router-link
          :to="{
            name: 'post_content',
            params: {
              id: item.id,
              name: item.author.loginname
            }
          }"
        >
          <span>{{ item.title }}</span>
        </router-link>
      </div>
    </div>
    <div class="header">无人回复的话题</div>
    <div class="gird">
      <div class="title" v-for="item in getTopics">
        <router-link
          :to="{
            name: 'post_content',
            params: {
              id: item.id,
              name: item.author.loginname
            }
          }"
        >
          <span>{{ item.title }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SlideBar",
  data() {
    return {
      authorData: {}
    };
  },
  methods: {
    getAuthor() {
      this.$http
        .get("https://cnodejs.org/api/v1/user/" + this.$route.params.name)
        .then(res => {
          if (res.data.success == true) {
            this.authorData = res.data.data;
            console.log(this.authorData);
          }
        })
        .catch();
    }
  },
  computed: {
    getTopics() {
      if (this.authorData.recent_topics) {
        return this.authorData.recent_topics.slice(0, 5);
      }
    },
    getReply() {
      if (this.authorData.recent_replies) {
        return this.authorData.recent_replies.slice(0, 5);
      }
    }
  },
  beforeMount() {
    this.getAuthor();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  font-size: 13px;
  list-style: none;
  text-decoration: none;
  color: #333;
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

.slidebar .gird img {
  width: 48px;
  height: 48px;
  border-radius: 3px;
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
  margin-top: 8px;
  font-style: italic;
}

.slidebar .gird .title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 270px;
  font-size: 14px;
  color: #778087;
  line-height: 30px;
}
</style>
