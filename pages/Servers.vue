<template>
  <b-container>
    <b-row>

    </b-row>
  </b-container>
</template>

<script>
import axios from 'axios';
export default {
  name: "Servers",
  mounted() {
    axios({
      url: "http://api.interlink.rest/"
    })
  }
}
</script>

<style scoped>

</style>
