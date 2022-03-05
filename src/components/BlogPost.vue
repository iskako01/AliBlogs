<template>
  <div class="blog-wrapper" :class="{ 'no-user': !user }">
    <div class="blog-content">
      <div class="blog-photo">
        <img v-if="post.welcomeScreen" src="../assets/blogPhotos/coding.jpg" />
        <img v-else :src="post.blogCoverPhoto" />
      </div>
      <div>
        <h2 v-if="post.welcomeScreen">{{ post.title }}</h2>
        <h2 v-else>{{ post.blogTitle }}</h2>
        <p v-if="post.welcomeScreen">{{ post.blogPost }}</p>
        <p class="content-preview" v-else v-html="post.blogHTML"></p>
        <router-link
          class="link link-light"
          v-if="post.welcomeScreen"
          :to="{ name: '' }"
          >Login/Register<Arrow class="arrow arrow-light"
        /></router-link>
        <router-link
          class="link"
          v-else
          :to="{ name: 'ViewBlog', params: { blogid: post.blogID } }"
          >View The Post<Arrow class="arrow arrow-light"
        /></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import Arrow from "./svg/Arrow.vue";

export default {
  components: { Arrow },
  name: "blog-post",
  props: {
    post: {
      type: Object,
    },
  },
  setup() {
    const store = useStore();

    const user = computed(() => {
      return store.state.user;
    });
    return { user };
  },
};
</script>

<style scoped>
.blog-wrapper {
  margin: 20px 0 0 0;
  color: #fff;
  width: 100%;
  display: flex;
  flex-direction: column;
  /* box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06); */
}
.blog-content {
  margin: auto;
  max-width: 1000px;
  display: flex;
  background-color: #788;
  justify-content: center;
  align-items: center;
  flex: 4;
  order: 2;
}
.blog-content div {
  max-width: 410px;
  padding: 10px 15px;
}
.blog-content div h2 {
  font-size: 32px;
  font-weight: 300;
  text-transform: uppercase;
  margin-bottom: 15px;
}
.blog-content div p {
  font-size: 15px;
  font-weight: 300;
  line-height: 1.7;
}
.content-preview {
  font-size: 13px;
  max-height: 24px;
  width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.link {
  color: #fff;
  display: inline-flex;
  align-items: center;
  margin-top: 15px;
  padding-bottom: 4px;
  border-bottom: 1px solid transparent;
  transition: 0.5s ease-in all;
}
.link:hover {
  border-bottom-color: #303030;
}
.link-light:hover {
  border-bottom-color: #ffff;
}

.blog-photo {
  order: 1;
  flex: 3;
  box-shadow: 0 4px 6px -1px rgba(248, 245, 245, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.blog-photo:nth-child(even) .blog-content {
  order: 2;
}

.blog-photo:nth-child(even) .blog-photo {
  order: 1;
}

.no-user:first-child .blog-content {
  background-color: #303030;
  color: #fff;
}
.arrow {
  margin-left: 8px;
  width: 12px;
}
.arrow path {
  fill: #000;
}
/* .arrow-light {
  margin-left: 8px;
  width: 12px;
} */
.arrow-light path {
  fill: #fff;
}
@media (min-width: 700px) {
  .blog-wrapper {
    min-height: 650px;
    max-height: 650px;
    flex-direction: row;
  }
}
@media (min-width: 700px) {
  .blog-content {
    order: 1;
  }
}
@media (max-width: 550px) {
  .blog-content {
    flex-direction: column;
  }
}
@media (min-width: 800px) {
  .blog-content {
    flex: 3;
  }
}
@media (min-width: 700px) {
  .blog-content div {
    padding: 24px 24px;
  }
}
@media (min-width: 700px) {
  .blog-content div h2 {
    font-size: 40px;
  }
}
@media (min-width: 700px) {
  .blog-photo {
    order: 2;
  }
}
@media (min-width: 800px) {
  .blog-photo {
    flex: 4;
  }
}
</style>
