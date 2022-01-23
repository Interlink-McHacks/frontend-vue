<template>
  <b-container>
    <b-row>
      <h1>Please choose a tenant to continue</h1>
      <b-select @change="$store.commit('app/setTenantID', $event)">
        <b-select-option v-for="(tenant, tenantID) in tenants" :value="tenantID" v-bind:key="tenantID">{{tenant.name}}</b-select-option>
      </b-select>
      <router-link to="Tunnels"><b-button>Continue</b-button></router-link>
    </b-row>
  </b-container>
</template>

<script>
import axios from 'axios';
import Vue from 'vue';
export default {
  name: "Tenants",
  data() {
    return {
      tenants: {}
    }
  },
  mounted() {
    axios({
      url: "http://api.interlink.rest/api/user/acls",
      headers: {
        Authorization: "Bearer " + this.$store.state.app.token
      }
    }).then((res) => {
      const acls = res.data.data.acls;
      for(const acl of acls){
        axios({
          url: "http://api.interlink.rest/api/tenant/" + acl.tenantID,
          headers: {
            Authorization: "Bearer " + this.$store.state.app.token
          }
        }).then((res) => {
          Vue.set(this.tenants, acl.tenantID, {
            tenantID: acl.tenantID,
            name: res.data.data.name,
            joinToken: res.data.data.joinToken
          })
        })
      }
    })
  }
}
</script>

<style scoped>

</style>
