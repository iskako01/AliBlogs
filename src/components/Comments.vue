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
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "Comments",
  components: { Comment },
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

    const currentComments = () => {
      comments.value = store.getters.comments.filter(
        (comment) => comment.commentID === props.currentBlogID
      );
    };

    store
      .dispatch("getComments", props.currentBlogID)
      .then(() => currentComments());

    return { comments };
  },
};
</script>

<style scoped>
.comment-list {
  padding: 1em 0;
  margin-bottom: 15px;
}
</style>
