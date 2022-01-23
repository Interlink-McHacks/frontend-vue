<template>
  <b-container class="mt-5">
    <b-row>
      <b-col cols="12">
        <h1>Welcome to Interlink! Please log in.</h1>
      </b-col>
      <b-col cols="12">
        <b-form @submit.prevent="performLogin" type="w-100">
          <b-form-group id="name" label="Name:" label-for="name-input">
            <b-form-input id="name-input" v-model="name" placeholder="Name (if registering)"></b-form-input>
          </b-form-group>
          <b-form-group id="email" label="Email:" label-for="email-input">
            <b-form-input id="email-input" v-model="email" placeholder="Email" required></b-form-input>
          </b-form-group>
          <b-form-group id="password" label="Password:" label-for="password-input">
            <b-form-input type="password" id="password-input" v-model="password" placeholder="Password" required></b-form-input>
          </b-form-group>
          <b-button variant="primary" type="submit" @submit.prevent="createUser">Register</b-button> <b-button variant="primary" type="submit">Login</b-button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from "axios";
import Navbar from "~/components/Navbar";
export default {
  name: "Login",
  data() {
    return {
      name: "",
      email: "",
      password: ""
    }
  },
  methods: {
    performLogin() {
      axios({
        url: "http://api.interlink.rest/api/login",
        method: "POST",
        data: {
          email: this.email,
          password: this.password
        }
      }).then((response) => {
        this.$store.commit('app/setToken', response.data.data.token);
        this.$router.push({
          name: "Tenants"
        })
      })
    },
    createUser() {
      axios({
        url: "http://api.interlink.rest/api/user",
        method: "POST",
        data: {
          email: this.email,
          password: this.password
        }
      }).then((response) => {
        this.$store.commit('app/setToken', response.data.data.token);
        this.$router.push({
          name: "Tenants"
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
