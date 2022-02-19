import { createStore } from "vuex";

export default createStore({
  state: {
    user: [],
    profileAdmin: {},
    editPost: false,
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
  },
  actions: {},
  modules: {},
});
