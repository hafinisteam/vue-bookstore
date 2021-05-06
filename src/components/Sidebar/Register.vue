<template>
  <div id="register-sidebar">
    <b-sidebar
      id="sidebar-register"
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

            Register Account
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
        <form @submit.prevent="register" class="form-login p-4 p-md-6">
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
          <b-form-group label="First name *" label-for="firstName" class="mb-4">
            <b-form-input
              id="firstName"
              type="text"
              v-model.trim="$v.firstName.$model"
            ></b-form-input>
            <div v-if="$v.firstName.$error" class="invalid-feedback">
              <span v-if="!$v.firstName.required">First name is required</span>
              <span v-if="!$v.firstName.minLength"
                >First name must be at least 3 characters</span
              >
            </div>
          </b-form-group>
          <b-form-group label="Last name *" label-for="lastName" class="mb-4">
            <b-form-input
              id="lastName"
              type="text"
              v-model.trim="$v.lastName.$model"
            ></b-form-input>
            <div v-if="$v.lastName.$error" class="invalid-feedback">
              <span v-if="!$v.lastName.required">Last name is required</span>
              <span v-if="!$v.lastName.minLength"
                >Last name must be at least 3 characters</span
              >
            </div>
          </b-form-group>
          <b-form-group
            label="Display name (optional)"
            label-for="displayName"
            class="mb-4"
          >
            <b-form-input
              id="displayName"
              type="text"
              v-model="displayName"
              trim
            ></b-form-input>
          </b-form-group>
          <div class="d-flex align-items-center justify-content-between mb-4">
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
              Sign Up
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
      firstName: "",
      lastName: "",
      displayName: "",
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
    firstName: {
      required,
      minLength: minLength(3),
    },
    lastName: {
      required,
      minLength: minLength(3),
    },
  },
  methods: {
    showSuccess() {
      this.$bvToast.toast("You account has been registered", {
        title: `Register Success!`,
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
    register: function () {
      this.handleSubmit();
      let email = this.email;
      let password = this.password;
      let firstName = this.firstName;
      let lastName = this.lastName;
      let display = this.display;
      this.$store
        .dispatch("register", { email, password, firstName, lastName, display })
        .then((response) => {
          if (response.data.code == "SUCCESS") {
            this.visible = false;
            this.showSuccess();
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
