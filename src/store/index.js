import { createStore } from "vuex";
import { auth, db } from "../firebase/firebase";

export default createStore({
  state: {
    blogPosts: [],
    postLoaded: null,
    blogHTML: "Write your blog title here...",
    blogTitle: "",
    blogPhotoName: "",
    blogPhotoFileURL: null,
    blogPhotoPreview: null,
    editPost: null,
    user: null,
    profileAdmin: true,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUsername: null,
    profileId: null,
    profileInitials: null,
    comments: [],
    likes: [],
  },
  getters: {
    blogPostsFeed(state) {
      return state.blogPosts.slice(0, 2);
    },
    blogPostsCards(state) {
      return state.blogPosts.slice(2, 6);
    },
    profileEmail(state) {
      return state.profileEmail;
    },
    comments(state) {
      return state.comments;
    },
    likes(state) {
      return state.likes;
    },
  },
  mutations: {
    getComments(state, comments, currentBlogID) {
      state.comments = [];
      state.comments = comments;
      state.comment = state.comments.filter(
        (comment) => comment.commentID === currentBlogID
      );
    },
    getLikes(state, payload) {
      state.likes = [];
      state.likes.push(payload.likeData);

      state.likes = state.likes.filter(
        (like) => like.likeID === payload.currentBlogID
      );
    },

    openPhotoPreview(state) {
      state.blogPhotoPreview = !state.blogPhotoPreview;
    },
    fileNameChange(state, payload) {
      state.blogPhotoName = payload;
    },
    createFileURL(state, payload) {
      state.blogPhotoFileURL = payload;
    },
    newBlogPost(state, payload) {
      state.blogHTML = payload;
    },
    filterBlogPost(state, payload) {
      state.blogPosts = state.blogPosts.filter(
        (post) => post.blogID !== payload
      );
    },
    updateBlogTitle(state, payload) {
      state.blogTitle = payload;
    },
    toggleEditPost(state, payload) {
      state.editPost = payload;
    },
    updateUser(state, payload) {
      state.user = payload;
    },
    changeFirstName(state, payload) {
      state.profileFirstName = payload;
    },
    changeLastName(state, payload) {
      state.profileLastName = payload;
    },
    changeUsername(state, payload) {
      state.profileUsername = payload;
    },
    setProfileInfo(state, doc) {
      state.profileId = doc.id;
      state.profileEmail = doc.data().email;
      state.profileFirstName = doc.data().firstName;
      state.profileLastName = doc.data().lastName;
      state.profileUsername = doc.data().username;
    },
    setProfileInitials(state) {
      state.profileInitials =
        state.profileFirstName.match(/(\b\S)?/g).join("") +
        state.profileLastName.match(/(\b\S)?/g).join("");
    },
    setBlogState(state, payload) {
      state.blogTitle = payload.blogTitle;
      state.blogHTML = payload.blogHTML;
      state.blogPhotoFileURL = payload.blogCoverPhoto;
      state.blogPhotoName = payload.blogCoverPhotoName;
    },
  },
  actions: {
    async addLike({ dispatch, getters }, currentBlogID) {
      const dataBase = await db.collection("likes").doc(currentBlogID);
      const countLike = (await dataBase.get(currentBlogID)).data();

      if (getters.likes === 0 && currentBlogID === dataBase.id) {
        await dataBase.set({
          like: getters.likes + 1,
          likeID: currentBlogID,
        });
        dispatch("getLikes", currentBlogID);
      } else {
        await dataBase.update({
          like: +countLike.like + 1,
          likeID: currentBlogID,
        });
        dispatch("getLikes", currentBlogID);
      }
    },
    async deleteLike({ dispatch, getters }, currentBlogID) {
      const dataBase = await db.collection("likes").doc(currentBlogID);
      const countLike = (await dataBase.get(currentBlogID)).data();

      if (getters.likes === 0 && currentBlogID === dataBase.id) {
      } else {
        await dataBase.update({
          like: +countLike.like - 1,
          likeID: currentBlogID,
        });
        dispatch("getLikes", currentBlogID);
      }
    },
    async getLikes({ commit }, currentBlogID) {
      const dataBase = await db.collection("likes").doc(currentBlogID);
      const likeData = (await dataBase.get(currentBlogID)).data();

      commit("getLikes", { likeData, currentBlogID });
    },
    async addComment({ commit, state, dispatch }, { content, currentBlogID }) {
      const timestamp = await Date.now();
      const dataBase = await db
        .collection("comments")
        .doc(currentBlogID)
        .collection(currentBlogID);

      await dataBase.add({
        comment: content,
        date: timestamp,
        commentID: currentBlogID,
        firstName: state.profileFirstName,
        lastName: state.profileLastName,
        userInitials: state.profileInitials,
        userEmail: state.profileEmail,
      });
    },
    async getComments({ commit, state }, currentBlogID) {
      const dataBase = await db
        .collection("comments")
        .doc(currentBlogID)
        .collection(currentBlogID)
        .orderBy("date", "desc");

      const dbResults = await dataBase.get();

      const commentArray = [];
      dbResults.forEach((doc) => {
        if (!state.comments.some((comment) => comment.commentID === doc.id)) {
          const data = {
            comment: doc.data().comment,
            date: doc.data().date,
            commentID: doc.data().commentID,
            firstName: doc.data().firstName,
            lastName: doc.data().lastName,
            userEmail: doc.data().userEmail,
            userInitials: doc.data().userInitials,
          };
          commentArray.push(data);
        }
      });
      commit("getComments", [...commentArray], currentBlogID);
    },
    async getCurrentUser({ commit }) {
      const dataBase = await db.collection("users").doc(auth.currentUser.uid);
      const dbResult = await dataBase.get();
      commit("setProfileInfo", dbResult);
      commit("setProfileInitials");
    },
    async updateUserSettings({ commit, state }) {
      const dataBase = await db.collection("users").doc(state.profileId);
      await dataBase.update({
        firstName: state.profileFirstName,
        lastName: state.profileLastName,
        username: state.profileUsername,
      });
      commit("setProfileInitials");
    },
    async getPost({ state }) {
      const dataBase = await db.collection("blogPosts").orderBy("date", "desc");
      const dbResults = await dataBase.get();

      dbResults.forEach((doc) => {
        if (!state.blogPosts.some((post) => post.blogID === doc.id)) {
          const data = {
            blogID: doc.data().blogID,
            blogHTML: doc.data().blogHTML,
            blogCoverPhoto: doc.data().blogCoverPhoto,
            blogTitle: doc.data().blogTitle,
            blogDate: doc.data().date,
            blogCoverPhotoName: doc.data().blogCoverPhotoName,
          };
          state.blogPosts.push(data);
        }
      });
      state.postLoaded = true;
    },
    async deletePost({ commit }, payload) {
      const getPost = await db.collection("blogPosts").doc(payload);
      await getPost.delete();
      commit("filterBlogPost", payload);
    },
    async updatePost({ commit, dispatch }, payload) {
      commit("filterBlogPost", payload);
      await dispatch("getPost");
    },
  },
  modules: {},
});
