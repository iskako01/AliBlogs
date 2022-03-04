import { auth } from "../firebase/firebase";

export default function useAppComponent(store, checkRoute) {
  const checkAuthStateChanged = () => {
    auth.onAuthStateChanged((user) => {
      store.commit("updateUser", user);
      if (user) {
        store.dispatch("getCurrentUser", user);
      }
    });
    checkRoute();
    store.dispatch("getPost");
  };
  return { checkAuthStateChanged, checkRoute };
}
