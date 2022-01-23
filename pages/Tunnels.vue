<template>
<div>
<h1>Tunnels</h1>
  <b-button v-b-modal="'add-tun-modal'">Add Tunnel</b-button>
  <b-table striped hover :items="tunnels"></b-table>
  <b-modal id="add-tun-modal" title="Add Tunnel" >
    <b-form>
      <p>Name</p>
      <b-input placeholder="Name" v-model="new_tunnel.name"></b-input>
      <p>Description</p>
      <b-input placeholder="Description" v-model="new_tunnel.description"></b-input>
      <p>Target Port</p>
      <b-input placeholder="Target Port" v-model="new_tunnel.targetPort" type="number"></b-input>
      <p>Type</p>
      <b-form-select v-model="new_tunnel.type" :options="[{value: 'TCP', text: 'TCP'},{value: 'HTTP', text: 'HTTP'}]"></b-form-select>
      <p>Hosts</p>
      <b-form-select v-model="new_tunnel.host" :options="host_options"></b-form-select>
      <b-button @click="addTunnel">Add Tunnel</b-button>
    </b-form>
  </b-modal>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "Tunnels",
  data() {
    return {
      host_options: [],
      new_tunnel: {
        name: '',
        description: '',
        targetPort: 0,
        type:'',
        host:''
      },
      tunnels: [{'_id': '61ecd465311a16b8078393fc', 'name': 'website', 'description': 'a really cool website!', 'hostID': '61ecbb84273338b37494f502', 'tenantID': '61ec73a88d868f0bfc5a3ce6', 'hostConnectPort': 3000, 'wgListeningPort': 26705, 'type': 'TCP'}, {'_id': '61ecd706f94b3cb30c923db3', 'name': 'cool-server', 'description': 'a really cool minecraft server!', 'hostID': '61ecbb84273338b37494f502', 'tenantID': '61ec73a88d868f0bfc5a3ce6', 'hostConnectPort': 25565, 'wgListeningPort': 16113, 'type': 'TCP'}, {'_id': '61ece304a5a478cd484d30eb', 'name': 'cool-website', 'description': 'a really cool website!', 'hostID': '61ecbb84273338b37494f502', 'tenantID': '61ec73a88d868f0bfc5a3ce6', 'hostConnectPort': 3000, 'wgListeningPort': 58106, 'type': 'HTTP'}]
    }
  },
  methods: {
    async getTunnels() {
      const tenantId = this.$store.state.app.tenantID;
      const apikey = this.$store.state.app.token
      const result = await axios.get(`http://api.interlink.rest/api/tenant/${tenantId}/tunnel`, {
        headers: {
          authorization: 'Bearer ' + apikey
        }
      })
      this.tunnels = result.data.data['tunnels']
    },

    async getHosts() {
      const tenantId = this.$store.state.app.tenantID;
      const apikey = this.$store.state.app.token
      const result = (await axios.get(`http://api.interlink.rest/api/tenant/${tenantId}/host`, {
        headers: {
          authorization: 'Bearer ' + apikey
        }
      })).data
      const hosts = result['data']['hosts']
      for (let i in hosts) {
        console.log('hi', hosts[i]['_id'])
        this.host_options.push({
          value: hosts[i]['_id'],
          text: hosts[i]['name']
        })
      }
      console.log(result)

    },

    async addTunnel() {
      const tenantId = this.$store.state.app.tenantID;
      const apikey = this.$store.state.app.token
      const res = await axios.post(`http://api.interlink.rest/api/tenant/${tenantId}/tunnel`, {
        name: this.new_tunnel.name,
        description: this.new_tunnel.description,
        hostConnectPort: parseInt(this.new_tunnel.targetPort),
        type: this.new_tunnel.type,
        hostID: this.new_tunnel.host
      },{
        headers: {
          authorization: 'Bearer ' + apikey
        }
      })
      await this.getTunnels()
    }
  },
  async mounted() {
    await this.getHosts()
  }
}
</script>

<style scoped>

</style>
