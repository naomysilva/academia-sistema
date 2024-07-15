<template>
  <div class="row">
    <div class="col-sm-5 m-auto">
      <div class="text-center mb-4">
        <h1>Sign Up</h1>
      </div>
      <form id="signup-form" @submit.prevent="signupRequest">
        <div class="row">
          <div class="col-sm-12 form-group">
            <label for="email" class="">Email address</label>
            <input
              type="email"
              id="email"
              v-model="email"
              class="form-control form-control-lg"
            />
          </div>
          <div class="col-sm-12 form-group">
            <label for="password" class="">Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
              class="form-control form-control-lg"
            />
          </div>
          <div class="col-sm-12 form-group">
            <button v-if="! xhrRequest" class="btn btn-primary btn-lg col-sm-4  m-4">Sign up</button>
            <button v-if="xhrRequest" class="btn btn-primary btn-lg col-sm-4">
                <span class="spinner-border spinner-border-sm"></span>
                wait..
            </button>
          </div>
          <div class="col-sm-12 form-group mt-5">
            <p>
              Already have an account?
              <RouterLink to="/">Login</RouterLink>
            </p>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { auth } from "../main";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default {
  data() {
    return {
      email: "",
      password: "",
      xhrRequest: false
    };
  },
  methods: {
    signupRequest() {
        this.xhrRequest = true
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then(() => {
         this.$router.replace('/')
        })
        .catch((err) => {
            this.xhrRequest = false
          alert(`Error - ${err.message}`);
        });
    },
  },
};
</script>
<style scoped>
._loader {
    position:relative;
    top:6px;
    left:10px;
}
</style>