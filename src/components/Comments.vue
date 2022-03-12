<template>
  <div class="container">
    <new-comment @post-comment="postComment" />
    <ul class="comment-list">
      <Comment
        v-for="comment in comments"
        :key="comment.date"
        :comment="comment"
      />
    </ul>
  </div>
</template>

<script>
import Comment from "./Comment.vue";
import NewComment from "./NewComment.vue";
import { ref, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  name: "Comments",
  components: { Comment, NewComment },
  props: {
    currentBlogID: {
      type: String,
      default: "",
    },
    profileEmail: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const store = useStore();
    const comments = ref([]);

    const postComment = async (comment) => {
      if (comment !== "") {
        await store.dispatch("addComment", {
          content: comment,
          currentBlogID: props.currentBlogID,
        });
        store
          .dispatch("getComments", props.currentBlogID)
          .then(() => {
            comments.value = store.state.comments;
            console.log(comments.value);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };

    onMounted(async () => {
      await store
        .dispatch("getComments", props.currentBlogID)
        .then(() => (comments.value = store.state.comments));
    });

    return { comments, postComment };
  },
};
</script>

<style scoped>
.comment-list {
  padding: 1em 0;
  margin-bottom: 15px;
}
</style>
