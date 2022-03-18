<template>
  <div class="likes">
    <i class="fa fa-heart" :class="likeColorChange" @click="likeBtn"
      ><span>{{ likes.length }}</span></i
    >
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "Like",
  props: ["likes"],
  emits: ["like-click"],
  setup(props, { emit }) {
    const store = useStore();

    const likesState = computed(() => {
      return props.likes.some(
        (like) => like.userEmail === store.state.profileEmail
      );
    });
    const likeColorChange = computed(() => {
      return likesState.value ? "liked" : "like";
    });

    const likeBtn = () => {
      emit("like-click");
    };

    return { likeBtn, likeColorChange };
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
