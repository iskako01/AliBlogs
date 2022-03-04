import { db, auth } from "../firebase/firebase";

export default function useRegister(
  firstName,
  lastName,
  username,
  email,
  password,
  error,
  errorMsg,
  router
) {
  const register = async () => {
    if (
      firstName.value !== "" &&
      lastName.value !== "" &&
      username.value !== "" &&
      email.value !== "" &&
      password.value !== ""
    ) {
      error.value = false;
      errorMsg.value = "";

      const createUser = auth.createUserWithEmailAndPassword(
        email.value,
        password.value
      );
      const result = await createUser;
      const dataBase = db.collection("users").doc(result.user.uid);
      await dataBase.set({
        firstName: firstName.value,
        lastName: lastName.value,
        username: username.value,
        email: email.value,
      });
      router.push({ name: "Home" });
      return;
    }
    error.value = true;
    errorMsg.value = "Please fill out all the fields!";
  };

  return { register };
}
