<template>
  <div class="likes">
    <i class="fa fa-heart liked" @click="likeBtn">{{ likes }}</i>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  name: "Like",
  props: {
    currentBlogID: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const store = useStore();
    // store.state.likes;
    const like = ref(false);

    const likes = ref([]);

    onMounted(async () => {
      await store
        .dispatch("getLikes", props.currentBlogID)
        .then(() => (likes.value = store.state.likes[0].like));
    });

    const likeBtn = async () => {
      if (like.value === false) {
        like.value = true;
        await store.dispatch("addLike", props.currentBlogID);
        await store
          .dispatch("getLikes", props.currentBlogID)
          .then(() => (likes.value = store.state.likes[0].like));
      } else {
        like.value = false;
        await store.dispatch("deleteLike", props.currentBlogID);
        await store
          .dispatch("getLikes", props.currentBlogID)
          .then(() => (likes.value = store.state.likes[0].like));
      }
    };

    return { likeBtn, likes };
  },
};
</script>

<style scoped>
.liked {
  color: #660000;
  padding: 20px;
  font-size: 50px;
  cursor: pointer;
}
.liked:hover {
  color: #e60000;
  border: 1px solid #000;
  font-size: 53px;
}
</style>
