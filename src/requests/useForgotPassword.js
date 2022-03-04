import { auth } from "../firebase/firebase";

export default function useForgotPassword(
  loading,
  email,
  modalMessage,
  modalActive
) {
  const resetPassword = () => {
    loading.value = true;
    auth
      .sendPasswordResetEmail(email.value)
      .then(() => {
        modalMessage.value = "If your account exists,you will receive a email.";
        loading.value = false;
        modalActive.value = true;
      })
      .catch((err) => {
        modalMessage.value = err.message;
        loading.value = false;
        modalActive.value = true;
      });
  };
  return { resetPassword };
}
