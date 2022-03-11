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
      <div
        class="post-content ql-editor"
        v-html="currentBlog[0].blogHTML"
      ></div>
    </div>
    <Comments :profileEmail="profileEmail" :currentBlogID="currentBlogID" />
    <new-comment :currentBlogID="currentBlogID" />t>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

import Comments from "../components/Comments.vue";
import NewComment from "../components/NewComment.vue";
export default {
  name: "ViewBlog",
  components: { Comments, NewComment },
  setup() {
    const store = useStore();
    const route = useRoute();
    const currentBlog = ref(null);
    const currentBlogID = ref(route.params.blogid);

    const profileEmail = computed(() => {
      return store.state.profileEmail;
    });

    onMounted(async () => {
      currentBlog.value = await store.state.blogPosts.filter((post) => {
        return post.blogID === route.params.blogid;
      });
    });
    return { currentBlog, currentBlogID, profileEmail };
  },
};
</script>

<style>
.quillWrapper {
  max-width: 1000px;
  margin: 0 auto;
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
</style>
