<template>
  <div id="edit-account">
    <div class="container">
      <div class="article-content">
        <h2 class="main-title">Account details</h2>
        <div class="edit-account-details">
          <h4 class="title">Edit Account</h4>
          <form class="edit-details" @submit.prevent="updateProfile">
            <div class="row">
              <b-form-group
                label="First name *"
                label-for="firstName"
                class="mb-4 col-xl-6"
              >
                <b-form-input
                  id="firstName"
                  type="text"
                  v-model="$v.userProfile.firstName.$model"
                ></b-form-input>
                <div
                  v-if="$v.userProfile.firstName.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.userProfile.firstName.required"
                    >First name is required</span
                  >
                  <span v-if="!$v.userProfile.firstName.minLength"
                    >First name must be at least 3 characters</span
                  >
                </div>
              </b-form-group>
              <b-form-group
                label="Last name *"
                label-for="lastName"
                class="mb-4 col-xl-6"
              >
                <b-form-input
                  id="lastName"
                  type="text"
                  v-model.trim="$v.userProfile.lastName.$model"
                ></b-form-input>
                <div
                  v-if="$v.userProfile.lastName.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.userProfile.lastName.required"
                    >Last name is required</span
                  >
                  <span v-if="!$v.userProfile.lastName.minLength"
                    >Last name must be at least 3 characters</span
                  >
                </div>
              </b-form-group>
              <b-form-group
                label="Display name *"
                label-for="displayName"
                class="mb-4 col-xl-12"
              >
                <b-form-input
                  id="displayName"
                  type="text"
                  v-model.trim="$v.userProfile.displayName.$model"
                ></b-form-input>
                <span class="text-muted small"
                  >This will be how your name will be displayed in the account
                  section and in reviews
                </span>
                <div
                  v-if="$v.userProfile.displayName.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.userProfile.displayName.required"
                    >Display name is required</span
                  >
                  <span v-if="!$v.userProfile.displayName.minLength"
                    >Display name must be at least 3 characters</span
                  >
                </div>
              </b-form-group>
              <b-form-group
                label="Email address *"
                label-for="email"
                class="mb-4 col-xl-12"
              >
                <b-form-input
                  type="email"
                  v-model.trim="$v.userProfile.email.$model"
                ></b-form-input>
                <div
                  v-if="$v.userProfile.email.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.userProfile.email.required"
                    >Email is required</span
                  >
                  <span v-if="!$v.userProfile.email.email"
                    >Email is invalid</span
                  >
                </div>
              </b-form-group>
              <div class="mb-4d75 col-xl-3">
                <b-button
                  :disabled="$v.userProfile.$invalid"
                  class="py-3 btn-dark w-100 rounded-0"
                  type="submit"
                >
                  Update Profile
                </b-button>
              </div>
              <div class="col-xl-4" v-if="profileError">
                <b-alert class="mb-0" show variant="danger">
                  {{ profileError }}
                </b-alert>
              </div>
            </div>
          </form>
        </div>
        <div class="edit-account-password">
          <h4 class="title">Password change</h4>
          <form
            class="edit-password"
            ref="passwordChangeForm"
            @submit.prevent="updatePassword"
          >
            <div class="row">
              <b-form-group
                label="Current password (leave blank to leave unchanged)"
                label-for="currentPassword"
                class="col-xl-12 mb-4"
              >
                <b-form-input
                  id="currentPassword"
                  type="password"
                  v-model.trim="$v.userPassword.currentPassword.$model"
                ></b-form-input>
                <div
                  v-if="$v.userPassword.currentPassword.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.userPassword.currentPassword.required"
                    >Current password is required</span
                  >
                  <span v-if="!$v.userPassword.currentPassword.minLength"
                    >Current password must be at least 6 characters</span
                  >
                </div>
              </b-form-group>
              <b-form-group
                label="New password (leave blank to leave unchanged)"
                label-for="newPassword"
                class="col-xl-12 mb-4"
              >
                <b-form-input
                  id="newPassword"
                  type="password"
                  v-model.trim="$v.userPassword.newPassword.$model"
                ></b-form-input>
                <div
                  v-if="$v.userPassword.newPassword.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.userPassword.newPassword.required"
                    >New password is required</span
                  >
                  <span v-if="!$v.userPassword.newPassword.minLength"
                    >New password must be at least 6 characters</span
                  >
                </div>
              </b-form-group>
              <b-form-group
                label="Confirm new password"
                label-for="confirmNewPassword"
                class="col-xl-12 mb-4"
              >
                <b-form-input
                  id="confirmNewPassword"
                  type="password"
                  v-model.trim="$v.userPassword.confirmNewPassword.$model"
                ></b-form-input>
                <div
                  v-if="$v.userPassword.confirmNewPassword.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.userPassword.confirmNewPassword.sameAs"
                    >Must be same as new password</span
                  >
                </div>
              </b-form-group>
              <div class="mb-4d75 col-xl-3">
                <b-button
                  :disabled="$v.userPassword.$invalid"
                  class="py-3 btn-dark w-100 rounded-0"
                  type="submit"
                >
                  Update Password
                </b-button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { BASE_URL } from "@/assets/urls/config";
import { validationMixin } from "vuelidate";
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],
  data() {
    return {
      userProfile: {
        email: "",
        firstName: "",
        lastName: "",
        displayName: "",
      },
      userPassword: {
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      },
      profileError: "",
      passwordError: "",
    };
  },
  validations: {
    userProfile: {
      email: {
        required,
        email,
      },
      firstName: {
        required,
        minLength: minLength(3),
      },
      lastName: {
        required,
        minLength: minLength(3),
      },
      displayName: {
        required,
        minLength: minLength(3),
      },
    },
    userPassword: {
      currentPassword: {
        required,
        minLength: minLength(6),
      },
      newPassword: {
        required,
        minLength: minLength(6),
      },
      confirmNewPassword: {
        required,
        sameAsPassword: sameAs("newPassword"),
      },
    },
  },
  beforeMount() {
    const profile = this.$store.getters.userProfile;
    this.userProfile.email = profile.email;
    this.userProfile.firstName = profile.firstName;
    this.userProfile.lastName = profile.lastName;
    this.userProfile.displayName = profile.displayName;
  },
  computed: {
    getUserProfile() {
      return this.$store.getters.userProfile;
    },
    getUserToken() {
      return this.$store.getters.userToken;
    },
  },
  methods: {
    showSuccess() {
      this.$bvToast.toast("Account profile has been updated!", {
        title: `Profile updated!`,
        variant: "success",
        solid: true,
      });
    },
    wrongPassword() {
      this.$bvToast.toast("Please try again", {
        title: `Invalid current password`,
        variant: "warning",
        solid: true,
      });
    },
    handleChangeProfile() {
      this.$v.userProfile.$touch();
      if (this.$v.userProfile.$invalid) {
        return;
      }
    },
    handleChangePassword() {
      this.$v.userPassword.$touch();
      if (this.$v.userPassword.$invalid) {
        return;
      }
    },
    resetPassword() {
      this.$refs.passwordChangeForm.reset();
    },
    updateProfile() {
      const token = this.$store.getters.userToken;
      this.handleChangeProfile();
      axios
        .post(
          `${BASE_URL}api/user/update-profile`,
          {
            email: this.userProfile.email,
            firstName: this.userProfile.firstName,
            lastName: this.userProfile.lastName,
            display: this.userProfile.display,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (response.data.code == "SUCCESS") {
            this.showSuccess();
          } else {
            this.profileError = response.data;
          }
        })
        .catch((e) => {
          this.profileError = e.response.data;
        });
    },
    updatePassword() {
      const token = this.$store.getters.userToken;
      this.handleChangePassword();
      axios
        .post(
          `${BASE_URL}api/user/change-password`,
          {
            currentPassword: this.userPassword.currentPassword,
            newPassword: this.userPassword.newPassword,
            confirmNewPassword: this.userPassword.confirmNewPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (response.data.code == "SUCCESS") {
            this.showSuccess();
            this.resetPassword();
          } else {
            this.wrongPassword();
            this.passwordError = response.data.code;
          }
        })
        .catch((e) => {
          this.passwordError = e.response.data.code;
        });
    },
  },
};
</script>

<style></style>
