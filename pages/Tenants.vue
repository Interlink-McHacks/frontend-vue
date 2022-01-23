<template>
  <b-container class="mt-5">
    <b-row class="justify-content-center">
      <b-col cols="12"><h1>Login Successful.</h1></b-col>
      <b-col cols="12">
        <b-form class="w-100">
          <b-form-group id="set-tenant-label" label-for="tenantID" label="Please choose a tenant to continue">
            <b-form-select @change="$store.commit('app/setTenantID', $event)" :value="$store.state.app.tenantID">
              <b-form-select-option v-for="(tenant, tenantID) in tenants" :value="tenantID" v-bind:key="tenantID">{{tenant.name}}</b-form-select-option>
            </b-form-select>
          </b-form-group>
        </b-form>
      </b-col>
      <b-col cols="12">
        <div class="float-left">
          <b-button v-b-modal.create-tenant-modal>Create Tenant</b-button>
        </div>
        <div class="float-right">
          <router-link to="Tunnels"><b-button variant="primary">Continue</b-button></router-link>
        </div>
      </b-col>
    </b-row>
    <b-modal id="create-tenant-modal" title="Create a tenant" ref="createTenantModal">
      <b-form @submit.prevent="createTenant">
        <b-form-group id="name" label="Name:">
          <b-form-input v-model="createTenantName" placeholder="Name" required></b-form-input>
        </b-form-group>
        <b-button type="submit">Create</b-button>
      </b-form>
    </b-modal>
  </b-container>
</template>

<script>
import axios from 'axios';
import Vue from 'vue';
import Swal from 'sweetalert2';

export default {
  name: "Tenants",
  data() {
    return {
      tenants: {},
      createTenantName: ""
    }
  },
  mounted() {
    this.getTenants();
  },
  methods: {
    getTenants() {
      this.tenants = {};
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
    },
    createTenant() {
      axios({
        url: "http://api.interlink.rest/api/tenant",
        method: "POST",
        headers: {
          Authorization: "Bearer " + this.$store.state.app.token
        },
        data: {
          name: this.createTenantName
        }
      }).then((response) => {
        Vue.set(this.tenants, response.data.data.id, {
          tenantID: response.data.data.id,
          name: this.createTenantName,
          joinToken: this.joinToken
        });

        Swal.fire({
          title: "Success",
          text: "Tenant created!"
        }).then(() => {
          this.createTenantName = "";
          this.$store.commit('app/setTenantID', response.data.data.id);
          this.$refs['createTenantModal'].hide();
          this.$router.push({
            name: "Tunnels"
          })
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
