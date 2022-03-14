<template>
  <div class="likes">
    <i class="fa fa-heart liked" @click="likeBtn"
      ><span>{{ likes }}</span></i
    >
  </div>
</template>

<script>
// import { ref, onMounted } from "vue";
// import { useStore } from "vuex";

export default {
  name: "Like",
  props: ["likes"],
  emits: ["like-click"],
  setup(_, { emit }) {
    // const store = useStore();

    // const like = ref(false);

    // const likes = ref(0);

    // onMounted(() => {
    //   store.dispatch("getLikes", props.currentBlogID).then(() => {
    //     if (store.state.likes.length !== 0) {
    //       likes.value = store.state.likes[0].like;
    //     } else {
    //       likes.value = 0;
    //     }
    //   });
    // });
    const likeBtn = () => {
      emit("like-click");
    };

    // const likeBtn = async () => {
    //   if (like.value === false) {
    //     like.value = true;
    //     await store.dispatch("addLike", props.currentBlogID);
    //     await store
    //       .dispatch("getLikes", props.currentBlogID)
    //       .then(() => (likes.value = store.state.likes[0].like));
    //   } else {
    //     like.value = false;
    //     await store.dispatch("deleteLike", props.currentBlogID);
    //     await store
    //       .dispatch("getLikes", props.currentBlogID)
    //       .then(() => (likes.value = store.state.likes[0].like));
    //   }
    // };

    return { likeBtn };
  },
};
</script>

<style scoped>
.liked {
  color: #660000;
  font-size: 50px;
  cursor: pointer;
}
.liked:hover {
  color: #e60000;
  font-size: 53px;
}
.liked span {
  font-size: 20px;
  font-weight: 800;
}
</style>
