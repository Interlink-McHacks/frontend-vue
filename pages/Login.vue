<template>
  <b-container>
    <b-form @submit.prevent>
      <b-form-group id="email" label="Email:" label-for="email-input" placeholder="Email" required>
        <b-form-input id="email-input" v-model="email"></b-form-input>
      </b-form-group>
      <b-form-group id="password" label="Password:" label-for="password-input" placeholder="Password" required>
        <b-form-input type="password" id="password-input" v-model="password"></b-form-input>
      </b-form-group>
      <b-button variant="primary" @click="performLogin" type="submit">Login</b-button>
    </b-form>
  </b-container>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
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
          name: "Home"
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
