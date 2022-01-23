<template>
  <b-container class="mt-5">
    <b-row>
      <Navbar/>
    </b-row>
    <b-row>
      <b-col cols="12"><h1>Hosts in this Tenant:</h1></b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <b-table :fields="[{key: 'hostID', label: 'ID'}, {key: 'name', label: 'Name'},{key: 'online', label: 'Online'}, {key: 'secret', label: 'secret'}]" :items="this.hosts"></b-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
export default {
  name: "Hosts",
  data() {
    return {
      hosts: []
    }
  },
  mounted() {
    this.getHosts();
  },
  methods: {
    getHosts() {
      axios({
        url: `http://api.interlink.rest/api/tenant/${this.$store.state.app.tenantID}/host`,
        headers: {
          Authorization: "Bearer " + this.$store.state.app.token
        }
      }).then((response) => {
        for(const host of response.data.data.hosts) {
          this.hosts.push({
            hostID: host.id,
            name: host.name,
            secret: host.secret,
            online: host.online,
            contactPoint: host.contactPoint
          });
        }

      })
    }
  }
}
</script>

<style scoped>

</style>
