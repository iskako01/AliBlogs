<template>
  <div class="reset-password">
    <Loading v-if="loading" />
    <Modal
      v-if="modalActive"
      :modalMessage="modalMessage"
      @close-modal="closeModal"
    />
    <div class="form-wrap">
      <form class="reset">
        <p class="login-register">
          Back to
          <router-link class="router-link" :to="{ name: 'Login' }"
            >Login</router-link
          >
        </p>
        <h2>Reset Password</h2>
        <p>Forgot your passowrd? Enter your email to reset it</p>
        <div class="inputs">
          <div class="input">
            <input type="text" placeholder="Email" v-model="email" />
            <email class="icon" />
          </div>
        </div>
        <button @click.prevent="resetPassword">Reset</button>
        <div class="angle"></div>
      </form>
      <div class="background"></div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import useForgotPassword from "../requests/useForgotPassword";
import Email from "../components/svg/Email.vue";
import Modal from "../components/Modal.vue";
import Loading from "../components/Loading.vue";
export default {
  name: "ForgotPassword",
  components: { Email, Modal, Loading },
  setup() {
    const email = ref(null);
    const modalActive = ref(false);
    const modalMessage = ref("");
    const loading = ref(false);

    const closeModal = () => {
      modalActive.value = false;
      email.value = "";
    };

    const { resetPassword } = useForgotPassword(
      loading,
      email,
      modalMessage,
      modalActive
    );

    return {
      email,
      modalActive,
      modalMessage,
      closeModal,
      loading,
      resetPassword,
    };
  },
};
</script>

<style scoped>
.reset-password {
  position: relative;
}
.form-wrap .reset h2 {
  margin-bottom: 8px;
}
p {
  text-align: center;
  margin-bottom: 32px;
}
.form-wrap {
  overflow: hidden;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-self: center;
  margin: 0 auto;
  width: 90%;
}
form {
  padding: 0 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
}
h2 {
  text-align: center;
  font-size: 32px;
  color: #303030;
  margin-bottom: 40px;
}
.inputs {
  width: 100%;
  max-width: 350px;
}
.register h2 {
  max-width: 350px;
}
.input {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
}
.input input {
  width: 100%;
  border: none;
  background-color: #f2f7f6;
  padding: 4px 4px 4px 30px;
  height: 50px;
}
.input input:focus {
  outline: none;
}
.icon {
  width: 12px;
  position: absolute;
  left: 6px;
}

.angle {
  display: none;
  position: absolute;
  background-color: #fff;
  transform: rotateZ(3deg);
  width: 60px;
  right: -30px;
  height: 101%;
  @media (min-width: 900px) {
    display: initial;
  }
}
.background {
  display: none;
  flex: 2;
  background-size: cover;
  background-image: url("../assets/background.png");
  width: 100%;
  height: 100%;
}
@media (min-width: 900px) {
  form {
    padding: 0 50px;
  }
  .form-wrap {
    width: 100%;
  }
  h2 {
    font-size: 40px;
  }
  .angle {
    display: initial;
  }
}
</style>
