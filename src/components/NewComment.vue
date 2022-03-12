<template>
  <div class="commets">
    <form @keyup.enter="postComment">
      <div class="comments-field">
        <div class="profile">{{ profileInitials }}</div>
        <div class="comment-area">
          <div class="control">
            <textarea
              name="comment"
              autocomplete="true"
              v-model="comment"
              placeholder="Leave a comment"
            >
            </textarea>
          </div>
        </div>
        <div class="comment-submit">
          <button @click.prevent="postComment" type="submit">
            <Send />
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import Send from "../components/svg/Send.vue";

export default {
  name: "NewComment",
  components: { Send },
  props: {
    currentBlogID: {
      type: String,
      default: "",
    },
  },
  emits: ["post-comment"],
  setup(_, { emit }) {
    const store = useStore();
    const comment = ref("");
    const postComment = () => {
      if (comment.value !== "") {
        emit("post-comment", comment.value);
        comment.value = "";
      }
    };

    const profileInitials = computed(() => {
      return store.state.profileInitials;
    });

    return { postComment, profileInitials, comment };
  },
};
</script>

<style scoped>
.commets {
  display: blog;
  padding: 16px;
  margin: 0 auto;
  max-width: 1440px;
}
.comments-field {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.comment-area {
  display: blog;
  width: 100%;
}
.comment-submit {
  display: blog;
  padding-left: 30px;
}
textarea {
  border-radius: 10px;
  min-height: 41px;
  max-height: 100%;
  width: 100%;
  resize: none;
}
button {
  margin: 0;
  padding: 7px 20px;
}
.profile {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 41px;
  height: 41px;
  border-radius: 10px;
  color: #fff;
  background-color: #303030;
  margin-right: 10px;
}
</style>
