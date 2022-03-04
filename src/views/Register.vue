<template>
  <div class="form-wrap">
    <form class="register">
      <p class="login-register">
        Already have an account?
        <router-link class="router-link" :to="{ name: 'Login' }"
          >Login</router-link
        >
      </p>
      <h2>Create Your AliBlogs Account</h2>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="First Name" v-model="firstName" />
          <user class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="Last Name" v-model="lastName" />
          <user class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="Username" v-model="username" />
          <user class="icon" />
        </div>
        <div class="input">
          <input type="email" placeholder="Email" v-model="email" />
          <email class="icon" />
        </div>
        <div class="input">
          <input type="password" placeholder="Password" v-model="password" />
          <password class="icon" />
        </div>
        <div v-show="error" class="error">{{ errorMsg }}</div>
      </div>
      <button @click.prevent="register">Sign Up</button>
      <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Email from "../components/svg/Email.vue";
import Password from "../components/svg/Password.vue";
import User from "../components/svg/User.vue";
import useRegister from "../requests/useRegister";

export default {
  name: "Register",
  components: { Email, Password, User },
  setup() {
    const router = useRouter();

    const firstName = ref("");
    const lastName = ref("");
    const username = ref("");
    const email = ref("");
    const password = ref("");
    const error = ref(false);
    const errorMsg = ref("");

    const { register } = useRegister(
      firstName,
      lastName,
      username,
      email,
      password,
      error,
      errorMsg,
      router
    );

    // const register = async () => {
    //   if (
    //     firstName.value !== "" &&
    //     lastName.value !== "" &&
    //     username.value !== "" &&
    //     email.value !== "" &&
    //     password.value !== ""
    //   ) {
    //     error.value = false;
    //     errorMsg.value = "";

    //     // const firebaseAuth = await auth();
    //     const createUser = auth.createUserWithEmailAndPassword(
    //       email.value,
    //       password.value
    //     );
    //     const result = await createUser;
    //     const dataBase = db.collection("users").doc(result.user.uid);
    //     await dataBase.set({
    //       firstName: firstName.value,
    //       lastName: lastName.value,
    //       username: username.value,
    //       email: email.value,
    //     });
    //     router.push({ name: "Home" });
    //     return;
    //   }
    //   error.value = true;
    //   errorMsg.value = "Please fill out all the fields!";
    // };

    return {
      firstName,
      lastName,
      username,
      email,
      password,
      register,
      error,
      errorMsg,
    };
  },
};
</script>

<style scoped>
.form-wrap {
  overflow: hidden;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-self: center;
  margin: 0 auto;
  width: 90%;
}
.form-wrap form {
  padding: 0 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
}
.form-wrap form h2 {
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
  .background {
    display: initial;
  }
  .form-wrap {
    width: 100%;
  }
  .form-wrap form {
    padding: 0 50px;
  }
  .form-wrap form h2 {
    font-size: 40px;
  }
  .form-wrap form .angle {
    display: initial;
  }
}
</style>
