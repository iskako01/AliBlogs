<template>
  <div class="likes">
    <i class="fa fa-heart like" @click="likeBtn"
      ><span>{{ likes }}</span></i
    >
  </div>
</template>

<script>
// import { computed } from "vue";
// import { useStore } from "vuex";
export default {
  name: "Like",
  props: ["likes"],
  emits: ["like-click"],
  setup(_, { emit }) {
    // const store = useStore();

    // const likesState = computed(() => {
    //   return store.state.likes;
    // });
    // const likeColorChange = computed(() => {
    //   return likesState.value.liked ? "like" : "liked";
    // });

    const likeBtn = () => {
      emit("like-click");
    };

    return { likeBtn };
  },
};
</script>

<style scoped>
.like {
  color: #660000;
  font-size: 50px;
  cursor: pointer;
}
.liked {
  color: #e60000;
  font-size: 50px;
  cursor: pointer;
}
.like:hover {
  color: #e60000;
}
span {
  font-size: 20px;
  font-weight: 800;
}
@media (max-width: 500px) {
  .like {
    font-size: 40px;
  }
  .liked {
    font-size: 40px;
  }
}
</style>
