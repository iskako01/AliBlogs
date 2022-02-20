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
    profileAdmin: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUsername: null,
    profileId: null,
    profileInitials: null,
    sampleBlogCards: [
      {
        blogTitle: "Card 1",
        blogCoverPhoto: "stock-1",
        blogDate: "May 7,2022",
      },
      {
        blogTitle: "Card 2",
        blogCoverPhoto: "stock-2",
        blogDate: "May 7,2022",
      },
      {
        blogTitle: "Card 3",
        blogCoverPhoto: "stock-3",
        blogDate: "May 7,2022",
      },
      {
        blogTitle: "Card 4",
        blogCoverPhoto: "stock-4",
        blogDate: "May 7,2022",
      },
    ],
  },
  mutations: {
    toggleEditPost(state, payload) {
      state.editPost = payload;
    },
    updateUser(state, payload) {
      state.user = payload;
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
  },
  actions: {
    async getCurrentUser({ commit }) {
      const dataBase = await db.collection("users").doc(auth.currentUser.uid);
      const dbResult = await dataBase.get();
      commit("setProfileInfo", dbResult);
      commit("setProfileInitials");
      console.log(dbResult);
    },
  },
  modules: {},
});
