<template>
  <div class="blog-wrapper">
    <div class="blog-content">
      <div>
        <h2 v-if="post.welcomeScreen">{{ post.title }}</h2>
        <h2 v-else>{{ post.title }}</h2>
        <p v-if="post.welcomeScreen">{{ post.blogPost }}</p>
        <p class="content-preview" v-else>{{ post.blogPost }}</p>

        <router-link
          class="link link-light"
          v-if="post.welcomeScreen"
          :to="{ name: '' }"
          >Login/Register<Arrow class="arrow arrow-light"
        /></router-link>
        <router-link class="link link-light" v-else :to="{ name: '' }"
          >View The Post<Arrow class="arrow"
        /></router-link>
      </div>
      <div class="blog-photo">
        <img
          v-if="post.welcomeScreen"
          :srs="`../assets/blogPhotos/${post.photo}.jpg`"
        />
      </div>
    </div>
  </div>
</template>

<script>
// import { ref } from "vue";
import Arrow from "./svg/Arrow.vue";

export default {
  components: { Arrow },
  name: "blog-post",
  props: {
    post: {
      type: Object,
      default: () => {},
    },
  },
  setup() {
    return {};
  },
};
</script>

<style scoped>
.arrow {
  color: #000000;
}
.arrow-light {
  color: #000000;
}
.blog-wrapper {
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  @media (min-width: 700px) {
    min-height: 650px;
    max-height: 650px;
    flex-direction: row;
  }
}
.blog-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 4;
  order: 2;
  @media (min-width: 700px) {
    order: 1;
  }
  @media (min-width: 800px) {
    flex: 3;
  }
}
.blog-content div {
  max-width: 375px;
  padding: 72px 24px;
  @media (min-width: 700px) {
    padding: 0 24px;
  }
}
.blog-content div h2 {
  font-size: 32px;
  font-weight: 300;
  text-transform: uppercase;
  margin-bottom: 24px;
  @media (min-width: 700px) {
    font-size: 40px;
  }
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
  display: inline-flex;
  align-items: center;
  margin-top: 32px;
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
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  @media (min-width: 700px) {
    order: 2;
  }
  @media (min-width: 800px) {
    flex: 4;
  }
}
.blog-photo img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.blog-photo:nth-child(even).blog-content {
  order: 2;
}

.blog-photo:nth-child(even).blog-photo {
  order: 1;
}

.no-user:first-child.blog-content {
  background-color: #303030;
  color: #fff;
}
</style>
