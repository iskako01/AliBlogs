<template>
  <div class="container">
    <ul class="comment-list">
      <Comment
        v-for="comment in comments"
        :key="comment.commentID"
        :comment="comment"
      />
    </ul>
  </div>
</template>

<script>
import Comment from "./Comment.vue";

export default {
  name: "Comments",
  components: { Comment },
  data() {
    return {
      comments: this.$store.state.comments,
    };
  },
  async mounted() {
    await this.$store.dispatch("getComments");

    // // use your own credentials you get from Pusher
    // const pusher = new Pusher("YOUR_PUSHER_APP_ID", {
    //   cluster: "YOUR_PUSHER_CLUSTER",
    //   encrypted: false,
    // });

    // // Subscribe to the channel we specified in our Adonis Application
    // const channel = pusher.subscribe("comment-channel");

    // channel.bind("new-comment", (data) => {
    //   this.$store.commit("addComment", data.comment);
    // });
  },
};
</script>

<style scoped>
.comment-list {
  padding: 1em 0;
  margin-bottom: 15px;
}
</style>
