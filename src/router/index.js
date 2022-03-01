import { createRouter, createWebHistory } from "vue-router";
import { auth } from "../firebase/firebase";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: {
      title: "Home",
      requiresAuth: false,
    },
  },
  {
    path: "/blogs",
    name: "Blogs",
    component: () => import("../views/Blogs.vue"),
    meta: {
      title: "Blogs",
      requiresAuth: false,
    },
  },
  {
    path: "/view-blog/:blogid",
    name: "ViewBlog",
    component: () => import("../views/ViewBlog.vue"),
    meta: {
      title: "View Blog",
      requiresAuth: false,
    },
  },
  {
    path: "/create-post",
    name: "CreatePost",
    component: () => import("../views/CreatePost.vue"),
    meta: {
      title: "Create Post",
      requiresAuth: false,
    },
  },
  {
    path: "/edit-blog/:blogid",
    name: "EditBlog",
    component: () => import("../views/EditBlog.vue"),
    meta: {
      title: "Edit Blog",
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: {
      title: "Login",
      requiresAuth: false,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
    meta: {
      title: "Register",
      requiresAuth: false,
    },
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: () => import("../views/ForgotPassword.vue"),
    meta: {
      title: "Forgot Password",
      requiresAuth: false,
    },
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("../views/Admin.vue"),
    meta: {
      title: "Admin",
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
    meta: {
      title: "Profile",
      requiresAuth: true,
    },
  },
  {
    path: "/blog-preview",
    name: "BlogPreview",
    component: () => import("../views/BlogPreview.vue"),
    meta: {
      title: "Blog Preview",
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Change document titles
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | AliBlogs`;
  next();
});
router.beforeEach((to, from, next) => {
  const user = auth.currentUser;
  if (to.matched.some((res) => res.meta.requiresAuth)) {
    if (user) {
      next();
      return;
    }
    next({ name: "Home" });
  }
  next();
});

// router.beforeEach(async (to, from, next) => {
//   const user = auth.currentUser;
//   let admin = null;
//   if (user) {
//     const token = await user.getIdTokenResult();
//     admin = token.claims.admin;
//   }
//   if (to.matched.some((res) => res.meta.requiresAuth)) {
//     if (user) {
//       if (to.matched.some((res) => res.meta.requiresAdmin)) {
//         if (admin) {
//           return next();
//         }
//       }
//       return next({ name: "Home" });
//     }
//     return next({ name: "Home" });
//   }
//   return next();
// });

export default router;
