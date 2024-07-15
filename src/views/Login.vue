<template>
  <div class="row">
    <div class="col-md-6">
      <img src="@/assets/logo.jpg" class="w-100 p-3" alt="" srcset="" />
    </div>
    <div class="col-md-6 m-auto">
      <div class="col-12 text-center mb-4">
        <h1>Login</h1>
      </div>
      <div v-if="errorMessage !== ''" class="alert alert-danger" role="alert">
        {{ errorMessage }}
      </div>
      <div
        v-if="successMessage !== ''"
        class="alert alert-success"
        role="alert"
      >
        {{ successMessage }}
      </div>
      <form @submit.prevent="loginRequest" id="login-form">
        <div class="row text-left">
          <div class="col-sm-12 form-group">
            <label class="m-2" for="email">Email Address</label>
            <input
              type="email"
              id="email"
              v-model="email"
              class="form-control form-control-lg"
            />
          </div>
          <div class="col-sm-12 form-group">
            <label class="m-2" for="password">Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
              class="form-control form-control-lg"
            />
          </div>
          <div class="col-sm-12 text-center form-group">
            <button
              :disabled="xhrRequest"
              :class="{ disabled: xhrRequest }"
              class="btn btn-lg btn-primary px-4 m-4"
            >
              <span  v-if="!xhrRequest">Login</span>
              <span v-if="xhrRequest">Please Wait...</span>
            </button>
            <div
              v-if="xhrRequest"
              class="spinner-border text-secondary _loader"
              role="status"
            >
              <span class="sr-only">Loading...</span>
            </div>
          </div>
          <div class="col-sm-12 text-center form-group mt-5">
            <p>
              Don't have an account?
              <router-link to="/signup">Sign Up</router-link>
            </p>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { auth } from "../main";
import { signInWithEmailAndPassword } from "firebase/auth";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      xhrRequest: false,
      errorMessage: "",
      successMessage: "",
    };
  },
  methods: {
    loginRequest() {
      this.xhrRequest = true;
      this.errorMessage = "";
      this.successMessage = "";

      signInWithEmailAndPassword(auth, this.email, this.password)
        .then(() => {
          this.$router.replace("member");
          this.xhrRequest = false;
        })
        .catch((error) => {
          this.errorMessage = error.message;
          this.xhrRequest = false;
        });
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

.disabled {
  cursor: not-allowed;
}

body {
    background-color: #d7fafe;
}

.container {
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-style: normal;
  color: #087988;
}
</style>
