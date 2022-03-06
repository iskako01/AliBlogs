<template>
  <div class="home">
    <blog-post v-if="!user" :post="welcomeScreen" />

    <blog-post
      :post="post"
      v-for="(post, index) in blogPostsFeed"
      :key="index"
    />
    <div class="blog-card-wrap">
      <div class="container">
        <h3>View More Recent Blogs</h3>
        <div class="blog-cards">
          <blog-card
            :post="post"
            v-for="(post, index) in blogPostsCards"
            :key="index"
          />
        </div>
      </div>
    </div>
    <div class="background" v-if="user">
      <img src="../assets/bgHome.jpg" />
    </div>
    <div v-if="!user" class="updates">
      <div class="container">
        <h2>never miss a post. Register for your free account today!</h2>
        <router-link class="router-button" to="#">
          Register for FireBlogs <Arrow class="arrow arrow-light" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import BlogPost from "../components/BlogPost.vue";
import BlogCard from "../components/BlogCard.vue";
import Arrow from "../components/svg/Arrow.vue";

export default {
  name: "Home",
  components: { BlogPost, BlogCard, Arrow },
  setup() {
    const store = useStore();
    const welcomeScreen = ref({
      title: "Welcome!",
      blogPost:
        "Weekly blog articles with all things programming including HTML, CSS, JavaScript and more. Register today to never miss a post!",
      welcomeScreen: true,
      photo: "coding",
    });

    const blogPostsFeed = computed(() => {
      return store.getters.blogPostsFeed;
    });
    const blogPostsCards = computed(() => {
      return store.getters.blogPostsCards;
    });
    const user = computed(() => {
      return store.state.user;
    });
    return {
      welcomeScreen,
      blogPostsFeed,
      blogPostsCards,
      user,
    };
  },
};
</script>
<style scoped>
.blog-card-wrap {
  padding: 30px 16px;
}
.blog-card-wrap h3 {
  font-weight: 300;
  font-size: 28px;
  margin-bottom: 32px;
}
.background {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 950px;
}
.background img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.updates .container h2 {
  font-weight: 300;
  font-size: 32px;
  max-width: 425px;
  width: 100%;
  text-align: center;
  text-transform: uppercase;
}
.updates {
  background-image: url(../assets/bgHome.jpg);
  background-size: cover;
  background-position: center;
}
.updates .container {
  padding: 100px 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.updates .container .router-button {
  display: flex;
  font-size: 14px;
  text-decoration: none;
  cursor: pointer;
}
.updates .container h2 {
  color: #fff;
  font-weight: 300;
  font-size: 32px;
  max-width: 425px;
  width: 100%;
  text-align: center;
  text-transform: uppercase;
}
@media (min-width: 800px) {
  .updates .container h2 {
    text-align: initial;
    font-size: 40px;
  }
  .updates .container {
    padding: 411px 25px;
    flex-direction: row;
  }
  .updates .container .router-button {
    margin-left: auto;
  }
}
</style>
