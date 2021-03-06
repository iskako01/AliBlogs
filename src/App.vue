<template>
  <div class="app-wrapper">
    <div class="app" v-if="postLoaded">
      <Navigation v-if="!routerNavigation" />
      <router-view />
      <blogs-footer v-if="!routerNavigation" />
    </div>
  </div>
</template>

<script>
import { ref, watchEffect, computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

import Navigation from "./components/Navigation.vue";
import BlogsFooter from "./components/BlogsFooter.vue";
import useAppComponent from "./requests/useAppComponent";

export default {
  components: { Navigation, BlogsFooter },
  setup() {
    const route = useRoute();
    const store = useStore();
    const routerNavigation = ref(null);

    const postLoaded = computed(() => {
      return store.state.postLoaded;
    });
    const checkRoute = () => {
      if (
        route.name === "Login" ||
        route.name === "Register" ||
        route.name === "ForgotPassword"
      ) {
        routerNavigation.value = true;
        return;
      }
      routerNavigation.value = false;
    };
    const { checkAuthStateChanged } = useAppComponent(store, checkRoute);
    checkAuthStateChanged();

    watchEffect((route) => {
      if (route) {
        checkRoute();
      }
    });

    return { routerNavigation, postLoaded };
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
}
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.container {
  max-width: 1440px;
  margin: 0 auto;
}
.link {
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  color: black;
}
.link-light {
  color: #fff;
}
.arrow {
  margin-left: 8px;
  width: 12px;
}
.arrow path {
  fill: #000;
}
.arrow-light path {
  fill: #fff;
}
button,
.router-button {
  transition: 500ms ease all;
  cursor: pointer;
  margin-top: 24px;
  padding: 12px 24px;
  background-color: #303030;
  color: #fff;
  border-radius: 20px;
  border: none;
  text-transform: uppercase;
}
.router-button:focus {
  outline: none;
}
.router-button:hover {
  background-color: rgba(48, 48, 48, 0.7);
}
.button-ghost {
  color: #000;
  padding: 0;
  border-radius: 0;
  margin-top: 50px;
  font-size: 15px;
  font-weight: 500;
  background-color: transparent;
}

.button-ghost i {
  margin-left: 8px;
}
.button-light {
  background-color: transparent;
  border: 2px solid #fff;
  color: #fff;
}
.button-inactive {
  pointer-events: none !important;
  cursor: none !important;
  background-color: rgba(128, 128, 128, 0.5) !important;
}
.error {
  text-align: center;
  font-size: 12px;
  color: red;
}
.blog-card-wrap {
  position: relative;
  padding: 80px 16px;
  background-color: #f1f1f1;
}
.blog-card-wrap .blog-cards {
  display: grid;
  gap: 32px;
  grid-template-columns: 1fr;
}

@media (min-width: 700px) {
  .button-ghost {
    margin-top: 0;
    margin-left: auto;
  }
}
@media (min-width: 500px) {
  .blog-card-wrap {
    padding: 100px 16px;
  }
}
@media (min-width: 500px) {
  .blog-card-wrap .blog-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 900px) {
  .blog-card-wrap .blog-cards {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (min-width: 1200px) {
  .blog-card-wrap .blog-cards {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
