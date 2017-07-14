<template>
  <v-list subheader two-line>
    <v-subheader>Current status</v-subheader>
    <remote v-for="(key, val, idx) in myRemotes" :key="idx"
            :alias="key.alias"
            :uri="key.uri"
            :status="key.status"></remote>
  </v-list>
</template>

<script>
import Remote from './Remote.vue'


const services = [
  {
    uri: 'http://localhost:8761/health',
    alias: 'Registry',

  },
  {
    uri: 'http://localhost:9999/uaa/health',
    alias: 'SSO',
  },
  {
    uri: 'http://localhost:8765/health',
    alias: 'Gateway this is a very long name 2234',
    status: 'online'
  },
  {
    uri: 'http://localhost:9090/health',
    alias: 'Homepage',
  },
  {
    uri: 'http://localhost:8010/health',
    alias: 'Consumer Exposure longer name',
  }
];

export default {
  components: {
    Remote
  },
  data() {
    return {
      myRemotes: services
    }
  }
}
</script>

<style>

</style>
