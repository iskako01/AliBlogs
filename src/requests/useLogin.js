import { auth } from "../firebase/firebase";

export default function (router, error, errorMsg, email, password) {
  const signIn = () => {
    auth
      .signInWithEmailAndPassword(email.value, password.value)
      .then(() => {
        router.push({ name: "Home" });
        error.value = false;
        errorMsg.value = "";
      })
      .catch((err) => {
        error.value = true;
        errorMsg.value = err;
      });
  };

  return { signIn };
}
