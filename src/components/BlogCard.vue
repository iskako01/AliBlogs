<template>
  <div class="blog-card">
    <div class="icons">
      <div class="icon">
        <Edit class="icon" />
      </div>
      <div class="icon">
        <Delete class="delete" />
      </div>
    </div>
    <img :srs="`../assets/blogCards/${post.photo}.jpg`" />
    <div class="info">
      <h4>{{ post.blogTitle }}</h4>
      <h6>Posted on:{{ post.blogTitle }}</h6>
      <router-link class="link" to="#"
        >View the Post <Arrow class="arrow" />
      </router-link>
    </div>
  </div>
</template>

<script>
// import { ref } from "vue";
import Arrow from "./svg/Arrow.vue";
import Edit from "./svg/Edit.vue";
import Delete from "./svg/Delete.vue";

export default {
  components: { Arrow, Edit, Delete },
  name: "blog-card",
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
.blog-card {
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background-color: #fff;
  min-height: 420px;
  transition: 0.5s ease all;
}
.blog-card:hover {
  transform: rotateZ(-1deg) scale(1.01);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
.icons {
  display: flex;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 99;
}
.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: #fff;
  transition: 0.5s ease all;
}

.icon:hover {
  background-color: #303030;
}
.icon:hover .edit path {
  fill: #fff;
}
.icon:hover .delete path {
  fill: #fff;
}
.icon:nth-child(1) {
  margin-right: 8px;
}
.edit,
.delete {
  pointer-events: none;
  height: 15px;
  width: auto;
}
.blog-card img {
  display: block;
  border-radius: 8px 8px 0 0;
  z-index: 1;
  width: 100%;
  min-height: 200px;
  object-fit: cover;
}
.info {
  display: flex;
  flex-direction: column;
  height: 100%;
  z-index: 3;
  padding: 32px 16px;
  color: #000;
}
h4 {
  padding-bottom: 8px;
  font-size: 20px;
  font-weight: 300;
}
h6 {
  font-weight: 400;
  font-size: 12px;
  padding-bottom: 16px;
}
.link {
  display: inline-flex;
  align-items: center;
  margin-top: auto;
  font-weight: 500;
  padding-top: 20px;
  font-size: 12px;
  padding-bottom: 4px;
  transition: 0.5s ease-in all;
}
.link .arrow {
  width: 10px;
}
.link:hover {
  color: rgba(48, 48, 48, 0.8);
}
</style>
