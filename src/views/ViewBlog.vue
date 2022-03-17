<template>
  <div class="post-view" v-if="currentBlog">
    <div class="container quillWrapper">
      <h2>{{ currentBlog[0].blogTitle }}</h2>
      <h4>
        Posted on:
        {{
          new Date(currentBlog[0].blogDate).toLocaleString("en-us", {
            dateStyle: "long",
          })
        }}
      </h4>
      <img :src="currentBlog[0].blogCoverPhoto" alt="" />
      <div class="likes" v-show="user">
        <Likes @like-click="likeClick" :likes="likes" />
      </div>

      <div
        class="post-content ql-editor"
        v-html="currentBlog[0].blogHTML"
      ></div>
    </div>
    <!-- <new-comment :currentBlogID="currentBlogID" /> -->
    <Comments :profileEmail="profileEmail" :currentBlogID="currentBlogID" />
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

import Comments from "../components/Comments.vue";
import Likes from "../components/Likes.vue";
export default {
  name: "ViewBlog",
  components: { Comments, Likes },
  setup() {
    const store = useStore();
    const route = useRoute();
    const currentBlog = ref(null);
    const currentBlogID = ref(route.params.blogid);
    const like = ref(false);
    const likes = ref([]);
    const countLikes = ref(0);

    const profileEmail = computed(() => {
      return store.state.profileEmail;
    });

    onMounted(async () => {
      currentBlog.value = await store.state.blogPosts.filter((post) => {
        return post.blogID === route.params.blogid;
      });
      store
        .dispatch("getLikes", {
          currentBlogID: currentBlogID.value,
          countLikes: countLikes.value,
        })
        .then(() => {
          if (store.state.likes.length !== 0) {
            likes.value = store.state.likes;
          } else {
          }
        });
    });

    const likeClick = async () => {
      //   if (store.state.likes[0].userEmail === store.state.profileEmail) {
      if (like.value === false) {
        like.value = true;

        await store.dispatch("addLike", {
          currentBlogID: currentBlogID.value,
          countLikes: countLikes.value,
        });
        // await store
        //   .dispatch("getLikes", {
        //     currentBlogID: currentBlogID.value,
        //     liked: liked.value,
        //   })
        //   .then(() => (likes.value = store.state.likes[0].like));
      } else {
        like.value = false;
        await store.dispatch("deleteLike", {
          currentBlogID: currentBlogID.value,
          countLikes: countLikes.value,
        });
        // await store
        //   .dispatch("getLikes", {
        //     currentBlogID: currentBlogID.value,
        //     liked: liked.value,
        //   })
        //   .then(() => (likes.value = store.state.likes[0].like));
      }
    };
    // };
    const user = computed(() => {
      return store.state.user;
    });

    return {
      currentBlog,
      currentBlogID,
      profileEmail,
      likeClick,
      countLikes,
      user,
      likes,
    };
  },
};
</script>

<style>
.quillWrapper {
  max-width: 600px;
  height: 100%;
  margin: 0 auto;
  overflow: hidden;
}
.likes {
  width: 150px;
  position: relative;
  left: 65%;
  top: -30px;
  display: block;
}
.container img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
.post-view h4 {
  font-weight: 400;
  font-size: 14px;
  margin-bottom: 24px;
}
@media (max-width: 500px) {
  .likes {
    left: 60%;
    top: -20px;
  }
}
@media (max-width: 400px) {
  .likes {
    left: 55%;
  }
}
</style>
