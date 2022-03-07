<template>
  <li class="comment-wrapper animate slideInLeft">
    <div class="profile"><img :src="avatar" alt="" /></div>
    <div class="msg has-shadow">
      <div class="msg-body">
        <p class="name">
          {{ comment.author }} <span class="date"> {{ posted_at }} </span>
        </p>
        <p class="content">{{ comment.content }}</p>
      </div>
    </div>
  </li>
</template>
<script>
export default {
  name: "Comment",
  props: ["comment"],
  //   computed: {
  //     posted_at() {
  //       return moment(this.comment.created_at).format("MMMM Do YYYY");
  //     },
  //     avatar() {
  //       return `https://api.adorable.io/avatars/48/$ {this.comment.author} @ adorable.io.png`;
  //     },
  //   },
};
</script>
<style scoped>
.comment-wrapper {
  list-style: none;
  text-align: left;
  overflow: hidden;
  margin-bottom: 2em;
  padding: 0.4em;
}
.comment-wrapper .profile {
  width: 80px;
  float: left;
}

.comment-wrapper .msg-body {
  padding: 0.8em;
  color: #666;
  line-height: 1.5;
}

.comment-wrapper .msg {
  width: 86%;
  float: left;
  background-color: #fff;
  border-radius: 0 5px 5px 5px;
  position: relative;
}
.comment-wrapper .msg::despues de {
  content: "";
  position: absolute;
  left: -13px;
  top: 0;
  border: 14px solid transparent;
  border-top-color: #fff;
}

.comment-wrapper .date {
  float: right;
}
.comment-wrapper .name {
  margin: 0;
  color: #999;
  font-weight: 700;
  font-size: 0.8em;
}

.comment-wrapperp:last-child {
  margin-top: 0.6em;
  margin-bottom: 0;
}
</style>
