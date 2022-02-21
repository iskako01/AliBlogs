<template>
  <header>
    <nav class="container">
      <div class="branding">
        <router-link :to="{ name: 'Home' }" class="header"
          >AliBlogs</router-link
        >
      </div>
      <div class="nav-links">
        <ul v-show="!mobile">
          <router-link :to="{ name: 'Home' }" class="link">Home</router-link>
          <router-link :to="{ name: 'Blogs' }" class="link">Blogs</router-link>
          <router-link :to="{ name: 'CreatePost' }" class="link"
            >Create Post</router-link
          >
          <router-link v-if="!user" :to="{ name: 'Login' }" class="link"
            >Login/Register</router-link
          >
        </ul>
        <div v-if="user" class="profile" @click="toggleProfileMenu">
          <span>{{ profileInitials }}</span>

          <div v-show="profileMenu" @click.stop class="profile-menu">
            <div class="info">
              <p class="initials">{{ profileInitials }}</p>
              <div class="right">
                <p>{{ profileFirstName }}</p>
                <p>{{ profileLastName }}</p>
                <p>{{ profileUsername }}</p>
                <p>{{ profileEmail }}</p>
              </div>
            </div>
            <div class="options">
              <div class="option">
                <router-link class="option" :to="{ name: 'Profile' }">
                  <user-icon class="icon" />
                  <p>Profile</p>
                </router-link>
              </div>
              <div class="option">
                <router-link class="option" :to="{ name: 'Admin' }">
                  <admin-icon class="icon" />
                  <p>Admin</p>
                </router-link>
              </div>
              <div class="option" @click="signOut">
                <sign-out-icon class="icon" />
                <p>Sign Out</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <bars-regular @click="toggleMobileNav" class="menu-icon" v-show="mobile" />

    <transition name="mobile-nav">
      <ul class="mobile-nav" v-show="mobileNav">
        <router-link :to="{ name: 'Home' }" class="link">Home</router-link>
        <router-link :to="{ name: 'Blogs' }" class="link">Blogs</router-link>
        <router-link :to="{ name: 'CreatePost' }" class="link"
          >Create Post</router-link
        >
        <router-link v-if="!user" :to="{ name: 'Login' }" class="link"
          >Login/Register</router-link
        >
      </ul>
    </transition>
  </header>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { useStore } from "vuex";
import { auth } from "../firebase/firebase";
import BarsRegular from "../components/svg/BarsRegular.vue";
import UserIcon from "../components/svg/UserIcon.vue";
import AdminIcon from "../components/svg/AdminIcon.vue";
import SignOutIcon from "../components/svg/SignOutIcon.vue";
export default {
  name: "navigation",
  components: { BarsRegular, UserIcon, AdminIcon, SignOutIcon },
  setup() {
    const store = useStore();

    const mobile = ref(null);
    const profileMenu = ref(false);
    const mobileNav = ref(null);
    const windowWidth = ref(null);

    const profileInitials = computed(() => {
      return store.state.profileInitials;
    });
    const profileFirstName = computed(() => {
      return store.state.profileFirstName;
    });
    const profileLastName = computed(() => {
      return store.state.profileLastName;
    });
    const profileUsername = computed(() => {
      return store.state.profileUsername;
    });
    const profileEmail = computed(() => {
      return store.state.profileEmail;
    });
    const user = computed(() => {
      return store.state.user;
    });

    const checkScreen = () => {
      windowWidth.value = window.innerWidth;
      if (windowWidth.value <= 750) {
        mobile.value = true;
        return;
      }
      mobile.value = false;
      mobileNav.value = false;
    };

    const toggleMobileNav = () => {
      mobileNav.value = !mobileNav.value;
    };
    const toggleProfileMenu = () => {
      profileMenu.value = !profileMenu.value;
    };
    const signOut = () => {
      auth.signOut();
      window.location.reload();
    };

    onMounted(() => {
      window.addEventListener("resize", () => checkScreen());
      checkScreen();
    });
    onBeforeUnmount(() => {
      window.removeEventListener("resize", checkScreen());
    });
    return {
      mobile,
      mobileNav,
      windowWidth,
      checkScreen,
      user,
      toggleMobileNav,
      toggleProfileMenu,
      profileInitials,
      profileFirstName,
      profileLastName,
      profileUsername,
      profileEmail,
      profileMenu,
      signOut,
    };
  },
};
</script>

<style scoped>
header {
  background-color: #fff;
  padding: 0 25px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 99;
}

header .link {
  font-weight: 500;
  padding: 0 8px;
  transition: 0.3s color ease;
}
header .link:hover {
  color: #1eb8b8;
}
nav {
  display: flex;
  padding: 25px 0;
}
.branding {
  display: flex;
  align-items: center;
}
.branding .header {
  font-weight: 600;
  font-size: 24px;
  color: #000;
  text-decoration: none;
}
.nav-links {
  position: relative;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
}
.nav-links ul {
  margin-right: 32px;
}
.nav-links .link {
  margin-right: 32px;
}
.nav-links .link:last-child {
  margin-right: 0;
}
.profile {
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: #fff;
  background-color: #303030;
}
span {
  pointer-events: none;
}
.profile-menu {
  position: absolute;
  top: 60px;
  right: 0;
  width: 250px;
  background-color: #303030;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
.info {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #fff;
}
.initials {
  position: initial;
  width: 40px;
  height: 40px;
  background-color: #fff;
  color: #303030;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}
.right {
  flex: 1;
  margin-left: 24px;
}
.right p:nth-child(1) {
  font-size: 14px;
}
.right p:nth-child(2),
p:nth-child(3) {
  font-size: 12px;
}

.options {
  padding: 15px;
}
.option {
  text-decoration: none;
  color: #fff;
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}
.option p {
  font-size: 14px;
  margin-left: 12px;
}
.option:last-child {
  margin-bottom: 0px;
}
.icon {
  width: 18px;
  height: auto;
}

.mobile-user-menu {
  margin-right: 40px;
}
.menu-icon {
  cursor: pointer;
  position: absolute;
  top: 32px;
  right: 25px;
  height: 25px;
  width: 30px;
  height: 30px;
}
.mobile-nav {
  padding: 20px;
  width: 70%;
  max-width: 250px;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100%;
  background-color: #303030;
  top: 0;
  left: 0;
}
.mobile-nav .link {
  padding: 15px 0;
  color: #fff;
}
.mobile-nav-enter-active,
.mobile-nav-leave-active {
  transition: all 1s ease;
}
.mobile-nav-enter {
  transform: translateX(-250px);
}
.mobile-nav-enter-to {
  transform: translateX(0);
}
.mobile-nav-leave-to {
  transform: translateX(-250px);
}
</style>
