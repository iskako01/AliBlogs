<template>
  <footer>
    <div class="container">
      <div class="left">
        <div class="col-1">
          <router-link class="header" :to="{ name: 'Home' }"
            >AliBlogs</router-link
          >
          <ul>
            <li>
              <a href="#"><YouTube class="svg-icon" /></a>
            </li>
            <li>
              <a href="#"><Twitter class="svg-icon" /></a>
            </li>
            <li>
              <a href="#"><Instagram class="svg-icon" /></a>
            </li>
            <li>
              <a href="#"><Linkedin class="svg-icon" /></a>
            </li>
          </ul>
        </div>
        <div class="col-2">
          <ul>
            <router-link class="link" :to="{ name: 'Home' }">Home</router-link>
            <router-link class="link" :to="{ name: 'Blogs' }"
              >Blogs</router-link
            >
            <router-link v-if="admin" class="link" :to="{ name: 'CreatePost' }"
              >Create Post</router-link
            >
            <router-link v-if="!user" class="link" :to="{ name: 'Login' }"
              >Login In / Register</router-link
            >
          </ul>
        </div>
      </div>
      <div class="right">
        <p>Copyright 2021 All Rights Reserved</p>
      </div>
    </div>
  </footer>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import YouTube from "./svg/YouTube.vue";
import Twitter from "./svg/Twitter.vue";
import Instagram from "./svg/Instagram.vue";
import Linkedin from "./svg/Linkedin.vue";
export default {
  name: "footer-vue",
  components: {
    YouTube,
    Twitter,
    Instagram,
    Linkedin,
  },
  setup() {
    const store = useStore();
    const user = computed(() => {
      return store.state.user;
    });
    const admin = computed(() => {
      return store.state.profileAdmin;
    });

    return { user, admin };
  },
};
</script>

<style scoped>
footer {
  margin-top: auto;
  padding: 100px 25px;
  background-color: #303030;
}
footer .container {
  display: flex;
  flex-direction: column;
  gap: 32px;
  @media (min-width: 800px) {
    flex-direction: row;
    gap: 0px;
  }
}
footer .container > div {
  display: flex;
  flex: 1;
}
.left {
  gap: 32px;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: 800px) {
    flex-direction: row;
    align-items: initial;
    gap: 0;
  }
}
.header {
  text-align: center;
  font-size: 24px;
  color: #fff;
  margin-bottom: 16px;
  text-decoration: none;
  font-weight: 600;
  @media (min-width: 800px) {
    text-align: initial;
  }
}
.header ul {
  gap: 16px;
  list-style: none;
  display: flex;
}
.col-1,
.col-2 {
  gap: 32px;
  display: flex;
  flex: 1;
  @media (min-width: 800px) {
    gap: 0;
  }
}
.col-1 {
  flex-direction: column;
}
.col-1 h2 {
  text-align: center;
  @media (min-width: 800px) {
    text-align: initial;
  }
}
.col-1 ul {
  margin-top: auto;
}
.col-1 ul li {
  display: flex;
  align-items: center;
}
.col-1 li .svg-icon {
  width: 24px;
  height: auto;
  color: #fff;
}
.col-2 ul {
  height: 100%;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  @media (min-width: 800px) {
    flex-direction: column;
  }
}
.col-2 .link {
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  text-decoration: none;
}
.right {
  gap: 32px;
  color: #fff;
  align-items: center;
  flex-direction: column;
  @media (min-width: 800px) {
    align-items: flex-end;
    gap: 0;
  }
}
.right p {
  margin-top: auto;
}
</style>
