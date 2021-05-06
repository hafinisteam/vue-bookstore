<template>
  <div id="login-sidebar">
    <b-sidebar
      id="sidebar-login"
      bg-white
      right
      backdrop
      shadow
      lazy
      no-header
      v-model="visible"
    >
      <template #default="{ hide }">
        <header
          class="border-bottom px-4 px-md-6 py-4 d-flex align-items-center justify-content-between"
        >
          <h2 class="font-size-3 mb-0 d-flex align-items-center">
            <i class="far fa-user mr-3 font-size-5"></i>

            Account
          </h2>
          <b-button class="close-login" variant="transparent" @click="hide"
            >Close <i class="fas fa-times ml-2"></i
          ></b-button>
        </header>
        <div class="p-4 px-md-6" v-if="error">
          <b-alert class="mb-0" show variant="danger">
            {{ error }}
          </b-alert>
        </div>
        <form @submit.prevent="login" class="form-login p-4 p-md-6">
          <b-form-group label="Email *" label-for="email" class="mb-4">
            <b-form-input
              id="email"
              type="email"
              v-model.trim="$v.email.$model"
            ></b-form-input>
            <div v-if="$v.email.$error" class="invalid-feedback">
              <span v-if="!$v.email.required">Email is required</span>
              <span v-if="!$v.email.email">Email is invalid</span>
            </div>
          </b-form-group>
          <b-form-group label="Password *" label-for="password" class="mb-4">
            <b-form-input
              id="password"
              type="password"
              v-model.trim="$v.password.$model"
            ></b-form-input>
            <div v-if="$v.password.$error" class="invalid-feedback">
              <span v-if="!$v.password.required">Password is required</span>
              <span v-if="!$v.password.minLength"
                >Password must be at least 6 characters</span
              >
            </div>
          </b-form-group>
          <div class="d-flex align-items-center justify-content-between mb-4">
            <b-form-checkbox
              id="remember-me"
              v-model="status"
              name="remember-me"
              value="remembered"
              unchecked-value="not-remembered"
            >
              Remember me
            </b-form-checkbox>
            <b-button class="p-0 text-dark" variant="transparent">
              Forgot Password?
            </b-button>
          </div>
          <div class="mb-4d75">
            <b-button
              :disabled="$v.$invalid"
              class="py-3 btn-dark w-100 rounded-0"
              type="submit"
            >
              Sign In
            </b-button>
          </div>
        </form>
      </template>
    </b-sidebar>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength, email } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  data() {
    return {
      email: "",
      password: "",
      status: "",
      error: "",
      visible: false,
    };
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(6),
    },
  },
  methods: {
    showSuccess() {
      this.$bvToast.toast("You are now logged in.", {
        title: `Login Success!`,
        variant: "success",
        solid: true,
      });
    },
    handleSubmit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
    },
    login: function () {
      this.handleSubmit();
      let email = this.email;
      let password = this.password;
      this.$store
        .dispatch("login", { email, password })
        .then((response) => {
          if (response.data.code == "SUCCESS") {
            this.visible = false;
            this.showSuccess();
            this.$store.commit("saveToken", response.data.data.token);
          } else {
            this.error = response.data.message;
          }
        })
        .catch((e) => {
          this.error = e.response.data.message;
        });
    },
  },
};
</script>

<style></style>
